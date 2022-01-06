/**
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import {NativeModules, Platform} from 'react-native';

/**
 * Aggregated Event Measurement (AEM) for iOS apps allows for the measurement of app events
 * from iOS 14.5+ users who have opted out of app tracking.
 *
 * @ref https://developers.facebook.com/docs/app-events/guides/aggregated-event-measurement/
 */
export default {
  /**
   * Log AEM event, event names for AEM must match event names you used in app event logging.
   *
   * *This method will bypass if platform isn't iOS*
   *
   * **Make sure you also handle the DeepLink URL with AEM**
   *
   * @ref https://developers.facebook.com/docs/app-events/guides/aggregated-event-measurement/
   * @platform iOS
   */
  logAEMEvent: (
    eventName: string,
    value: number,
    currency?: string,
    otherParameters?: Record<string, string | number>,
  ) => {
    // AEM is currently only for iOS
    if (Platform.OS !== 'ios') {
      return;
    }

    NativeModules.FBSDKAEMReporter.recordAndUpdateEvent(
      eventName,
      value,
      currency,
      otherParameters,
    );
  },
};
