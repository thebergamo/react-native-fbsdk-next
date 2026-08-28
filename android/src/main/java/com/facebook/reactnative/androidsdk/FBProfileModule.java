package com.facebook.reactnative.androidsdk;

import android.os.Handler;
import android.os.Looper;

import com.facebook.Profile;
import com.facebook.ProfileTracker;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;

import androidx.annotation.NonNull;

import java.util.HashSet;
import java.util.Set;

/**
 * This is a {@link NativeModule} that allows JS to use FBSDKProfile info of the current logged user.
 */
@ReactModule(name = FBProfileModule.NAME)
public class FBProfileModule extends ReactContextBaseJavaModule {
    public static final String NAME = "FBProfile";
    private final Handler mHandler = new Handler(Looper.getMainLooper());
    private final Set<ProfileRequest> mPendingRequests = new HashSet<>();
    private volatile boolean mInvalidated;

    private class ProfileRequest {
      private final Callback mCallback;
      private ProfileTracker mTracker;
      private final Runnable mTimeout = () -> finish(null);

      ProfileRequest(Callback callback) {
        mCallback = callback;
      }

      void start() {
        mPendingRequests.add(this);
        mTracker = new ProfileTracker() {
          @Override
          protected void onCurrentProfileChanged(Profile oldProfile, Profile currentProfile) {
            mHandler.post(() -> finish(currentProfile));
          }
        };
        mHandler.postDelayed(mTimeout, 30000);
        // The profile may have arrived between the initial read and registration.
        Profile currentProfile = Profile.getCurrentProfile();
        if (currentProfile != null) {
          finish(currentProfile);
        }
      }

      void cancel() {
        mPendingRequests.remove(this);
        mHandler.removeCallbacks(mTimeout);
        if (mTracker != null) {
          mTracker.stopTracking();
        }
      }

      void finish(Profile profile) {
        if (!mPendingRequests.contains(this)) {
          return;
        }
        cancel();
        if (!mInvalidated) {
          mCallback.invoke(profile == null ? null : Utility.profileToReactMap(profile));
        }
      }
    }

    public FBProfileModule(ReactApplicationContext reactContext) {
      super(reactContext);
    }

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
    public void getCurrentProfile(final Callback callback) {
      mHandler.post(() -> {
        if (mInvalidated) {
          return;
        }
        Profile currentProfile = Profile.getCurrentProfile();
        if (currentProfile != null) {
          callback.invoke(Utility.profileToReactMap(currentProfile));
        } else {
          new ProfileRequest(callback).start();
        }
      });
  }

  public void invalidate() {
    super.invalidate();
    clearPendingRequests();
  }

  @SuppressWarnings("removal")
  public void onCatalystInstanceDestroy() {
    super.onCatalystInstanceDestroy();
    clearPendingRequests();
  }

  private void clearPendingRequests() {
    mInvalidated = true;
    mHandler.post(() -> {
      for (ProfileRequest request : new HashSet<>(mPendingRequests)) {
        request.cancel();
      }
    });
  }
}
