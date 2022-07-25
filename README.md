# Yoyo.ThemePicker

An Umbraco package that creates the theme picker property editor. Compatible with Umbraco v9

## Usage

When configuring the data type, you can select an image from the file system, and assign it a name. The name of the selected theme will be returned as a string value. It will be an empty string is no theme is selected.

This package come with a built in property value converter, so will work with Models Builder.

## Contribution Guidelines

If you'd like to contribute to this package, you'll first want to get in install locally. The following steps will help you get set up.

1. Clone the repo
2. Create a new branch off of develop
3. Build the solution. It should contain two project, one for the package called "Yoyo.ThemePicker" and another called "Yoyo.ThemePicker.TestSite" which is used to check the package it working as expected. When you build the solution it will deploy the package to the test website automatically.
4. Once you have finished you changes executing the 'dotnet pack' command in the package directory will take care of building the project and outputting the generated NuGet package in the bin folder (the output on the CLI shows the full path to the .nupkg file).

More information on creating and deploying the package to nuget can be found at [our.umbraco.com/documentation/Extending/Packages/](https://our.umbraco.com/documentation/Extending/Packages/)

You can test with either your own images, or by using the image found in the `example-media` folder. In order to test all you need to do is add them somewhere inside `Yoyo.ThemePicker.TestSite/wwwroot` folder. Once that's done you'll be able to select them via the Theme picker when configuring it.

### Test site login credentials

Username: test@test.com
Password: testtesttest

### Committing

Before you make your first commit, make sure you install the npm modules for this package by running `npm i`. This will configure some rules around commit messages that will help to keep things consistent.
