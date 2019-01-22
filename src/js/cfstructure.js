class Struct {
    constructor(res, dom, data, events, dataurl, interval, errorevents) {
        this.res = res;
        if (this.res instanceof jQuery) {
            this.el = res;
        } else {
            this.el = $(this.res);
        }
        this.res = res;
        this.dom = dom;
        this.data = data;
        if (events == undefined) {
            events = function() {
                return false;
            }
        }
        this.events = events;
        this.dataurl = dataurl;
        this.interval = interval;
        this.dataloaded = false;
        this.domloaded = false;
        this.html = '';
        this.errorevents = errorevents;
        this.init();
    }
    init() {
        let self = this;
        self.loadTmpl();
        self.loadData();
        if (self.interval != undefined) {
            setInterval(function() {
                self.loadData();
                self.render();
            }, self.interval);
        }
    }
    render() {
        let self = this;

        if (self.dataloaded && self.domloaded) {
            if (Array.isArray(self.data)) {
                self.el.html('');
                for (let one in self.data) {
                    self.el.append(self.setData(self.data[one], self.html));
                }
            } else {
                self.el.html(self.setData(self.data, self.html));
            }
            self.events();
        } else {
            setTimeout(function() {
                self.render();
            }, 100);
        }

        return self;
    }
    rerender() {
        this.dataloaded = false;
        this.domloaded = false;
        this.loadTmpl();
        this.loadData();
        this.render();
    }
    setData(obj, html) {
        for (var i in obj) {
            html = html.replace(new RegExp('{{' + i + '}}', 'g'), obj[i]);
        }
        return html;
    }
    loadTmpl() {
        let self = this;
        if (self.dom !== undefined) {
            if (self.dom.indexOf('{{') !== -1 || self.dom.indexOf('<') !== -1) {
                self.domloaded = true;
                self.html = self.dom;
            } else {
                self.getData(
                    '/' + self.dom + '.html',
                    function(xmlhttp) {
                        self.html = xmlhttp.responseText;
                        self.domloaded = true;
                    },
                    function() {
                        self.domloaded = true;
                        self.html = self.dom;
                    }
                );
            }
        } else {
            self.domloaded = true;
            self.html = self.dom;
        }
    }
    //loadTmpl() {
    //let self = this;
    //self.getData(
    //'/' + self.dom + '.html',
    //function(xmlhttp) {
    //self.html = xmlhttp.responseText;
    //self.domloaded = true;
    //},
    //function() {
    //self.domloaded = true;
    //self.html = self.dom;
    //}
    //);
    //}
    loadData() {
        let self = this;
        if (this.dataurl != undefined) {
            self.getData(
                this.dataurl,
                function(xmlhttp) {
                    self.data = JSON.parse(xmlhttp.responseText);
                    self.dataloaded = true;
                },
                self.errorevents
            );
        } else {
            self.dataloaded = true;
        }
    }
    getData(url, handler, errhandler) {
        let self = this;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    handler(xmlhttp);
                } else {
                    if (errhandler != undefined) {
                        errhandler();
                    }
                }
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}
