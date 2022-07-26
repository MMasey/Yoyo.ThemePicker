using System;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.Packaging;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Cms.Infrastructure.Packaging;

namespace Yoyo.ThemePicker
{
	public static class YoyoThemePicker
	{
		public static string PackageName = "Yoyo.ThemePicker";
		// private static string Welcome = "uSync all the things";
	}

	public class YoyoThemePickerMigrationPlan : PackageMigrationPlan
	{
		public YoyoThemePickerMigrationPlan() :
			base(YoyoThemePicker.PackageName)
		{
		}

		protected override void DefinePlan()
		{
			To<SetupYoyoThemePicker>(new Guid("6835579a-4dca-4a54-9c39-78294084dd4f"));
		}
	}

	public class SetupYoyoThemePicker : PackageMigrationBase
	{
		public SetupYoyoThemePicker(
			IPackagingService packagingService,
			IMediaService mediaService,
			MediaFileManager mediaFileManager,
			MediaUrlGeneratorCollection mediaUrlGenerators,
			IShortStringHelper shortStringHelper,
			IContentTypeBaseServiceProvider contentTypeBaseServiceProvider,
			IMigrationContext context,
			IOptions<PackageMigrationSettings> packageMigrationsSettings) : base(
			packagingService, mediaService, mediaFileManager, mediaUrlGenerators, shortStringHelper,
			contentTypeBaseServiceProvider, context, packageMigrationsSettings)
		{
		}

		protected override void Migrate()
		{
			// we don't actually need to do anything, but this means we end up
			// on the list of installed packages.
		}
	}
}
