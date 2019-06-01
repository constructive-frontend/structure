class Form {
    constructor(form) {
        this.el = form;
        this.action = '';
        this.method = 'GET';
        if (typeof this.el.attr('action') !== typeof undefined && this.el.attr('action') !== false) {
            this.action = this.el.attr('action');
        }
        if (typeof this.el.attr('method') !== typeof undefined && this.el.attr('method') !== false) {
            this.method = this.el.attr('method');
        }
        this.init();
    }
    init() {
        let self = this;


        self.el.bind('submit', function() {
            self.send();
            return false;
        });

        self.el.find(':input').bind('change, focusout', function() {
            let el = $(this);
            self.send(el);
            return false;
        });
    }
    send(el) {
        let self = this;
        $.ajax({
            url: self.action,
            type: self.method,
            dataType: 'json',
            data: self.el.serialize(),
            //complete: function(jqXHR, textStatus) {
            // callback
            //},
            success: function(data, textStatus, jqXHR) {
                if (data.errors.length > 0) {

                    self.el.find(':input').each(function(index) {
                        let input = $(this);
                        let n = input.attr('name');
                        let haserr = 0;

                        if (typeof(el) === "undefined" || el.attr('name') == n) {
                            for (var err in data.errors) {
                                var one = data.errors[err];
                                if (n == one.item) {
                                    input.removeClass('success').addClass('error');
                                    if (input.prev().prop('tagName') == 'LABEL') {
                                        input.prev().removeClass('success').addClass('error');
                                    }
                                    if (input.next().hasClass('errors')) {
                                        input.next().html(one.msg);
                                    } else {
                                        input.after("<div class='errors'>" + one.msg + "</div>");
                                    }
                                    haserr = 1;
                                }
                            }

                            if (haserr == 0) {
                                input.removeClass('error').addClass('success');
                                if (input.prev().prop('tagName') == 'LABEL') {
                                    input.prev().removeClass('error').addClass('success');
                                }
                                if (input.next().hasClass('errors')) {
                                    input.next().remove();
                                }
                            }
                        }
                    });
                }
            }
            //error: function(jqXHR, textStatus, errorThrown) {
            //console.log([jqXHR, textStatus, errorThrown]);
            //}
        });
    }
}
