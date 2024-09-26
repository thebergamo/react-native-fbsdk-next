"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMergePropsWithConfig = getMergePropsWithConfig;
exports.getFacebookAppId = getFacebookAppId;
exports.getFacebookClientToken = getFacebookClientToken;
exports.getFacebookScheme = getFacebookScheme;
exports.getFacebookDisplayName = getFacebookDisplayName;
exports.getFacebookAutoInitEnabled = getFacebookAutoInitEnabled;
exports.getFacebookAutoLogAppEvents = getFacebookAutoLogAppEvents;
exports.getFacebookAdvertiserIDCollection = getFacebookAdvertiserIDCollection;
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
function getFacebookAppId(config) {
    return config.appID ?? null;
}
function getFacebookClientToken(config) {
    return config.clientToken ?? null;
}
function getFacebookScheme(config) {
    return config.scheme ?? null;
}
function getFacebookDisplayName(config) {
    return config.displayName ?? null;
}
function getFacebookAutoInitEnabled(config) {
    return config.isAutoInitEnabled ?? null;
}
function getFacebookAutoLogAppEvents(config) {
    return config.autoLogAppEventsEnabled ?? null;
}
function getFacebookAdvertiserIDCollection(config) {
    return config.advertiserIDCollectionEnabled ?? null;
}
