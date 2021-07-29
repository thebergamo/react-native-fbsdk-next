# react-native-fbsdk-next example

This example is extremely basic but hopefully still useful.

You run it by cloning the main repo, and running `yarn` then `yarn example:android` or `yarn example:ios`

The example currently validates these things:

## Successful project integration

- the module should successfully integrate with current react-native: install and run, android and ios

## Basic Facebook SDK functionality

- the module should successfully open the login screen when the login button is tapped
- the module should successfully open the share dialog when the share link is tapped

## Known Issues

- The App ID in use for the example is not configured, and it is problematic to configure one for the internet at large. Replace the App ID in `ios/RNFBSDKExample/Info.plist` and `android/src/main/res/values/strings.xml` with your App ID
- It does not demonstrate anything else, contributions welcome

## How to contribute to the example

- First, note that it is automatically constructed. The only file that is preserved when `refresh-example.sh` is run is `App.js`
- Make all UI changes in `App.js`
- Make all config changes (`Info.plist` or `.java` / `.m` file changes via sed edits in `refresh-example.sh`. No, that's not the easiest thing to do. But unless you commit to maintaining the project and updating the example app yourself for a few years, it is still the most efficient way)
