exports.config = {
  tests: './api/**/*.js',
  output: './output/api',

  helpers: {
    REST: {
      endpoint: 'https://dummyjson.com',
      defaultHeaders: {
        'Content-Type': 'application/json',
      },
    },
  },

  gherkin: {
    features: './api/features/*.feature',
    steps: ['./api/steps'], // <-- folder z index.js
  },

  plugins: {
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
    },
  },
};