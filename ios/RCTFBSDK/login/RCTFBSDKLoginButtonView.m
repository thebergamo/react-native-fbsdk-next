#import "RCTFBSDKLoginButtonView.h"

#import <React/RCTComponentEvent.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>
#import <React/UIView+React.h>


@interface RCTFBSDKLoginButtonView ()

@property (nonatomic, strong) FBSDKLoginButton *loginButton;

@end

@implementation RCTFBSDKLoginButtonView

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.loginButton = [[FBSDKLoginButton alloc] init];
    self.loginButton.delegate = self;
    self.loginButton.frame = self.bounds;
    self.loginButton.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;

    [self addSubview:_loginButton];

    return self;
  }
  return self;
}

#pragma mark - FBSDKLoginButtonDelegate

- (void)loginButton:(FBSDKLoginButton *)loginButton didCompleteWithResult:(FBSDKLoginManagerLoginResult *)result error:(NSError *)error
{
  NSDictionary *body = @{
    @"type": @"loginFinished",
    @"error": error ? RCTJSErrorFromNSError(error) : [NSNull null],
    @"result": error ? [NSNull null] : @{
      @"isCancelled": @(result.isCancelled),
      @"grantedPermissions": result.isCancelled ? [NSNull null] : result.grantedPermissions.allObjects,
      @"declinedPermissions": result.isCancelled ? [NSNull null] : result.declinedPermissions.allObjects,
    },
  };

  self.onChange(body);
}

- (void)loginButtonDidLogOut:(FBSDKLoginButton *)loginButton
{
  NSDictionary *body = @{
    @"type": @"logoutFinished",
  };

  self.onChange(body);
}

@end
