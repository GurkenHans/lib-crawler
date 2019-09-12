const $ = require('cheerio'),
    seo = {
        'title': {
            name: 'title',
            test(html) {
                return $('title', html).length !== 0
            },
            value(html) {
                return $('title', html).text()
            }
        },
        'description': {
            name: 'description',
            test(html) {
                return $('meta[name="description"]', html).length !== 0
            },
            value(html) {
                return $('meta[name="description"]', html).attr('content')
            }
        },
    }

module.exports = function(html) {
    return Object.values(seo).filter(seo => seo.test(html)).map(seo => ({item: seo.name, value: seo.value(html)}))
}