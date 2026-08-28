import {ConfigPlugin} from '@expo/config-plugins';

/**
 * Plugin to add [`SKAdNetworkIdentifier`](https://developer.apple.com/documentation/storekit/skadnetwork/configuring_the_participating_apps)s to the Info.plist safely.
 *
 *
 * @param config
 * @param props.identifiers array of lowercase string ids to push to the `SKAdNetworkItems` array in the `Info.plist`.
 */
export const withSKAdNetworkIdentifiers: ConfigPlugin<string[]> = (
  config,
  identifiers,
) => {
  if (!config.ios) {
    config.ios = {};
  }
  if (!config.ios.infoPlist) {
    config.ios.infoPlist = {};
  }
  if (!Array.isArray(config.ios.infoPlist.SKAdNetworkItems)) {
    config.ios.infoPlist.SKAdNetworkItems = [];
  }

  // Get ids
  const existingIds = new Set<string>();
  for (const item of config.ios.infoPlist.SKAdNetworkItems as Array<{
    SKAdNetworkIdentifier?: string;
  } | null>) {
    if (item?.SKAdNetworkIdentifier) {
      existingIds.add(item.SKAdNetworkIdentifier);
    }
  }

  for (const id of identifiers) {
    // Must be lowercase
    const lower = id.toLowerCase();
    if (!existingIds.has(lower)) {
      existingIds.add(lower);
      config.ios.infoPlist.SKAdNetworkItems.push({
        SKAdNetworkIdentifier: lower,
      });
    }
  }

  return config;
};
