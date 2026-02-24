"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const withFacebookIOS_1 = require("../withFacebookIOS");
describe('ios facebook config', () => {
    it(`returns null from all getters if no value provided`, () => {
        expect((0, config_1.getFacebookScheme)({})).toBe(null);
        expect((0, config_1.getFacebookAppId)({})).toBe(null);
        expect((0, config_1.getFacebookDisplayName)({})).toBe(null);
        expect((0, config_1.getFacebookAutoLogAppEvents)({})).toBe(null);
        expect((0, config_1.getFacebookAutoInitEnabled)({})).toBe(null);
        expect((0, config_1.getFacebookAdvertiserIDCollection)({})).toBe(null);
    });
    it(`returns correct value from all getters if value provided`, () => {
        expect((0, config_1.getFacebookScheme)({ scheme: 'fbscheme' })).toMatch('fbscheme');
        expect((0, config_1.getFacebookAppId)({ appID: 'my-app-id' })).toMatch('my-app-id');
        expect((0, config_1.getFacebookDisplayName)({ displayName: 'my-display-name' })).toMatch('my-display-name');
        expect((0, config_1.getFacebookAutoLogAppEvents)({ autoLogAppEventsEnabled: false })).toBe(false);
        expect((0, config_1.getFacebookAutoInitEnabled)({ isAutoInitEnabled: true })).toBe(true);
        expect((0, config_1.getFacebookAdvertiserIDCollection)({
            advertiserIDCollectionEnabled: false,
        })).toBe(false);
    });
    it('sets the facebook app id config', () => {
        expect((0, withFacebookIOS_1.setFacebookAppId)({ appID: 'abc' }, {})).toStrictEqual({
            FacebookAppID: 'abc',
        });
    });
    it('sets the facebook client token config', () => {
        expect((0, withFacebookIOS_1.setFacebookClientToken)({ clientToken: 'abc' }, {})).toStrictEqual({
            FacebookClientToken: 'abc',
        });
    });
    it('sets the facebook auto init config', () => {
        expect((0, withFacebookIOS_1.setFacebookAutoInitEnabled)({ isAutoInitEnabled: true }, {})).toStrictEqual({
            FacebookAutoInitEnabled: true,
        });
    });
    it('sets the facebook advertising id enabled config', () => {
        expect((0, withFacebookIOS_1.setFacebookAdvertiserIDCollectionEnabled)({ advertiserIDCollectionEnabled: true }, {})).toStrictEqual({
            FacebookAdvertiserIDCollectionEnabled: true,
        });
    });
    it('removes the facebook config', () => {
        expect((0, withFacebookIOS_1.setFacebookConfig)({}, {
            FacebookAdvertiserIDCollectionEnabled: true,
            FacebookAppID: 'my-app-id',
            FacebookClientToken: 'my-client-token',
            FacebookAutoInitEnabled: true,
            FacebookAutoLogAppEventsEnabled: true,
            FacebookDisplayName: 'my-display-name',
            LSApplicationQueriesSchemes: [
                'fbapi',
                'fb-messenger-api',
                'fbauth2',
                'fbshareextension',
            ],
        })).toStrictEqual({});
    });
    it('preserves the existing LSApplicationQueriesSchemes after removing the facebook schemes', () => {
        const plist = (0, withFacebookIOS_1.setFacebookConfig)({}, {
            LSApplicationQueriesSchemes: [
                'expo',
                'fbapi',
                'fb-messenger-api',
                'fbauth2',
                'fbshareextension',
            ],
        });
        // Test that running the command twice doesn't cause duplicates
        expect((0, withFacebookIOS_1.setFacebookConfig)({}, plist)).toStrictEqual({
            LSApplicationQueriesSchemes: ['expo'],
        });
    });
});
