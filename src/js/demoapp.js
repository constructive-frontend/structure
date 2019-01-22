let testuseelts = new Struct(
    '#res',
    //'tmpls/test',
    `
    <div class="test_item">{{test}}<div class="list"></div></div>
    `, [{
        "test": 1111
    }, {
        "test": "dlsfdlsjf"
    }],
    function() {
        this.el.find('.list').each(function(index) {
            new Struct(
            $(this),
            //'tmpls/test',
            `
            <div class="list_item" style="padding-left:1em;">{{test}}</div>
            `, [{
            "test": 1111
            }, {
            "test": "dlsfdlsjf"
            }]
            ).render();
        });
    }
).render();
