// Copyright (c) 2015-present, Facebook, Inc. All rights reserved.
//
// You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
// copy, modify, and distribute this software in source code or binary form for use
// in connection with the web services and APIs provided by Facebook.
//
// As with any software that integrates with the Facebook platform, your use of
// this software is subject to the Facebook Developer Principles and Policies
// [http://developers.facebook.com/policy/]. This copyright notice shall be
// included in all copies or substantial portions of the software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#import "RCTFBSDKShareDialog.h"

#import <React/RCTUtils.h>

#import "RCTConvert+FBSDKSharingContent.h"

@implementation RCTConvert (FBSDKShareDialog)

RCT_ENUM_CONVERTER(FBSDKShareDialogMode, (@{
  @"automatic": @(FBSDKShareDialogModeAutomatic),
  @"browser": @(FBSDKShareDialogModeBrowser),
  @"webview": @(FBSDKShareDialogModeWeb),
  @"native": @(FBSDKShareDialogModeNative),
}), FBSDKShareDialogModeAutomatic, unsignedLongValue)

@end

@implementation RCTFBSDKShareDialog
{
  FBSDKShareDialog *_shareDialog;
  RCTPromiseResolveBlock _showResolve;
  RCTPromiseRejectBlock _showReject;
}

RCT_EXPORT_MODULE(FBShareDialog);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - Object Lifecycle

- (instancetype)init
{
  if (self = [super init]) {
    _shareDialog = [[FBSDKShareDialog alloc] initWithViewController:nil content:nil delegate:self];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(canShow:(RCTFBSDKSharingContent)content resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  FBSDKShareDialog *dialog = [[FBSDKShareDialog alloc] initWithViewController:nil content:content delegate:nil];
  dialog.mode = _shareDialog.mode;
  dialog.shouldFailOnDataError = _shareDialog.shouldFailOnDataError;
  if ([dialog canShow]) {
    NSError *error;
    if ([dialog validateWithError:&error]) {
      resolve(@YES);
    } else {
      reject(@"FacebookSDK", @"SharingContent is invalid", error);
    }
  } else {
    resolve(@NO);
  }
}

RCT_EXPORT_METHOD(show:(RCTFBSDKSharingContent)content
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (_showResolve) {
    reject(@"E_DIALOG_IN_PROGRESS", @"A share dialog is already in progress.", nil);
    return;
  }
  FBSDKShareDialog *dialog = [[FBSDKShareDialog alloc] initWithViewController:RCTPresentedViewController() content:content delegate:self];
  dialog.mode = _shareDialog.mode;
  dialog.shouldFailOnDataError = _shareDialog.shouldFailOnDataError;
  _shareDialog = dialog;
  _showResolve = resolve;
  _showReject = reject;
  if (![_shareDialog show] && _showReject) {
    _showResolve = nil;
    _showReject = nil;
    reject(@"FacebookSDK", @"ShareDialog could not be shown.", nil);
  }
}

RCT_EXPORT_METHOD(setMode:(FBSDKShareDialogMode)mode)
{
  _shareDialog.mode = mode;
}

RCT_EXPORT_METHOD(setShouldFailOnDataError:(BOOL)shouldFailOnDataError)
{
  _shareDialog.shouldFailOnDataError = shouldFailOnDataError;
}

#pragma mark - FBSDKSharingDelegate

- (void)sharer:(id<FBSDKSharing>)sharer didCompleteWithResults:(NSDictionary *)results
{
  if (sharer != _shareDialog) {
    return;
  }
  RCTPromiseResolveBlock resolve = _showResolve;
  _showResolve = nil;
  _showReject = nil;
  if (resolve) {
    NSMutableDictionary *result = [results mutableCopy] ?: [NSMutableDictionary new];
    result[@"isCancelled"] = @NO;
    resolve(result);
  }
}

- (void)sharer:(id<FBSDKSharing>)sharer didFailWithError:(NSError *)error
{
  if (sharer != _shareDialog) {
    return;
  }
  RCTPromiseRejectBlock reject = _showReject;
  _showReject = nil;
  _showResolve = nil;
  if (reject) {
    reject(@"FacebookSDK", @"ShareDialog encounters error", error);
  }
}

- (void)sharerDidCancel:(id<FBSDKSharing>)sharer
{
  if (sharer != _shareDialog) {
    return;
  }
  RCTPromiseResolveBlock resolve = _showResolve;
  _showResolve = nil;
  _showReject = nil;
  if (resolve) {
    resolve(@{@"isCancelled": @YES});
  }
}

@end
