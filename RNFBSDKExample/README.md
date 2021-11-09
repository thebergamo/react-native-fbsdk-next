# react-native-fbsdk-next example

This example is extremely basic but hopefully still useful.

You run it by cloning the main repo, and running `yarn example:install` then `yarn example:start`, and finally `yarn example:android` or `yarn example:ios`

The example currently validates these things:

## Successful project integration

- the module should successfully integrate with current react-native: install and run, android and ios

## Basic Facebook SDK functionality

- the module should successfully open the login screen when the login button is tapped
- the module should successfully open the share dialog when the share link is tapped

## Known Issues

- The Facebook App ID in use for the example is not configured, and it is problematic to configure one for the internet at large. Replace the App ID in `ios/RNFBSDKExample/Info.plist` and `android/src/main/res/values/strings.xml` with your App ID
- It does not demonstrate anything else, contributions welcome

## How to contribute to the example

- First, note that it is automatically constructed. The only file that is preserved when `refresh-example.sh` is run is `App.js`
- Make all UI changes in `App.js`
- Make all config changes (`Info.plist` or `.java` / `.m` file changes via sed edits in `refresh-example.sh`. No, that's not the easiest thing to do. But unless you commit to maintaining the project and updating the example app yourself for a few years, it is still the most efficient way)

## Using the example to test changes to the core module

If you are making changes to the core module and using the example for testing, you must understand the example references the module code via a github reference.

The example will contain stale files unless you clear the lockfiles/modules, copy in the module code and reinstall. There are three commands which are useful for development that help you manage this. You may run all of these from the main directory:

- `yarn example:clean` - this removes node_modules and the yarn and pod lockfiles
- `yarn example:install` - this just runs `yarn` and `pod install` for you
- `yarn example:devcopy` - this runs `yarn prepare` to build the core module, then copies the modules files in to the example

A typical workflow will involve you making changes in the core src / android / ios folders, then running `yarn example:devcopy` and - if you changed something in package.json or the podspec then `yarn example:install` repeatedly, while perhaps rebuilding the the native code in `RNFBSDKExample` as if it were a normal project (that is, `yarn android` or `yarn ios` to see the fresh native changes)
