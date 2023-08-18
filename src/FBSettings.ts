/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import {isDefined, isString, isValidGraphAPIVersion} from './util/validate';
import {Platform, NativeModules} from 'react-native';

const Settings = NativeModules.FBSettings;

export default {
  /**
   * For iOS only, get AdvertiserTrackingEnabled status.
   * @platform ios
   */
  getAdvertiserTrackingEnabled(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      return Settings.getAdvertiserTrackingEnabled();
    } else {
      return Promise.resolve(true);
    }
  },
  /**
   * For iOS only, set AdvertiserTrackingEnabled status, only works in iOS 14 and above.
   * @platform ios
   */
  setAdvertiserTrackingEnabled(ATE: boolean): Promise<boolean> {
    if (Platform.OS === 'ios') {
      return Settings.setAdvertiserTrackingEnabled(ATE);
    } else {
      return Promise.resolve(false);
    }
  },
  /**
   * Set data processing options
   */
  setDataProcessingOptions(options: Array<string>, ...args: Array<number>) {
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
  setAppID(appID: string) {
    if (!isDefined(appID) || !isString(appID) || appID.length === 0) {
      throw new Error("setAppID expected 'appID' to be a non empty string");
    }
    Settings.setAppID(appID);
  },
  /**
   * Set clientToken
   */
  setClientToken(clientToken: string) {
    if (
      !isDefined(clientToken) ||
      !isString(clientToken) ||
      clientToken.length === 0
    ) {
      throw new Error(
        "setClientToken expected 'clientToken' to be a non empty string",
      );
    }
    Settings.setClientToken(clientToken);
  },
  /**
   * Sets the Facebook application name for the current app.
   */
  setAppName(appName: string) {
    if (!isDefined(appName) || !isString(appName) || appName.length === 0) {
      throw new Error("setAppName expected 'appName' to be a non empty string");
    }
    Settings.setAppName(appName);
  },
  /**
   * Sets the Graph API version to use when making Graph requests.
   */
  setGraphAPIVersion(version: string) {
    if (
      !isDefined(version) ||
      !isString(version) ||
      version.length === 0 ||
      !isValidGraphAPIVersion(version)
    ) {
      throw new Error(
        "setGraphAPIVersion expected 'version' to be a non empty string",
      );
    }
    Settings.setGraphAPIVersion(version);
  },
  /**
   * Sets whether Facebook SDK should log app events. App events involve eg. app installs,
   * app launches etc.
   */
  setAutoLogAppEventsEnabled(enabled: boolean) {
    Settings.setAutoLogAppEventsEnabled(enabled);
  },
  /**
   * Whether the Facebook SDK should collect advertiser ID properties, like the Apple IDFA
   * and Android Advertising ID, automatically. Advertiser IDs let you identify and target
   * specific customers.
   */
  setAdvertiserIDCollectionEnabled(enabled: boolean) {
    Settings.setAdvertiserIDCollectionEnabled(enabled);
  },
};
