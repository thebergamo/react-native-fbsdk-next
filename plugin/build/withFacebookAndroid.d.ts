import { ConfigProps } from './config';
import { AndroidConfig, ConfigPlugin } from '@expo/config-plugins';
export declare const withFacebookAppIdString: ConfigPlugin<ConfigProps>;
export declare const withFacebookManifest: ConfigPlugin<ConfigProps>;
export declare const withAndroidPermissions: ConfigPlugin<ConfigProps>;
export declare function setFacebookConfig(props: ConfigProps, androidManifest: AndroidConfig.Manifest.AndroidManifest): AndroidConfig.Manifest.AndroidManifest;
