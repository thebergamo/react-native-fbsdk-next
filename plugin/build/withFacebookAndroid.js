"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFacebookConfig = exports.withAndroidPermissions = exports.withFacebookManifest = exports.withFacebookAppIdString = void 0;
const config_1 = require("./config");
const config_plugins_1 = require("@expo/config-plugins");
const { buildResourceItem } = config_plugins_1.AndroidConfig.Resources;
const { removeStringItem, setStringItem } = config_plugins_1.AndroidConfig.Strings;
const { addMetaDataItemToMainApplication, getMainApplicationOrThrow, prefixAndroidKeys, removeMetaDataItemFromMainApplication, } = config_plugins_1.AndroidConfig.Manifest;
const FACEBOOK_ACTIVITY = 'com.facebook.FacebookActivity';
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
const withFacebookAppIdString = (config, props) => {
    return (0, config_plugins_1.withStringsXml)(config, (config) => {
        config.modResults = applyFacebookAppIdString(props, config.modResults);
        config.modResults = applyFacebookClientTokenString(props, config.modResults);
        config.modResults = applyFacebookLoginProtocolSchemeString(props, config.modResults);
        return config;
    });
};
exports.withFacebookAppIdString = withFacebookAppIdString;
const withFacebookManifest = (config, props) => {
    return (0, config_plugins_1.withAndroidManifest)(config, (config) => {
        config.modResults = setFacebookConfig(props, config.modResults);
        return config;
    });
};
exports.withFacebookManifest = withFacebookManifest;
const withAndroidPermissions = (config) => {
    config = config_plugins_1.AndroidConfig.Permissions.withPermissions(config, [
        'android.permission.INTERNET',
    ]);
    return config;
};
exports.withAndroidPermissions = withAndroidPermissions;
function buildXMLItem({ head, children, }) {
    return { ...(children ?? {}), $: head };
}
function buildAndroidItem(datum) {
    const item = typeof datum === 'string' ? { name: datum } : datum;
    const head = prefixAndroidKeys(item);
    return buildXMLItem({ head });
}
function getFacebookActivity() {
    /**
  <activity android:name="com.facebook.FacebookActivity"
      android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
      android:label="@string/app_name" />
     */
    return buildXMLItem({
        head: prefixAndroidKeys({
            name: FACEBOOK_ACTIVITY,
            configChanges: 'keyboard|keyboardHidden|screenLayout|screenSize|orientation',
            label: '@string/app_name',
        }),
    });
}
function getCustomTabActivity() {
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
                        buildAndroidItem({ scheme: '@string/fb_login_protocol_scheme' }),
                    ],
                },
            ],
        },
    });
}
function ensureFacebookActivity({ mainApplication, scheme, }) {
    if (Array.isArray(mainApplication.activity)) {
        // Remove all Facebook CustomTabActivities first
        mainApplication.activity = mainApplication.activity.filter((activity) => {
            return ![FACEBOOK_ACTIVITY, CUSTOM_TAB_ACTIVITY].includes(activity.$?.['android:name']);
        });
    }
    else {
        mainApplication.activity = [];
    }
    // If a new scheme is defined, append it to the activity.
    if (scheme) {
        mainApplication.activity.push(getFacebookActivity());
        mainApplication.activity.push(getCustomTabActivity());
    }
    return mainApplication;
}
function applyFacebookLoginProtocolSchemeString(props, stringsJSON) {
    const scheme = (0, config_1.getFacebookScheme)(props);
    if (scheme) {
        return setStringItem([
            buildResourceItem({
                name: STRING_FB_LOGIN_PROTOCOL_SCHEME,
                value: scheme,
            }),
        ], stringsJSON);
    }
    return removeStringItem(STRING_FB_LOGIN_PROTOCOL_SCHEME, stringsJSON);
}
function applyFacebookAppIdString(props, stringsJSON) {
    const appID = (0, config_1.getFacebookAppId)(props);
    if (appID) {
        return setStringItem([buildResourceItem({ name: STRING_FACEBOOK_APP_ID, value: appID })], stringsJSON);
    }
    return removeStringItem(STRING_FACEBOOK_APP_ID, stringsJSON);
}
function applyFacebookClientTokenString(props, stringsJSON) {
    const clientToken = (0, config_1.getFacebookClientToken)(props);
    if (clientToken) {
        return setStringItem([
            buildResourceItem({
                name: STRING_FACEBOOK_CLIENT_TOKEN,
                value: clientToken,
            }),
        ], stringsJSON);
    }
    return removeStringItem(STRING_FACEBOOK_CLIENT_TOKEN, stringsJSON);
}
function setFacebookConfig(props, androidManifest) {
    const scheme = (0, config_1.getFacebookScheme)(props);
    const appID = (0, config_1.getFacebookAppId)(props);
    const displayName = (0, config_1.getFacebookDisplayName)(props);
    const clientToken = (0, config_1.getFacebookClientToken)(props);
    const autoInitEnabled = (0, config_1.getFacebookAutoInitEnabled)(props);
    const autoLogAppEvents = (0, config_1.getFacebookAutoLogAppEvents)(props);
    const advertiserIdCollection = (0, config_1.getFacebookAdvertiserIDCollection)(props);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let mainApplication = getMainApplicationOrThrow(androidManifest);
    mainApplication = ensureFacebookActivity({ scheme, mainApplication });
    if (appID) {
        mainApplication = addMetaDataItemToMainApplication(mainApplication, META_APP_ID, `@string/${STRING_FACEBOOK_APP_ID}`);
    }
    else {
        mainApplication = removeMetaDataItemFromMainApplication(mainApplication, META_APP_ID);
    }
    if (clientToken) {
        mainApplication = addMetaDataItemToMainApplication(mainApplication, META_CLIENT_TOKEN, `@string/${STRING_FACEBOOK_CLIENT_TOKEN}`);
    }
    else {
        mainApplication = removeMetaDataItemFromMainApplication(mainApplication, META_CLIENT_TOKEN);
    }
    if (displayName) {
        mainApplication = addMetaDataItemToMainApplication(mainApplication, META_APP_NAME, displayName);
    }
    else {
        mainApplication = removeMetaDataItemFromMainApplication(mainApplication, META_APP_NAME);
    }
    if (autoInitEnabled !== null) {
        mainApplication = addMetaDataItemToMainApplication(mainApplication, META_AUTO_INIT, autoInitEnabled ? 'true' : 'false');
    }
    else {
        mainApplication = removeMetaDataItemFromMainApplication(mainApplication, META_AUTO_INIT);
    }
    if (autoLogAppEvents !== null) {
        mainApplication = addMetaDataItemToMainApplication(mainApplication, META_AUTO_LOG_APP_EVENTS, autoLogAppEvents ? 'true' : 'false');
    }
    else {
        mainApplication = removeMetaDataItemFromMainApplication(mainApplication, META_AUTO_LOG_APP_EVENTS);
    }
    if (advertiserIdCollection !== null) {
        mainApplication = addMetaDataItemToMainApplication(mainApplication, META_AD_ID_COLLECTION, advertiserIdCollection ? 'true' : 'false');
    }
    else {
        // eslint-disable-next-line
        mainApplication = removeMetaDataItemFromMainApplication(mainApplication, META_AD_ID_COLLECTION);
    }
    return androidManifest;
}
exports.setFacebookConfig = setFacebookConfig;
