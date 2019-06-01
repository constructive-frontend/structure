let demo1 = new Struct({
    el: '#res01',
    tmpl: `<div class="test2">{{word1}} {{word2}}</div>`,
    data: {
        "word1": 'Hello',
        "word2": 'World!!!'
    },
}).render();

let demo2 = new Struct({
    el: '#res02',
    tmpl: `<div class="demo2">{{word1}} {{word2}}</div>`,
    data: [{
            "word1": 'Hello',
            "word2": 'World!!!'
        },
        {
            "word1": 'Hello',
            "word2": 'World!!!'
        },
        {
            "word1": 'Hello',
            "word2": 'World!!!'
        },
    ],
}).render();

let demo3 = new Struct({
    el: '#res03',
    tmpl: 'demos/demo3',
    data: {
        "id": '12345',
        "count": 34
    }
}).render();

let demo4 = new Struct({
    el: '#res04',
    tmpl: 'demos/demo3',
    data: '/json/demo4.json'
}).render();


let demo5 = new Struct({
    el: '#res05',
    tmpl: `
        <div class="demo5">
            Count: <span id="countforchange">{{count}}</span>
            <button id="demo5btn" type="button">Push for +1</button>
        </div>
    `,
    data: {
        "count": 0,
    },
    events: function() {
        $('#demo5btn').bind('click', function() {
            var c = Number($('#countforchange').html());
            $('#countforchange').html(c + 1);
            return false;
        });
    }
}).render();

let demo6 = new Struct({
    el: '#res06',
    tmpl: `
        <div class="demo6">
            Count: {{count}}
            <button type="button">Push for +1</button>
        </div>
    `,
    data: {
        "count": 0,
    },
    events: function() {
        demo6.el.find('button').bind('click', function() {
            var c = demo6.data.count;
            demo6.data.count = c + 1;
            demo6.rerender();
            return false;
        });
    }
}).render();

let demo7 = new Struct({
    el: '#res07',
    tmpl: `
        <div class="demo7item">
            <p>{{title}}</p>
            <p class="info"></p>
        </div>
    `,
    data: [{
            "title": "Item number one",
            "info": {
                "stars": 3,
                "likes": 2,
            }
        },
        {
            "title": "Item number two",
            "info": {
                "stars": 5,
                "likes": 12,
            }
        },
        {
            "title": "Item number three",
            "info": {
                "stars": 1,
                "likes": 0,
            }
        },
    ],
    events: function() {
        demo7.el.find('.info').each(function(index) {
            var t = new Struct({
                el: $(this),
                tmpl: `<div>Stars: {{stars}}  Likes: {{likes}}</div>`,
                data: demo7.data[index].info
            }).render();
        });
    }
}).render();

//form demo (dev)


let demo_forms = new Struct({
    el: '#demo_forms_res',
    tmpl: 'demos/demo_forms',
    data: [{
        el_name: "",
        el_value: "",
        el_descr: "",
        city: "",
    }, ],
    events: function() {
        let form1 = new Form($('#demoform1'));
    }
}).render();
