import {
  getFacebookAdvertiserIDCollection,
  getFacebookAppId,
  getFacebookAutoInitEnabled,
  getFacebookAutoLogAppEvents,
  getFacebookDisplayName,
  getFacebookScheme,
} from '../config';
import {
  setFacebookAdvertiserIDCollectionEnabled,
  setFacebookAppId,
  setFacebookClientToken,
  setFacebookAutoInitEnabled,
  setFacebookConfig,
} from '../withFacebookIOS';
describe('ios facebook config', () => {
  it(`returns null from all getters if no value provided`, () => {
    expect(getFacebookScheme({})).toBe(null);
    expect(getFacebookAppId({})).toBe(null);
    expect(getFacebookDisplayName({})).toBe(null);
    expect(getFacebookAutoLogAppEvents({})).toBe(null);
    expect(getFacebookAutoInitEnabled({})).toBe(null);
    expect(getFacebookAdvertiserIDCollection({})).toBe(null);
  });

  it(`returns correct value from all getters if value provided`, () => {
    expect(getFacebookScheme({ scheme: 'fbscheme' })).toMatch(
      'fbscheme'
    );
    expect(getFacebookAppId({ appID: 'my-app-id' })).toMatch(
      'my-app-id'
    );
    expect(
      getFacebookDisplayName({ displayName: 'my-display-name' })
    ).toMatch('my-display-name');
    expect(
      getFacebookAutoLogAppEvents({ autoLogAppEventsEnabled: false })
    ).toBe(false);
    expect(getFacebookAutoInitEnabled({ isAutoInitEnabled: true })).toBe(
      true
    );
    expect(
      getFacebookAdvertiserIDCollection({
        advertiserIDCollectionEnabled: false,
      })
    ).toBe(false);
  });

  it('sets the facebook app id config', () => {
    expect(setFacebookAppId({ appID: 'abc' }, {})).toStrictEqual({
      FacebookAppID: 'abc',
    });
  });

  it('sets the facebook client token config', () => {
    expect(setFacebookClientToken({ clientToken: 'abc' }, {})).toStrictEqual({
      FacebookClientToken: 'abc',
    });
  });

  it('sets the facebook auto init config', () => {
    expect(
      setFacebookAutoInitEnabled({ isAutoInitEnabled: true }, {})
    ).toStrictEqual({
      FacebookAutoInitEnabled: true,
    });
  });

  it('sets the facebook advertising id enabled config', () => {
    expect(
      setFacebookAdvertiserIDCollectionEnabled(
        { advertiserIDCollectionEnabled: true },
        {}
      )
    ).toStrictEqual({
      FacebookAdvertiserIDCollectionEnabled: true,
    });
  });

  it('removes the facebook config', () => {
    expect(
      setFacebookConfig(
        {},
        {
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
        }
      )
    ).toStrictEqual({});
  });
  it('preserves the existing LSApplicationQueriesSchemes after removing the facebook schemes', () => {
    const plist = setFacebookConfig(
      {},
      {
        LSApplicationQueriesSchemes: [
          'expo',
          'fbapi',
          'fb-messenger-api',
          'fbauth2',
          'fbshareextension',
        ],
      }
    );
    // Test that running the command twice doesn't cause duplicates
    expect(setFacebookConfig({}, plist)).toStrictEqual({
      LSApplicationQueriesSchemes: ['expo'],
    });
  });
});
