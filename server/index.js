const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    puppeteer = require('puppeteer'),
    $ = require('cheerio'),
    detect = require('./detect'),
    cmsDetect = require('./cmsDetect'),
    seoDetect = require('./seoDetect'),
    app = express(),
    PORT = process.env.PORT || 4000,
    { corsOptions } = require('./config');

app.use(bodyParser.json())
app.use(cors())
app.listen(PORT, () => console.log(`Listening on Port ${PORT}!`))

app.get('/crawl/libraries', cors(corsOptions), async(req, res) => {
    const url = req.query.url,
        level = req.query.level,
        browser = await puppeteer.launch(),
        page = await browser.newPage()

    await page.goto(url)
    
    const libraries = await page.evaluate(detect)

    await browser.close()

    res.status(200).json(libraries)
})

app.get('/crawl/general', cors(corsOptions), async(req, res) => {
    const url = req.query.url,
        browser = await puppeteer.launch(),
        page = await browser.newPage()

    await page.goto(url)
    
    const html = await page.content(),
        cms = cmsDetect(html)
    let result = []

    if(cms.length) {
        result = [...result, {item: 'Generator', value: cms[0].name}]
    }

    await browser.close()

    res.status(200).json(result)
})

app.get('/crawl/seo', cors(corsOptions), async(req, res) => {
    const url = req.query.url,
        browser = await puppeteer.launch(),
        page = await browser.newPage()

    await page.goto(url)
    
    const html = await page.content(),
        seo = seoDetect(html)

    await browser.close()

    res.status(200).json(seo)
})