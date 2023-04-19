//
//  RCTFBSDKAEMReporter.m
//  react-native-fbsdk-next
//
//  Created by rnike@gitub on 2021/12/17.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>
#import <FBAEMKit/FBAEMKit-Swift.h>

@interface RCTFBSDKAEMReporter : NSObject <RCTBridgeModule>
@end

@implementation RCTFBSDKAEMReporter

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(recordAndUpdateEvent:(NSString *)eventName
                  value:(NSNumber * __nonnull)value
                  currency:(NSString * _Nullable)currency
                  otherParameters:(NSDictionary<NSString *,id> * _Nullable)otherParameters)
{
    [FBAEMReporter recordAndUpdateEvent:eventName
                               currency:currency
                                  value:value
                             parameters:otherParameters];
}

@end
