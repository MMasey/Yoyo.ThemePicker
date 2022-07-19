angular
	.module("umbraco")
	.controller(
		"Yoyo.ThemePickerConfigController",
		function (
			$scope,
			localizationService,
			umbRequestHelper,
			editorService,
			angularHelper
		) {
			//NOTE: We need to make each item an object, not just a string because you cannot 2-way bind to a primitive.
			$scope.selectedTheme = {
				label: "",
				image: null,
			};

			$scope.hasError = false;
			$scope.focusOnNew = false;
			$scope.editingIndex = -1;

			if (!angular.isArray($scope.model.value)) {
				//now make the editor model the array
				$scope.model.value = [];
			}

			$scope.remove = function (item, evt) {
				evt.preventDefault();

				$scope.model.value = _.reject($scope.model.value, function (x) {
					return x.value === item.value;
				});
			};

			$scope.add = function (evt) {
				if ($scope.selectedTheme) {
					if (!_.contains($scope.model.value, $scope.selectedTheme)) {
						$scope.model.value.push({
							value: $scope.selectedTheme,
						});
						$scope.selectedTheme = {
							label: "",
							image: null,
						};

						$scope.hasError = false;
						$scope.focusOnNew = true;
						return;
					}
				}

				//there was an error, do the highlight (will be set back by the directive)
				$scope.hasError = true;
			};

			$scope.createNew = function (event) {
				if (event.keyCode === 13) {
					$scope.add(event);
				}
			};

			// The following handles the media selection
			$scope.selectImage = function (editingIndex = -1) {
				localizationService
					.localize("blockEditor_headlineAddCustomView")
					.then(function (localizedTitle) {
						let allowedFileExtensions = [
							"jpg",
							"jpeg",
							"png",
							"svg",
							"webp",
							"gif",
						];

						const filePicker = {
							title: localizedTitle,
							section: "settings",
							treeAlias: "files",
							entityType: "file",
							isDialog: true,
							filterCssClass: "not-allowed",
							filter: (i) => {
								let ext = i.name
									.substr(i.name.lastIndexOf(".") + 1)
									.toLowerCase();
								return (
									allowedFileExtensions.includes(ext) ===
									false
								);
							},
							select: function (node) {
								const filepath = decodeURIComponent(
									node.id.replace(/\+/g, " ")
								);

								if (editingIndex > -1) {
									$scope.updateImage(
										editingIndex,
										"~/" + filepath
									);
								} else {
									$scope.addImage("~/" + filepath);
								}

								editorService.close();
							},
							close: function () {
								$scope.editingIndex = -1;

								editorService.close();
							},
						};
						editorService.treePicker(filePicker);
					});
			};

			$scope.removeImage = function () {
				$scope.selectedTheme.image = null;
				syncModelValue();
			};

			$scope.addImage = function (filepath) {
				$scope.selectedTheme.image = getImageFilepath(filepath);
				syncModelValue();
			};

			$scope.updateImage = function (index, filepath) {
				$scope.model.value[index].value.image =
					getImageFilepath(filepath);
				syncModelValue();
			};

			function getImageFilepath(filepath) {
				if (filepath === null || filepath === "") {
					return "";
				}
				var path =
					umbRequestHelper.convertVirtualToAbsolutePath(filepath);
				if (path.toLowerCase().endsWith(".svg") === false) {
					path += "?upscale=false&width=200";
				}

				return path.replace("wwwroot/", "");
			}

			function syncModelValue() {
				angularHelper.getCurrentForm($scope).$setDirty();
			}
		}
	);
