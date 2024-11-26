type FacebookPluginConfig = {
    scheme?: string;
    advertiserIDCollectionEnabled?: boolean;
    appId?: string;
    autoInitEnabled?: boolean;
    autoLogAppEventsEnabled?: boolean;
    displayName?: string;
};
export type ExpoConfigFacebook = {
    plugins: {
        facebook: FacebookPluginConfig;
    };
};
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
     */
    iosUserTrackingPermission?: string | false;
};
export declare function getMergePropsWithConfig(config: ExpoConfigFacebook, props: ConfigProps | void): ConfigProps;
export declare function getFacebookAppId(config: ConfigProps): string | null;
export declare function getFacebookClientToken(config: ConfigProps): string | null;
export declare function getFacebookScheme(config: ConfigProps): string | null;
export declare function getFacebookDisplayName(config: ConfigProps): string | null;
export declare function getFacebookAutoInitEnabled(config: ConfigProps): boolean | null;
export declare function getFacebookAutoLogAppEvents(config: ConfigProps): boolean | null;
export declare function getFacebookAdvertiserIDCollection(config: ConfigProps): boolean | null;
export {};
