import {ConfigProps, getMergePropsWithConfig} from './config';
import {
  withAndroidPermissions,
  withFacebookAppIdString,
  withFacebookManifest,
} from './withFacebookAndroid';
import {withFacebookIOS, withUserTrackingPermission} from './withFacebookIOS';
import {withSKAdNetworkIdentifiers} from './withSKAdNetworkIdentifiers';
import {ExpoConfig} from '@expo/config-types';
import {ConfigPlugin, createRunOncePlugin} from '@expo/config-plugins';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('react-native-fbsdk-next/package.json');

function getExpoFacebookConfig(config: ExpoConfig) {
  const facebookPlugin = config.plugins?.find((plugin) => {
    if (Array.isArray(plugin) && plugin[0] === 'facebook') {
      return true;
    }
    return false;
  });

  if (Array.isArray(facebookPlugin) && facebookPlugin.length > 1) {
    return {
      plugins: {
        facebook: facebookPlugin[1],
      },
    };
  }

  return {
    plugins: {
      facebook: {},
    },
  };
}

const withFacebook: ConfigPlugin<ConfigProps | void> = (config, props) => {
  // Convert ExpoConfig to ExpoConfigFacebook format
  const facebookConfig = getExpoFacebookConfig(config);

  // Merge the configs
  const newProps = getMergePropsWithConfig(facebookConfig, props);

  // Validation
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
