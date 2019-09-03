const puppeteer = require('puppeteer'),
    $ = require('cheerio'),
    detect = require('./detect');

async function getJSLibraries(url) {
    const browser = await puppeteer.launch(),
        page = await browser.newPage();

    await page.goto(url);
    
    const libraries = await page.evaluate(detect);

    await browser.close();

    return libraries;
}