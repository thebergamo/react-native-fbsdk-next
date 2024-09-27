import { ConfigProps } from './config';
import { ConfigPlugin, InfoPlist } from '@expo/config-plugins';
export declare const withFacebookIOS: ConfigPlugin<ConfigProps>;
export declare function setFacebookConfig(config: ConfigProps, infoPlist: InfoPlist): InfoPlist;
export declare function setFacebookScheme(config: ConfigProps, infoPlist: InfoPlist): InfoPlist;
export declare function setFacebookAutoInitEnabled(config: ConfigProps, { FacebookAutoInitEnabled, ...infoPlist }: InfoPlist): InfoPlist;
export declare function setFacebookAutoLogAppEventsEnabled(config: ConfigProps, { FacebookAutoLogAppEventsEnabled, ...infoPlist }: InfoPlist): InfoPlist;
export declare function setFacebookAdvertiserIDCollectionEnabled(config: ConfigProps, { FacebookAdvertiserIDCollectionEnabled, ...infoPlist }: InfoPlist): InfoPlist;
export declare function setFacebookAppId(config: ConfigProps, { FacebookAppID, ...infoPlist }: InfoPlist): InfoPlist;
export declare function setFacebookClientToken(config: ConfigProps, { FacebookClientToken, ...infoPlist }: InfoPlist): InfoPlist;
export declare function setFacebookDisplayName(config: ConfigProps, { FacebookDisplayName, ...infoPlist }: InfoPlist): InfoPlist;
export declare function setFacebookApplicationQuerySchemes(config: ConfigProps, infoPlist: InfoPlist): InfoPlist;
export declare const withUserTrackingPermission: ConfigPlugin<{
    iosUserTrackingPermission?: string | false;
} | void>;
