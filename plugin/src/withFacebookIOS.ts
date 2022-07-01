import {
  ConfigProps,
  getFacebookAdvertiserIDCollection,
  getFacebookAppId,
  getFacebookClientToken,
  getFacebookAutoInitEnabled,
  getFacebookAutoLogAppEvents,
  getFacebookDisplayName,
  getFacebookScheme,
} from './config';
import {
  ConfigPlugin,
  InfoPlist,
  IOSConfig,
  withInfoPlist,
} from '@expo/config-plugins';

const {Scheme} = IOSConfig;
const {appendScheme} = Scheme;

const fbSchemes = ['fbapi', 'fb-messenger-api', 'fbauth2', 'fbshareextension'];

export const withFacebookIOS: ConfigPlugin<ConfigProps> = (config, props) => {
  return withInfoPlist(config, (config) => {
    config.modResults = setFacebookConfig(props, config.modResults);
    return config;
  });
};

export function setFacebookConfig(config: ConfigProps, infoPlist: InfoPlist) {
  infoPlist = setFacebookAppId(config, infoPlist);
  infoPlist = setFacebookClientToken(config, infoPlist);
  infoPlist = setFacebookApplicationQuerySchemes(config, infoPlist);
  infoPlist = setFacebookDisplayName(config, infoPlist);
  infoPlist = setFacebookAutoInitEnabled(config, infoPlist);
  infoPlist = setFacebookAutoLogAppEventsEnabled(config, infoPlist);
  infoPlist = setFacebookAdvertiserIDCollectionEnabled(config, infoPlist);
  infoPlist = setFacebookScheme(config, infoPlist);
  return infoPlist;
}

export function setFacebookScheme(config: ConfigProps, infoPlist: InfoPlist) {
  const facebookScheme = getFacebookScheme(config);
  if (!facebookScheme) {
    return infoPlist;
  }

  if (
    infoPlist.CFBundleURLTypes?.some(({CFBundleURLSchemes}) =>
      CFBundleURLSchemes.includes(facebookScheme),
    )
  ) {
    return infoPlist;
  }

  return appendScheme(facebookScheme, infoPlist);
}

export function setFacebookAutoInitEnabled(
  config: ConfigProps,
  {FacebookAutoInitEnabled: _, ...infoPlist}: InfoPlist,
): InfoPlist {
  const isAutoInitEnabled = getFacebookAutoInitEnabled(config);
  if (isAutoInitEnabled === null) {
    return infoPlist;
  }

  return {
    ...infoPlist,
    FacebookAutoInitEnabled: isAutoInitEnabled,
  };
}

export function setFacebookAutoLogAppEventsEnabled(
  config: ConfigProps,
  {FacebookAutoLogAppEventsEnabled: _, ...infoPlist}: InfoPlist,
): InfoPlist {
  const autoLogAppEventsEnabled = getFacebookAutoLogAppEvents(config);
  if (autoLogAppEventsEnabled === null) {
    return infoPlist;
  }

  return {
    ...infoPlist,
    FacebookAutoLogAppEventsEnabled: autoLogAppEventsEnabled,
  };
}

export function setFacebookAdvertiserIDCollectionEnabled(
  config: ConfigProps,
  {FacebookAdvertiserIDCollectionEnabled: _, ...infoPlist}: InfoPlist,
): InfoPlist {
  const advertiserIDCollectionEnabled =
    getFacebookAdvertiserIDCollection(config);
  if (advertiserIDCollectionEnabled === null) {
    return infoPlist;
  }

  return {
    ...infoPlist,
    FacebookAdvertiserIDCollectionEnabled: advertiserIDCollectionEnabled,
  };
}

export function setFacebookAppId(
  config: ConfigProps,
  {FacebookAppID: _, ...infoPlist}: InfoPlist,
): InfoPlist {
  const appID = getFacebookAppId(config);
  if (appID) {
    return {
      ...infoPlist,
      FacebookAppID: appID,
    };
  }

  return infoPlist;
}

export function setFacebookClientToken(
  config: ConfigProps,
  {FacebookClientToken: _, ...infoPlist}: InfoPlist,
): InfoPlist {
  const clientToken = getFacebookClientToken(config);
  if (clientToken) {
    return {
      ...infoPlist,
      FacebookClientToken: clientToken,
    };
  }

  return infoPlist;
}

export function setFacebookDisplayName(
  config: ConfigProps,
  {FacebookDisplayName: _, ...infoPlist}: InfoPlist,
): InfoPlist {
  const facebookDisplayName = getFacebookDisplayName(config);
  if (facebookDisplayName) {
    return {
      ...infoPlist,
      FacebookDisplayName: facebookDisplayName,
    };
  }

  return infoPlist;
}

export function setFacebookApplicationQuerySchemes(
  config: ConfigProps,
  infoPlist: InfoPlist,
): InfoPlist {
  const facebookAppId = getFacebookAppId(config);

  const existingSchemes = infoPlist.LSApplicationQueriesSchemes || [];

  if (facebookAppId && existingSchemes.includes('fbapi')) {
    // already included, no need to add again
    return infoPlist;
  } else if (!facebookAppId && !existingSchemes.length) {
    // already removed, no need to strip again
    const {LSApplicationQueriesSchemes, ...restInfoPlist} = infoPlist;
    if (LSApplicationQueriesSchemes?.length) {
      return infoPlist;
    } else {
      // Return without the empty LSApplicationQueriesSchemes array.
      return restInfoPlist;
    }
  }

  // Remove all schemes
  for (const scheme of fbSchemes) {
    const index = existingSchemes.findIndex((s) => s === scheme);
    if (index > -1) {
      existingSchemes.splice(index, 1);
    }
  }

  if (!facebookAppId) {
    // Run again to ensure the LSApplicationQueriesSchemes array is stripped if needed.
    infoPlist.LSApplicationQueriesSchemes = existingSchemes;
    if (!infoPlist.LSApplicationQueriesSchemes.length) {
      delete infoPlist.LSApplicationQueriesSchemes;
    }
    return infoPlist;
  }

  // TODO: it's actually necessary to add more query schemes (specific to the
  // app) to support all of the features that the Facebook SDK provides, should
  // we sync those here too?
  const updatedSchemes = [...existingSchemes, ...fbSchemes];

  return {
    ...infoPlist,
    LSApplicationQueriesSchemes: updatedSchemes,
  };
}

export const withUserTrackingPermission: ConfigPlugin<
  {
    iosUserTrackingPermission?: string | false;
  } | void
> = (config, {iosUserTrackingPermission} = {}) => {
  if (!iosUserTrackingPermission) {
    return config;
  }

  if (!config.ios) {
    config.ios = {};
  }
  if (!config.ios.infoPlist) {
    config.ios.infoPlist = {};
  }
  config.ios.infoPlist.NSUserTrackingUsageDescription =
    iosUserTrackingPermission ||
    config.ios.infoPlist.NSUserTrackingUsageDescription;

  return config;
};
