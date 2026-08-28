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
    FBSDKProfile *profile = FBSDKProfile.currentProfile;
    if (!profile) {
        return nil;
    }

    return @{
        @"name": RCTNullIfNil(profile.name),
        @"firstName": RCTNullIfNil(profile.firstName),
        @"lastName": RCTNullIfNil(profile.lastName),
        @"middleName": RCTNullIfNil(profile.middleName),
        @"imageURL": RCTNullIfNil(profile.imageURL.relativeString),
        @"linkURL": RCTNullIfNil(profile.linkURL.relativeString),
        @"userID": RCTNullIfNil(profile.userID),
        @"email": RCTNullIfNil(profile.email),
        @"refreshDate": profile.refreshDate ? @(profile.refreshDate.timeIntervalSince1970 * 1000) : [NSNull null],
        @"friendIDs": RCTNullIfNil(profile.friendIDs),
        @"birthday": profile.birthday ? @(profile.birthday.timeIntervalSince1970 * 1000) : [NSNull null],
        @"ageRange": profile.ageRange ? @{
            @"min": RCTNullIfNil(profile.ageRange.min),
            @"max": RCTNullIfNil(profile.ageRange.max)
        } : [NSNull null],
        @"hometown": profile.hometown ? @{
            @"id": profile.hometown.id,
            @"name": profile.hometown.name
        } : [NSNull null],
        @"location": profile.location ? @{
            @"id": profile.location.id,
            @"name": profile.location.name
        } : [NSNull null],
        @"gender": RCTNullIfNil(profile.gender),
        @"permissions": RCTNullIfNil(profile.permissions.allObjects)
    };
}

@end
