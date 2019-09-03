const crawlers = {},
    functions = {
        serializeObject: arrayData => {
            const serialized = {};

            arrayData.forEach(data => {
                serialized[data.name] = data.value;
            });

            return serialized;
        },
        addCrawler: data => {
            const id = `crawler_${data.name.replace(/\s/g, '-').toLowerCase()}`
                buttonTemplate = `<a class="nav-link d-flex justify-content-between" id="${id}-toggle" data-toggle="pill" href="#${id}" role="tab"><span class="name">${data.name}</span><small></small></a>`,
                template = `
                    <div class="tab-pane fade" id="${id}" role="tabpanel">
                        <h2>${data.name}</h2>
                        <button class="btn btn-danger toggle-crawler">Stop crawler</button>
                    </div>`;

            data.id = id;

            $('#crawler-new-toggle').before(buttonTemplate);
            $('#content-crawler').append(template);
            crawlers[id] = new Crawler(data);
        }
    };

$(document).ready(() => {
    $('#add-crawler').submit(function(event) {
        event.preventDefault();

        functions.addCrawler(functions.serializeObject($(this).serializeArray()));
        $(this).trigger('reset');
    });
});