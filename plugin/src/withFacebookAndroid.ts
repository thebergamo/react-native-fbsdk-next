import {
  ConfigProps,
  getFacebookAdvertiserIDCollection,
  getFacebookAppId,
  getFacebookAutoInitEnabled,
  getFacebookAutoLogAppEvents,
  getFacebookClientToken,
  getFacebookDisplayName,
  getFacebookScheme,
} from './config';
import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
  withStringsXml,
} from '@expo/config-plugins';
import {
  appendScheme,
  hasScheme,
} from '@expo/config-plugins/build/android/Scheme';

const {buildResourceItem} = AndroidConfig.Resources;
const {removeStringItem, setStringItem} = AndroidConfig.Strings;
const {
  addMetaDataItemToMainApplication,
  getMainApplicationOrThrow,
  prefixAndroidKeys,
  removeMetaDataItemFromMainApplication,
} = AndroidConfig.Manifest;

const CUSTOM_TAB_ACTIVITY = 'com.facebook.CustomTabActivity';
const STRING_FACEBOOK_APP_ID = 'facebook_app_id';
const STRING_FB_LOGIN_PROTOCOL_SCHEME = 'fb_login_protocol_scheme';
const STRING_FACEBOOK_CLIENT_TOKEN = 'facebook_client_token';
const META_APP_ID = 'com.facebook.sdk.ApplicationId';
const META_CLIENT_TOKEN = 'com.facebook.sdk.ClientToken';
const META_APP_NAME = 'com.facebook.sdk.ApplicationName';
const META_AUTO_INIT = 'com.facebook.sdk.AutoInitEnabled';
const META_AUTO_LOG_APP_EVENTS = 'com.facebook.sdk.AutoLogAppEventsEnabled';
const META_AD_ID_COLLECTION = 'com.facebook.sdk.AdvertiserIDCollectionEnabled';

export const withFacebookAppIdString: ConfigPlugin<ConfigProps> = (
  config,
  props,
) => {
  return withStringsXml(config, (config) => {
    config.modResults = applyFacebookAppIdString(props, config.modResults);
    config.modResults = applyFacebookClientTokenString(
      props,
      config.modResults,
    );
    config.modResults = applyFacebookLoginProtocolSchemeString(
      props,
      config.modResults,
    );
    return config;
  });
};

export const withFacebookManifest: ConfigPlugin<ConfigProps> = (
  config,
  props,
) => {
  return withAndroidManifest(config, (config) => {
    config.modResults = setFacebookConfig(props, config.modResults);
    return config;
  });
};

export const withAndroidPermissions: ConfigPlugin<ConfigProps> = (config) => {
  config = AndroidConfig.Permissions.withPermissions(config, [
    'android.permission.INTERNET',
  ]);
  return config;
};

function buildXMLItem({
  head,
  children,
}: {
  head: Record<string, string>;
  children?: Record<string, string | any[]>;
}) {
  return {...(children ?? {}), $: head};
}

function buildAndroidItem(datum: string | Record<string, any>) {
  const item = typeof datum === 'string' ? {name: datum} : datum;
  const head = prefixAndroidKeys(item);
  return buildXMLItem({head});
}

function getFacebookSchemeActivity() {
  /**
<activity
    android:name="com.facebook.CustomTabActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="@string/fb_login_protocol_scheme" />
    </intent-filter>
</activity>
   */
  return buildXMLItem({
    head: prefixAndroidKeys({
      name: CUSTOM_TAB_ACTIVITY,
      exported: 'true',
    }),
    children: {
      'intent-filter': [
        {
          action: [buildAndroidItem('android.intent.action.VIEW')],
          category: [
            buildAndroidItem('android.intent.category.DEFAULT'),
            buildAndroidItem('android.intent.category.BROWSABLE'),
          ],
          data: [
            buildAndroidItem({scheme: '@string/fb_login_protocol_scheme'}),
          ],
        },
      ],
    },
  }) as AndroidConfig.Manifest.ManifestActivity;
}

function ensureFacebookActivity({
  mainApplication,
  scheme,
}: {
  mainApplication: AndroidConfig.Manifest.ManifestApplication;
  scheme: string | null;
}) {
  if (Array.isArray(mainApplication.activity)) {
    // Remove all Facebook CustomTabActivities first
    mainApplication.activity = mainApplication.activity.filter((activity) => {
      return activity.$?.['android:name'] !== CUSTOM_TAB_ACTIVITY;
    });
  } else {
    mainApplication.activity = [];
  }

  // If a new scheme is defined, append it to the activity.
  if (scheme) {
    mainApplication.activity.push(getFacebookSchemeActivity());
  }
  return mainApplication;
}

function applyFacebookLoginProtocolSchemeString(
  props: ConfigProps,
  stringsJSON: AndroidConfig.Resources.ResourceXML,
) {
  const scheme = getFacebookScheme(props);
  if (scheme) {
    return setStringItem(
      [
        buildResourceItem({
          name: STRING_FB_LOGIN_PROTOCOL_SCHEME,
          value: scheme,
        }),
      ],
      stringsJSON,
    );
  }

  return removeStringItem(STRING_FB_LOGIN_PROTOCOL_SCHEME, stringsJSON);
}

function applyFacebookAppIdString(
  props: ConfigProps,
  stringsJSON: AndroidConfig.Resources.ResourceXML,
) {
  const appID = getFacebookAppId(props);
  if (appID) {
    return setStringItem(
      [buildResourceItem({name: STRING_FACEBOOK_APP_ID, value: appID})],
      stringsJSON,
    );
  }

  return removeStringItem(STRING_FACEBOOK_APP_ID, stringsJSON);
}

function applyFacebookClientTokenString(
  props: ConfigProps,
  stringsJSON: AndroidConfig.Resources.ResourceXML,
) {
  const clientToken = getFacebookClientToken(props);
  if (clientToken) {
    return setStringItem(
      [
        buildResourceItem({
          name: STRING_FACEBOOK_CLIENT_TOKEN,
          value: clientToken,
        }),
      ],
      stringsJSON,
    );
  }

  return removeStringItem(STRING_FACEBOOK_CLIENT_TOKEN, stringsJSON);
}

export function setFacebookConfig(
  props: ConfigProps,
  androidManifest: AndroidConfig.Manifest.AndroidManifest,
) {
  const scheme = getFacebookScheme(props);

  const appID = getFacebookAppId(props);
  const displayName = getFacebookDisplayName(props);
  const clientToken = getFacebookClientToken(props);
  const autoInitEnabled = getFacebookAutoInitEnabled(props);
  const autoLogAppEvents = getFacebookAutoLogAppEvents(props);
  const advertiserIdCollection = getFacebookAdvertiserIDCollection(props);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let mainApplication = getMainApplicationOrThrow(androidManifest);

  if (scheme && !hasScheme(scheme, androidManifest)) {
    androidManifest = appendScheme(scheme, androidManifest);
  }

  mainApplication = ensureFacebookActivity({scheme, mainApplication});

  if (appID) {
    mainApplication = addMetaDataItemToMainApplication(
      mainApplication,
      META_APP_ID,
      `@string/${STRING_FACEBOOK_APP_ID}`,
    );
  } else {
    mainApplication = removeMetaDataItemFromMainApplication(
      mainApplication,
      META_APP_ID,
    );
  }

  if (clientToken) {
    mainApplication = addMetaDataItemToMainApplication(
      mainApplication,
      META_CLIENT_TOKEN,
      `@string/${STRING_FACEBOOK_CLIENT_TOKEN}`,
    );
  } else {
    mainApplication = removeMetaDataItemFromMainApplication(
      mainApplication,
      META_CLIENT_TOKEN,
    );
  }

  if (displayName) {
    mainApplication = addMetaDataItemToMainApplication(
      mainApplication,
      META_APP_NAME,
      displayName,
    );
  } else {
    mainApplication = removeMetaDataItemFromMainApplication(
      mainApplication,
      META_APP_NAME,
    );
  }
  if (autoInitEnabled !== null) {
    mainApplication = addMetaDataItemToMainApplication(
      mainApplication,
      META_AUTO_INIT,
      autoInitEnabled ? 'true' : 'false',
    );
  } else {
    mainApplication = removeMetaDataItemFromMainApplication(
      mainApplication,
      META_AUTO_INIT,
    );
  }
  if (autoLogAppEvents !== null) {
    mainApplication = addMetaDataItemToMainApplication(
      mainApplication,
      META_AUTO_LOG_APP_EVENTS,
      autoLogAppEvents ? 'true' : 'false',
    );
  } else {
    mainApplication = removeMetaDataItemFromMainApplication(
      mainApplication,
      META_AUTO_LOG_APP_EVENTS,
    );
  }
  if (advertiserIdCollection !== null) {
    mainApplication = addMetaDataItemToMainApplication(
      mainApplication,
      META_AD_ID_COLLECTION,
      advertiserIdCollection ? 'true' : 'false',
    );
  } else {
    // eslint-disable-next-line
    mainApplication = removeMetaDataItemFromMainApplication(
      mainApplication,
      META_AD_ID_COLLECTION,
    );
  }

  return androidManifest;
}
