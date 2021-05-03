#import "RCTFBSDKAuthenticationToken.h"

#import <React/RCTUtils.h>

@implementation RCTFBSDKAuthenticationToken

RCT_EXPORT_MODULE(FBAuthenticationToken);

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(getAuthenticationToken:(RCTResponseSenderBlock)callback)
{
    FBSDKAuthenticationToken *currentToken = [FBSDKAuthenticationToken currentAuthenticationToken];
    NSDictionary *tokenDict = RCTBuildAccessTokenDict(currentToken);
    callback(@[RCTNullIfNil(tokenDict)]);
}

#pragma mark - Helper Functions

static NSDictionary *RCTBuildAccessTokenDict(FBSDKAuthenticationToken *token)
{
    if (!token) {
        return nil;
    }
    return @{
        @"authenticationToken": token.tokenString,
        @"nonce": token.nonce,
        @"graphDomain": token.graphDomain,
    };
}

@end
