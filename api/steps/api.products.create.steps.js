// api/steps/api.products.create.steps.js
const { I } = inject();
const apiContext = require('../support/apiContext');

When(
  'I create a new product with title {string} description {string} price {int} brand {string}',
  async (title, description, price, brand) => {
    I.say('API: POST /products/add');

    const payload = { title, description, price, brand };
    apiContext.lastRequest = payload;

    apiContext.lastResponse = await I.sendPostRequest('/products/add', payload);

    I.say(`API: Payload -> ${JSON.stringify(payload)}`);
  }
);

Then('the product creation should be successful', () => {
  I.say('API: Validate product creation');

  const res = apiContext.lastResponse;
  if (!res) throw new Error('No response saved');

  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`Expected 200/201, got ${res.status}`);
  }

  if (typeof res.data.id !== 'number') {
    throw new Error('Expected numeric product id');
  }

  I.say(`API: Created product id = ${res.data.id}`);
});

Then('the created product response should match the request data', () => {
  I.say('API: Validate response matches request');

  const res = apiContext.lastResponse.data;
  const req = apiContext.lastRequest;

  if (res.title !== req.title) throw new Error('Title mismatch');
  if (res.description !== req.description) throw new Error('Description mismatch');
  if (res.price !== req.price) throw new Error('Price mismatch');
  if (res.brand !== req.brand) throw new Error('Brand mismatch');

  I.say('API: Response matches request payload');
});