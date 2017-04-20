	'use strict';

	angular.module('tableApp', ['ui.bootstrap']).
			component('tableApp', {
				templateUrl: "js/templates/table.html",
				controller: tableController
			});

	function tableController($scope, $http) {

		$scope.chooseData = function (value) {
			$http.get('js/json/' + value + '.json' ).
			then(function (response){
				response.data.shift();
				$scope.small = response.data;
				$scope.totalItems = $scope.small.length;
				$scope.numOfPages = Math.ceil($scope.totalItems / $scope.itemPerPage);
				$scope.$watch('currentPage', function () {
					setPagingData($scope.currentPage);
				});

				function setPagingData(page) {
					$scope.currentPage = page;
					let pagedData = $scope.small.slice((page - 1) * $scope.itemPerPage, page * $scope.itemPerPage);
					$scope.products = pagedData;
				}
			});
			$scope.display = true;
		};
		$scope.currentPage = 1;
		$scope.itemPerPage = 15;
		var addTable = [];

		$scope.selected = function (value) {
			addTable.push(value);
		}

		$scope.additionalTable = addTable;
	};

