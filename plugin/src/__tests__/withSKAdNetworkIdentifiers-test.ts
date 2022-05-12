import {withSKAdNetworkIdentifiers} from '../withSKAdNetworkIdentifiers';

describe(withSKAdNetworkIdentifiers, () => {
  it(`adds ids to the Info.plist`, () => {
    expect(
      withSKAdNetworkIdentifiers(
        {
          name: 'foo',
          slug: 'bar',
        },
        ['FOOBAR', 'other'],
      ),
    ).toStrictEqual({
      name: 'foo',
      slug: 'bar',
      ios: {
        infoPlist: {
          SKAdNetworkItems: [
            {
              SKAdNetworkIdentifier: 'foobar',
            },
            {
              SKAdNetworkIdentifier: 'other',
            },
          ],
        },
      },
    });
  });
  it(`prevents adding duplicate ids to the Info.plist`, () => {
    expect(
      withSKAdNetworkIdentifiers(
        {
          name: 'foo',
          slug: 'bar',
          ios: {
            infoPlist: {
              SKAdNetworkItems: [
                {
                  SKAdNetworkIdentifier: 'foobar',
                },
              ],
            },
          },
        },
        ['foobar', 'other'],
      ),
    ).toStrictEqual({
      name: 'foo',
      slug: 'bar',
      ios: {
        infoPlist: {
          SKAdNetworkItems: [
            {
              SKAdNetworkIdentifier: 'foobar',
            },
            {
              SKAdNetworkIdentifier: 'other',
            },
          ],
        },
      },
    });
  });
});
