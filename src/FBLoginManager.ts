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
import {RNFBSDKCallback} from './models/FBSDKCallback';
import {NativeModules, Platform} from 'react-native';

const LoginManager = NativeModules.FBLoginManager;
/**
 * Indicates which default audience to use for sessions that post data to Facebook.
 */
export type DefaultAudience =
  // Indicates that the user's friends are able to see posts made by the application.
  | 'friends'
  // Indicates that all Facebook users are able to see posts made by the application.
  | 'everyone'
  // Indicates that only the user is able to see posts made by the application.
  | 'only_me';
export type LoginBehavior = LoginBehaviorIOS | LoginBehaviorAndroid;
/**
 * Indicate how Facebook Login should be attempted on Android.
 */
export type LoginBehaviorAndroid =
  // Attempt login in using the Facebook App, and if that does not work fall back to web dialog auth.
  | 'native_with_fallback'
  // Only attempt to login using the Facebook App.
  | 'native_only'
  // Only the web dialog auth should be used.
  | 'web_only';
/**
 * Indicate how Facebook Login should be attempted on iOS.
 */
export type LoginBehaviorIOS =
  // Attempts log in through the Safari browser.
  // This is the only behavior supported by the native sdk.
  'browser';
/**
 * Shows the results of a login operation.
 */
export type LoginResult = RNFBSDKCallback & {
  grantedPermissions?: Array<string>;
  declinedPermissions?: Array<string>;
};

export type LoginTracking = 'enabled' | 'limited';

export default {
  /**
   * Log in with the requested permissions.
   * @param loginTrackingIOS IOS only: loginTracking: 'enabled' | 'limited', default 'enabled'.
   * @param nonceIOS IOS only: Nonce that the configuration was created with. A unique nonce will be used if none is provided to the factory method.
   */
  logInWithPermissions(
    permissions: Array<string>,
    loginTrackingIOS?: LoginTracking,
    nonceIOS?: string,
  ): Promise<LoginResult> {
    if (Platform.OS === 'ios') {
      return LoginManager.logInWithPermissions(
        permissions,
        loginTrackingIOS,
        nonceIOS,
      );
    }
    return LoginManager.logInWithPermissions(permissions);
  },

  /**
   * Getter for the login behavior.
   */
  getLoginBehavior(): Promise<LoginBehavior> {
    if (Platform.OS === 'ios') {
      return Promise.resolve('browser');
    } else {
      return LoginManager.getLoginBehavior();
    }
  },

  /**
   * Setter for the login behavior.
   */
  setLoginBehavior(loginBehavior: LoginBehavior) {
    if (Platform.OS === 'ios') {
      return;
    }
    LoginManager.setLoginBehavior(loginBehavior);
  },

  /**
   * Getter for the default audience.
   */
  getDefaultAudience(): Promise<DefaultAudience> {
    return LoginManager.getDefaultAudience();
  },

  /**
   * Setter for the default audience.
   */
  setDefaultAudience(defaultAudience: DefaultAudience) {
    LoginManager.setDefaultAudience(defaultAudience);
  },

  /**
   * Re-authorizes the user to update data access permissions.
   */
  reauthorizeDataAccess(): Promise<LoginResult> {
    return LoginManager.reauthorizeDataAccess();
  },

  /**
   * Logs out the user.
   */
  logOut() {
    LoginManager.logOut();
  },
};
