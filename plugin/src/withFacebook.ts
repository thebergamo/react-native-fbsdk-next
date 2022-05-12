import {ConfigProps, getMergePropsWithConfig} from './config';
import {
  withAndroidPermissions,
  withFacebookAppIdString,
  withFacebookManifest,
} from './withFacebookAndroid';
import {withFacebookIOS, withUserTrackingPermission} from './withFacebookIOS';
import {withSKAdNetworkIdentifiers} from './withSKAdNetworkIdentifiers';
import {ConfigPlugin, createRunOncePlugin} from '@expo/config-plugins';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('react-native-fbsdk-next/package.json');

const withFacebook: ConfigPlugin<ConfigProps | void> = (config, props) => {
  const newProps = getMergePropsWithConfig(config, props);
  if (!newProps.appID) {
    throw new Error('missing appID in the plugin properties');
  }
  if (!newProps.displayName) {
    throw new Error('missing displayName in the plugin properties');
  }
  if (!newProps.scheme) {
    throw new Error('missing scheme in the plugin properties');
  }

  // Android
  config = withFacebookAppIdString(config, newProps);
  config = withFacebookManifest(config, newProps);
  config = withAndroidPermissions(config, newProps);

  // iOS
  config = withFacebookIOS(config, newProps);
  config = withUserTrackingPermission(config, newProps);
  // https://developers.facebook.com/docs/SKAdNetwork
  config = withSKAdNetworkIdentifiers(config, [
    'v9wttpbfk9.skadnetwork',
    'n38lu8286q.skadnetwork',
  ]);

  return config;
};

export default createRunOncePlugin(withFacebook, pkg.name, pkg.version);
