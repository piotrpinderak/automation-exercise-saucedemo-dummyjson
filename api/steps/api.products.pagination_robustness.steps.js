// api/steps/api.products.pagination_robustness.steps.js
const { I } = inject();
const apiContext = require('../support/apiContext');

/**
 * This test documents how DummyJSON handles negative pagination parameters.
 *
 * Observed behavior (based on API responses):
 * - skip < 0 is treated as 0 (ignored / clamped)
 * - limit < 0 is treated as: effectiveLimit = total + limit  (e.g., total=194, limit=-10 => 184)
 *
 * We keep the assertions "dynamic" by first fetching total count from the API,
 * so the test won't break if DummyJSON dataset changes in the future.
 */

When('I get products total count', async () => {
  I.say('API: GET /products?limit=0&skip=0 (fetch total count)');
  apiContext.lastResponse = await I.sendGetRequest('/products?limit=0&skip=0');

  const res = apiContext.lastResponse;
  if (!res) throw new Error('No response saved in apiContext.lastResponse');
  if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);

  const total = res.data?.total;
  if (typeof total !== 'number') {
    throw new Error(`Expected response.data.total to be a number, got: ${total}`);
  }

  apiContext.productsTotal = total;
  I.say(`API: total products = ${total}`);
});

When(
  'I get list of products with limit {int} and skip {int}',
  async (limit, skip) => {
    I.say(`API: GET /products?limit=${limit}&skip=${skip}`);
    apiContext.lastRequest = { limit, skip };
    apiContext.lastResponse = await I.sendGetRequest(`/products?limit=${limit}&skip=${skip}`);
  }
);

Then('the request should not fail with server error', () => {
  const res = apiContext.lastResponse;
  if (!res) throw new Error('No response saved in apiContext.lastResponse');

  // "Server error" = 5xx
  if (res.status >= 500) {
    throw new Error(`Expected no 5xx error, got status ${res.status}`);
  }

  I.say(`API: No server error (status=${res.status})`);
});

Then('the response should be handled gracefully for negative pagination', () => {
  const res = apiContext.lastResponse;
  const req = apiContext.lastRequest;

  if (!res) throw new Error('No response saved in apiContext.lastResponse');
  if (!req) throw new Error('No request saved in apiContext.lastRequest');
  if (typeof apiContext.productsTotal !== 'number') {
    throw new Error('No total products saved in apiContext.productsTotal');
  }

  // We still expect a valid response shape
  if (!res.data || !Array.isArray(res.data.products)) {
    throw new Error('Expected response.data.products to be an array');
  }

  const total = apiContext.productsTotal;
  const { limit, skip } = req;

  // Expected behavior inferred from observed responses:
  // - negative skip behaves like 0
  const effectiveSkip = skip < 0 ? 0 : skip;

  // - negative limit behaves like: total + limit (limit is negative)
  //   Example: total=194, limit=-10 => 184
  let expectedLimit;
  if (limit < 0) {
    expectedLimit = total + limit;
  } else {
    expectedLimit = limit;
  }

  // clamp to [0..total] to avoid negative lengths
  expectedLimit = Math.max(0, Math.min(expectedLimit, total));

  // For this endpoint, effectiveSkip doesn't change length if we request "limit" items from the start,
  // but we still keep it here to document behavior and keep the logic explicit.
  // If DummyJSON changes later to apply skip first, this logic can be adjusted.
  const actualLen = res.data.products.length;

  I.say(
    `API: total=${total}, limit=${limit}, skip=${skip} -> expectedLen=${expectedLimit}, actualLen=${actualLen}`
  );

  if (actualLen !== expectedLimit) {
    throw new Error(
      `Unexpected products length.\nExpected: ${expectedLimit}\nActual: ${actualLen}\n(total=${total}, limit=${limit}, skip=${skip})`
    );
  }

  // Optional small sanity: total should be present
  if (typeof res.data.total !== 'number') {
    throw new Error('Expected response.data.total to be a number');
  }
});