"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const withFacebookIOS_1 = require("../withFacebookIOS");
describe(withFacebookIOS_1.withUserTrackingPermission, () => {
    it(`skips adding the permission when false`, () => {
        expect((0, withFacebookIOS_1.withUserTrackingPermission)({ name: 'foo', slug: 'bar' }, { iosUserTrackingPermission: false })).toEqual({
            name: 'foo',
            slug: 'bar',
        });
    });
    it(`sets custom user tracking description`, () => {
        expect((0, withFacebookIOS_1.withUserTrackingPermission)({ name: 'foo', slug: 'bar' }, { iosUserTrackingPermission: 'custom tracking description' })).toEqual({
            name: 'foo',
            slug: 'bar',
            ios: {
                infoPlist: {
                    NSUserTrackingUsageDescription: 'custom tracking description',
                },
            },
        });
    });
    it(`does not add user tracking description by default`, () => {
        expect((0, withFacebookIOS_1.withUserTrackingPermission)({ name: 'foo', slug: 'bar' }, {})).toStrictEqual({
            name: 'foo',
            slug: 'bar',
        });
    });
    it(`does not overwrite existing user tracking description`, () => {
        expect((0, withFacebookIOS_1.withUserTrackingPermission)({
            name: 'foo',
            slug: 'bar',
            ios: {
                infoPlist: {
                    NSUserTrackingUsageDescription: 'existing user tracking description',
                },
            },
        }, {})).toStrictEqual({
            name: 'foo',
            slug: 'bar',
            ios: {
                infoPlist: {
                    NSUserTrackingUsageDescription: 'existing user tracking description',
                },
            },
        });
    });
});
