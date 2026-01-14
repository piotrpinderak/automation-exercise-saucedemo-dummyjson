// api/steps/api.products.delay.steps.js
const { I } = inject();
const apiContext = require('../support/apiContext');

When('I get list of products with delay {int}', async (delay) => {
  I.say(`API: GET /products?delay=${delay}`);

  apiContext.lastDelayMs = delay;

  const start = Date.now();
  apiContext.lastResponse = await I.sendGetRequest(`/products?delay=${delay}`);
  const end = Date.now();

  apiContext.lastRequestTimeMs = end - start;

  I.say(`API: Total request time = ${apiContext.lastRequestTimeMs} ms`);
  I.say(`API: Status = ${apiContext.lastResponse?.status}`);
});

Then('the delay request should behave correctly', () => {
  const res = apiContext.lastResponse;
  const delay = apiContext.lastDelayMs;

  if (!res) throw new Error('No response saved in apiContext.lastResponse');

  // DummyJSON docs: delay should be between 0 and 5000 ms
  if (delay >= 0 && delay <= 5000) {
    // valid delay -> should succeed
    if (res.status !== 200) {
      throw new Error(`Expected status 200 for delay=${delay}, got ${res.status}`);
    }

    if (!res.data || !Array.isArray(res.data.products)) {
      throw new Error('Expected response.data.products to be an array');
    }

    I.say(`API: Valid delay (${delay}) -> OK (200), products=${res.data.products.length}`);
    return;
  }

  // invalid delay -> should fail fast (400)
  if (res.status !== 400) {
    throw new Error(`Expected status 400 for invalid delay=${delay}, got ${res.status}`);
  }

  I.say(`API: Invalid delay (${delay}) -> OK (400 returned as expected)`);
});

Then('the effective response time should be no longer than {int} ms', (maxTime) => {
  const total = apiContext.lastRequestTimeMs;
  const delay = apiContext.lastDelayMs;
  const res = apiContext.lastResponse;

  if (total == null) throw new Error('No response time recorded');
  if (!res) throw new Error('No response saved in apiContext.lastResponse');

  // If delay is valid (0..5000) and request succeeded,
  // measure "effective" time as: total - delay
  if (delay >= 0 && delay <= 5000 && res.status === 200) {
    const effective = Math.max(0, total - delay);

    I.say(`API: Effective time = max(0, ${total} - ${delay}) = ${effective} ms`);

    if (effective > maxTime) {
      throw new Error(`Expected effective time <= ${maxTime} ms, but got ${effective} ms`);
    }

    I.say(`API: Effective time within limit (${effective} ms <= ${maxTime} ms)`);
    return;
  }

  // For invalid delay (e.g. 6000), we can still assert it fails fast:
  // total request time should be <= maxTime
  I.say(`API: Invalid delay -> total time = ${total} ms (expect fast reject)`);

  if (total > maxTime) {
    throw new Error(`Expected fast reject <= ${maxTime} ms, but got ${total} ms`);
  }

  I.say(`API: Fast reject within limit (${total} ms <= ${maxTime} ms)`);
});
