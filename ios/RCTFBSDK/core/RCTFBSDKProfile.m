#import "RCTFBSDKProfile.h"
#import <React/RCTLog.h>

#import <React/RCTUtils.h>

@implementation RCTFBSDKProfile

RCT_EXPORT_MODULE(FBProfile);

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(getCurrentProfile:(RCTResponseSenderBlock)callback)
{
    NSDictionary *profileDict = RCTBuildProfileDict();
    callback(@[RCTNullIfNil(profileDict)]);
}

#pragma mark - Helper Functions

static NSDictionary *RCTBuildProfileDict()
{
    if (!FBSDKProfile.currentProfile) {
        return nil;
    }

    return @{
        @"name": FBSDKProfile.currentProfile.name ? FBSDKProfile.currentProfile.name : [NSNull null],
        @"firstName": FBSDKProfile.currentProfile.firstName ? FBSDKProfile.currentProfile.firstName : [NSNull null],
        @"lastName": FBSDKProfile.currentProfile.lastName ? FBSDKProfile.currentProfile.lastName : [NSNull null],
        @"middleName": FBSDKProfile.currentProfile.middleName ? FBSDKProfile.currentProfile.middleName : [NSNull null],
        @"imageURL": FBSDKProfile.currentProfile.imageURL ? FBSDKProfile.currentProfile.imageURL.relativeString : [NSNull null],
        @"linkURL": FBSDKProfile.currentProfile.linkURL ? FBSDKProfile.currentProfile.linkURL.relativeString : [NSNull null],
        @"userID": FBSDKProfile.currentProfile.userID ? FBSDKProfile.currentProfile.userID : [NSNull null],
        @"email": FBSDKProfile.currentProfile.email ? FBSDKProfile.currentProfile.email : [NSNull null],
    };
}

@end
