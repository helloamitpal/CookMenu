define(function(require){

    'use strict';

    // this filter will capitalize first letter of each word
    function CapitalizeFilter(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }

    return function() {
        return CapitalizeFilter;
    };
});