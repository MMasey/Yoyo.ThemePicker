# Yoyo.ThemePicker

An Umbraco package that create a the theme picker property editor

## Usage

When configuring the data type, you can select an image from the file system, and assign it a name. The name of the selected theme will be returned as a string value. It will be an empty string is no theme is selected.

This package come with a built in property value converter, so will work with Models Builder.

## Contribution Guidelines

If you'd like to contribute to this package, you'll first want to get in install locally. The following steps will help you get set up.

1. Clone the repo
2. Create a new branch off of develop
3. Open the Visual Studio solution and restore the nuget packages. This will install a local version of Umbraco for you in the `Website` folder.
4. You will need to manually build the `Website` folder as it is excluded for the main build task.
5. You can run the test Umbraco site any way you wish, whether it's setting it up in IIS or running it via Visual Studio or VS Code.
6. On the install screen for Umbraco, I recommend using the starter theme to help get you started quicker.
7. You'll now want build the solutions, this will automatically copy the package into the correct location. (You may want to update the `debug` mode in the `Web.Config` to true to help with cache busting)
8. Go to settings in the Umbraco backoffice and create yourself a new `Theme picker` data type and use it where ever you would like to test it.

You can test with either your own images, or by using the image found in the `example-media` folder. In order to test all you need to do is add them somewhere inside the `Website` folder. Once that's done you'll be able to select them via the Theme picker when configuring it.

### Committing

Before you make your first commit, make sure you install the npm modules for this package by running `npm i`. This will configure some rules around commit messages that will help to keep things consistent.
