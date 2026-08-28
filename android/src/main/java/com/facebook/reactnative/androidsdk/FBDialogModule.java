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
 */

package com.facebook.reactnative.androidsdk;

import android.app.Activity;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;

/** Owns the callback and activity listener for one pending dialog. */
abstract class FBDialogModule extends ReactContextBaseJavaModule {
    private DialogCallback<?> mPendingDialog;
    private volatile boolean mInvalidated;

    FBDialogModule(ReactApplicationContext context) {
        super(context);
    }

    protected interface DialogAction<RESULT> {
        void show(Activity activity, CallbackManager manager, FacebookCallback<RESULT> callback);
    }

    protected interface DialogCheck {
        boolean canShow(Activity activity);
    }

    protected final void canShowDialog(Promise promise, DialogCheck check) {
        UiThreadUtil.runOnUiThread(() -> {
            if (mInvalidated) {
                return;
            }
            Activity activity = getCurrentActivity();
            if (activity == null) {
                promise.reject("E_NO_ACTIVITY", "No current activity.");
                return;
            }
            try {
                promise.resolve(check.canShow(activity));
            } catch (Exception error) {
                promise.reject(error);
            }
        });
    }

    protected abstract class DialogCallback<RESULT> extends ReactNativeFacebookSDKCallback<RESULT> {
        private FBActivityEventListener mListener;

        DialogCallback(Promise promise) {
            super(promise);
        }

        private void dispose() {
            if (mListener != null) {
                getReactApplicationContext().removeActivityEventListener(mListener);
                mListener = null;
            }
            mPromise = null;
        }

        private Promise finish() {
            if (mInvalidated || mPendingDialog != this) {
                return null;
            }
            mPendingDialog = null;
            Promise promise = mPromise;
            dispose();
            return promise;
        }

        protected abstract WritableMap buildResult(RESULT result);

        @Override
        public final void onSuccess(RESULT result) {
            Promise promise = finish();
            if (promise != null) {
                try {
                    WritableMap value = buildResult(result);
                    value.putBoolean("isCancelled", false);
                    promise.resolve(value);
                } catch (Exception error) {
                    promise.reject(error);
                }
            }
        }

        @Override
        public final void onCancel() {
            Promise promise = finish();
            if (promise != null) {
                WritableMap value = Arguments.createMap();
                value.putBoolean("isCancelled", true);
                promise.resolve(value);
            }
        }

        @Override
        public final void onError(FacebookException error) {
            reject(error);
        }

        private void reject(Exception error) {
            Promise promise = finish();
            if (promise != null) {
                promise.reject(error);
            }
        }
    }

    protected final <RESULT> void showDialog(DialogCallback<RESULT> callback, DialogAction<RESULT> action) {
        UiThreadUtil.runOnUiThread(() -> {
            if (mInvalidated) {
                callback.dispose();
                return;
            }
            if (mPendingDialog != null) {
                callback.mPromise.reject("E_DIALOG_IN_PROGRESS", "A dialog is already in progress.");
                callback.dispose();
                return;
            }
            Activity activity = getCurrentActivity();
            if (activity == null) {
                callback.mPromise.reject("E_NO_ACTIVITY", "No current activity.");
                callback.dispose();
                return;
            }
            mPendingDialog = callback;
            try {
                callback.mListener = new FBActivityEventListener();
                getReactApplicationContext().addActivityEventListener(callback.mListener);
                action.show(activity, callback.mListener.getCallbackManager(), callback);
            } catch (Exception error) {
                callback.reject(error);
            }
        });
    }

    @Override
    public void invalidate() {
        mInvalidated = true;
        UiThreadUtil.runOnUiThread(() -> {
            if (mPendingDialog != null) {
                mPendingDialog.dispose();
                mPendingDialog = null;
            }
        });
        super.invalidate();
    }

    @Override
    public void onCatalystInstanceDestroy() {
        invalidate();
    }
}
