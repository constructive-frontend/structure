class List extends Struct {
    constructor(opts) {
        super(opts);
        console.log(this.el);
        if (opts.searchform != undefined) {
            this.searchform = opts.searchform;
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
            if (self.data.errors === null || self.data.errors.length == 0) {
                self.data = self.data.data;
                if (Array.isArray(self.data) && self.data.length > 0) {
                    self.el.html('');
                    for (let one in self.data) {
                        self.el.append(self.setData(self.data[one], self.html));
                    }
                } else if (Array.isArray(self.data) && self.data.length == 0) {
                    self.el.html(`
                        <div class="info">
                            No data found
                        </div>
                    `);
                } else {
                    self.el.html(`
                        <div class="errors">
                            data:
                            wrong structure
                        </div>
                    `);
                }
                self.staticurl = self.dataurl;
                self.addSearchForm();
                $(window).ready(function() {
                    self.events();
                });
            } else {
                for (let i in self.data.errors) {
                    self.el.append(`
                        <div class="errors">
                            ${self.data.errors[i].item}:
                            ${self.data.errors[i].msg}
                        </div>
                    `);
                }
            }
        } else {
            setTimeout(function() {
                self.render();
            }, 100);
        }

        return self;
    }
    addSearchForm() {
        let self = this;

        if (!self.el.prev().hasClass('cfsearchform')) {
            $('<div/>', {
                class: 'cfsearchform',
            }).insertBefore(self.el);

            self.filters = new Struct({
                el: self.el.prev(),
                tmpl: self.searchform,
                events: function() {
                    self.form = self.filters.el.find('form');
                    console.log(self.form);
                    self.form.find(':input').bind('change, keyup', function() {
                        if ($(this).val().length > 2) {
                            self.dataurl = self.staticurl + '?' + self.form.serialize();
                            self.rerender();
                        }
                        return false;
                    });
                }
            }).render();
        }
    }
}
