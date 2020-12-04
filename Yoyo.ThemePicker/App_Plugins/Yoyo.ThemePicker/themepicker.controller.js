

angular.module("umbraco").controller("Yoyo.ThemePicker",
	function ($scope, entityResource) {
		if ($scope.model.value === undefined || $scope.model.value === null || $scope.model.value === "") {
			$scope.model.value = $scope.model.config.themes[0].label;
		}

		$scope.themes = $scope.model.config.themes;

		$scope.selectTheme = function(theme) {
			$scope.model.value = theme.label;
		}

		if ($scope.themes !== null && $scope.themes.length > 0) {

			var imageIds = $scope.themes.map(t => t.value.image[0].udi) || [];

			if (imageIds.length === $scope.themes.length) {

				entityResource.getByIds(imageIds, "Media").then(function (ent) {
					for (var i = 0; i < ent.length; i++) {
						var imageModel = ent[i];

						$scope.themes[i].thumbnail = imageModel.metaData.MediaPath + "?mode=crop&width=200";
					}
				});
			} else {
				console.warn("The number of them images doesn't match up to the number of available theme options")
			}
		}

	});