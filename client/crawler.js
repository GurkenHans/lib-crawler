class Crawler {
    constructor(data) {
        this.data = data;
        this.running = false;
        this.libRequest = {};
        this.seoRequest = {};
        this.generalRequest = {};

        this.initEvents();

        if(this.data.start) {
            this.startCrawlers();
        } else {
            this.updateFrontend();
        }
    }

    initEvents() {
        const self = this;

        $(`#${this.data.id} .toggle-crawler`).click(function() {
            if($(this).is('.btn-danger')) {
                self.stopCrawlers();
            } else {
                self.startCrawlers();
            }
        })
    }

    startCrawlers() {
        this.startLibCrawler();
        this.startGeneralCrawler();
        this.startSeoCrawler();
    }

    startLibCrawler() {
        this.running = true;

        this.libRequest = $.ajax({
            url: 'http://localhost:4000/crawl/libraries',
            data: $.param(this.serializeArray(this.data)),
            method: 'GET'
        })
        .done(result => { 
            this.running = false;
            this.updateFrontend();
            this.setLibraries(result);
        });

        this.updateFrontend();
    }

    startGeneralCrawler() {
        this.running = true;

        this.generalRequest = $.ajax({
            url: 'http://localhost:4000/crawl/general',
            data: $.param(this.serializeArray(this.data)),
            method: 'GET'
        })
        .done(result => { 
            this.running = false;
            this.updateFrontend();
            this.setGeneral(result);
        });

        this.updateFrontend();
    }

    startSeoCrawler() {
        this.running = true;

        this.seoRequest = $.ajax({
            url: 'http://localhost:4000/crawl/seo',
            data: $.param(this.serializeArray(this.data)),
            method: 'GET'
        })
        .done(result => { 
            this.running = false;
            this.updateFrontend();
            this.setSeo(result);
        });

        this.updateFrontend();
    }

    stopCrawlers() {
        this.running = false;
        this.libRequest && this.libRequest.abort();
        this.generalRequest && this.generalRequest.abort();
        this.seoRequest && this.seoRequest.abort();

        this.updateFrontend();
        this.setLibraries([]);
        this.setGeneral([]);
        this.setSeo([]);
    }

    serializeArray(data) {
        let array = [];

        for(let [name, value] of Object.entries(data)) {
            array = [...array, {name, value}];
        }

        return array;
    }

    updateFrontend() {
        const button = $(`#${this.data.id}-toggle`),
            tab = $(`#${this.data.id}`);

        button.find('small').toggleClass('text-success', this.running).toggleClass('text-danger', !this.running).text(this.running ? 'running' : 'not running');
        tab.find('.toggle-crawler').toggleClass('btn-primary', !this.running).toggleClass('btn-danger', this.running).text(this.running ? 'Stop crawler' : 'Start crawler');
        
        if(this.running) {
            tab.find('.libraries tbody').html('<tr><td class="d-flex align-items-center"><div class="spinner-border mr-2"></div><span>Crawling page...</span></td><td></td></tr>');
            tab.find('.general tbody').html('<tr><td class="d-flex align-items-center"><div class="spinner-border mr-2"></div><span>Crawling page...</span></td><td></td></tr>');
        }
    }

    setLibraries(data) {
        const tab = $(`#${this.data.id}`),
            table = tab.find('.libraries tbody');

        table.html('');

        if(data.length) {
            data.forEach(library => {
                table.append(`
                    <tr>
                        <td>${library.name}</td>
                        <td>${library.version || 'unknown'}</td>
                    </tr>
                `);
            });
        } else {
            table.append(`
                <tr>
                    <td>No libraries detected...</td>
                    <td></td>
                </tr>
            `);
        }
    }

    setGeneral(data) {
        const tab = $(`#${this.data.id}`),
            table = tab.find('.general tbody');

        table.html('');

        if(data.length) {
            data.forEach(info => {
                table.append(`
                    <tr>
                        <td>${info.item}</td>
                        <td>${info.value || 'unknown'}</td>
                    </tr>
                `);
            });
        } else {
            table.append(`
                <tr>
                    <td>No general info found...</td>
                    <td></td>
                </tr>
            `);
        }
    }

    setSeo(data) {
        const tab = $(`#${this.data.id}`),
            seoData = tab.find('.seo');

        seoData.html('');

        if(data.length) {
            data.forEach(info => {
                seoData.append(`<p class="${info.item}">${info.value}</p>`);
            });
        }
    }
}