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

#import "RCTFBSDKLoginManager.h"

#import <React/RCTUtils.h>

#import "RCTConvert+FBSDKLogin.h"

@implementation RCTFBSDKLoginManager
{
  FBSDKLoginManager *_loginManager;
}

RCT_EXPORT_MODULE(FBLoginManager);

#pragma mark - Object Lifecycle

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (instancetype)init
{
  if ((self = [super init])) {
    _loginManager = [[FBSDKLoginManager alloc] init];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

#pragma mark - React Native Methods


RCT_EXPORT_METHOD(setDefaultAudience:(FBSDKDefaultAudience)audience)
{
  _loginManager.defaultAudience = audience;
}

RCT_REMAP_METHOD(getDefaultAudience, getDefaultAudience_resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve(DefaultAudienceToString([_loginManager defaultAudience]));
}

RCT_EXPORT_METHOD(logInWithPermissions:(NSArray<NSString *> *)permissions
                  loginTracking: (NSString *)loginTracking
                  nonce: (NSString *)nonce
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    FBSDKLoginManagerLoginResultBlock requestHandler = ^(FBSDKLoginManagerLoginResult *result, NSError *error) {
        if (error) {
            reject(@"FacebookSDK", @"Login Failed", error);
        } else {
            resolve(RCTBuildResultDictionary(result));
        }
    };
    FBSDKLoginConfiguration *configuration;
    FBSDKLoginTracking tracking = [loginTracking  isEqualToString: @"limited"] ? FBSDKLoginTrackingLimited : FBSDKLoginTrackingEnabled;

    if ( ( ![nonce isEqual:[NSNull null]] ) && ( [nonce length] != 0 ) ) {
        configuration =
        [[FBSDKLoginConfiguration alloc] initWithPermissions:permissions
                                                    tracking: tracking
                                                       nonce:nonce
         ];
    } else {
        configuration =
        [[FBSDKLoginConfiguration alloc] initWithPermissions:permissions
                                                    tracking: tracking
         ];
    }

    [_loginManager
     logInFromViewController: nil
     configuration:configuration
     completion:requestHandler];
};

RCT_EXPORT_METHOD(reauthorizeDataAccess:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    FBSDKLoginManagerLoginResultBlock requestHandler = ^(FBSDKLoginManagerLoginResult *result, NSError *error) {
      if (error) {
        reject(@"FacebookSDK", @"Reauthorization Failed", error);
      } else {
        resolve(RCTBuildResultDictionary(result));
      }
    };

    // the nil argument is a ViewController, it should be nullable but Xcode complains
    // I logged an upstream bug (and proposed a PR), hopefully will resolve.
    // https://github.com/facebook/facebook-ios-sdk/issues/2476
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wnonnull"
    [_loginManager reauthorizeDataAccess:nil handler:requestHandler];
#pragma clang diagnostic pop
};

RCT_EXPORT_METHOD(logOut)
{
  [_loginManager logOut];
};

#pragma mark - Helper Methods

static NSDictionary *RCTBuildResultDictionary(FBSDKLoginManagerLoginResult *result)
{
  return @{
    @"isCancelled": @(result.isCancelled),
    @"grantedPermissions": result.isCancelled ? [NSNull null] : result.grantedPermissions.allObjects,
    @"declinedPermissions": result.isCancelled ? [NSNull null] : result.declinedPermissions.allObjects,
  };
}

static NSString *DefaultAudienceToString(FBSDKDefaultAudience defaultAudience)
{
  NSString *result = nil;
  switch (defaultAudience) {
    case FBSDKDefaultAudienceFriends:
      result = @"friends";
      break;
    case FBSDKDefaultAudienceEveryone:
      result = @"everyone";
      break;
    case FBSDKDefaultAudienceOnlyMe:
      result = @"only-me";
      break;
    default:
      break;
  }
  return result;
}

@end
