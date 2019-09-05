class Crawler {
    constructor(data) {
        this.data = data;
        this.running = false;
        this.request = {};

        this.initEvents();

        if(this.data.start) {
            this.startCrawler();
        } else {
            this.updateFrontend();
        }
    }

    initEvents() {
        const self = this;

        $(`#${this.data.id} .toggle-crawler`).click(function() {
            if($(this).is('.btn-danger')) {
                self.stopCrawler();
            } else {
                self.startCrawler();
            }
        })
    }

    startCrawler() {
        this.running = true;

        this.request = $.ajax({
            url: 'http://localhost:4000/crawl',
            data: $.param(this.serializeArray(this.data)),
            method: 'GET'
        })
        .done(result => { 
            this.running = false;
            this.updateFrontend();
            this.setResult(result);
        });

        this.updateFrontend();
    }

    stopCrawler() {
        this.running = false;
        this.request && this.request.abort();

        this.updateFrontend();
        this.setResult([]);
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
            tab.find('.detected tbody').html('<tr><td>Crawling page...</td><td></td></tr>');
        }
    }

    setResult(data) {
        const tab = $(`#${this.data.id}`),
            table = tab.find('.detected tbody');

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
}