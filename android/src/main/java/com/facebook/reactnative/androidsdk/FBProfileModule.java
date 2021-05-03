package com.facebook.reactnative.androidsdk;

import com.facebook.Profile;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import androidx.annotation.NonNull;

/**
 * This is a {@link NativeModule} that allows JS to use FBSDKProfile info of the current logged user.
 */
@ReactModule(name = FBProfileModule.NAME)
public class FBProfileModule extends ReactContextBaseJavaModule {
    public static final String NAME = "FBProfile";

    @NonNull
    @Override
    public String getName() {
    return NAME;
  }

    /**
    * Get the current logged profile.
    * @param callback Use callback to pass the current logged profile back to JS.
    */
    @ReactMethod
    public void getCurrentProfile(Callback callback) {
        //Return the profile object as a ReactMap.
        callback.invoke(Profile.getCurrentProfile() == null
                ? null
                : Utility.profileToReactMap(Profile.getCurrentProfile()));
  }
}
