const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    puppeteer = require('puppeteer'),
    $ = require('cheerio'),
    detect = require('./detect'),
    app = express(),
    PORT = process.env.PORT || 4000,
    corsOptions = {
        origin: 'localhost:3000',
        optionsSuccessStatus: 200
    }

app.use(bodyParser.json())
app.use(cors())
app.listen(PORT, () => console.log(`Listening on Port ${PORT}!`))

app.get('/crawl', cors(corsOptions), async(req, res) => {
    const url = req.query.url,
        level = req.query.level,
        browser = await puppeteer.launch(),
        page = await browser.newPage()

    await page.goto(url)
    
    const libraries = await page.evaluate(detect)

    await browser.close()

    res.status(200).json(libraries)
})