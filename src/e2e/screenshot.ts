import * as puppeteer from "puppeteer";
import { makeSync } from "../server/util";

makeSync((async (): Promise<void> => {
  const browser: puppeteer.Browser = await puppeteer.launch({args: ["--no-sandbox"]});
  const page: puppeteer.Page = await browser.newPage();
  await page.goto("http://127.0.0.1:8080/index.html", { waitUntil: 'networkidle0' });
  await page.screenshot({path: "screenshot.png"});
  await browser.close();
})());
