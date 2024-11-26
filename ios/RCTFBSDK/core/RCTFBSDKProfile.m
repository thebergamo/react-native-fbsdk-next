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

static NSDictionary *RCTBuildProfileDict(void)
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
        @"refreshDate": FBSDKProfile.currentProfile.refreshDate ? @(FBSDKProfile.currentProfile.refreshDate.timeIntervalSince1970 * 1000) : [NSNull null],
        @"friendIDs": FBSDKProfile.currentProfile.friendIDs ? FBSDKProfile.currentProfile.friendIDs : [NSNull null],
        @"birthday": FBSDKProfile.currentProfile.birthday ? @(FBSDKProfile.currentProfile.birthday.timeIntervalSince1970 * 1000) : [NSNull null],
        @"ageRange": FBSDKProfile.currentProfile.ageRange ? @{
            @"min": FBSDKProfile.currentProfile.ageRange.min,
            @"max": FBSDKProfile.currentProfile.ageRange.max
        } : [NSNull null],
        @"hometown": FBSDKProfile.currentProfile.hometown ? @{
            @"id": FBSDKProfile.currentProfile.hometown.id,
            @"name": FBSDKProfile.currentProfile.hometown.name
        } : [NSNull null],
        @"location": FBSDKProfile.currentProfile.location ? @{
            @"id": FBSDKProfile.currentProfile.location.id,
            @"name": FBSDKProfile.currentProfile.location.name
        } : [NSNull null],
        @"gender": FBSDKProfile.currentProfile.gender ? FBSDKProfile.currentProfile.gender : [NSNull null],
        @"permissions": FBSDKProfile.currentProfile.permissions ? FBSDKProfile.currentProfile.permissions.allObjects : [NSNull null]
    };
}

@end
