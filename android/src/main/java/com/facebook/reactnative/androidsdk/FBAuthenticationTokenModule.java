/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * Expose AuthenticationToken on Android to mirror iOS FBAuthenticationToken.
 * Previously only iOS bridged this module; Android JS getters returned null.
 */

package com.facebook.reactnative.androidsdk;

import com.facebook.AuthenticationToken;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

/**
 * Native module that exposes the current Facebook {@link AuthenticationToken} (OIDC JWT)
 * to JavaScript, matching the iOS {@code FBAuthenticationToken} module API.
 */
@ReactModule(name = FBAuthenticationTokenModule.NAME)
public class FBAuthenticationTokenModule extends ReactContextBaseJavaModule {

    public static final String NAME = "FBAuthenticationToken";

    /**
     * @param reactContext React application context
     */
    public FBAuthenticationTokenModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    /**
     * Returns the current AuthenticationToken map or null via callback (iOS-compatible shape).
     *
     * @param callback Invoked with a single argument: token map or null
     */
    @ReactMethod
    public void getAuthenticationToken(Callback callback) {
        AuthenticationToken current = AuthenticationToken.getCurrentAuthenticationToken();
        if (current == null) {
            callback.invoke((Object) null);
            return;
        }
        WritableMap map = Arguments.createMap();
        map.putString("authenticationToken", current.getToken());
        String nonce = current.getExpectedNonce();
        if (nonce != null) {
            map.putString("nonce", nonce);
        }
        map.putString("graphDomain", "facebook");
        callback.invoke(map);
    }
}
