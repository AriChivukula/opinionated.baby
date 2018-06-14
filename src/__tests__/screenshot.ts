import * as puppeteer from 'puppeteer';

(async (): Awaitable<void> => {
  const browser: puppeteer.Browser = await puppeteer.launch();
  const page: puppeteer.page = await browser.newPage();
  await page.goto('http://127.0.0.1:8080');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
