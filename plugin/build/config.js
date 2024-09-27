"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacebookAdvertiserIDCollection = exports.getFacebookAutoLogAppEvents = exports.getFacebookAutoInitEnabled = exports.getFacebookDisplayName = exports.getFacebookScheme = exports.getFacebookClientToken = exports.getFacebookAppId = exports.getMergePropsWithConfig = void 0;
function getMergePropsWithConfig(config, props) {
    const { facebookAppId, facebookDisplayName, facebookScheme, facebookAutoInitEnabled, facebookAutoLogAppEventsEnabled, facebookAdvertiserIDCollectionEnabled, } = config;
    const { appID = facebookAppId, clientToken, displayName = facebookDisplayName, scheme = facebookScheme ?? (appID ? `fb${appID}` : undefined), isAutoInitEnabled = facebookAutoInitEnabled ?? false, autoLogAppEventsEnabled = facebookAutoLogAppEventsEnabled ?? false, advertiserIDCollectionEnabled = facebookAdvertiserIDCollectionEnabled ??
        false, iosUserTrackingPermission, } = (props ?? {});
    return {
        appID,
        clientToken,
        displayName,
        scheme,
        isAutoInitEnabled,
        autoLogAppEventsEnabled,
        advertiserIDCollectionEnabled,
        iosUserTrackingPermission,
    };
}
exports.getMergePropsWithConfig = getMergePropsWithConfig;
function getFacebookAppId(config) {
    return config.appID ?? null;
}
exports.getFacebookAppId = getFacebookAppId;
function getFacebookClientToken(config) {
    return config.clientToken ?? null;
}
exports.getFacebookClientToken = getFacebookClientToken;
function getFacebookScheme(config) {
    return config.scheme ?? null;
}
exports.getFacebookScheme = getFacebookScheme;
function getFacebookDisplayName(config) {
    return config.displayName ?? null;
}
exports.getFacebookDisplayName = getFacebookDisplayName;
function getFacebookAutoInitEnabled(config) {
    return config.isAutoInitEnabled ?? null;
}
exports.getFacebookAutoInitEnabled = getFacebookAutoInitEnabled;
function getFacebookAutoLogAppEvents(config) {
    return config.autoLogAppEventsEnabled ?? null;
}
exports.getFacebookAutoLogAppEvents = getFacebookAutoLogAppEvents;
function getFacebookAdvertiserIDCollection(config) {
    return config.advertiserIDCollectionEnabled ?? null;
}
exports.getFacebookAdvertiserIDCollection = getFacebookAdvertiserIDCollection;
