define(function () {
    'use strict';

    return [
        '$ionicModal', '$http', '$ionicGesture', '$ionicLoading', '$filter', 'appStore',
        function ($ionicModal, $http, $ionicGesture, $ionicLoading, $filter, appStore) {

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
                    url: "=",
                    placeholder: "@",
                    modalHeader: "@",
                    maxSelection: "@",
                    attrName: "@",
                    preSelectedData: "=",
                    submitData: "&"
                },
                link: function ($scope, element) {

                    element = $(element);
                    $scope.selected = (($scope.preSelectedData && $scope.preSelectedData[$scope.attrName]) ? $scope.preSelectedData[$scope.attrName] : []);

                    if($scope.selected.length > 0) {
                        __loadList();
                    }

                    if(+$scope.maxSelection === 1 && $scope.selected.length === 0) {
                        $scope.singleSelection = null;
                    }

                    $scope.$watch(function() {
                        return $scope.preSelectedData;
                    }, function(newVal, oldVal){
                        if(newVal && oldVal != newVal) {
                            $scope.selected = [];
                            element.find(".selected-values").empty();
                            element.find(".icon").removeClass("ion-edit").addClass("ion-plus-circled");
                        }
                    });

                    $ionicModal.fromTemplateUrl('templates/dashboard/selection.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function(modal) {
                        $scope.modal = modal;
                    });

                    var tapGesture = $ionicGesture.on('tap', __handleTap, element);

                    $scope.submit = function() {
                        $scope.modal.hide();
                        if($scope.selected.length > 0) {
                            __setSelectedValues();
                        }
                        $scope.submitData()($scope.attrName, $scope.selected);
                    };

                    $scope.selectItem = function(item) {
                        var id = item._id, isChecked = item.checked;

                        if(+$scope.maxSelection > 1) {
                            if(isChecked) {
                                $scope.selected.push(id);
                                __disabledOthers();
                            } else {
                                var _index = $scope.selected.indexOf(id);
                                $scope.selected.splice(_index, 1);
                                angular.forEach($scope.list, function(obj){
                                    obj.isDisabled = false;
                                });
                            }
                        } else {
                            $scope.selected.splice(0, $scope.selected.length);
                            if(isChecked) {
                                $scope.selected.push(id);
                            }
                        }
                    };

                    $scope.$on('$destroy', function () {
                        $ionicGesture.off(tapGesture, 'tap', __handleTap);
                    });

                    function __disabledOthers() {
                        if($scope.selected.length === +$scope.maxSelection) {
                            angular.forEach($scope.list, function(obj){
                                if($scope.selected.indexOf(obj._id) < 0) {
                                    obj.isDisabled = true;
                                }
                            });
                        }
                    }

                    function __setSelectedValues() {
                        var html = '<ul>';
                        angular.forEach($scope.list, function(obj){
                            if($scope.selected.indexOf(obj._id) >= 0) {
                                html += '<li id="'+obj._id+'">'+$filter('capitalize')(obj.value, true)+'</li>';
                            }
                        });
                        html += '</ul>';
                        element.find(".icon").removeClass("ion-plus-circled").addClass("ion-edit");
                        element.find(".selected-values").html(html);
                    }

                    function __loadList(isModalShow) {
                        $ionicLoading.show();
                        $http.get($scope.url).success(function(data){
                            angular.forEach(data, function(obj){

                                obj.isDisabled = false;
                                obj.value = obj[$scope.attrName];

                                if($scope.selected && $scope.selected.length > 0 && $scope.selected.indexOf(obj._id) >= 0) {
                                    obj.checked = true;
                                    if(+$scope.maxSelection === 1) {
                                        $scope.singleSelection = obj.value;
                                    }
                                } else {
                                    obj.checked = false;
                                }
                            });
                            $scope.list = data;

                            $ionicLoading.hide();

                            if($scope.selected && $scope.selected.length > 0) {
                                __setSelectedValues();
                                __disabledOthers();
                            }

                            if(isModalShow) {
                                $scope.modal.show();
                            }
                        }).error(function(err){
                            $scope.list = [];
                            $ionicLoading.hide();
                            console.log("error in fetching all available origin"+err);
                        });
                    }

                    function __handleTap() {
                        if(!$scope.list) {
                            __loadList(true);
                        } else {
                            $scope.modal.show();
                        }
                    }
                }
            };
        }
    ];
});