(function (global) {
    'use strict';

    var AppUtil = {};

    global.AppUtil = AppUtil;

    AppUtil.isValidEmail = function (value) {
        // TODO need improve code here
        return /^[0-9a-z]+(\.[0-9a-z]+)?@[a-z]+\.[a-z]+$/i.test(value);
    }

    AppUtil.isTime = function (value) {
        // TODO need improve code here
        return /^\d{2}\:\d{2}$/.test(value);
    };

    AppUtil.isTimeIn12HourClock = function (value) {
        // TODO need improve code here
        return /^(1[0-2]|0[1-9]):[0-5]\d\s(am|pm)$/.test(value);
    };

    AppUtil.isValidNumber = function(value) {
        return /^\d*[,.]?\d*([eE][-+]\d+)?$/.test(value);
    };

    AppUtil.isValidJsFileName = function (value) {
        return /^[\w.-]+\.js$/.test(value);
    };

})(typeof module !== 'undefined' ? module.exports : window);
