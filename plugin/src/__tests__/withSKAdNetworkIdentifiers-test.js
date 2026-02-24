"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const withSKAdNetworkIdentifiers_1 = require("../withSKAdNetworkIdentifiers");
describe(withSKAdNetworkIdentifiers_1.withSKAdNetworkIdentifiers, () => {
    it(`adds ids to the Info.plist`, () => {
        expect((0, withSKAdNetworkIdentifiers_1.withSKAdNetworkIdentifiers)({
            name: 'foo',
            slug: 'bar',
        }, ['FOOBAR', 'other'])).toStrictEqual({
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
        expect((0, withSKAdNetworkIdentifiers_1.withSKAdNetworkIdentifiers)({
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
        }, ['foobar', 'other'])).toStrictEqual({
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
