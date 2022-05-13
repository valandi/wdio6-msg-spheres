'use strict';

const {
  VisualGridRunner,
  RunnerOptions,
  Eyes,
  Target,
  BatchInfo,
  BrowserType,
  DeviceName,
  ScreenOrientation
} = require('@applitools/eyes-webdriverio');

let eyes;
let runner;
let configuration;

describe('wdio6 spheres', function () {

  before(async () => {
    const runnerOptions = new RunnerOptions().testConcurrency(25);
    runner = new VisualGridRunner(runnerOptions);
    eyes = new Eyes(runner);
    if (browser.config.enableEyesLogs) {
      eyes.setLogHandler(new ConsoleLogHandler(true));
    }
    configuration = eyes.getConfiguration();
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY)
    configuration.setBatch(new BatchInfo('wdio6 spheres Batch'))
    configuration.setStitchMode('CSS');
    configuration.waitBeforeCapture(1000);
    configuration.addBrowser(800, 600, BrowserType.CHROME);
    configuration.addBrowser(700, 500, BrowserType.FIREFOX);
    configuration.addBrowser(1600, 1200, BrowserType.IE_11);
    configuration.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
    configuration.addBrowser(800, 600, BrowserType.SAFARI);
    configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    configuration.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
  });


  beforeEach(async function () {
    configuration.setAppName('spheres App - WDIO 6 - Ultrafast');
    configuration.setTestName('spheres Test - WDIO 6 - Ultrafast');
    eyes.setConfiguration(configuration);

    await eyes.open(browser);
  });

  it('careers page', async () => {
      await browser.url('https://www.msgsphere.com/careers/');
      browser.execute("document.body.style.height = 'auto';");
      browser.execute("document.querySelector('body > div.gdpr.gdpr-privacy-bar').style.position='static'");
      await eyes.open(browser, 'msg career page', 'msg career page');
      await eyes.check(
          'Home', 
          Target.window().layoutBreakpoints(true).fully(true)
      );
      
      await eyes.close(false);
  });

  it('home page', async () => {
    // Home
    await browser.url('https://msgsphere.com');
    browser.execute("document.body.style.height = 'auto';");
    await eyes.open(browser, 'msg home page', 'msg sph page');
    await eyes.check(
        'Home', 
        Target.window().layoutBreakpoints(true).fully(true)
    );
    
    // About
    await browser.url('https://www.msgsphere.com/#about');
    browser.execute("document.body.style.height = 'auto';");
    await eyes.check(
        'About', 
        Target.window().layoutBreakpoints(true).fully(true)
    );
    
    // Footer
    await browser.url('https://www.msgsphere.com/#footer');
    browser.execute("document.body.style.height = 'auto';");
    await eyes.check(
        'Footer', 
        Target.region('#colophon').layoutBreakpoints(true).fully(true)
    );
    
    await eyes.close(false);
  });

  afterEach(async () => {
    await eyes.abortAsync();
  });

  after(async () => {
    const results = await runner.getAllTestResults();
    console.log(results);
  });

});
