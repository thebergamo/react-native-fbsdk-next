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
 * Android Limited Login / OIDC: classic logIn(permissions) ignored JS "limited"+nonce
 * and discarded LoginResult.getAuthenticationToken(). This uses LoginConfiguration
 * (openid + nonce) and bridges authenticationToken+nonce to JS.
 */

package com.facebook.reactnative.androidsdk;

import android.app.Activity;

import com.facebook.AccessToken;
import com.facebook.AuthenticationToken;
import com.facebook.login.DefaultAudience;
import com.facebook.login.LoginBehavior;
import com.facebook.login.LoginConfiguration;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

import java.util.List;
import java.util.Locale;
import java.util.Set;

/**
 * This is a {@link NativeModule} that allows JS to use LoginManager of Facebook Android SDK.
 */
@ReactModule(name = FBLoginManagerModule.NAME)
public class FBLoginManagerModule extends FBSDKCallbackManagerBaseJavaModule {

    public static final String NAME = "FBLoginManager";

    /**
     * Callback that resolves login results including OIDC AuthenticationToken when present.
     */
    private class LoginManagerCallback extends ReactNativeFacebookSDKCallback<LoginResult> {

        private final String mExpectedNonce;

        /**
         * @param promise Promise to resolve/reject for the JS caller
         * @param expectedNonce Nonce from LoginConfiguration (may be null for classic login)
         */
        public LoginManagerCallback(Promise promise, String expectedNonce) {
            super(promise);
            mExpectedNonce = expectedNonce;
        }

        @Override
        public void onSuccess(LoginResult loginResult) {
            if (mPromise != null) {
                AccessToken accessToken = loginResult.getAccessToken();
                if (accessToken != null) {
                    AccessToken.setCurrentAccessToken(accessToken);
                }

                AuthenticationToken authenticationToken = loginResult.getAuthenticationToken();
                if (authenticationToken != null) {
                    AuthenticationToken.setCurrentAuthenticationToken(authenticationToken);
                }

                WritableMap result = Arguments.createMap();
                result.putBoolean("isCancelled", false);
                result.putArray("grantedPermissions",
                        setToWritableArray(loginResult.getRecentlyGrantedPermissions()));
                result.putArray("declinedPermissions",
                        setToWritableArray(loginResult.getRecentlyDeniedPermissions()));

                if (authenticationToken != null) {
                    result.putString("authenticationToken", authenticationToken.getToken());
                    String resolvedNonce = authenticationToken.getExpectedNonce();
                    if (resolvedNonce == null || resolvedNonce.isEmpty()) {
                        resolvedNonce = mExpectedNonce;
                    }
                    if (resolvedNonce != null) {
                        result.putString("nonce", resolvedNonce);
                    }
                    result.putString("graphDomain", "facebook");
                } else {
                    result.putNull("authenticationToken");
                    if (mExpectedNonce != null) {
                        result.putString("nonce", mExpectedNonce);
                    }
                }

                mPromise.resolve(result);
                mPromise = null;
            }
        }
    }

    public FBLoginManagerModule(ReactApplicationContext reactContext, FBActivityEventListener activityEventListener) {
        super(reactContext, activityEventListener);
    }

    @Override
    public String getName() {
        return NAME;
    }

    /**
     * Get {@link LoginBehavior} for login attempts.
     * @param promise Use Promise to pass login behavior back to JS.
     */
    @ReactMethod
    public void getLoginBehavior(Promise promise) {
        promise.resolve(LoginManager.getInstance().getLoginBehavior().name().toLowerCase(Locale.ROOT));
    }

    /**
     * Set {@link LoginBehavior} for login attempts.
     * @param loginBehaviorString must be one of the constants in Enum
     * {@link LoginBehavior}.
     * @throws {@link java.lang.IllegalArgumentException} if the argument is not a valid constant.
     */
    @ReactMethod
    public void setLoginBehavior(String loginBehaviorString) {
        LoginBehavior loginBehavior = LoginBehavior.valueOf(loginBehaviorString.toUpperCase(Locale.ROOT));
        LoginManager.getInstance().setLoginBehavior(loginBehavior);
    }

    /**
     * Get {@link DefaultAudience} to use for sessions that post data to Facebook.
     * @param promise Use promise to pass default audience back to JS.
     */
    @ReactMethod
    public void getDefaultAudience(Promise promise) {
        promise.resolve(LoginManager.getInstance().getDefaultAudience().name().toLowerCase(Locale.ROOT));
    }

    /**
     * Set {@link DefaultAudience} to use for sessions that post data to Facebook.
     * @param defaultAudienceString must be one of the constants in Enum {@link DefaultAudience}.
     * @throws {@link java.lang.IllegalArgumentException} if the argument is not a valid constant.
     */
    @ReactMethod
    public void setDefaultAudience(String defaultAudienceString) {
        DefaultAudience defaultAudience = DefaultAudience.valueOf(defaultAudienceString.toUpperCase(Locale.ROOT));
        LoginManager.getInstance().setDefaultAudience(defaultAudience);
    }

    /**
     * Log out from Facebook.
     */
    @ReactMethod
    public void logOut() {
        LoginManager.getInstance().logOut();
    }

    /**
     * Facebook login with optional Limited Login / OIDC tracking.
     * When {@code loginTracking} is {@code "limited"} or a non-empty {@code nonce} is provided,
     * uses {@link LoginConfiguration} (adds {@code openid} + nonce) so
     * {@link LoginResult#getAuthenticationToken()} can return a JWT.
     * Android SDK has no {@code LoginTracking.LIMITED} enum; LoginConfiguration+nonce is the OIDC path.
     *
     * Single {@code @ReactMethod} only: TurboModule interop rejects overloaded method names.
     * JS must always pass loginTracking and nonce (null/undefined for classic AccessToken login).
     *
     * @param permissions Facebook permissions (email, public_profile, ...)
     * @param loginTracking {@code "limited"} for OIDC AuthenticationToken, or {@code "enabled"}/null for classic
     * @param nonce Ceremony-binding nonce for OIDC; may be null/empty for classic
     * @param promise Promise resolved with grantedPermissions and optionally authenticationToken+nonce
     */
    @ReactMethod
    public void logInWithPermissions(
            ReadableArray permissions,
            String loginTracking,
            String nonce,
            final Promise promise) {
        final LoginManager loginManager = LoginManager.getInstance();
        Activity activity = getCurrentActivity();
        if (activity == null) {
            promise.reject("E_NO_ACTIVITY", "Facebook login requires a foreground Activity");
            return;
        }

        List<String> permissionList = Utility.reactArrayToStringList(permissions);
        boolean useOidc =
                (loginTracking != null && loginTracking.equalsIgnoreCase("limited"))
                        || (nonce != null && !nonce.isEmpty());

        if (useOidc) {
            LoginConfiguration configuration;
            if (nonce != null && !nonce.isEmpty()) {
                configuration = new LoginConfiguration(permissionList, nonce);
            } else {
                configuration = new LoginConfiguration(permissionList);
            }
            String expectedNonce = configuration.getNonce();
            loginManager.registerCallback(
                    getCallbackManager(),
                    new LoginManagerCallback(promise, expectedNonce));
            loginManager.logIn(activity, configuration);
        } else {
            loginManager.registerCallback(
                    getCallbackManager(),
                    new LoginManagerCallback(promise, null));
            loginManager.logIn(activity, permissionList);
        }
    }

    /**
     * Attempts a re-authorization to regain data access.
     * @param promise Use promise to pass re-authorization result to JS after re-authorization finish.
     */
    @ReactMethod
    public void reauthorizeDataAccess(final Promise promise) {
        final LoginManager loginManager = LoginManager.getInstance();
        loginManager.registerCallback(getCallbackManager(), new LoginManagerCallback(promise, null));
        Activity activity = getCurrentActivity();
        if (activity != null) {
            loginManager.reauthorizeDataAccess(activity);
        }
    }

    private WritableArray setToWritableArray(Set<String> set) {
        WritableArray array = Arguments.createArray();
        for (String e: set) {
            array.pushString(e);
        }
        return array;
    }
}
