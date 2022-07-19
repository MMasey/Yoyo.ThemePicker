angular
	.module("umbraco")
	.controller("Yoyo.ThemePicker", function ($scope, entityResource) {
		if (
			$scope.model.value === undefined ||
			$scope.model.value === null ||
			$scope.model.value === ""
		) {
			$scope.model.value = $scope.model.config.themes[0].label;
		}

		$scope.themes = $scope.model.config.themes;

		$scope.selectTheme = function (theme) {
			$scope.model.value = theme.label;
		};
	});
