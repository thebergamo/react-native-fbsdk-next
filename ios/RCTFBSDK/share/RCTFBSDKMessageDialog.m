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

#import "RCTFBSDKMessageDialog.h"

#import <React/RCTUtils.h>

#import "RCTConvert+FBSDKSharingContent.h"

@interface RCTFBSDKMessageDialog () <FBSDKSharingDelegate>
@end

@implementation RCTFBSDKMessageDialog
{
  FBSDKMessageDialog *_dialog;
  RCTPromiseResolveBlock _showResolve;
  RCTPromiseRejectBlock _showReject;
}

RCT_EXPORT_MODULE(FBMessageDialog);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - Object Lifecycle

- (instancetype)init
{
  if ((self = [super init])) {
    _dialog = [[FBSDKMessageDialog alloc] initWithContent:nil delegate:self];
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
  FBSDKMessageDialog *dialog = [[FBSDKMessageDialog alloc] initWithContent:content delegate:nil];
  dialog.shouldFailOnDataError = _dialog.shouldFailOnDataError;
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

RCT_EXPORT_METHOD(show:(RCTFBSDKSharingContent)content resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  if (_showResolve) {
    reject(@"E_DIALOG_IN_PROGRESS", @"A message dialog is already in progress.", nil);
    return;
  }
  FBSDKMessageDialog *dialog = [[FBSDKMessageDialog alloc] initWithContent:content delegate:self];
  dialog.shouldFailOnDataError = _dialog.shouldFailOnDataError;
  _dialog = dialog;
  _showResolve = resolve;
  _showReject = reject;
  if (![_dialog show] && _showReject) {
    _showResolve = nil;
    _showReject = nil;
    reject(@"FacebookSDK", @"MessageDialog could not be shown.", nil);
  }
}

RCT_EXPORT_METHOD(setShouldFailOnDataError:(BOOL)shouldFailOnDataError)
{
  _dialog.shouldFailOnDataError = shouldFailOnDataError;
}

#pragma mark - FBSDKSharingDelegate

- (void)sharer:(id<FBSDKSharing>)sharer didCompleteWithResults:(NSDictionary *)results
{
  if (sharer != _dialog) {
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
  if (sharer != _dialog) {
    return;
  }
  RCTPromiseRejectBlock reject = _showReject;
  _showReject = nil;
  _showResolve = nil;
  if (reject) {
    reject(@"FacebookSDK", @"MessageDialog encounters error", error);
  }
}

- (void)sharerDidCancel:(id<FBSDKSharing>)sharer
{
  if (sharer != _dialog) {
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
