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
            }
        },
        libraries = {
            'jQuery': {
                name: 'jQuery',
                test(win) {
                    return suite.isFunction(win.jQuery) && suite.isObject(win.jQuery.fn) && suite.defined(win.jQuery().jquery)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: win.jQuery().jquery
                    }
                }
            },

            'jQuery UI': {
                name: 'jQuery UI',
                test(win) {
                    return libraries['jQuery'].test(win) && suite.isObject(win.jQuery.ui) && suite.defined(win.jQuery.ui.version)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: win.jQuery.ui.version
                    }
                }
            },

            'Zepto': {
                name: 'Zepto',
                test(win) {
                    return suite.isFunction(win.Zepto) && suite.isObject(win.Zepto.zepto) && suite.isObject(win.Zepto.fn)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: UNDEFINED_VERSION
                    }
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
                getInfo(win) {
                    return {
                        name: this.name,
                        version: this.data.getVersion(win)
                    }
                }
            },

            'AOS - Animate On Scroll': {
                name: 'AOS - Animate On Scroll',
                test(win) {
                    return suite.isObject(win.AOS) && suite.isFunction(win.AOS.init)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: UNDEFINED_VERSION
                    }
                }
            },

            'd3.js': {
                name: 'd3.js',
                test(win) {
                    return suite.isObject(win.d3) && suite.isFunction(win.d3.min) && suite.defined(win.d3.version)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: win.d3.version
                    }
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
                getInfo(win) {
                    return {
                        name: this.name,
                        version: this.data.getVersion(win)
                    }
                }
            },

            'Popper.js': {
                name: 'Popper.js',
                test(win) {
                    return suite.isFunction(win.Popper)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: UNDEFINED_VERSION
                    }
                }
            },

            'Three.js': {
                name: 'Three.js',
                test(win) {
                    return suite.isObject(win.THREE)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: win.THREE.REVISION || UNDEFINED_VERSION
                    }
                }
            },

            'React': {
                name: 'React',
                test(win) {
                    return suite.isObject(win.React) && suite.isFunction(win.React.Component)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: win.React.version || UNDEFINED_VERSION
                    }
                }
            },

            'PixiJS': {
                name: 'PixiJS',
                test(win) {
                    return suite.isObject(win.PIXI) && suite.defined(win.PIXI.VERSION)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: win.PIXI.VERSION
                    }
                }
            },

            'Modernizr': {
                name: 'Modernizr',
                test(win) {
                    return suite.isObject(win.Modernizr) && suite.isFunction(win.Modernizr.addTest)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: win.Modernizr._version || UNDEFINED_VERSION
                    }
                }
            },

            'FlexSlider': {
                name: 'FlexSlider',
                test(win) {
                    return libraries['jQuery'].test(win) && suite.isFunction(jQuery.fn.flexslider)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: UNDEFINED_VERSION
                    }
                }
            },

            'Owl Carousel': {
                name: 'Owl Carousel',
                test(win) {
                    const $ = libraries['jQuery'].test(win) ? win.jQuery :
                        libraries['Zepto'].test(win) ? win.Zepto : undefined

                    return suite.defined($) && suite.isFunction($.fn.owlCarousel)
                },
                getInfo(win) {
                    return {
                        name: this.name,
                        version: UNDEFINED_VERSION
                    }
                }
            }
        }

    return Object.values(libraries).filter(lib => lib.test(window)).map(lib => lib.getInfo(window))
}