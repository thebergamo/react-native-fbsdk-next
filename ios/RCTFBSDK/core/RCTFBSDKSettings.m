/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTFBSDKSettings.h"

#import <React/RCTConvert.h>

@implementation RCTFBSDKSettings

RCT_EXPORT_MODULE(FBSettings);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(getAdvertiserTrackingEnabled:(RCTPromiseResolveBlock)resolve rejector:(RCTPromiseRejectBlock)reject)
{
  BOOL ATE = FBSDKSettings.sharedSettings.isAdvertiserTrackingEnabled;
  resolve(@(ATE));
}

RCT_EXPORT_METHOD(setAdvertiserTrackingEnabled:(BOOL)ATE resolver:(RCTPromiseResolveBlock)resolve rejector:(RCTPromiseRejectBlock)reject)
{
  [FBSDKSettings.sharedSettings setAdvertiserTrackingEnabled:ATE];
  resolve(@(true)); // true means successfully changed
}

RCT_EXPORT_METHOD(setDataProcessingOptions:(nullable NSArray<NSString *> *)options)
{
  [FBSDKSettings.sharedSettings setDataProcessingOptions:options];
}

RCT_EXPORT_METHOD(setDataProcessingOptions:(nullable NSArray<NSString *> *)options country:(int)country state:(int)state)
{
  [FBSDKSettings.sharedSettings setDataProcessingOptions:options country:country state:state];
}

RCT_EXPORT_METHOD(initializeSDK)
{
  [FBSDKApplicationDelegate.sharedInstance initializeSDK];
}

RCT_EXPORT_METHOD(setAppID:(NSString *)appID)
{
  [FBSDKSettings.sharedSettings setAppID:appID];
}

RCT_EXPORT_METHOD(setClientToken:(NSString *)clientToken)
{
  [FBSDKSettings.sharedSettings setClientToken:clientToken];
}

RCT_EXPORT_METHOD(setAppName:(NSString *)displayName)
{
  [FBSDKSettings.sharedSettings setDisplayName:displayName];
}

RCT_EXPORT_METHOD(setGraphAPIVersion:(NSString *)version)
{
  [FBSDKSettings.sharedSettings setGraphAPIVersion:version];
}

RCT_EXPORT_METHOD(setAutoLogAppEventsEnabled:(BOOL)enabled)
{
  [FBSDKSettings.sharedSettings setAutoLogAppEventsEnabled:enabled];
}
RCT_EXPORT_METHOD(setAdvertiserIDCollectionEnabled:(BOOL)enabled resolver:(RCTPromiseResolveBlock)resolve rejector:(RCTPromiseRejectBlock)reject)
{
  [FBSDKSettings.sharedSettings setAdvertiserIDCollectionEnabled:enabled];
}

@end
