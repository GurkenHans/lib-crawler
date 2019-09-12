const $ = require('cheerio'),
    suite = {
        getComments(el, html) {
            return $(el, html).contents()
                .filter(function() {
                    if(this.nodeType === 8) console.log(this.data);

                    return this.nodeType === 8
                })
                .map(function() {
                    return this.data
                })
        }
    },
    cms = {
        'Typo 3': {
            name: 'Typo 3',
            test(gen, html) {
                suite.getComments('head', html)
                return gen.match(/^TYPO3 CMS/gi)// || suite.getComments('head', html) && suite.getComments('head', html).match(/This website is powered by TYPO3/)
            }
        },
        
        'MediaWiki': {
            name: 'MediaWiki',
            test(gen, html) {
                return gen.match(/^MediaWiki/gi)
            }
        },
        
        'WordPress': {
            name: 'WordPress',
            test(gen, html) {
                return gen.match(/^WordPress/gi)
            }
        }
    }

module.exports = function(html) {
    const gen = $('meta[name="generator"]', html).attr('content') || ''

    return Object.values(cms).filter(cms => cms.test(gen, html)).map(cms => ({name: cms.name}))
}