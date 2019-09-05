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
                buttonTemplate = `<a class="nav-link d-flex justify-content-between" id="${id}-toggle" data-toggle="pill" href="#${id}" role="tab"><span class="name">${data.name}</span><small></small></a>`,
                template = `
                    <div class="tab-pane fade" id="${id}" role="tabpanel">
                        <h2 class="mb-2">${data.name}</h2>
                        <button class="btn btn-sm btn-primary toggle-crawler mb-5">Start crawler</button>
                        <h3 class="mb-2">Detected JavaScript libraries</h3>
                        <table class="table detected">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
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