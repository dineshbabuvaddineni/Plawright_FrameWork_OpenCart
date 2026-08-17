import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout:30 * 1000,  //30000 ms(30 secs)
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  // retries: process.env.CI ? 2 : 0,
  retries:1,
  //workers: process.env.CI ? 1 : undefined,
  workers:1,
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['dot'],
    ['list']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
    screenshot:'only-on-failure',
    video: 'retain-on-failure',

    //headless:false
    viewport: {width:1280, height:720}, // set default viewport size fr consistency
    ignoreHTTPSErrors:true, //Ignore SSL errors if necessary
    permissions: ['geolocation'], //Set necessary permissions for geolocation-based tests

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

  ],
});
