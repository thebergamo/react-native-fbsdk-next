#!/bin/bash
set -e

echo "You should run this from directory where you have cloned the react-native-fbsdk-next repo"
echo "You should only do this when your git working set is completely clean (e.g., git reset --hard)"
echo "You must have already run \`yarn\` in the repository so \`npx react-native\` will work"
echo "This scaffolding refresh has been tested on macOS, if you use it on linux, it might not work"

# Copy the important files out temporarily
if [ -d TEMP ]; then
  echo "TEMP directory already exists - we use that to store files while refreshing."
  exit 1
else
  echo "Saving files to TEMP while refreshing scaffolding..."
  mkdir -p TEMP/android/
  mkdir -p TEMP/ios/RNFBSDKExample
  cp RNFBSDKExample/README.md TEMP/
  cp RNFBSDKExample/android/local.properties TEMP/android/ || true
  cp RNFBSDKExample/App.tsx TEMP/
fi

# Purge the old sample
\rm -fr RNFBSDKExample

# Make the new example
npm_config_yes=true npx react-native@latest init RNFBSDKExample --skip-install --skip-git-init
pushd RNFBSDKExample
rm -f Gemfile Gemfile.lock .ruby-version
touch yarn.lock
yarn
yarn add react-native-fbsdk-next

#########################################################################
#
# General compile fixes and tweaks, not react-native-fbsdk-next specific
#

# React-native builds on iOS are very noisy with warnings in other packages that drown our warnings out. Reduce warnings to just our packages.
sed -i -e $'s/post_install do |installer|/post_install do |installer|\\\n    # quiet non-module warnings - only interested in fbsdk-next warnings\\\n    installer.pods_project.targets.each do |target|\\\n      if !target.name.include? "react-native-fbsdk-next"\\\n        target.build_configurations.each do |config|\\\n          config.build_settings["GCC_WARN_INHIBIT_ALL_WARNINGS"] = "YES"\\\n        end\\\n      end\\\n    end\\\n/' ios/Podfile
rm -f ios/Podfile??

# Optional: Apple M1 workaround - builds may have a problem with architectures on Apple Silicon and Intel, some exclusions may help
sed -i -e $'s/post_install do |installer|/post_install do |installer|\\\n    installer.aggregate_targets.each do |aggregate_target|\\\n      aggregate_target.user_project.native_targets.each do |target|\\\n        target.build_configurations.each do |config|\\\n          config.build_settings[\'ONLY_ACTIVE_ARCH\'] = \'YES\'\\\n          config.build_settings[\'EXCLUDED_ARCHS\'] = \'i386\'\\\n        end\\\n      end\\\n      aggregate_target.user_project.save\\\n    end\\\n/' ios/Podfile
rm -f ios/Podfile.??

# Optional: build performance optimization to use ccache - asks xcodebuild to use clang and clang++ without the fully-qualified path
# That means that you can then make a symlink in your path with clang or clang++ and have it use a different binary
# In that way you can install ccache or buildcache and get much faster compiles...
sed -i -e $'s/post_install do |installer|/post_install do |installer|\\\n    installer.pods_project.targets.each do |target|\\\n      target.build_configurations.each do |config|\\\n        config.build_settings["CC"] = "clang"\\\n        config.build_settings["LD"] = "clang"\\\n        config.build_settings["CXX"] = "clang++"\\\n        config.build_settings["LDPLUSPLUS"] = "clang++"\\\n      end\\\n    end\\\n/' ios/Podfile
rm -f ios/Podfile??


#########################################################################
#
# react-native-fbsdk-next specific configuration
#

# Adding the facebook App Id, App Name, are minimum steps

# note the app id used here does not work fully - replace with your own - but it *does* initialize and prove things to a point.
FacebookAppId=1523458767976650
sed -i -e 's/<\/resources>/    <string name="facebook_app_id">'${FacebookAppId}'<\/string>\n<\/resources>/' android/app/src/main/res/values/strings.xml
rm -f android/app/src/main/res/values/strings.xml??
sed -i -e 's/^<\/dict>/  <key>FacebookDisplayName<\/key>\n  <string>RNFBSDKExample<\/string>\n<\/dict>/' ios/RNFBSDKExample/Info.plist
rm -f ios/RNFBSDKExample/Info.plist??
sed -i -e 's/^<\/dict>/  <key>FacebookAppID<\/key>\n  <string>'${FacebookAppId}'<\/string>\n<\/dict>/' ios/RNFBSDKExample/Info.plist
rm -f ios/RNFBSDKExample/Info.plist??
sed -i -e 's/<\/application>/  <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string\/facebook_app_id"\/>\n    <\/application>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??
sed -i -e 's/<\/application>/  <meta-data android:name="com.facebook.sdk.ApplicationName" android:value="@string\/app_name"\/>\n    <\/application>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??

# FBSDK requires a few imports, and you probably want to see if Facebook can handle a link, so facebook logins work...
sed -i -e 's/#import "AppDelegate.h"/#import "AppDelegate.h"\n#import <FBSDKCoreKit\/FBSDKCoreKit-Swift.h>\n#import <React\/RCTLinkingManager.h>/' ios/RNFBSDKExample/AppDelegate.mm
rm -f ios/RNFBSDKExample/AppDelegate.mm??
sed -i -e 's/#import "AppDelegate.h"/#import "AppDelegate.h"\n#import <SafariServices\/SafariServices.h>/' ios/RNFBSDKExample/AppDelegate.mm
rm -f ios/RNFBSDKExample/AppDelegate.mm??
sed -i -e 's/#import "AppDelegate.h"/#import "AppDelegate.h"\n\n#import <AuthenticationServices\/AuthenticationServices.h>/' ios/RNFBSDKExample/AppDelegate.mm
rm -f ios/RNFBSDKExample/AppDelegate.mm??

sed -i -e 's|@implementation AppDelegate|@implementation AppDelegate\n\n- (BOOL)application:(UIApplication *)app\n            openURL:(NSURL *)url\n            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options\n{\n  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {\n    return YES;\n  }\n\n  if ([RCTLinkingManager application:app openURL:url options:options]) {\n    return YES;\n  }\n  \n  return NO;\n}|' ios/RNFBSDKExample/AppDelegate.mm
rm -f ios/RNFBSDKExample/AppDelegate.mm??

# You may optionally want to handle facebook app links
sed -i -e 's/<\/resources>/    <string name="fb_auto_applink_scheme">fb'${FacebookAppId}'<\/string>\n<\/resources>/' android/app/src/main/res/values/strings.xml
rm -f android/app/src/main/res/values/strings.xml??
sed -i -e 's/<\/intent-filter>/<\/intent-filter>\n        <intent-filter>\n            <action android:name="android.intent.action.VIEW" \/>\n            <category android:name="android.intent.category.DEFAULT" \/>\n            <category android:name="android.intent.category.BROWSABLE" \/>\n            <data android:host="applinks" android:scheme="@string\/fb_auto_applink_scheme" \/>\n        <\/intent-filter>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??

# Facebook App Client Token will be required with Facebook SDKs 13+
sed -i -e 's/<\/resources>/    <string name="facebook_client_token">d157902d0bff64b4c1daaf26e32852e9<\/string>\n<\/resources>/' android/app/src/main/res/values/strings.xml
rm -f android/app/src/main/res/values/strings.xml??
sed -i -e 's/<\/application>/  <meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string\/facebook_client_token"\/>\n    <\/application>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??
sed -i -e 's/^<\/dict>/  <key>FacebookClientToken<\/key>\n  <string>d157902d0bff64b4c1daaf26e32852e9<\/string>\n<\/dict>/' ios/RNFBSDKExample/Info.plist
rm -f ios/RNFBSDKExample/Info.plist??

# On Android you must add the CustomTabActivity (deprecated WebView)
sed -i -e 's/<\/activity>/<\/activity>\n      <activity android:name="com.facebook.CustomTabActivity" android:exported="true">\n        <intent-filter>\n          <action android:name="android.intent.action.VIEW" \/>\n          <category android:name="android.intent.category.DEFAULT" \/>\n          <category android:name="android.intent.category.BROWSABLE" \/>\n          <data android:scheme="@string\/fb_login_protocol_scheme" \/>\n        <\/intent-filter>\n      <\/activity>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??

# This is required for login to work on android and is listed as a requirement for the iOS SDK
sed -i -e 's/<\/resources>/    <string name="fb_login_protocol_scheme">fb'${FacebookAppId}'<\/string>\n<\/resources>/' android/app/src/main/res/values/strings.xml
rm -f android/app/src/main/res/values/strings.xml??

sed -i -e 's/^<\/dict>/  <key>LSApplicationQueriesSchemes<\/key>\n  <array>\n    <string>fb-messenger-share-api<\/string>\n    <string>fbauth2<\/string>\n    <string>fbapi<\/string>\n  <\/array>\n<\/dict>/' ios/RNFBSDKExample/Info.plist
rm -f ios/RNFBSDKExample/Info.plist??

# On both platforms you probably need to turn off auto collection and advertiser ID for privacy compliance followed by opt-in / programmatic enable
sed -i -e 's/<\/application>/  <meta-data android:name="com.facebook.sdk.AutoLogAppEventsEnabled" android:value="false"\/>\n    <\/application>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??
sed -i -e 's/<\/application>/  <meta-data android:name="com.facebook.sdk.AdvertiserIDCollectionEnabled" android:value="false"\/>\n    <\/application>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??
sed -i -e 's/^<\/dict>/  <key>FacebookAutoLogAppEventsEnabled<\/key>\n  <false\/>\n<\/dict>/' ios/RNFBSDKExample/Info.plist
rm -f ios/RNFBSDKExample/Info.plist??
sed -i -e 's/^<\/dict>/  <key>FacebookAdvertiserIDCollectionEnabled<\/key>\n  <false\/>\n<\/dict>/' ios/RNFBSDKExample/Info.plist
rm -f ios/RNFBSDKExample/Info.plist??

# On iOS and Android you have to add entries for various query schemes (Android S+) and allowed URLs etc
sed -i -e 's/<\/manifest>/    <queries>\n      <provider android:authorities="com.facebook.katana.provider.PlatformProvider" \/>\n      <provider android:authorities="com.facebook.orca.provider.PlatformProvider" \/>\n    <\/queries>\n<\/manifest>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??
sed -i -e 's/<string>fbapi<\/string>/<string>fbapi<\/string>\n    <string>fb-messenger-share-api<\/string>\n    <string>fbauth2<\/string>\n    <string>fbapi<\/string>\n    <string>fbapi20130214<\/string>\n    <string>fbapi20130410<\/string>\n    <string>fbapi20130702<\/string>\n    <string>fbapi20131010<\/string>\n    <string>fbapi20131219<\/string>\n    <string>fbapi20140410<\/string>\n    <string>fbapi20140116<\/string>\n    <string>fbapi20150313<\/string>\n    <string>fbapi20150629<\/string>\n    <string>fbapi20160328<\/string>\n    <string>fbauth<\/string>\n    <string>fbshareextension<\/string>/' ios/RNFBSDKExample/Info.plist
rm -f ios/RNFBSDKExample/Info.plist??
sed -i -e 's/^<\/dict>/  <key>CFBundleURLTypes<\/key>\n  <array>\n    <dict>\n     <key>CFBundleURLSchemes<\/key>\n     <array>\n       <string>fb'${FacebookAppId}'<\/string>\n     <\/array>\n   <\/dict>\n  <\/array>\n<\/dict>/' ios/RNFBSDKExample/Info.plist
rm -f ios/RNFBSDKExample/Info.plist??

# You may want to integrate Facebook's content provider
# Hmm - commented out 20240926 by mikehardy - causes insta-crash on startup now
# sed -i -e 's/<\/application>/  <provider android:name="com.facebook.FacebookContentProvider" android:authorities="com.facebook.app.FacebookContentProvider355198514515820" android:exported="true" \/>\n    <\/application>/' android/app/src/main/AndroidManifest.xml
# rm -f android/app/src/main/AndroidManifest.xml??


# Install the results
pushd ios && pod deintegrate && pod install && popd

# Copy the important files back in
popd
echo "Copying persistent example files into refreshed example..."
cp -frv TEMP/* RNFBSDKExample/

# Clean up after ourselves
\rm -fr TEMP
