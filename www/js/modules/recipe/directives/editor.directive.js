define(function () {
    'use strict';

    return [
        '$ionicModal', '$ionicGesture', 'CONFIG',
        function ($ionicModal, $ionicGesture, CONFIG) {

            var template =
                ['<div class="selection-container">',
                    '<i class="icon ion-plus-circled"></i>',
                    '<div class="placeholder-text">{{placeholder}}</div>',
                    '<div class="selected-values"></div>'
                ].join('');

            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                template: template,
                scope: {
                    maxlength: "@",
                    placeholder: "@",
                    modalHeader: "@",
                    maxAddition: "@",
                    attrName: "@",
                    icon: "@",
                    submitData: "&"
                },
                link: function ($scope, element) {
                    element = $(element);
                    $scope.selected = [];

                    $ionicModal.fromTemplateUrl('templates/dashboard/editor.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function(modal) {
                        $scope.modal = modal;
                    });

                    var tapGesture = $ionicGesture.on('tap', handleTap, element);

                    $scope.$on('$destroy', function () {
                        $ionicGesture.off(tapGesture, 'tap', handleTap);
                    });

                    $scope.addText = function(evt) {
                        var $input = (+$scope.maxlength <= 100) ? $("#input") : $("#multiLineInput");
                        if($input.val()) {
                            if(!evt) {
                                $scope.selected.push($input.val());
                                $input.val("");
                            } else if(evt.keyCode === CONFIG.KEYCODE.ENTER) {
                                $scope.selected.push($input.val());
                                $input.val("");
                            }
                        }
                    }

                    $scope.submit = function() {
                        $scope.modal.hide();
                        if($scope.selected.length > 0) {
                            var html = '<ul>';
                            angular.forEach($scope.selected, function(arrEle){
                                html += '<li>'+arrEle+'</li>';
                            });
                            html += '</ul>';
                            element.find(".icon").removeClass("ion-plus-circled").addClass("ion-edit");
                            element.find(".selected-values").html(html);
                        }
                        $scope.submitData()($scope.attrName, $scope.selected);
                    };

                    function handleTap() {
                        $scope.modal.show();
                    }
                }
            };
        }
    ];
});