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
const react_native_1 = require("react-native");
const AccessToken = react_native_1.NativeModules.FBAccessToken;
const eventEmitter = new react_native_1.NativeEventEmitter(AccessToken);
/**
 * Represents an immutable access token for using Facebook services.
 */
class FBAccessToken {
    /**
     * The access token string.
     */
    accessToken;
    /**
     * The known granted permissions.
     */
    permissions;
    /**
     * The known declined permissions.
     */
    declinedPermissions;
    /**
     * The known expired permissions.
     */
    expiredPermissions;
    /**
     * The app ID.
     */
    applicationID;
    /**
     * The user ID.
     */
    userID;
    /**
     * The expiration time of the access token.
     * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
     */
    expirationTime;
    /**
     * The last refresh time of the access token.
     * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
     */
    lastRefreshTime;
    /**
     * The data access expiration time of the access token.
     * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
     */
    dataAccessExpirationTime;
    /**
     * The source of access token.
     * @platform android
     */
    accessTokenSource;
    constructor(tokenMap) {
        this.accessToken = tokenMap.accessToken;
        this.permissions = tokenMap.permissions;
        this.declinedPermissions = tokenMap.declinedPermissions;
        this.expiredPermissions = tokenMap.expiredPermissions;
        this.applicationID = tokenMap.applicationID;
        this.userID = tokenMap.userID;
        this.expirationTime = tokenMap.expirationTime;
        this.lastRefreshTime = tokenMap.lastRefreshTime;
        this.dataAccessExpirationTime = tokenMap.dataAccessExpirationTime;
        this.accessTokenSource = tokenMap.accessTokenSource;
        Object.freeze(this);
    }
    /**
     * Getter for the access token that is current for the application.
     */
    static getCurrentAccessToken() {
        return new Promise((resolve) => {
            AccessToken.getCurrentAccessToken((tokenMap) => {
                if (tokenMap) {
                    resolve(new FBAccessToken(tokenMap));
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    /**
     * Setter for the access token that is current for the application.
     */
    static setCurrentAccessToken(accessToken) {
        AccessToken.setCurrentAccessToken(accessToken);
    }
    /**
     * Updates the current access token with up to date permissions,
     * and extends the expiration date, if extension is possible.
     */
    static refreshCurrentAccessTokenAsync() {
        return AccessToken.refreshCurrentAccessTokenAsync();
    }
    /**
     * Adds a listener for when the access token changes. Returns a functions which removes the
     * listener when called.
     */
    static addListener(listener) {
        const subscription = eventEmitter.addListener('fbsdk.accessTokenDidChange', (tokenMap) => {
            if (tokenMap) {
                listener(new FBAccessToken(tokenMap));
            }
            else {
                listener(null);
            }
        });
        return () => subscription.remove();
    }
    /**
     * Gets the date at which the access token expires. The value is the number of
     * milliseconds since Jan. 1, 1970, midnight GMT.
     */
    getExpires() {
        return this.expirationTime;
    }
    /**
     * Get the list of permissions associated with this access token. Note that the most up-to-date
     * list of permissions is maintained by Facebook, so this list may be outdated if permissions
     * have been added or removed since the time the AccessToken object was created. See
     * https://developers.facebook.com/docs/reference/login/#permissions for details.
     */
    getPermissions() {
        return this.permissions;
    }
    /**
     * Gets the list of permissions declined by the user with this access token. It represents the
     * entire set of permissions that have been requested and declined. Note that the most
     * up-to-date list of permissions is maintained by Facebook, so this list may be outdated if
     * permissions have been granted or declined since the last time an AccessToken object was
     * created. See https://developers.facebook.com/docs/reference/login/#permissions for details.
     */
    getDeclinedPermissions() {
        return this.declinedPermissions;
    }
    getExpiredPermissions() {
        return this.expiredPermissions;
    }
    /**
     * Gets the date at which the token was last refreshed. Since tokens expire, the Facebook SDK
     * will attempt to renew them periodically. The value is the number of milliseconds since
     * Jan. 1, 1970, midnight GMT.
     */
    getLastRefresh() {
        return this.lastRefreshTime;
    }
    getDataAccessExpiration() {
        return this.dataAccessExpirationTime;
    }
    /**
     * Gets the ID of the Facebook Application associated with this access token.
     */
    getApplicationId() {
        return this.applicationID;
    }
    /**
     * Gets user ID associated with this access token.
     */
    getUserId() {
        return this.userID;
    }
}
exports.default = FBAccessToken;
