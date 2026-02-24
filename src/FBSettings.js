"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
const validate_1 = require("./util/validate");
const react_native_1 = require("react-native");
const Settings = react_native_1.NativeModules.FBSettings;
exports.default = {
    /**
     * For iOS only, get AdvertiserTrackingEnabled status.
     * @platform ios
     */
    getAdvertiserTrackingEnabled() {
        if (react_native_1.Platform.OS === 'ios') {
            return Settings.getAdvertiserTrackingEnabled();
        }
        else {
            return Promise.resolve(true);
        }
    },
    /**
     * For iOS only, set AdvertiserTrackingEnabled status, only works in iOS 14 and above.
     * @platform ios
     */
    setAdvertiserTrackingEnabled(ATE) {
        if (react_native_1.Platform.OS === 'ios') {
            return Settings.setAdvertiserTrackingEnabled(ATE);
        }
        else {
            return Promise.resolve(false);
        }
    },
    /**
     * Set data processing options
     */
    setDataProcessingOptions(options, ...args) {
        let country = 0;
        if (typeof args[0] === 'number') {
            country = args[0];
        }
        let state = 0;
        if (typeof args[1] === 'number') {
            state = args[1];
        }
        Settings.setDataProcessingOptions(options, country, state);
    },
    /**
     * Initialize the sdk
     */
    initializeSDK() {
        Settings.initializeSDK();
    },
    /**
     * Set app id
     */
    setAppID(appID) {
        if (!(0, validate_1.isDefined)(appID) || !(0, validate_1.isString)(appID) || appID.length === 0) {
            throw new Error("setAppID expected 'appID' to be a non empty string");
        }
        Settings.setAppID(appID);
    },
    /**
     * Set clientToken
     */
    setClientToken(clientToken) {
        if (!(0, validate_1.isDefined)(clientToken) ||
            !(0, validate_1.isString)(clientToken) ||
            clientToken.length === 0) {
            throw new Error("setClientToken expected 'clientToken' to be a non empty string");
        }
        Settings.setClientToken(clientToken);
    },
    /**
     * Sets the Facebook application name for the current app.
     */
    setAppName(appName) {
        if (!(0, validate_1.isDefined)(appName) || !(0, validate_1.isString)(appName) || appName.length === 0) {
            throw new Error("setAppName expected 'appName' to be a non empty string");
        }
        Settings.setAppName(appName);
    },
    /**
     * Sets the Graph API version to use when making Graph requests.
     */
    setGraphAPIVersion(version) {
        if (!(0, validate_1.isDefined)(version) ||
            !(0, validate_1.isString)(version) ||
            version.length === 0 ||
            !(0, validate_1.isValidGraphAPIVersion)(version)) {
            throw new Error("setGraphAPIVersion expected 'version' to be a non empty string");
        }
        Settings.setGraphAPIVersion(version);
    },
    /**
     * Sets whether Facebook SDK should log app events. App events involve eg. app installs,
     * app launches etc.
     */
    setAutoLogAppEventsEnabled(enabled) {
        Settings.setAutoLogAppEventsEnabled(enabled);
    },
    /**
     * Whether the Facebook SDK should collect advertiser ID properties, like the Apple IDFA
     * and Android Advertising ID, automatically. Advertiser IDs let you identify and target
     * specific customers.
     */
    setAdvertiserIDCollectionEnabled(enabled) {
        Settings.setAdvertiserIDCollectionEnabled(enabled);
    },
};
