# React Native FBSDK Next

This project aims to keep continuity of the [React Native FBSDK](https://github.com/facebook/react-native-fbsdk) from Facebook. As Facebook dropped support from it. As a community for this is our effort in order to keep upgrading and improving support for this module.

React Native FBSDK is a wrapper around the iOS Facebook SDK and Android Facebook SDK, allowing for Facebook integration in [React Native](https://facebook.github.io/react-native/) apps. Access to native components, from login to sharing, is provided entirely through documented JavaScript modules so you don't have to call a single native function directly.

Functionality is provided through one single npm package so you can use it for both platforms without downloading any extra packages. Follow this guide to use react-native-fbsdk in your React Native app. You can also visit https://developers.facebook.com/docs/react-native for tutorials and reference documentation.

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#join-the-react-native-community)
- [License](#license)

---

## Installation

## React Native Compatibility
To use this library you need to ensure you match up with the correct version of React Native you are using.

| FB SDK    | lib version                           | Required React Native Version |
| --------- | ------------------------------------- | ----------------------------- |
| >= 9.3.0+ | `react-native-fbsdk-next` `> 4.3.0`   | `>=0.63.3`*                   |
| >= 9.0.0+ | `react-native-fbsdk-next` `>= 3.0.1`  | `>= 0.60`                     |
| <= 8.0.1  | `react-native-fbsdk` `>= 1.0.0`       | `>= 0.60`                     |
| <= 8.0.1  | `react-native-fbsdk` `<= 0.10`        | `<= 0.59.x`                   |

> ⚠️ * Attention
>
> Please notice that this module in versions after 4.2.0 only supports React Native versions above 0.63.3 as it's the oldest version of React Native which support latest XCode version. Technically, it may work on older versions (test it to be sure) but **they are not supported**. Changes that accidentally break older react-native versions may be issued without regard to semantic versioning constraints because we do not test against the older versions. Please see [this issue](https://github.com/thebergamo/react-native-fbsdk-next/issues/30) for an example of a previous break. Please update to current react-native versions.

### 1. Install the library

using either Yarn:

```
yarn add react-native-fbsdk-next
```

or npm:

```
npm install --save react-native-fbsdk-next
```

### 2. Link

- **React Native 0.60+**


[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.

*Note* For `iOS` using `cocoapods`, run:

```bash
$ cd ios/ && pod install
```


- **React Native <= 0.59**

> For support with React Native <= 0.59, please refer to [React Native FBSDK](https://github.com/facebook/react-native-fbsdk)

If you can't or don't want to use the CLI tool, you can also manually link the library using the instructions below (click on the arrow to show them):

<details>
<summary>Manually link the library on iOS</summary>

Either follow the [instructions in the React Native documentation](https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking) to manually link the framework or link using [Cocoapods](https://cocoapods.org) by adding this to your `Podfile`:

```ruby
pod 'react-native-fbsdk-next', :path => '../node_modules/react-native-fbsdk-next'
```

</details>

<details>
<summary>Manually link the library on Android</summary>

Make the following changes:

#### `android/settings.gradle`
```groovy
include ':react-native-fbsdk-next'
project(':react-native-fbsdk-next').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fbsdk-next/android')
```

#### `android/app/build.gradle`
```groovy
dependencies {
   ...
   implementation project(':react-native-fbsdk-next')
}
```

#### `android/app/src/main/.../MainApplication.java`
On top, where imports are:

```java
import com.facebook.reactnative.androidsdk.FBSDKPackage;
```

Add the `FBSDKPackage` class to your list of exported packages.

```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
            new MainReactPackage(),
            new FBSDKPackage()
    );
}
```
</details>

### 3. Configure projects

#### 3.1 Android

Before you can run the project, follow the [Getting Started Guide](https://developers.facebook.com/docs/android/getting-started/) for Facebook Android SDK to set up a Facebook app. You can skip the build.gradle changes since that's taken care of by the rnpm link step above, but **make sure** you follow the rest of the steps such as updating `strings.xml` and `AndroidManifest.xml`.

#### 3.2 iOS

Follow ***steps 3 and 4*** in the [Getting Started Guide](https://developers.facebook.com/docs/ios/use-cocoapods) for Facebook SDK for iOS.

**If you're not using cocoapods already** you can also follow step 1.1 to set it up.

**If you're using React Native's RCTLinkingManager**

The `AppDelegate.m` file can only have one method for `openUrl`. If you're also using `RCTLinkingManager` to handle deep links, you should handle both results in your `openUrl` method.

```objc
#import <FBSDKCoreKit/FBSDKCoreKit.h> // <- Add This Import
#import <React/RCTLinkingManager.h> // <- Add This Import

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
    return YES;
  }

  if ([RCTLinkingManager application:app openURL:url options:options]) {
    return YES;
  }

  return NO;
}
```

### Troubleshooting

1. I cannot run the Android project.

- Make sure you added the code snippet in step 3.1.
- Make sure you set up a Facebook app and updated the `AndroidManifest.xml` and `res/values/strings.xml` with Facebook app settings.

2. Duplicate symbol errors

- Make sure that `FBSDK[Core, Login, Share]Kit.framework` are **NOT** in `Link Binary with Libraries` for your **root project** when using cocoapods.

3. I get this build error: `no type or protocol named UIApplicationOpenURLOptionsKey`:

- Your Xcode version is too old. Upgrade to Xcode 10.0+.

4. You get a compilation error with the error `Undefined symbols for architecture x86_64`
```
Undefined symbols for architecture x86_64:
    "_swift_FORCE_LOAD$_swiftUniformTypeIdentifiers", referenced from:
    _swift_FORCE_LOAD$swiftUniformTypeIdentifiers$_FBSDKShareKit in libFBSDKShareKit.a(Enums+Extensions.o)
    (maybe you meant: _swift_FORCE_LOAD$swiftUniformTypeIdentifiers$_FBSDKShareKit)
    "_swift_FORCE_LOAD$_swiftCoreMIDI", referenced from:
    _swift_FORCE_LOAD$swiftCoreMIDI$_FBSDKShareKit in libFBSDKShareKit.a(Enums+Extensions.o)
    (maybe you meant: _swift_FORCE_LOAD$swiftCoreMIDI$_FBSDKShareKit)
    "_swift_FORCE_LOAD$_swiftWebKit", referenced from:
    _swift_FORCE_LOAD$swiftWebKit$_FBSDKCoreKit in libFBSDKCoreKit.a(AccessToken.o)
    _swift_FORCE_LOAD$swiftWebKit$_FBSDKCoreKit in libFBSDKCoreKit.a(Permission.o)
    _swift_FORCE_LOAD$swiftWebKit$_FBSDKCoreKit in libFBSDKCoreKit.a(Settings.o)
    _swift_FORCE_LOAD$swiftWebKit$_FBSDKLoginKit in libFBSDKLoginKit.a(FBLoginButton.o)
    _swift_FORCE_LOAD$swiftWebKit$_FBSDKLoginKit in libFBSDKLoginKit.a(LoginManager.o)
    _swift_FORCE_LOAD$swiftWebKit$_FBSDKShareKit in libFBSDKShareKit.a(Enums+Extensions.o)
    (maybe you meant: _swift_FORCE_LOAD$swiftWebKit$_FBSDKLoginKit, _swift_FORCE_LOAD$swiftWebKit$_FBSDKShareKit , _swift_FORCE_LOAD$swiftWebKit$_FBSDKCoreKit )
    ld: symbol(s) not found for architecture x86_64
```

   After **facebook-ios-sdk v7** (written with Swift parts) you need to coordinate Swift language usage with Objective-C for iOS.

   Either:

- add a new file named `File.Swift` in the main project folder and answer "yes" when Xcode asks you if you want to "Create Bridging Header"
The empty swift file makes this change to the Header Search Path on your build settings:
```
$(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME)
$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)
```

- or add this stanza in the postinstall section of your Podfile as a possible workaround (then `pod deintegrate && pod install`):

   ```ruby
    # Mixing Swift and Objective-C in a react-native project may be problematic.
    # Workaround:  https://github.com/facebookarchive/react-native-fbsdk/issues/755#issuecomment-787488994
    installer.aggregate_targets.first.user_project.native_targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['LIBRARY_SEARCH_PATHS'] = ['$(inherited)', '$(SDKROOT)/usr/lib/swift']
      end
    end
   ```

  Both result in fixing search paths.

5. AppLink.fetchDeferredAppLink does not work (on iOS at least)

   Both the Facebook App and your app have to have App Tracking Transparency (ATT) permission granted for facebook deferred app links to work. See [this related issue](https://github.com/thebergamo/react-native-fbsdk-next/issues/104#issuecomment-931488609)

6. You get an exception `App ID not found. Add a string value with your app ID for the key FacebookAppID to the Info.plist or call [FBSDKSettings setAppID:].`

  If you find yourself in this situation, and you are certain that you have the FacebookAppID in your Info.plist or that you have called `setAppId`, you *may* be able to fix it by adding the following lines to `AppDelegate.m` inside the `- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions`, just before the `return YES` statement:

  ```
    [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  ```
## Usage

### SDK Initialization

To comply with Apple privacy requirements, for iOS the `autoInitEnabled` option is removed from [facebook-ios-sdk#v9.0.0](https://github.com/facebook/facebook-ios-sdk/blob/master/CHANGELOG.md#900).

Using this module, there are two options to comply with this requirement, one is platform-neutral and can be used from your javascript code whenever it makes sense for your app, and one is native.

### Setting Facebook app ID from code

In case you e.g. would like to use multiple facebook apps, you can set the facebook app ID using setAppID

```js
import { Settings } from 'react-native-fbsdk-next';

// Setting the facebook app id using setAppID
// Remember to set CFBundleURLSchemes in Info.plist on iOS if needed
Settings.setAppID('APP ID');
```

#### Platform-neutral SDK initialization

If you do not need to handle a [GDPR-type opt-in flow](https://developers.facebook.com/docs/app-events/gdpr-compliance), on iOS you should include the following javascript code as early in startup as possible. For Android auto-init is the default still, so this is not strictly necessary for Android but will work.

If you need to handle a GDPR-type flow, make sure your SDK is configured natively to delay all logging activity according to [the GDPR instructions](https://developers.facebook.com/docs/app-events/gdpr-compliance), ask for user consent, and after obtaining consent include code similar to this:

```js
import { Settings } from 'react-native-fbsdk-next';

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK();
```

#### iOS Native Initialization

If you would like to initialize the Facebook SDK even earlier in startup for iOS, you need to include this code in your AppDelegate.m file now that auto-initialization is removed.

```objective-c
#import <FBSDKCoreKit/FBSDKCoreKit.h> // <- Add This Import

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FBSDKApplicationDelegate.sharedInstance initializeSDK]; // <- add this

  // your other stuff
}
```

### [Login](https://developers.facebook.com/docs/facebook-login)

#### Login Button + Access Token

```js
import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';

export default class Login extends Component {
  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      </View>
    );
  }
};
```

#### Requesting additional permissions with Login Manager

You can also use the Login Manager with custom UI to perform Login.

```js
// ...

import { LoginManager } from "react-native-fbsdk-next";

// ...

// Attempt a login using the Facebook login dialog asking for default permissions.
LoginManager.logInWithPermissions(["public_profile"]).then(
  function(result) {
    if (result.isCancelled) {
      console.log("Login cancelled");
    } else {
      console.log(
        "Login success with permissions: " +
          result.grantedPermissions.toString()
      );
    }
  },
  function(error) {
    console.log("Login fail with error: " + error);
  }
);
```

#### Get profile information

You can retrieve the profile information after a succesfull login attempt. The data returned will be related to the type of
authentication you are using (limited or not) and the permission granted by the login method.

```js
// ...

import { Profile } from "react-native-fbsdk-next";

// ...

const currentProfile = Profile.getCurrentProfile().then(
  function(currentProfile) {
    if (currentProfile) {
      console.log("The current logged user is: " +
        currentProfile.name
        + ". His profile id is: " +
        currentProfile.userID
      );
    }
  }
);
```

There's some platform related specific behaviours that you need to consider:
- On Android, the `email` field doesn't get retrieved even if the `[..., 'email', ...]` permission will be request.
In fact, the `email` field doesn't exist in the native Java SDK provided by Facebook at the moment (https://developers.facebook.com/docs/reference/androidsdk/current/facebook/com/facebook/profile.html/?locale=it_IT)
- The width and height query params for the profile picture uri will be 100 (iOS SDK default values).

### [Limited Login [IOS]](https://developers.facebook.com/docs/facebook-login/limited-login/ios)

#### Login Button with Limited Login [IOS only] + Authentication Token [IOS only]

Limited Login allows developers to signal that a login is limited in terms of tracking users.

**`loginTrackingIOS`** - The possible values are `enabled` and `limited`. Defaults to `enabled`.

When `loginTrackingIOS` is `limited` - `AccessToken` will be unavailable. Use `AuthenticationToken` instead.

`nonceIOS` - Limited Login allows developers to pass a custom nonce for use in verifying an authentication attempt on their servers. A valid nonce must be a non-empty string without whitespace. An invalid nonce will not be set. Instead, default unique nonces will be used for login attempts.

```js
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import {
  AccessToken,
  AuthenticationToken,
  LoginButton,
} from 'react-native-fbsdk-next';

export default class Login extends Component {
  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              if (Platform.OS === 'ios') {
                AuthenticationToken.getAuthenticationTokenIOS().then((data) => {
                  console.log(data?.authenticationToken);
                });
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                  console.log(data?.accessToken.toString());
                });
              }
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
          loginTrackingIOS={'limited'}
          nonceIOS={'my_nonce'}
        />
      </View>
    );
  }
}
```

#### Login Manager with Limited Login [IOS only] + Authentication Token [IOS only]

```js

  import {
    AccessToken,
    AuthenticationToken,
    LoginManager,
  } from 'react-native-fbsdk-next';

  //...

  try {
    const result = await LoginManager.logInWithPermissions(
      ['public_profile', 'email'],
      'limited',
      'my_nonce'
    );
    console.log(result);

    if (Platform.OS === 'ios') {
      const result = await AuthenticationToken.getAuthenticationTokenIOS();
      console.log(result?.authenticationToken);
    } else {
      const result = await AccessToken.getCurrentAccessToken();
      console.log(result?.accessToken);
    }
  } catch (error) {
    console.log(error);
  }

  //...

```

### [Sharing](https://developers.facebook.com/docs/sharing)

#### Share dialogs

All of the dialogs included are used in a similar way, with differing content types. All content types are defined with [Flow](http://flowtype.org/) Type Annotation in js/models directory.

```js
// ...

import { ShareDialog } from 'react-native-fbsdk-next';

// ...

// Build up a shareable link.
const shareLinkContent = {
  contentType: 'link',
  contentUrl: "https://facebook.com",
  contentDescription: 'Wow, check out this great site!',
};

// ...

// Share the link using the share dialog.
shareLinkWithShareDialog() {
  var tmp = this;
  ShareDialog.canShow(this.state.shareLinkContent).then(
    function(canShow) {
      if (canShow) {
        return ShareDialog.show(tmp.state.shareLinkContent);
      }
    }
  ).then(
    function(result) {
      if (result.isCancelled) {
        console.log('Share cancelled');
      } else {
        console.log('Share success with postId: '
          + result.postId);
      }
    },
    function(error) {
      console.log('Share fail with error: ' + error);
    }
  );
}
```

#### Share Photos

See [SharePhotoContent](/js/models/FBSharePhotoContent.js) and [SharePhoto](/js/models/FBSharePhoto.js) to refer other options.

```js
const FBSDK = require('react-native-fbsdk-next');
const {
  ShareApi,
} = FBSDK;

const photoUri = 'file://' + '/path/of/photo.png'
const sharePhotoContent = {
  contentType = 'photo',
  photos: [{ imageUrl: photoUri }],
}

// ...

ShareDialog.show(tmp.state.sharePhotoContent);
```

#### Share Videos

See [ShareVideoContent](/js/models/FBShareVideoContent.js) and [ShareVideo](/js/models/FBShareVideo.js) to refer other options.

```js
const FBSDK = require('react-native-fbsdk-next');
const {
  ShareApi,
} = FBSDK;

const videoUri = 'file://' + '/path/of/video.mp4'
const shareVideoContent = {
  contentType = 'video',
  video: { localUrl: videoUri },
}

// ...

ShareDialog.show(tmp.state.shareVideoContent);
```

#### Share API

Your app must have the `publish_actions` permission approved to share through the share API. You should prefer to use the Share Dialogs for an easier and more consistent experience.

```js
// ...

import { ShareApi } from 'react-native-fbsdk-next';

// ...

// Build up a shareable link.
const shareLinkContent = {
  contentType: 'link',
  contentUrl: "https://facebook.com",
  contentDescription: 'Wow, check out this great site!',
};

// ...

// Share using the share API.
ShareApi.canShare(this.state.shareLinkContent).then(
  var tmp = this;
  function(canShare) {
    if (canShare) {
      return ShareApi.share(tmp.state.shareLinkContent, '/me', 'Some message.');
    }
  }
).then(
  function(result) {
    console.log('Share with ShareApi success.');
  },
  function(error) {
    console.log('Share with ShareApi failed with error: ' + error);
  }
);
```

### [App Events](https://developers.facebook.com/docs/app-events)

#### App events

```js
// ...

import { AppEventsLogger } from "react-native-fbsdk-next";

// ...

// Log a $15 purchase.
AppEventsLogger.logPurchase(15, "USD", { param: "value" });

// Log standard event. e.g. completed registration
AppEventsLogger.logEvent(AppEventsLogger.AppEvents.CompletedRegistration, {
  [AppEventsLogger.AppEventParams.RegistrationMethod]: "email",
});
```

### [Graph API](https://developers.facebook.com/docs/graph-api)

#### Graph Requests

```js
// ...

import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

// ...

//Create response callback.
_responseInfoCallback(error: ?Object, result: ?Object) {
  if (error) {
    console.log('Error fetching data: ' + error.toString());
  } else {
    console.log('Success fetching data: ' + result.toString());
  }
}

// Create a graph request asking for user information with a callback to handle the response.
const infoRequest = new GraphRequest(
  '/me',
  null,
  this._responseInfoCallback,
);
// Start the graph request.
new GraphRequestManager().addRequest(infoRequest).start();
```

## Example app
To run the example app, you'll first need to setup the environment:
```
refresh-example.sh
```
This will create a new app in the `RNFBSDKExample` directory, using the latest version of React Native.
Next, it will patch the necessary files so you may run the example app.

```
yarn example:ios
```
or
```
yarn example:android
```

Note: You'll probably want to change the Facebook App ID to your own, else the example app won't be able to login.  To change it, edit your local copy of `refresh-example.sh`, update the `FacebookAppId` variable, then re-run `refresh-example.sh` to regenerate the example directory.


## Join the React Native community

- Website: https://facebook.github.io/react-native
- Twitter: https://twitter.com/reactnative

See the [CONTRIBUTING](./CONTRIBUTING.md) file for how to help out.

## License

See the LICENSE file.
