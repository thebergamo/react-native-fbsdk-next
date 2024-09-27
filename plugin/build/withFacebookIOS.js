"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withUserTrackingPermission = exports.setFacebookApplicationQuerySchemes = exports.setFacebookDisplayName = exports.setFacebookClientToken = exports.setFacebookAppId = exports.setFacebookAdvertiserIDCollectionEnabled = exports.setFacebookAutoLogAppEventsEnabled = exports.setFacebookAutoInitEnabled = exports.setFacebookScheme = exports.setFacebookConfig = exports.withFacebookIOS = void 0;
const config_1 = require("./config");
const config_plugins_1 = require("@expo/config-plugins");
const { Scheme } = config_plugins_1.IOSConfig;
const { appendScheme } = Scheme;
const fbSchemes = ['fbapi', 'fb-messenger-api', 'fbauth2', 'fbshareextension'];
const withFacebookIOS = (config, props) => {
    return (0, config_plugins_1.withInfoPlist)(config, (config) => {
        config.modResults = setFacebookConfig(props, config.modResults);
        return config;
    });
};
exports.withFacebookIOS = withFacebookIOS;
function setFacebookConfig(config, infoPlist) {
    infoPlist = setFacebookAppId(config, infoPlist);
    infoPlist = setFacebookClientToken(config, infoPlist);
    infoPlist = setFacebookApplicationQuerySchemes(config, infoPlist);
    infoPlist = setFacebookDisplayName(config, infoPlist);
    infoPlist = setFacebookAutoInitEnabled(config, infoPlist);
    infoPlist = setFacebookAutoLogAppEventsEnabled(config, infoPlist);
    infoPlist = setFacebookAdvertiserIDCollectionEnabled(config, infoPlist);
    infoPlist = setFacebookScheme(config, infoPlist);
    return infoPlist;
}
exports.setFacebookConfig = setFacebookConfig;
function setFacebookScheme(config, infoPlist) {
    const facebookScheme = (0, config_1.getFacebookScheme)(config);
    if (!facebookScheme) {
        return infoPlist;
    }
    if (infoPlist.CFBundleURLTypes?.some(({ CFBundleURLSchemes }) => CFBundleURLSchemes.includes(facebookScheme))) {
        return infoPlist;
    }
    return appendScheme(facebookScheme, infoPlist);
}
exports.setFacebookScheme = setFacebookScheme;
function setFacebookAutoInitEnabled(config, { FacebookAutoInitEnabled: _, ...infoPlist }) {
    const isAutoInitEnabled = (0, config_1.getFacebookAutoInitEnabled)(config);
    if (isAutoInitEnabled === null) {
        return infoPlist;
    }
    return {
        ...infoPlist,
        FacebookAutoInitEnabled: isAutoInitEnabled,
    };
}
exports.setFacebookAutoInitEnabled = setFacebookAutoInitEnabled;
function setFacebookAutoLogAppEventsEnabled(config, { FacebookAutoLogAppEventsEnabled: _, ...infoPlist }) {
    const autoLogAppEventsEnabled = (0, config_1.getFacebookAutoLogAppEvents)(config);
    if (autoLogAppEventsEnabled === null) {
        return infoPlist;
    }
    return {
        ...infoPlist,
        FacebookAutoLogAppEventsEnabled: autoLogAppEventsEnabled,
    };
}
exports.setFacebookAutoLogAppEventsEnabled = setFacebookAutoLogAppEventsEnabled;
function setFacebookAdvertiserIDCollectionEnabled(config, { FacebookAdvertiserIDCollectionEnabled: _, ...infoPlist }) {
    const advertiserIDCollectionEnabled = (0, config_1.getFacebookAdvertiserIDCollection)(config);
    if (advertiserIDCollectionEnabled === null) {
        return infoPlist;
    }
    return {
        ...infoPlist,
        FacebookAdvertiserIDCollectionEnabled: advertiserIDCollectionEnabled,
    };
}
exports.setFacebookAdvertiserIDCollectionEnabled = setFacebookAdvertiserIDCollectionEnabled;
function setFacebookAppId(config, { FacebookAppID: _, ...infoPlist }) {
    const appID = (0, config_1.getFacebookAppId)(config);
    if (appID) {
        return {
            ...infoPlist,
            FacebookAppID: appID,
        };
    }
    return infoPlist;
}
exports.setFacebookAppId = setFacebookAppId;
function setFacebookClientToken(config, { FacebookClientToken: _, ...infoPlist }) {
    const clientToken = (0, config_1.getFacebookClientToken)(config);
    if (clientToken) {
        return {
            ...infoPlist,
            FacebookClientToken: clientToken,
        };
    }
    return infoPlist;
}
exports.setFacebookClientToken = setFacebookClientToken;
function setFacebookDisplayName(config, { FacebookDisplayName: _, ...infoPlist }) {
    const facebookDisplayName = (0, config_1.getFacebookDisplayName)(config);
    if (facebookDisplayName) {
        return {
            ...infoPlist,
            FacebookDisplayName: facebookDisplayName,
        };
    }
    return infoPlist;
}
exports.setFacebookDisplayName = setFacebookDisplayName;
function setFacebookApplicationQuerySchemes(config, infoPlist) {
    const facebookAppId = (0, config_1.getFacebookAppId)(config);
    const existingSchemes = infoPlist.LSApplicationQueriesSchemes || [];
    if (facebookAppId && existingSchemes.includes('fbapi')) {
        // already included, no need to add again
        return infoPlist;
    }
    else if (!facebookAppId && !existingSchemes.length) {
        // already removed, no need to strip again
        const { LSApplicationQueriesSchemes, ...restInfoPlist } = infoPlist;
        if (LSApplicationQueriesSchemes?.length) {
            return infoPlist;
        }
        else {
            // Return without the empty LSApplicationQueriesSchemes array.
            return restInfoPlist;
        }
    }
    // Remove all schemes
    for (const scheme of fbSchemes) {
        const index = existingSchemes.findIndex((s) => s === scheme);
        if (index > -1) {
            existingSchemes.splice(index, 1);
        }
    }
    if (!facebookAppId) {
        // Run again to ensure the LSApplicationQueriesSchemes array is stripped if needed.
        infoPlist.LSApplicationQueriesSchemes = existingSchemes;
        if (!infoPlist.LSApplicationQueriesSchemes.length) {
            delete infoPlist.LSApplicationQueriesSchemes;
        }
        return infoPlist;
    }
    // TODO: it's actually necessary to add more query schemes (specific to the
    // app) to support all of the features that the Facebook SDK provides, should
    // we sync those here too?
    const updatedSchemes = [...existingSchemes, ...fbSchemes];
    return {
        ...infoPlist,
        LSApplicationQueriesSchemes: updatedSchemes,
    };
}
exports.setFacebookApplicationQuerySchemes = setFacebookApplicationQuerySchemes;
const withUserTrackingPermission = (config, { iosUserTrackingPermission } = {}) => {
    if (!iosUserTrackingPermission) {
        return config;
    }
    if (!config.ios) {
        config.ios = {};
    }
    if (!config.ios.infoPlist) {
        config.ios.infoPlist = {};
    }
    config.ios.infoPlist.NSUserTrackingUsageDescription =
        iosUserTrackingPermission ||
            config.ios.infoPlist.NSUserTrackingUsageDescription;
    return config;
};
exports.withUserTrackingPermission = withUserTrackingPermission;
