"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Developer Principles and Policies
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @format
 */
const validate_1 = require("./util/validate");
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
const AppEventsLogger = react_native_1.NativeModules.FBAppEventsLogger;
const { AppEvents, AppEventParams, } = AppEventsLogger?.getConstants() || {};
exports.default = {
    /**
     * Sets the current event flushing behavior specifying when events
     * are sent back to Facebook servers.
     */
    setFlushBehavior(flushBehavior) {
        AppEventsLogger.setFlushBehavior(flushBehavior);
    },
    /**
     * Logs an event with eventName and optional arguments.
     * This function supports the following usage:
     * logEvent(eventName: string);
     * logEvent(eventName: string, valueToSum: number);
     * logEvent(eventName: string, parameters: {[key:string]:string|number});
     * logEvent(eventName: string, valueToSum: number, parameters: {[key:string]:string|number});
     * See https://developers.facebook.com/docs/app-events/android for detail.
     */
    logEvent(eventName, ...args) {
        let valueToSum = 0;
        if (typeof args[0] === 'number') {
            valueToSum = Number(args.shift());
        }
        let parameters = null;
        if (typeof args[0] === 'object') {
            parameters = args[0];
        }
        AppEventsLogger.logEvent(eventName, valueToSum, parameters);
    },
    /**
     * Logs a purchase. See http://en.wikipedia.org/wiki/ISO_4217 for currencyCode.
     */
    logPurchase(purchaseAmount, currencyCode, parameters) {
        AppEventsLogger.logPurchase(purchaseAmount, currencyCode, parameters);
    },
    /**
     * Logs an app event that tracks that the application was open via Push Notification.
     */
    logPushNotificationOpen(payload) {
        AppEventsLogger.logPushNotificationOpen(payload);
    },
    /**
     * Uploads product catalog product item as an app event
     * @param itemID – Unique ID for the item. Can be a variant for a product. Max size is 100.
     * @param availability – If item is in stock. Accepted values are: in stock - Item ships immediately out of stock - No plan to restock preorder - Available in future available for order - Ships in 1-2 weeks discontinued - Discontinued
     * @param condition – Product condition: new, refurbished or used.
     * @param description – Short text describing product. Max size is 5000.
     * @param imageLink – Link to item image used in ad.
     * @param link – Link to merchant's site where someone can buy the item.
     * @param title – Title of item.
     * @param priceAmount – Amount of purchase, in the currency specified by the 'currency' parameter. This value will be rounded to the thousandths place (e.g., 12.34567 becomes 12.346).
     * @param currency – Currency used to specify the amount.
     * @param gtin – Global Trade Item Number including UPC, EAN, JAN and ISBN
     * @param mpn – Unique manufacture ID for product
     * @param brand – Name of the brand Note: Either gtin, mpn or brand is required.
     * @param parameters – Optional fields for deep link specification.
     */
    logProductItem(itemID, availability, condition, description, imageLink, link, title, priceAmount, currency, gtin, mpn, brand, parameters) {
        if (!(0, validate_1.isDefined)(itemID) || !(0, validate_1.isString)(itemID)) {
            throw new Error("logProductItem expected 'itemID' to be a string");
        }
        if (!(0, validate_1.isDefined)(availability) ||
            !(0, validate_1.isOneOf)(availability, [
                'in_stock',
                'out_of_stock',
                'preorder',
                'avaliable_for_order',
                'discontinued',
            ])) {
            throw new Error("logProductItem expected 'availability' to be one of 'in_stock' | 'out_of_stock' | 'preorder' | 'avaliable_for_order' | 'discontinued'");
        }
        if (!(0, validate_1.isDefined)(condition) ||
            !(0, validate_1.isOneOf)(condition, ['new', 'refurbished', 'used'])) {
            throw new Error("logProductItem expected 'condition' to be one of 'new' | 'refurbished' | 'used'");
        }
        if (!(0, validate_1.isDefined)(description) || !(0, validate_1.isString)(description)) {
            throw new Error("logProductItem expected 'description' to be a string");
        }
        if (!(0, validate_1.isDefined)(imageLink) || !(0, validate_1.isString)(imageLink)) {
            throw new Error("logProductItem expected 'imageLink' to be a string");
        }
        if (!(0, validate_1.isDefined)(link) || !(0, validate_1.isString)(link)) {
            throw new Error("logProductItem expected 'link' to be a string");
        }
        if (!(0, validate_1.isDefined)(title) || !(0, validate_1.isString)(title)) {
            throw new Error("logProductItem expected 'title' to be a string");
        }
        if (!(0, validate_1.isDefined)(priceAmount) || !(0, validate_1.isNumber)(priceAmount)) {
            throw new Error("logProductItem expected 'priceAmount' to be a number");
        }
        if (!(0, validate_1.isDefined)(currency) || !(0, validate_1.isString)(currency)) {
            throw new Error("logProductItem expected 'currency' to be a string");
        }
        if (!(0, validate_1.isDefined)(gtin) && !(0, validate_1.isDefined)(mpn) && !(0, validate_1.isDefined)(brand)) {
            throw new Error('logProductItem expected either gtin, mpn or brand to be defined');
        }
        AppEventsLogger.logProductItem(itemID, availability, condition, description, imageLink, link, title, priceAmount, currency, gtin, mpn, brand, parameters);
    },
    /**
     * Explicitly kicks off flushing of events to Facebook.
     */
    flush() {
        AppEventsLogger.flush();
    },
    /**
     * Sets a custom user ID to associate with all app events.
     * The userID is persisted until this method is called again with a null userId
     */
    setUserID(userID) {
        AppEventsLogger.setUserID(userID);
    },
    /**
     * Clears the currently set user id.
     * @deprecated use setUserID(null) instead
     */
    clearUserID() {
        AppEventsLogger.clearUserID();
    },
    /**
     * Returns user id or null if not set
     */
    async getUserID() {
        return await AppEventsLogger.getUserID();
    },
    /**
     * Returns anonymous id or null if not set
     */
    async getAnonymousID() {
        return await AppEventsLogger.getAnonymousID();
    },
    /**
     * Returns advertiser id or null if not set
     */
    async getAdvertiserID() {
        return await AppEventsLogger.getAdvertiserID();
    },
    /**
     * Returns advertiser id or null if not set.
     * @platform android
     */
    async getAttributionID() {
        if (react_native_2.Platform.OS === 'ios') {
            return null;
        }
        return await AppEventsLogger.getAttributionID();
    },
    /**
     * Set additional data about the user to increase chances of matching a Facebook user.
     */
    setUserData(userData) {
        AppEventsLogger.setUserData(userData);
    },
    /**
     * For iOS only, sets and sends device token to register the current application for push notifications.
     * @platform ios
     */
    setPushNotificationsDeviceToken(deviceToken) {
        AppEventsLogger.setPushNotificationsDeviceToken(deviceToken);
    },
    /**
     * For Android only, sets and sends registration id to register the current app for push notifications.
     * @platform Android
     */
    setPushNotificationsRegistrationId(registrationId) {
        AppEventsLogger.setPushNotificationsRegistrationId(registrationId);
    },
    /**
     * Predefined event names for logging events common to many apps.
     */
    AppEvents,
    /**
     *  Predefined event name parameters for common additional information to accompany events logged through the `logEvent`.
     */
    AppEventParams,
};
