class Struct {
    constructor(res, dom, data, events, dataurl, interval, errorevents, token) {
        if (typeof(res) == 'object' && !(res instanceof jQuery)) {
            this.res = res.el;
            this.dom = res.tmpl;
            if (res.events == undefined) {
                res.events = function() {
                    return false;
                }
            }
            this.events = res.events;
            if (typeof(res.data) == 'string') {
                this.data = {};
                this.dataurl = res.data;
            } else {
                this.data = res.data;
                this.dataurl = res.dataurl;
            }
            this.interval = res.interval;
            this.dataloaded = false;
            this.domloaded = false;
            this.html = '';
            this.errorevents = res.errorevents;
            this.token = res.token;
            this.init();
        } else {
            this.res = res;
            this.dom = dom;
            if (events == undefined) {
                events = function() {
                    return false;
                }
            }
            this.events = events;
            if (typeof(data) == 'string') {
                this.data = {};
                this.dataurl = data;
            } else {
                this.data = data;
                this.dataurl = dataurl;
            }
            this.data = data;
            this.dataurl = dataurl;
            this.interval = interval;
            this.dataloaded = false;
            this.domloaded = false;
            this.html = '';
            this.errorevents = errorevents;
            this.token = token;
            this.init();
        }
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

        if (self.res instanceof jQuery) {
            self.el = self.res;
        } else {
            self.el = $(self.res);
        }

        if (self.dataloaded && self.domloaded) {
            if (Array.isArray(self.data)) {
                self.el.html('');
                for (let one in self.data) {
                    self.el.append(self.setData(self.data[one], self.html));
                }
            } else {
                self.el.html(self.setData(self.data, self.html));
            }
            $(window).ready(function() {
                self.events();
            });
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
        if (self.token != undefined) {
            xmlhttp.setRequestHeader("Authorization", "Bearer " + self.token)
        }
        xmlhttp.send();
    }
}
