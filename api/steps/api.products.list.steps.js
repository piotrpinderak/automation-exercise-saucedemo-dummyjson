// api/steps/api.products.list.steps.js
const { I } = inject();
const apiContext = require('../support/apiContext');

When('I get a list of all products', async () => {
  I.say('API: GET /products');
  apiContext.lastResponse = await I.sendGetRequest('/products');
});

Then('the request should be successful', () => {
  I.say('API: Validate status=200 and response structure');

  const res = apiContext.lastResponse;
  if (!res) throw new Error('No response saved');
  if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);

  if (!res.data || !Array.isArray(res.data.products)) {
    throw new Error('Expected response.data.products to be an array');
  }

  I.say(`API: Products count = ${res.data.products.length}`);
});

Then('I print titles of products with odd IDs', () => {
  I.say('API: Extract titles for odd IDs');

  const products = apiContext.lastResponse.data.products;

  const oddTitles = products
    .filter(p => p.id % 2 === 1)
    .map(p => p.title);

  if (oddTitles.length === 0) {
    throw new Error('No odd ID products found');
  }

  console.log('\nProducts with odd IDs:');
  oddTitles.forEach(t => console.log(`- ${t}`));

  oddTitles.forEach(t => I.say(t));
});