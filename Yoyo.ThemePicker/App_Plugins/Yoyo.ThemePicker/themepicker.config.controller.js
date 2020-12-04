angular.module("umbraco").controller("Yoyo.ThemeConfigController",
	function ($scope, entityResource, iconHelper, editorService, angularHelper) {

		//NOTE: We need to make each item an object, not just a string because you cannot 2-way bind to a primitive.

		$scope.newItem = {
			label: "",
			image: []
		};
		$scope.hasError = false;
		$scope.focusOnNew = false;

		$scope.allowRemove = true;
		$scope.allowEdit = true;
		$scope.sortable = false;

		var dialogOptions = {
			multiPicker: false,
			entityType: "Media",
			section: "media",
			treeAlias: "media",
			idType: "udi"
		};

		if (!angular.isArray($scope.model.value)) {

			//make an array from the dictionary
			var items = [];
			for (var i in $scope.model.value) {
				items.push({
					value: $scope.model.value[i].value,
					sortOrder: $scope.model.value[i].sortOrder,
					id: i
				});
			}

			//ensure the items are sorted by the provided sort order
			items.sort(function (a, b) { return (a.sortOrder > b.sortOrder) ? 1 : ((b.sortOrder > a.sortOrder) ? -1 : 0); });

			//now make the editor model the array
			$scope.model.value = items;
		}

		$scope.remove = function (item, evt) {
			evt.preventDefault();

			$scope.model.value = _.reject($scope.model.value, function (x) {
				return x.value === item.value;
			});

		};

		$scope.add = function (evt) {
			evt.preventDefault();

			if ($scope.newItem) {
				if (!_.contains($scope.model.value, $scope.newItem)) {
					$scope.model.value.push({ value: $scope.newItem });
					$scope.newItem = {
						label: "",
						image: []
					};
					$scope.hasError = false;
					$scope.focusOnNew = true;
					return;
				}
			}

			//there was an error, do the highlight (will be set back by the directive)
			$scope.hasError = true;
		};

		$scope.sortableOptions = {
			axis: 'y',
			containment: 'parent',
			cursor: 'move',
			items: '> div.control-group',
			tolerance: 'pointer',
			update: function (e, ui) {
				// Get the new and old index for the moved element (using the text as the identifier, so
				// we'd have a problem if two prevalues were the same, but that would be unlikely)
				var newIndex = ui.item.index();
				var movedPrevalueText = $('input[type="text"]', ui.item).val();
				var originalIndex = getElementIndexByPrevalueText(movedPrevalueText);
				// Move the element in the model
				if (originalIndex > -1) {
					var movedElement = $scope.model.value[originalIndex];
					$scope.model.value.splice(originalIndex, 1);
					$scope.model.value.splice(newIndex, 0, movedElement);
				}
			}
		};

		$scope.createNew = function (event) {
			if (event.keyCode === 13) {
				$scope.add(event);
			}
		};

		function getElementIndexByPrevalueText(value) {
			for (var i = 0; i < $scope.model.value.length; i++) {
				if ($scope.model.value[i].value.label === value) {
					return i;
				}
			}

			return -1;
		}

		// The following handles the media selection
		$scope.openTreePicker = function () {
			var treePicker = dialogOptions;

			treePicker.submit = function (model) {
				if (treePicker.multiPicker) {
					_.each(model.selection, function (item, i) {
						$scope.addImage(item);
					});
				} else {
					$scope.clearImage();
					$scope.addImage(model.selection[0]);
				}
				editorService.close();
			};

			treePicker.close = function () {
				editorService.close();
			};

			editorService.treePicker(treePicker);
		};

		$scope.removeImage = function (index) {
			$scope.newItem.image.splice(index, 1);
			syncModelValue();
		};

		$scope.clearImage = function () {
			$scope.newItem.image = [];
			syncModelValue();
		};

		$scope.addImage = function (item) {

			var itemId = dialogOptions.idType === "udi" ? item.udi : item.id;

			var currIds = _.map($scope.newItem.image, function (i) {
				return dialogOptions.idType === "udi" ? i.udi : i.id;
			});
			if (currIds.indexOf(itemId) < 0) {

				item.icon = iconHelper.convertFromLegacyIcon(item.icon);
				$scope.newItem.image.push({ name: item.name, id: item.id, icon: item.icon, udi: item.udi });

				// store the index of the new item in the newItem.image collection so we can find it again
				var itemRenderIndex = $scope.newItem.image.length - 1;
				// get and update the path for the picked node
				entityResource.getUrl(item.id, dialogOptions.entityType).then(function (data) {
					$scope.newItem.image[itemRenderIndex].path = data;
				});

			}

			syncModelValue();
		};

		function syncModelValue() {
			// var currIds = _.map($scope.newItem.image, function (i) {
			// 	return dialogOptions.idType === "udi" ? i.udi : i.id;
			// });

			// console.log(_, $scope.newItem.image, currIds);

			// $scope.model.value = trim(currIds.join(), ",");
			angularHelper.getCurrentForm($scope).$setDirty();
		}

		//load media data
		if ($scope.model.value.length > 0) {
			var mediaIds = $scope.model.value.map(item => item.value.image[0].id);

			entityResource.getByIds(mediaIds, dialogOptions.entityType).then(function (data) {
				_.each(data, function (item, i) {

					item.icon = iconHelper.convertFromLegacyIcon(item.icon);
					// $scope.newItem.image.push({ name: item.name, id: item.id, icon: item.icon, udi: item.udi });

					// // store the index of the new item in the newItem.image collection so we can find it again
					// var itemRenderIndex = $scope.newItem.image.length - 1;
					// // get and update the path for the picked node
					// // entityResource.getUrl(item.id, dialogOptions.entityType).then(function (data) {
					// // 	$scope.newItem.image[itemRenderIndex].path = data;
					// // });
				});
			});
		}
	});
