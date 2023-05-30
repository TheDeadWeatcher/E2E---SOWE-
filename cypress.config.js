const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},

    baseUrl: 'https://www.sowe.pl/',
    includeShadowDom: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: true,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    retries: {
      runMode: 0,
      openMode: 0,
    },
  },
});
