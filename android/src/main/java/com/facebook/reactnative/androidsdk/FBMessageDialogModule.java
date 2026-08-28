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

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.share.model.ShareContent;
import com.facebook.share.widget.MessageDialog;

/**
 * Provides functionality to send content via the Facebook Message Dialog
 */
@ReactModule(name = FBMessageDialogModule.NAME)
public class FBMessageDialogModule extends FBDialogModule {
    public static final String NAME = "FBMessageDialog";

    private class MessageDialogCallback extends DialogCallback<MessageDialog.Result> {

        public MessageDialogCallback(Promise promise) {
            super(promise);
        }

        @Override
        protected WritableMap buildResult(MessageDialog.Result result) {
            WritableMap messageDialogResult = Arguments.createMap();
            messageDialogResult.putString("postId", result.getPostId());
            return messageDialogResult;
        }
    }

    private boolean mShouldFailOnDataError;

    public FBMessageDialogModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /** @deprecated Dialogs now own their activity listener for the duration of each request. */
    @Deprecated
    public FBMessageDialogModule(ReactApplicationContext reactContext, FBActivityEventListener activityEventListener) {
        this(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    /**
     * Indicates whether it is possible to show the dialog for ShareContent of the specified type.
     * @param shareContentMap  must be a valid {@link ShareContent}.
     * @param promise Use promise to pass message dialog result to JS.
     */
    @ReactMethod
    public void canShow(ReadableMap shareContentMap, Promise promise) {
        canShowDialog(promise, activity -> {
            ShareContent shareContent = Utility.buildShareContent(shareContentMap);
            MessageDialog messageDialog = new MessageDialog(activity);
            return messageDialog.canShow(shareContent);
        });
    }

    /**
     * Show the provided ShareContent using the provided Activity.
     * @param shareContentMap  must be a valid {@link ShareContent}.
     * @param promise Use promise to pass message dialog result to JS.
     */
    @ReactMethod
    public void show(ReadableMap shareContentMap, Promise promise) {
        showDialog(new MessageDialogCallback(promise), (activity, manager, callback) -> {
            ShareContent shareContent = Utility.buildShareContent(shareContentMap);
            MessageDialog messageDialog = new MessageDialog(activity);
            messageDialog.setShouldFailOnDataError(mShouldFailOnDataError);
            messageDialog.registerCallback(manager, callback);
            messageDialog.show(shareContent);
        });
    }

    /**
     * Specifies whether the sharer should fail if it finds an error with the share content.
     * If false, the share dialog will still be displayed without the data that was mis-configured.
     * @param shouldFailOnDataError Whether the dialog should fail if it finds an error.
     */
    @ReactMethod
    public void setShouldFailOnDataError(boolean shouldFailOnDataError) {
        mShouldFailOnDataError = shouldFailOnDataError;
    }
}
