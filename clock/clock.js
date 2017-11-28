/**
 * Created by User Notebook on 22.11.2017.
 */
    "use strict";
    // Класс часы
    /*
function Clock(options) {
    "use strict";
    this.template = options.template;
}


Clock.prototype._render = function () {
    "use strict";
    var date = new Date();

    var hours = date.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }

    var min = date.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }

    var sec = date.getSeconds();
    if (sec < 10) {
        sec = '0' + sec;
    }

    var output = this.template.replace('h', hours).replace('m', min).replace('s', sec);

    console.log(output);
};

Clock.prototype.stop = function () {
    "use strict";
    clearInterval(this._timer);
};

Clock.prototype.start = function () {
    "use strict";
    this._render();
    var self = this;
    this._timer = setInterval(function () {
        self._render();
    }, 1000);
};
    */ //(+-)
    /*
    function Clock(options) {
        this._template = options.template;
    }

    Clock.prototype._render = function () {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }

        var min = date.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }

        var sec = date.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }

        var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

        console.log(output);
    };

    Clock.prototype.stop = function () {
        clearInterval(this._timer);
    };

    Clock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval(function () {
            self._render();
        }, 1000);
    };
     */ //(+)
    /*
    function Clock(options) {
        this._template = options.template;
    }

    Clock.prototype._render = function () {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }

        var min = date.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }

        var sec = date.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }

        var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

        console.log(output);
    };

    Clock.prototype.stop = function () {
        clearInterval(this._timer);
    };

    Clock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval(function () {
            self._render();
        }, 1000);
    };
    */ //(+)
    /*
    function Clock(options) {
        this._temlate = options.template;
    }

    Clock.prototype._render = function () {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }

        var min = date.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }

        var sec = date.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }

        var output = this._temlate.replace('h', hours).replace('m', min).replace('s', sec);

        console.log(output);
    };

    Clock.prototype.stop = function () {
        clearInterval(this._timer);
    };

    Clock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval(function () {
            self._render();
        }, 1000);
    };

    */ //(+)
    /*
    function Clock(options) {
        this._template = options.template;
    }

    Clock.prototype._render = function () {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }

        var min = date.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }

        var sec = date.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }

        var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

        console.log(output);
    };

    Clock.prototype.stop = function () {
        clearInterval(this._timer);
    };

    Clock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval( function () {
            self._render();
        }, 1000);

    };
    */ //(+)
    /*
    function Clock(options) {
        this._template = options.template;
    }

    Clock.prototype._render = function () {
        var date = new Date();
        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        var min = date.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }
        var sec = date.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }
        var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);
        console.log(output);
    };


    Clock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval( function () {
            self._render();
        }, 1000);
    };

    Clock.prototype.stop = function () {
        clearInterval(this._timer);
    };
    */ //(+)
    /*
    function Clock(options) {
        this._template = options.template;
    }

    Clock.prototype._render = function () {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }

        var min = date.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }

        var sec = date.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }

        var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

        console.log(output);
    };


    Clock.prototype.stop = function () {
        clearInterval(this._timer);
    };

    Clock.prototype.start = function () {
        var self = this;
        this._render();
        this._timer = setInterval( function () {
                self._render();
        }, 1000);
    };

    */ //(+)
    /*
    function Clock(options) {
        this._template = options.template;
    }

    Clock.prototype._render = function () {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }

        var min = date.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }

        var sec = date.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }

        var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);
        console.log(output);
    };

    Clock.prototype.stop = function () {
        clearInterval(this._timer);
    };

    Clock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval( function () {
            self._render();
        }, 1000);
    };
    */ //(+)
    /*
    function Clock(options) {
        this._template = options.template;
    }

    Clock.prototype._render = function () {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }

        var min = date.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }

        var sec = date.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }

        var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

        console.log(output);
    };

    Clock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval( function () {
            self._render();
        }, 1000);
    };

    Clock.prototype.stop = function () {
        clearInterval(this._timer);
    };
    */ //(+)
    /*
    function Clock(options) {
        this._template = options.template;
    }

    Clock.prototype._render = function () {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }

        var min = date.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }

        var sec = date.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }

        var output = this._template
                            .replace('h', hours)
                            .replace('m', min)
                            .replace('s', sec);

        console.log(output);
    };

    Clock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval( function () {
            self._render();
        }, 1000);
    };

    Clock.prototype.stop = function () {
        clearInterval(this._timer);
    };
    */ //(+)