define(function () {
    'use strict';

    /* This directive is created for selecting user selection for category, timing and
     * origin selection of a recipe while submitting */

    return [
        '$ionicModal', '$http', '$ionicGesture', '$ionicLoading', '$filter',
        function ($ionicModal, $http, $ionicGesture, $ionicLoading, $filter) {

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

                    var selectedValArr = ($scope.preSelectedData.selectedValues) ? $scope.preSelectedData.selectedValues[$scope.attrName] : [];
                    if((selectedValArr.length > 0 && $scope.selected.length === 0) || $scope.selected.length > 0) {
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
                            __setEmptySelection();
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
                        var selectedValues = [];

                        $scope.modal.hide();
                        if($scope.selected.length > 0) {
                            selectedValues = __setSelectedValues();
                        } else {
                            __setEmptySelection();
                        }
                        $scope.submitData()($scope.attrName, $scope.selected, selectedValues);
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

                    function __setEmptySelection() {
                        element.find(".selected-values").empty();
                        element.find(".icon").removeClass("ion-edit").addClass("ion-plus-circled");
                    }

                    function __setSelectedValues() {
                        var arr = [], val = "", html = '<ul>';
                        angular.forEach($scope.list, function(obj){
                            if($scope.selected.indexOf(obj._id) >= 0) {
                                val = $filter('capitalize')(obj.value, true);
                                html += '<li id="'+obj._id+'">'+val+'</li>';
                                arr.push(val);
                            }
                        });
                        html += '</ul>';
                        element.find(".icon").removeClass("ion-plus-circled").addClass("ion-edit");
                        element.find(".selected-values").html(html);

                        return arr;
                    }

                    function __loadList(isModalShow) {
                        $ionicLoading.show();
                        $http.get($scope.url).success(function(data){

                            if(selectedValArr.length > 0 && $scope.selected.length === 0) {
                                selectedValArr = selectedValArr.join("\n").toLowerCase().split("\n");
                                angular.forEach(data, function(obj){
                                    if(selectedValArr.indexOf(obj[$scope.attrName]) >= 0) {
                                        $scope.selected.push(obj._id);
                                    }
                                });
                            }

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