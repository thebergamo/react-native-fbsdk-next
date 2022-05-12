import { ExpoConfig } from '@expo/config-types';

export type ExpoConfigFacebook = Pick<
  ExpoConfig,
  | 'facebookScheme'
  | 'facebookAdvertiserIDCollectionEnabled'
  | 'facebookAppId'
  | 'facebookAutoInitEnabled'
  | 'facebookAutoLogAppEventsEnabled'
  | 'facebookDisplayName'
>;

export type ConfigProps = {
  /**
   * Used for all Facebook libraries. Set up your Facebook App ID at https://developers.facebook.com.
   */
  appID?: string;
  /**
   * Used for native Facebook login.
   */
  displayName?: string;
  /**
   * Used for Facebook native login. Starts with 'fb' and followed by a string of digits, like 'fb1234567890'. You can find your scheme [here](https://developers.facebook.com/docs/facebook-login/ios)in the 'Configuring Your info.plist' section (only applicable to standalone apps and custom Expo Go apps).
   */
  scheme?: string;

  clientToken?: string;
  /**
   * Whether the Facebook SDK should be initialized automatically. The default in Expo (Client and in standalone apps) is `false`.
   */
  isAutoInitEnabled?: boolean;
  /**
   * Whether the Facebook SDK log app events automatically. If you don't set this property, Facebook's default will be used. (Applicable only to standalone apps.) Note: The Facebook SDK must be initialized for app events to work. You may autoinitialize Facebook SDK by setting `isAutoInitEnabled` to `true`
   */
  autoLogAppEventsEnabled?: boolean;
  /**
   * Whether the Facebook SDK should collect advertiser ID properties, like the Apple IDFA and Android Advertising ID, automatically. If you don't set this property, Facebook's default policy will be used. (Applicable only to standalone apps.)
   */
  advertiserIDCollectionEnabled?: boolean;

  /**
   * Sets the iOS `NSUserTrackingUsageDescription` permission message in the `Info.plist`.
   * Passing `false` will skip adding the permission.
   * @default 'This identifier will be used to deliver personalized ads to you.'
   */
  iosUserTrackingPermission?: string | false;
};

export function getMergePropsWithConfig(
  config: ExpoConfigFacebook,
  props: ConfigProps | void
): ConfigProps {
  const {
    facebookAppId,
    facebookDisplayName,
    facebookScheme,
    facebookAutoInitEnabled,
    facebookAutoLogAppEventsEnabled,
    facebookAdvertiserIDCollectionEnabled,
  } = config;
  const {
    appID = facebookAppId,
    clientToken,
    displayName = facebookDisplayName,
    scheme = facebookScheme ?? (appID ? `fb${appID}` : undefined),
    isAutoInitEnabled = facebookAutoInitEnabled ?? false,
    autoLogAppEventsEnabled = facebookAutoLogAppEventsEnabled ?? false,
    advertiserIDCollectionEnabled = facebookAdvertiserIDCollectionEnabled ?? false,
    iosUserTrackingPermission,
  } = (props ?? {}) as ConfigProps;

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

export function getFacebookAppId(config: ConfigProps) {
  return config.appID ?? null;
}

export function getFacebookClientToken(config: ConfigProps) {
  return config.clientToken ?? null;
}

export function getFacebookScheme(config: ConfigProps) {
  return config.scheme ?? null;
}

export function getFacebookDisplayName(config: ConfigProps) {
  return config.displayName ?? null;
}

export function getFacebookAutoInitEnabled(config: ConfigProps) {
  return config.isAutoInitEnabled ?? null;
}

export function getFacebookAutoLogAppEvents(config: ConfigProps) {
  return config.autoLogAppEventsEnabled ?? null;
}

export function getFacebookAdvertiserIDCollection(config: ConfigProps) {
  return config.advertiserIDCollectionEnabled ?? null;
}
