define(function () {
    'use strict';

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
                    attrName: "@"
                },
                link: function ($scope, element) {

                    element = $(element);
                    $scope.selected = [];

                    $ionicModal.fromTemplateUrl('templates/dashboard/selection.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function(modal) {
                        $scope.modal = modal;
                    });

                    var tapGesture = $ionicGesture.on('tap', handleTap, element);

                    $scope.submit = function() {
                        $scope.modal.hide();
                        if($scope.selected.length > 0) {
                            var html = '<ul>', selectedList = _.filter($scope.list, function(obj){
                                return ($scope.selected.indexOf(obj._id) >= 0);
                            });
                            angular.forEach(selectedList, function(obj){
                                html += '<li id="'+obj._id+'">'+$filter('capitalize')(obj.value, true)+'</li>';
                            });
                            html += '</ul>';
                            element.find(".icon").removeClass("ion-plus-circled").addClass("ion-edit");
                            element.find(".selected-values").html(html);
                        }
                    };

                    $scope.selectItem = function(id, isChecked) {
                        if(+$scope.maxSelection > 1) {
                            if(isChecked) {
                                $scope.selected.push(id);

                                if($scope.selected.length === +$scope.maxSelection) {
                                    angular.forEach($scope.list, function(obj){
                                        if($scope.selected.indexOf(obj._id) < 0) {
                                            obj.isDisabled = true;
                                        }
                                    });
                                }
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
                        $ionicGesture.off(tapGesture, 'tap', handleTap);
                    });

                    function handleTap() {
                        if(!$scope.list) {
                            $ionicLoading.show();
                            $http.get($scope.url).success(function(data){
                                angular.forEach(data, function(obj){
                                    obj.checked = false;
                                    obj.isDisabled = false;
                                    obj.value = obj[$scope.attrName];
                                });
                                $scope.list = data;
                                $ionicLoading.hide();
                                $scope.modal.show();
                            }).error(function(err){
                                $scope.list = [];
                                $ionicLoading.hide();
                                console.log("error in fetching all available origin"+err);
                            });
                        } else {
                            $scope.modal.show();
                        }
                    }
                }
            };
        }
    ];
});