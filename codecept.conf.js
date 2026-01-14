exports.config = {
  tests: './ui/**/*.js',
  output: './output/ui',

  helpers: {
    Playwright: {
      url: 'https://www.saucedemo.com',
      show: true,
      browser: 'chromium'
    }
  },

  gherkin: {
    features: './ui/features/*.feature',
    steps: ['./ui/steps']
  },

  plugins: {
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
    }
  }
};