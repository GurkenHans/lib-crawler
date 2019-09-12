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
            const id = `crawler_${data.name.replace(/[^a-z0-9]/gi, '').toLowerCase()}`
                buttonTemplate = `<a class="nav-link d-flex justify-content-between align-items-baseline" id="${id}-toggle" data-toggle="pill" href="#${id}" role="tab"><span class="name">${data.name}</span><small></small></a>`,
                template = `
                    <div class="tab-pane fade" id="${id}" role="tabpanel">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <h2>${data.name}</h2>
                            <button class="btn btn-sm btn-primary toggle-crawler h-100">Start crawler</button>
                        </div>
                        <div class="seo mb-4"></div>
                        <h3 class="mb-1">General Info</h3>
                        <table class="table table-sm table-striped general mb-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col" class="w-50">Item</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Start the crawler to see results...</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <h3 class="mb-1">Detected JavaScript libraries</h3>
                        <table class="table table-sm table-striped libraries mb-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col" class="w-50">Name</th>
                                    <th scope="col">Version</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Start the crawler to see results...</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
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