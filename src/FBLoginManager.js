"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const LoginManager = react_native_1.NativeModules.FBLoginManager;
exports.default = {
    /**
     * Log in with the requested permissions.
     * @param loginTrackingIOS IOS only: loginTracking: 'enabled' | 'limited', default 'enabled'.
     * @param nonceIOS IOS only: Nonce that the configuration was created with. A unique nonce will be used if none is provided to the factory method.
     */
    logInWithPermissions(permissions, loginTrackingIOS, nonceIOS) {
        if (react_native_1.Platform.OS === 'ios') {
            return LoginManager.logInWithPermissions(permissions, loginTrackingIOS, nonceIOS);
        }
        return LoginManager.logInWithPermissions(permissions);
    },
    /**
     * Getter for the login behavior.
     */
    getLoginBehavior() {
        if (react_native_1.Platform.OS === 'ios') {
            return Promise.resolve('browser');
        }
        else {
            return LoginManager.getLoginBehavior();
        }
    },
    /**
     * Setter for the login behavior.
     */
    setLoginBehavior(loginBehavior) {
        if (react_native_1.Platform.OS === 'ios') {
            return;
        }
        LoginManager.setLoginBehavior(loginBehavior);
    },
    /**
     * Getter for the default audience.
     */
    getDefaultAudience() {
        return LoginManager.getDefaultAudience();
    },
    /**
     * Setter for the default audience.
     */
    setDefaultAudience(defaultAudience) {
        LoginManager.setDefaultAudience(defaultAudience);
    },
    /**
     * Re-authorizes the user to update data access permissions.
     */
    reauthorizeDataAccess() {
        return LoginManager.reauthorizeDataAccess();
    },
    /**
     * Logs out the user.
     */
    logOut() {
        LoginManager.logOut();
    },
};
