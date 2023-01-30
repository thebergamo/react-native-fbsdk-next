"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacebookAdvertiserIDCollection = exports.getFacebookAutoLogAppEvents = exports.getFacebookAutoInitEnabled = exports.getFacebookDisplayName = exports.getFacebookScheme = exports.getFacebookClientToken = exports.getFacebookAppId = exports.getConfigProps = void 0;
function getConfigProps(props) {
    const { appID, clientToken, displayName, scheme = appID ? `fb${appID}` : undefined, isAutoInitEnabled = false, autoLogAppEventsEnabled = false, advertiserIDCollectionEnabled = false, iosUserTrackingPermission = false, } = (props !== null && props !== void 0 ? props : {});
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
exports.getConfigProps = getConfigProps;
function getFacebookAppId(config) {
    var _a;
    return (_a = config.appID) !== null && _a !== void 0 ? _a : null;
}
exports.getFacebookAppId = getFacebookAppId;
function getFacebookClientToken(config) {
    var _a;
    return (_a = config.clientToken) !== null && _a !== void 0 ? _a : null;
}
exports.getFacebookClientToken = getFacebookClientToken;
function getFacebookScheme(config) {
    var _a;
    return (_a = config.scheme) !== null && _a !== void 0 ? _a : null;
}
exports.getFacebookScheme = getFacebookScheme;
function getFacebookDisplayName(config) {
    var _a;
    return (_a = config.displayName) !== null && _a !== void 0 ? _a : null;
}
exports.getFacebookDisplayName = getFacebookDisplayName;
function getFacebookAutoInitEnabled(config) {
    var _a;
    return (_a = config.isAutoInitEnabled) !== null && _a !== void 0 ? _a : null;
}
exports.getFacebookAutoInitEnabled = getFacebookAutoInitEnabled;
function getFacebookAutoLogAppEvents(config) {
    var _a;
    return (_a = config.autoLogAppEventsEnabled) !== null && _a !== void 0 ? _a : null;
}
exports.getFacebookAutoLogAppEvents = getFacebookAutoLogAppEvents;
function getFacebookAdvertiserIDCollection(config) {
    var _a;
    return (_a = config.advertiserIDCollectionEnabled) !== null && _a !== void 0 ? _a : null;
}
exports.getFacebookAdvertiserIDCollection = getFacebookAdvertiserIDCollection;
