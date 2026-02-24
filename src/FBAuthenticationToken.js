"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @format
 */
const react_native_1 = require("react-native");
const AuthenticationToken = react_native_1.NativeModules.FBAuthenticationToken;
/**
 * Represents an immutable access token for using Facebook services.
 */
class FBAuthenticationToken {
    /**
       The raw token string from the authentication response
      */
    authenticationToken;
    /**
       The nonce from the decoded authentication response
      */
    nonce;
    /**
      The graph domain where the user is authenticated.
     */
    graphDomain;
    constructor(tokenMap) {
        this.authenticationToken = tokenMap.authenticationToken;
        this.nonce = tokenMap.nonce;
        this.graphDomain = tokenMap.graphDomain;
        Object.freeze(this);
    }
    /**
     * Getter for the authentication token
     */
    static getAuthenticationTokenIOS() {
        if (react_native_1.Platform.OS === 'android') {
            return Promise.resolve(null);
        }
        return new Promise((resolve) => {
            AuthenticationToken.getAuthenticationToken((tokenMap) => {
                if (tokenMap) {
                    resolve(new FBAuthenticationToken(tokenMap));
                }
                else {
                    resolve(null);
                }
            });
        });
    }
}
exports.default = FBAuthenticationToken;
