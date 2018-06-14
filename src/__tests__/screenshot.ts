import * as puppeteer from "puppeteer";

(async (): Promise<void> => {
  const browser: puppeteer.Browser = await puppeteer.launch();
  const page: puppeteer.Page = await browser.newPage();
  await page.goto("http://127.0.0.1:8080");
  await page.screenshot({path: "screenshot.png"});

  await browser.close();
})();
