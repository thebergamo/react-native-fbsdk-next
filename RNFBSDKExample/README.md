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

- The Facebook App ID in use for the example is not configured for public login. Replace the App ID and client token in `ios/RNFBSDKExample/Info.plist` and `android/app/src/main/res/values/strings.xml` with your app's values, and update its URL schemes accordingly.
- It does not demonstrate anything else, contributions welcome

## How to contribute to the example

- The refresh script copies `App.tsx`, this README, and optional Android `local.properties` into the regenerated example. The entire original directory is retained as a backup.
- Make all UI changes in `App.tsx`
- Make all config changes (`Info.plist` or `.java` / `.m` file changes via sed edits in `refresh-example.sh`. No, that's not the easiest thing to do. But unless you commit to maintaining the project and updating the example app yourself for a few years, it is still the most efficient way)

## Using the example to test changes to the core module

The example installs a published npm version by default. Copy your local module changes into its installed package before rebuilding.

Use these commands from the main directory:

- `yarn example:clean` - this removes node_modules and the yarn and pod lockfiles
- `yarn example:install` - runs `yarn` and, on macOS, `pod install`, preserving lockfiles and reporting installation failures
- `yarn example:devcopy` - this runs `yarn prepare` to build the core module, then copies the modules files in to the example

Run `yarn example:install` first, then `yarn example:devcopy` after local module changes. Run `pod install` from the example's `ios` directory after podspec changes, and rebuild with `yarn android` or `yarn ios` in the example. Reinstalling dependencies can replace copied files, so copy them again afterward. Normal development does not require deleting lockfiles.
