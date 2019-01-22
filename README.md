# hatajs
js helper for easy work with DOM generation on one-page frontend


Instalation
==========

add jQuery to project

add line to package.json

```
  "devDependencies": {
    ...
    "hatajs": "github:greeschenko/hatajs",
    ...
  }
```

and in project root execute
```
    npm install
```

Usage
==========

index.html
```
    ...
    <body>
        <div id="res"></>
    </body>
    ...
```

/tmpls/test.html (it is view or template)
```
    <h1>{{greeting}} {{name}}</h1>
```

/data/test.json (this file simulate request to backend)
```
{
    "greeting":"Hello",
    "name":"World!"
}
```

I use ES6 syntax with babel

```
let test = new Hata(
    '#res',                             // result render element selector
    'tmpls/test',                       // view file without ".html"
    {},                                 // data object if need add data from code
    function(){
        console.lot("test is work");    // hendle function execute after render
    },
    '/data/test.json',                  // request to backend if need
    1000                                // interval timeout for rerender and reload data if need
).render();                             // you can render element now or use test.render() in code
```

This code render in #res element every 1 sec.

```
    <h1>Hello World!</h1>
```

if change /data/test.json to this

```
[
    {
        "greeting":"Hello",
        "name":"World!"
    },
    {
        "greeting":"Hello",
        "name":"World!"
    },
    {
        "greeting":"Hello",
        "name":"World!"
    }
]
```

code render in #res element evety 1 sec.
```
    <h1>Hello World!</h1>
    <h1>Hello World!</h1>
    <h1>Hello World!</h1>
```
