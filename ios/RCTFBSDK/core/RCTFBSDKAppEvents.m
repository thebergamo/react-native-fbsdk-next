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

#import "RCTFBSDKAppEvents.h"

#import <React/RCTUtils.h>

#import "RCTConvert+FBSDKAccessToken.h"

@implementation RCTConvert (RCTFBSDKAppEvents)

RCT_ENUM_CONVERTER(FBSDKAppEventsFlushBehavior, (@{
  @"auto": @(FBSDKAppEventsFlushBehaviorAuto),
  @"explicit_only": @(FBSDKAppEventsFlushBehaviorExplicitOnly),
}), FBSDKAppEventsFlushBehaviorAuto, unsignedIntegerValue)

RCT_ENUM_CONVERTER(FBSDKProductAvailability, (@{
  @"in_stock": @(FBSDKProductAvailabilityInStock),
  @"out_of_stock": @(FBSDKProductAvailabilityOutOfStock),
  @"preorder": @(FBSDKProductAvailabilityPreOrder),
  @"avaliable_for_order": @(FBSDKProductAvailabilityAvailableForOrder),
  @"discontinued": @(FBSDKProductAvailabilityDiscontinued),
}), FBSDKProductAvailabilityInStock, unsignedIntegerValue)

RCT_ENUM_CONVERTER(FBSDKProductCondition, (@{
  @"new": @(FBSDKProductConditionNew),
  @"refurbished": @(FBSDKProductConditionRefurbished),
  @"used": @(FBSDKProductConditionUsed),
}), FBSDKProductConditionNew, unsignedIntegerValue)

@end

@implementation RCTFBSDKAppEvents

RCT_EXPORT_MODULE(FBAppEventsLogger);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(logEvent:(NSString *)eventName
                valueToSum:(nonnull NSNumber *)valueToSum
                parameters:(NSDictionary *)parameters)
{
  parameters = RCTDictionaryWithoutNullValues(parameters);

  [FBSDKAppEvents.shared logEvent:eventName
                       valueToSum:valueToSum
                       parameters:parameters
                      accessToken:nil];
}

RCT_EXPORT_METHOD(logPurchase:(double)purchaseAmount
                     currency:(NSString *)currency
                   parameters:(NSDictionary *)parameters)
{
  parameters = RCTDictionaryWithoutNullValues(parameters);

  [FBSDKAppEvents.shared logPurchase:purchaseAmount
                            currency:currency
                          parameters:parameters
                         accessToken:nil];
}

RCT_EXPORT_METHOD(logProductItem:(NSString *)itemID
                    availability:(FBSDKProductAvailability)availability
                       condition:(FBSDKProductCondition)condition
                     description:(NSString *)description
                       imageLink:(NSString *)imageLink
                            link:(NSString *)link
                           title:(NSString *)title
                     priceAmount:(double)priceAmount
                        currency:(NSString *)currency
                            gtin:(NSString *)gtin
                             mpn:(NSString *)mpn
                           brand:(NSString *)brand
                      parameters:(NSDictionary *)parameters)
{
    [FBSDKAppEvents.shared logProductItem:itemID
                             availability:availability
                                condition:condition
                              description:description
                                imageLink:imageLink
                                     link:link
                                    title:title
                              priceAmount:priceAmount
                                 currency:currency
                                     gtin:gtin
                                      mpn:mpn
                                    brand:brand
                               parameters:parameters];
}

RCT_EXPORT_METHOD(logPushNotificationOpen:(NSDictionary *)payload)
{
  [FBSDKAppEvents.shared logPushNotificationOpen:payload];
}

RCT_EXPORT_METHOD(setUserID:(NSString *)userID)
{
  [FBSDKAppEvents.shared setUserID:userID];
}

RCT_EXPORT_METHOD(clearUserID)
{
  [FBSDKAppEvents.shared setUserID:nil];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getUserID)
{
  return [FBSDKAppEvents.shared userID];
}

RCT_EXPORT_METHOD(getAnonymousID:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSString *anonymousID = [FBSDKAppEvents.shared anonymousID];
    resolve(anonymousID);
  }
  @catch (NSError *error) {
    reject(@"E_ANONYMOUS_ID_ERROR", @"Can not get anonymousID", error);
  }
}

RCT_EXPORT_METHOD(getAdvertiserID:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    // advertiserID is no longer available to iOS from FBSDK v12
    resolve(nil);
  }
  @catch (NSError *error) {
    reject(@"E_ADVERTISER_ID_ERROR", @"Can not get advertiserID", error);
  }
}

RCT_EXPORT_METHOD(setUserData:(NSDictionary *)userData)
{
  userData = RCTDictionaryWithoutNullValues(userData);

  [FBSDKAppEvents.shared setUserEmail:userData[@"email"]
                            firstName:userData[@"firstName"]
                             lastName:userData[@"lastName"]
                                phone:userData[@"phone"]
                          dateOfBirth:userData[@"dateOfBirth"]
                               gender:userData[@"gender"]
                                 city:userData[@"city"]
                                state:userData[@"state"]
                                  zip:userData[@"zip"]
                              country:userData[@"country"]];
}

RCT_EXPORT_METHOD(setFlushBehavior:(FBSDKAppEventsFlushBehavior)flushBehavior)
{
  [FBSDKAppEvents.shared setFlushBehavior:flushBehavior];
}

RCT_EXPORT_METHOD(flush)
{
  [FBSDKAppEvents.shared flush];
}

RCT_EXPORT_METHOD(setPushNotificationsDeviceToken:(NSString *)deviceToken)
{
  [FBSDKAppEvents.shared setPushNotificationsDeviceToken:[RCTConvert NSData:deviceToken]];
}

- (NSDictionary *)constantsToExport {
  return @{
    @"AppEvents": @{
      @"AchievedLevel": FBSDKAppEventNameAchievedLevel,
      @"AdClick": FBSDKAppEventNameAdClick,
      @"AdImpression": FBSDKAppEventNameAdImpression,
      @"AddedPaymentInfo": FBSDKAppEventNameAddedPaymentInfo,
      @"AddedToCart": FBSDKAppEventNameAddedToCart,
      @"AddedToWishlist": FBSDKAppEventNameAddedToWishlist,
      @"CompletedRegistration": FBSDKAppEventNameCompletedRegistration,
      @"CompletedTutorial": FBSDKAppEventNameCompletedTutorial,
      @"Contact": FBSDKAppEventNameContact,
      @"CustomizeProduct": FBSDKAppEventNameCustomizeProduct,
      @"Donate": FBSDKAppEventNameDonate,
      @"FindLocation": FBSDKAppEventNameFindLocation,
      @"InitiatedCheckout": FBSDKAppEventNameInitiatedCheckout,
      @"Purchased": FBSDKAppEventNamePurchased,
      @"Rated": FBSDKAppEventNameRated,
      @"Searched": FBSDKAppEventNameSearched,
      @"SpentCredits": FBSDKAppEventNameSpentCredits,
      @"Schedule": FBSDKAppEventNameSchedule,
      @"StartTrial": FBSDKAppEventNameStartTrial,
      @"SubmitApplication": FBSDKAppEventNameSubmitApplication,
      @"Subscribe": FBSDKAppEventNameSubscribe,
      @"UnlockedAchievement": FBSDKAppEventNameUnlockedAchievement,
      @"ViewedContent": FBSDKAppEventNameViewedContent,
    },
    @"AppEventParams": @{
      @"AddType": FBSDKAppEventParameterNameAdType,
      @"Content": FBSDKAppEventParameterNameContent,
      @"ContentID": FBSDKAppEventParameterNameContentID,
      @"ContentType": FBSDKAppEventParameterNameContentType,
      @"Currency": FBSDKAppEventParameterNameCurrency,
      @"Description": FBSDKAppEventParameterNameDescription,
      @"Level": FBSDKAppEventParameterNameLevel,
      @"NumItems": FBSDKAppEventParameterNameNumItems,
      @"MaxRatingValue": FBSDKAppEventParameterNameMaxRatingValue,
      @"OrderId": FBSDKAppEventParameterNameOrderID,
      @"PaymentInfoAvailable": FBSDKAppEventParameterNamePaymentInfoAvailable,
      @"RegistrationMethod": FBSDKAppEventParameterNameRegistrationMethod,
      @"SearchString": FBSDKAppEventParameterNameSearchString,
      @"Success": FBSDKAppEventParameterNameSuccess,
      @"ValueNo": FBSDKAppEventParameterValueNo,
      @"ValueYes": FBSDKAppEventParameterValueYes,
    }
  };
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

static NSDictionary<NSString *, id> *RCTDictionaryWithoutNullValues(NSDictionary<NSString *, id> *input)
{
  if (input == nil) {
    return nil;
  }
  NSMutableDictionary<NSString *, id> *result = [[NSMutableDictionary alloc] initWithCapacity:[input count]];
  [input enumerateKeysAndObjectsUsingBlock:^(NSString *key, id item, __unused BOOL *stop) {
    result[key] = RCTNilIfNull(item);
  }];
  return result;
}

@end
