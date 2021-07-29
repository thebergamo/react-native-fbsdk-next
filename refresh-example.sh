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
  cp RNFBSDKExample/App.js TEMP/
fi

# Purge the old sample
\rm -fr RNFBSDKExample

# Make the new example
npx react-native init RNFBSDKExample
pushd RNFBSDKExample
yarn add github:thebergamo/react-native-fbsdk-next

# Patch in our Facebook App ID - note this one does not work, but it *does* initialize and prove things to a point.
# You may specify your own in these files to test your app.
sed -i -e 's/<\/resources>/    <string name="facebook_app_id">950110338385665<\/string>\n<\/resources>/' android/app/src/main/res/values/strings.xml
rm -f android/app/src/main/res/values/strings.xml??
sed -i -e 's/^<\/dict>/  <key>FacebookAppID<\/key>\n  <string>950110338385665<\/string>\n<\/dict>/' ios/RNFBSDKExample/Info.plist
rm -f ios/RNFBSDKExample/Info.plist??

# Patch the AndroidManifest directly to add our SDK initialization bit
sed -i -e 's/<\/application>/  <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string\/facebook_app_id"\/>\\\n    <\/application>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??

# Mixing Swift and Objective-C in a project may be problematic and react-native is Objective-C mostly while the SDK is Swift.
# Workaround:  https://github.com/facebookarchive/react-native-fbsdk/issues/755#issuecomment-787488994
sed -i -e $'s/react_native_post_install(installer)/react_native_post_install(installer)\\\n    \\\n    # Mixing Swift and Objective-C in a react-native project may be problematic.\\\n    # Workaround:  https:\/\/github.com\/facebookarchive\/react-native-fbsdk\/issues\/755#issuecomment-787488994\\\n    installer.aggregate_targets.first.user_project.native_targets.each do |target|\\\n      target.build_configurations.each do |config|\\\n        config.build_settings[\'LIBRARY_SEARCH_PATHS\'] = [\'$(inherited)\', \'$(SDKROOT)\/usr\/lib\/swift\']\\\n      end\\\n    end/' ios/Podfile
rm -f ios/Podfile??

pushd ios && pod deintegrate && pod install && popd

# Copy the important files back in
popd
echo "Copying persistent example files into refreshed example..."
cp -frv TEMP/* RNFBSDKExample/

# Clean up after ourselves
\rm -fr TEMP
