const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'pdxgjf',
  e2e: {
    setupNodeEvents(on, config) {},

    baseUrl: 'https://www.sowe.pl/',
    experimentalRunAllSpecs: false,
    includeShadowDom: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    hideXHRInCommandLog: true,
    video: false,
    videoUploadOnPasses: false,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    retries: {
      runMode: 4,
      openMode: 4,
    },
  },
});
