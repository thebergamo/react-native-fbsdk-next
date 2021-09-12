/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *

 * @format
 */


import {Platform, NativeModules} from 'react-native';
import {isDefined, isString} from './util/validate';

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
    let country: number = 0;
    if (typeof args[0] === 'number') {
      country = args[0];
    }
    let state: number = 0;
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
};
