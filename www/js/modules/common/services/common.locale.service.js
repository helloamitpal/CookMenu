define(['angular'], function (angular) {
    "use strict";

    return ['CONFIG', '$translateProvider', function providerFn(CONFIG, $translateProvider) {
        
        var provider = this, defaultLocale = CONFIG.LOCALE.AVAILABLE[0];
        
        provider.$get = ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
            return {                
                applySelected: function(item) {                    
                    var localeItem = ((item) ? item : defaultLocale);
                    CONFIG.LOCALE.SELECTED = localeItem;
                    $translate.use(localeItem.key);
                },
                setDefault: function() {
                    CONFIG.LOCALE.SELECTED = defaultLocale;
                    $translate.use(defaultLocale.key);
                },
                getLocaleList: function() {
                    return CONFIG.LOCALE.AVAILABLE;
                },
                getSelectedLocale: function() {
                    return CONFIG.LOCALE.SELECTED;
                },
                loadLocale: function(moduleName) {
                    $translatePartialLoader.addPart(moduleName);
                    $translate.refresh();                       
                }
            };
        }];
        
        // configurable function to be called from module config
        provider.configure = function() {
            $translateProvider.useSanitizeValueStrategy('sanitize');
            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: 'js/locales/{part}/{lang}.json'
            });
            $translateProvider.preferredLanguage('en');   
        }
        
    }];
});