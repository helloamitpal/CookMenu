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
                    preSelectedData: "=",
                    submitData: "&"
                },
                link: function ($scope, element) {
                    element = $(element);
                    $scope.selected = (($scope.preSelectedData && $scope.preSelectedData[$scope.attrName]) ? $scope.preSelectedData[$scope.attrName] : []);

                    if($scope.selected.length > 0) {
                        __loadList();
                    }

                    $ionicModal.fromTemplateUrl('templates/dashboard/editor.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function(modal) {
                        $scope.modal = modal;
                    });

                    $scope.deleteText = function(evt) {
                        evt.preventDefault();
                        evt.stopImmediatePropagation();

                        var $ele = $(evt.currentTarget).parent(), eleIndex = $ele.index();
                        $ele.remove();
                        $scope.selected.splice(eleIndex, 1);
                    }

                    var tapGesture = $ionicGesture.on('tap', __handleTap, element);

                    $scope.$on('$destroy', function () {
                        $ionicGesture.off(tapGesture, 'tap', __handleTap);
                    });

                    $scope.$watch(function() {
                        return $scope.preSelectedData;
                    }, function(newVal, oldVal){
                        if(newVal && oldVal != newVal) {
                            $scope.selected = [];
                            __setEmptySelection();
                        }
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
                    };

                    $scope.submit = function() {
                        $scope.modal.hide();
                        if($scope.selected.length > 0) {
                            __loadList();
                        } else {
                            __setEmptySelection();
                        }
                        $scope.submitData()($scope.attrName, $scope.selected);
                    };

                    function __setEmptySelection() {
                        element.find(".selected-values").empty();
                        element.find(".icon").removeClass("ion-edit").addClass("ion-plus-circled");
                    }

                    function __handleTap() {
                        $scope.modal.show();
                    }

                    function __loadList() {
                        var html = '<ul>';
                        angular.forEach($scope.selected, function(arrEle){
                            html += '<li>'+arrEle+'</li>';
                        });
                        html += '</ul>';
                        element.find(".icon").removeClass("ion-plus-circled").addClass("ion-edit");
                        element.find(".selected-values").html(html);
                    }
                }
            };
        }
    ];
});