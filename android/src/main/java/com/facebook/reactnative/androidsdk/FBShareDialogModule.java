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

import java.util.Locale;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.share.Sharer;
import com.facebook.share.widget.ShareDialog;

@ReactModule(name = FBShareDialogModule.NAME)
public class FBShareDialogModule extends FBDialogModule {

    public static final String NAME = "FBShareDialog";

    private class ShareDialogCallback extends DialogCallback<Sharer.Result> {

        public ShareDialogCallback(Promise promise) {
            super(promise);
        }

        @Override
        protected WritableMap buildResult(Sharer.Result result) {
            WritableMap shareResult = Arguments.createMap();
            shareResult.putString("postId", result.getPostId());
            return shareResult;
        }
    }

    private ShareDialog.Mode mShareDialogMode;
    private boolean mShouldFailOnError;

    public FBShareDialogModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /** @deprecated Dialogs now own their activity listener for the duration of each request. */
    @Deprecated
    public FBShareDialogModule(ReactApplicationContext reactContext, FBActivityEventListener activityEventListener) {
        this(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void canShow(ReadableMap shareContent, Promise promise) {
        canShowDialog(promise, activity -> {
            ShareDialog shareDialog = new ShareDialog(activity);
            return mShareDialogMode == null
                ? shareDialog.canShow(Utility.buildShareContent(shareContent))
                : shareDialog.canShow(Utility.buildShareContent(shareContent), mShareDialogMode);
        });
    }

    @ReactMethod
    public void show(ReadableMap shareContent, final Promise promise) {
        showDialog(new ShareDialogCallback(promise), (activity, manager, callback) -> {
            ShareDialog shareDialog = new ShareDialog(activity);
            shareDialog.registerCallback(manager, callback);
            shareDialog.setShouldFailOnDataError(mShouldFailOnError);
            if (mShareDialogMode != null) {
                shareDialog.show(Utility.buildShareContent(shareContent), mShareDialogMode);
            } else {
                shareDialog.show(Utility.buildShareContent(shareContent));
            }
        });
    }

    @ReactMethod
    public void setMode(String mode) {
        mShareDialogMode = ShareDialog.Mode.valueOf(mode.toUpperCase(Locale.ROOT));
    }

    @ReactMethod
    public void setShouldFailOnDataError(boolean shouldFailOnDataError) {
        mShouldFailOnError = shouldFailOnDataError;
    }

    @ReactMethod
    public void setShouldFailOnError(boolean shouldFailOnError) {
        setShouldFailOnDataError(shouldFailOnError);
    }
}
