// api/steps/api.products.update.third.steps.js
const { I } = inject();
const apiContext = require('../support/apiContext');

When('I get product with id {int}', async (id) => {
  I.say(`API: GET /products/${id}`);

  apiContext.originalProductId = id;
  apiContext.originalProduct = null;

  apiContext.lastResponse = await I.sendGetRequest(`/products/${id}`);

  const res = apiContext.lastResponse;
  if (!res) throw new Error('No response saved in apiContext.lastResponse');
  if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);

  if (!res.data || typeof res.data !== 'object') {
    throw new Error('Expected response.data to be an object');
  }

  apiContext.originalProduct = res.data;
  I.say(`API: Original product loaded (id=${res.data.id})`);
});

When(
  'I update product with id {int} with new title {string} and price {int}',
  async (id, newTitle, newPrice) => {
    I.say(`API: UPDATE /products/${id} (PATCH)`);

    const payload = { title: newTitle, price: newPrice };

    apiContext.lastRequest = payload;

    apiContext.lastResponse = await I.sendPatchRequest(`/products/${id}`, payload);

    I.say(`API: Update payload -> ${JSON.stringify(payload)}`);
  }
);

Then('the update should be successful', () => {
  I.say('API: Validate update status and basic response fields');

  const res = apiContext.lastResponse;
  if (!res) throw new Error('No response saved in apiContext.lastResponse');

  if (res.status !== 200) {
    throw new Error(`Expected status 200, got ${res.status}`);
  }

  if (!res.data || typeof res.data !== 'object') {
    throw new Error('Expected response.data to be an object');
  }

  if (res.data.id !== apiContext.originalProductId) {
    throw new Error(
      `Expected response.data.id=${apiContext.originalProductId}, got ${res.data.id}`
    );
  }

  I.say(`API: Update OK (id=${res.data.id})`);
});

Then('response should match original product data where applicable', () => {
  I.say('API: Validate updated fields + unchanged fields from original');

  const res = apiContext.lastResponse;
  const updated = res?.data;
  const original = apiContext.originalProduct;
  const req = apiContext.lastRequest;

  if (!updated) throw new Error('No updated product in response');
  if (!original) throw new Error('No original product saved in apiContext.originalProduct');
  if (!req) throw new Error('No update request saved in apiContext.lastRequest');

  if (updated.title !== req.title) {
    throw new Error(`Expected updated title="${req.title}", got "${updated.title}"`);
  }
  if (updated.price !== req.price) {
    throw new Error(`Expected updated price=${req.price}, got ${updated.price}`);
  }

  const updatedKeys = Object.keys(updated);
  const skippedKeys = new Set(['title', 'price']);

  updatedKeys.forEach((key) => {
    if (skippedKeys.has(key)) return;

    if (Object.prototype.hasOwnProperty.call(original, key)) {
      const before = original[key];
      const after = updated[key];

      const same =
        typeof before === 'object' || typeof after === 'object'
          ? JSON.stringify(before) === JSON.stringify(after)
          : before === after;

      if (!same) {
        throw new Error(
          `Field "${key}" changed unexpectedly.\nBefore: ${JSON.stringify(before)}\nAfter: ${JSON.stringify(after)}`
        );
      }
    }
  });

  I.say('API: Unchanged fields match original (where applicable)');
});