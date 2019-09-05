module.exports = function() {
    const UNDEFINED_VERSION = null,
        suite = {
            isObject(prop) {
                return typeof prop === 'object'
            },
            isFunction(prop) {
                return typeof prop === 'function'
            },
            defined(prop) {
                return typeof prop !== 'undefined'
            },
            treeWalker(win, test) {
                return win.document.createTreeWalker(
                    win.document.body,
                    NodeFilter.SHOW_ELEMENT,
                    node => test(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
                ).nextNode() != null
            }
        },
        libraries = {
            'jQuery': {
                name: 'jQuery',
                test(win) {
                    return suite.isFunction(win.jQuery) && suite.isObject(win.jQuery.fn) && suite.defined(win.jQuery().jquery)
                },
                getVersion(win) {
                    return win.jQuery().jquery
                }
            },

            'jQuery UI': {
                name: 'jQuery UI',
                test(win) {
                    return libraries['jQuery'].test(win) && suite.isObject(win.jQuery.ui) && suite.defined(win.jQuery.ui.version)
                },
                getVersion(win) {
                    return win.jQuery.ui.version
                }
            },

            'Zepto': {
                name: 'Zepto',
                test(win) {
                    return suite.isFunction(win.Zepto) && suite.isObject(win.Zepto.zepto) && suite.isObject(win.Zepto.fn)
                },
                getVersion(win) {
                    return UNDEFINED_VERSION
                }
            },

            'Bootstrap': {
                name: 'Bootstrap',
                data: {
                    components: ['modal', 'dropdown', 'scrollspy', 'tab', 'tooltip', 'popover', 'alert', 'button', 'collapse', 'carousel', 'typeahead', 'affix'],
                    getVersion(win) {
                        const versionComponents = this.components.filter(component => {
                                return suite.isFunction(win.jQuery.fn[component])
                                    && suite.isFunction(win.jQuery.fn[component].Constructor)
                                    && suite.defined(win.jQuery.fn[component].Constructor.VERSION)
                            })

                        return versionComponents.length ? win.jQuery.fn[versionComponents[0]].Constructor.VERSION : UNDEFINED_VERSION
                    }
                },
                test(win) {
                    return libraries['jQuery'].test(win)
                        && this.data.components.some(component => suite.isFunction(win.jQuery.fn[component]) && suite.isFunction(win.jQuery.fn[component].Constructor))
                },
                getVersion(win) {
                    return this.data.getVersion(win)
                }
            },

            'AOS - Animate On Scroll': {
                name: 'AOS - Animate On Scroll',
                test(win) {
                    return suite.isObject(win.AOS) && suite.isFunction(win.AOS.init)
                },
                getVersion(win) {
                    return UNDEFINED_VERSION
                }
            },

            'd3.js': {
                name: 'd3.js',
                test(win) {
                    return suite.isObject(win.d3) && suite.isFunction(win.d3.min) && suite.defined(win.d3.version)
                },
                getVersion(win) {
                    return win.d3.version
                }
            },

            'Parsley': {
                name: 'Parsley',
                data: {
                    getVersion(win) {
                        return suite.isObject(win.Parsley) ? win.Parsley.version : UNDEFINED_VERSION
                    }
                },
                test(win) {
                    return libraries['jQuery'].test(win) && suite.isFunction(win.jQuery.fn.parsley)
                },
                getVersion(win) {
                    return this.data.getVersion(win)
                }
            },

            'Popper.js': {
                name: 'Popper.js',
                test(win) {
                    return suite.isFunction(win.Popper)
                },
                getVersion(win) {
                    return UNDEFINED_VERSION
                }
            },

            'Three.js': {
                name: 'Three.js',
                test(win) {
                    return suite.isObject(win.THREE)
                },
                getVersion(win) {
                    return win.THREE.REVISION || UNDEFINED_VERSION
                }
            },

            'React': {
                name: 'React',
                test(win) {
                    return (suite.isObject(win.React) && suite.isFunction(win.React.Component))
                        || suite.treeWalker(win, node => suite.defined(node) && suite.defined(node._reactRootContainer))
                },
                getVersion(win) {

                    return (suite.isObject(win.React) && suite.isFunction(win.React.Component)) ? win.React.version : UNDEFINED_VERSION
                }
            },

            'PixiJS': {
                name: 'PixiJS',
                test(win) {
                    return suite.isObject(win.PIXI) && suite.defined(win.PIXI.VERSION)
                },
                getVersion(win) {
                    return win.PIXI.VERSION
                }
            },

            'Modernizr': {
                name: 'Modernizr',
                test(win) {
                    return suite.isObject(win.Modernizr) && suite.isFunction(win.Modernizr.addTest)
                },
                getVersion(win) {
                    return win.Modernizr._version || UNDEFINED_VERSION
                }
            },

            'FlexSlider': {
                name: 'FlexSlider',
                test(win) {
                    return libraries['jQuery'].test(win) && suite.isFunction(jQuery.fn.flexslider)
                },
                getVersion(win) {
                    return UNDEFINED_VERSION
                }
            },

            'Owl Carousel': {
                name: 'Owl Carousel',
                test(win) {
                    const $ = libraries['jQuery'].test(win) ? win.jQuery :
                        libraries['Zepto'].test(win) ? win.Zepto : undefined

                    return suite.defined($) && suite.isFunction($.fn.owlCarousel)
                },
                getVersion(win) {
                    return UNDEFINED_VERSION
                }
            },

            'Socket.IO': {
                name: 'Socket.IO',
                test(win) {
                    return (suite.isFunction(win.io) && (suite.isFunction(win.io.sockets) || suite.isFunction(win.io.Socket)))
                },
                getVersion(win) {
                    return win.io.version || UNDEFINED_VERSION
                }
            }
        }

    return Object.values(libraries).filter(lib => lib.test(window)).map(lib => ({name: lib.name, version: lib.getVersion(window)}))
}