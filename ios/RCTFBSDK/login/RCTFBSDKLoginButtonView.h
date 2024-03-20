#import <FBSDKLoginKit/FBSDKLoginKit.h>

#import <React/RCTComponent.h>
#import <React/RCTEventDispatcher.h>

@interface RCTFBSDKLoginButtonView: UIView<FBSDKLoginButtonDelegate>

@property (nonatomic, copy) RCTBubblingEventBlock onChange;

@end
