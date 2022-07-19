using System;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Extensions;

namespace Yoyo.ThemePicker.ValueConverters
{
	public class YoyoThemePickerValueConverter : IPropertyValueConverter
	{
		public bool IsConverter(IPublishedPropertyType propertyType)
		{
			return propertyType.EditorAlias.Equals("Yoyo.ThemePicker");
		}

		public bool? IsValue(object value, PropertyValueLevel level)
		{
			switch (level)
			{
				case PropertyValueLevel.Source:
					return value != null && (!(value is string) || string.IsNullOrWhiteSpace((string)value) == false);
				default:
					throw new NotSupportedException($"Invalid level: {level}.");
			}
		}

		public Type GetPropertyValueType(IPublishedPropertyType propertyType)
		{
			return typeof(string);
		}

		public PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType)
		{
			return PropertyCacheLevel.Element;
		}

		public object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview)
		{
			if (source == null) return null;

			var attemptConvertInt = source.TryConvertTo<string>();
			if (attemptConvertInt.Success)
			{
				return attemptConvertInt.Result;
			}

			return "";
		}

		public object ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview)
		{
			if (inter == null)
				return null;

			if ((propertyType.Alias != null) == false)
			{
				if (inter is string)
				{
					return inter;
				}
			}

			return inter;
		}

		public object ConvertIntermediateToXPath(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview)
		{
			if (inter == null) return null;
			return inter.ToString();
		}
	}
}
