"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const withFacebookAndroid_1 = require("./withFacebookAndroid");
const withFacebookIOS_1 = require("./withFacebookIOS");
const withSKAdNetworkIdentifiers_1 = require("./withSKAdNetworkIdentifiers");
const config_plugins_1 = require("@expo/config-plugins");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('react-native-fbsdk-next/package.json');
const withFacebook = (config, props) => {
    const newProps = (0, config_1.getMergePropsWithConfig)(config, props);
    if (!newProps.appID) {
        throw new Error('missing appID in the plugin properties');
    }
    if (!newProps.displayName) {
        throw new Error('missing displayName in the plugin properties');
    }
    if (!newProps.scheme) {
        throw new Error('missing scheme in the plugin properties');
    }
    // Android
    config = (0, withFacebookAndroid_1.withFacebookAppIdString)(config, newProps);
    config = (0, withFacebookAndroid_1.withFacebookManifest)(config, newProps);
    config = (0, withFacebookAndroid_1.withAndroidPermissions)(config, newProps);
    // iOS
    config = (0, withFacebookIOS_1.withFacebookIOS)(config, newProps);
    config = (0, withFacebookIOS_1.withUserTrackingPermission)(config, newProps);
    // https://developers.facebook.com/docs/SKAdNetwork
    config = (0, withSKAdNetworkIdentifiers_1.withSKAdNetworkIdentifiers)(config, [
        'v9wttpbfk9.skadnetwork',
        'n38lu8286q.skadnetwork',
    ]);
    return config;
};
exports.default = (0, config_plugins_1.createRunOncePlugin)(withFacebook, pkg.name, pkg.version);
