//
//  RCTFBSDKAEMRepoter.m
//  react-native-fbsdk-next
//
//  Created by rnike@gitub on 2021/12/17.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>
#import <FBAEMKit/FBAEMReporter.h>

@interface RCTFBSDKAEMRepoter : NSObject <RCTBridgeModule>
@end

@implementation RCTFBSDKAEMRepoter

RCT_EXPORT_MODULE(RCTFBSDKAEMRepoter);

RCT_EXPORT_METHOD(recordAndUpdateEvent:(NSString *)eventName
                  currency:(NSString * _Nullable)currency
                  value:(NSNumber * _Nullable)value
                  otherParameters:(NSDictionary<NSString *,id> * _Nullable)otherParameters)
{
    [FBAEMReporter recordAndUpdateEvent:eventName
                               currency:currency
                                  value:value
                             parameters:otherParameters];
}

@end
