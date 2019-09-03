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
            url: 'localhost:4000/crawl',
            data: this.serializeArray(this.data),
            method: 'POST'
        })
        .complete(result => {
            console.log(result);
        });

        console.log(this.request);

        this.updateFrontend();
    }

    stopCrawler() {
        this.running = false;
        this.request && this.request.abort();

        this.updateFrontend();
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

        button.find('small').text(this.running ? 'running' : 'not running');
        tab.find('.toggle-crawler').toggleClass('btn-primary', !this.running).toggleClass('btn-danger', this.running).text(this.running ? 'Stop crawler' : 'Start crawler');
    }
}