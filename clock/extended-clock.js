/**
 * Created by User Notebook on 22.11.2017.
 */
    "use strict";
    // Класс "расширенные часы"
    /*
    function extend(Child, Parent) {
    "use strict";
        Child.prototype = inherit(Parent.prototype);
        Child.prototype.constructor = Child;
        Child.parent = Parent.prototype;
    }

    function inherit(proto) {
        "use strict";
        function F() {}
        F.prototype = proto;
        return new F();
    }

        function ExtendedClock(options) {
            "use strict";
            Clock.apply(this, arguments);
            this._precision = +options.precision || 1000;
    }

    ExtendedClock.prototype = Object.create(Clock.prototype);
    ExtendedClock.prototype.constructor = ExtendedClock;

    ExtendedClock.prototype.start = function () {
        "use strict";
        this._render();
        var self = this;
        this._timer = setInterval(function () {
            self._render();
        }, this._precision);

    };
    */ //(-)
    /*
    function ExtendedClock(options) {

        Clock.apply(this, arguments);
        this._precision = +options._precision || 1000;
    }

    ExtendedClock.prototype = Object.create(Clock.prototype);
    ExtendedClock.prototype.constructor = ExtendedClock;

    ExtendedClock.prototype.start = function () {
        this._render();
        var self = this;
        setInterval(function () {
            self._render();
        }, this._precision);
    };
    */ //(+-)
    /*
    function ExtendedClock(options) {
        Clock.apply(this, arguments);
        this._precision = +options.precision || 1000;
    }

    ExtendedClock.prototype = Object.create(Clock.prototype);
    ExtendedClock.prototype.constructor = ExtendedClock;

    ExtendedClock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval(function () {
            self._render();
        }, this._precision);
    };
    */ //(+-)
    /*
    function ExtendedClock(options) {
        Clock.apply(this, arguments);
        this._precision = +options.precision || 1000;
    }

    ExtendedClock.prototype = Object.create(Clock.prototype);
    ExtendedClock.prototype.constructor = ExtendedClock;

    ExtendedClock.prototype.start = function () {

        this._render();
        var self = this;
        this._timer = setInterval(function () {
            self._render();
        }, this._precision);
    };
    */ //(+)
    /*
    function ExtendedClock(options) {
        Clock.apply(this, arguments);
        this._precision = +options.precision || 1000;
    }

    ExtendedClock.prototype = Object.create(Clock.prototype);
    ExtendedClock.prototype.constructor = ExtendedClock;

    ExtendedClock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval( function () {
            self._render();
        }, this._precision );
    };
    */ //(+)
    /*
    function ExtendedClock(options) {
        this._template = options.template;
        this._precision = +options.precision || 1000;
    }

    ExtendedClock.prototype = Object.create(Clock.prototype);
    ExtendedClock.prototype.constructor = ExtendedClock;

    ExtendedClock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval( function () {
            self._render();
        }, this._precision);
    };
    */ //(+)
    /*
    function ExtendedClock(options) {
        Clock.apply(this, arguments);
        this._precision = +options.precision || 1000;
    }

    ExtendedClock.prototype = Object.create(Clock.prototype);
    ExtendedClock.prototype.constructor = ExtendedClock;

    ExtendedClock.prototype.start = function () {
        var self = this;
        this._render();
        this._timer = setInterval( function () {
            self._render();
        }, this._precision );
    };
    */ //(+)
    /*
    function ExtendedClock(options) {
        Clock.apply(this, arguments);
        this._precision = +options.precision || 1000;
    }

    ExtendedClock.prototype = Object.create(Clock.prototype);
    ExtendedClock.prototype.constructor = ExtendedClock;

    ExtendedClock.prototype.start = function () {
        this._render();
        var self = this;
        this._timer = setInterval( function () {
            self._render();
        }, this._precision );
    };
    */ //(+)