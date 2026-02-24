import { ConfigPlugin, withAppDelegate } from '@expo/config-plugins';

export const withFacebookAppDelegate: ConfigPlugin = (config) => {
    return withAppDelegate(config, (config) => {
        const { contents, language } = config.modResults;

        if (language === 'swift') {
            config.modResults.contents = applySwiftAppDelegateChanges(contents);
        } else {
            config.modResults.contents = applyObjcAppDelegateChanges(contents);
        }

        return config;
    });
};

// ─── Swift (React Native >= 0.77 / Expo SDK 53+) ───────────────────────────

function applySwiftAppDelegateChanges(contents: string): string {
    // 1. Add import
    if (!contents.includes('import FBSDKCoreKit')) {
        contents = contents.replace(
            /^(import React.*)/m,
            `$1\nimport FBSDKCoreKit`
        );
    }

    // 2. Add SDK init inside didFinishLaunchingWithOptions
    if (!contents.includes('ApplicationDelegate.shared.application(')) {
        contents = contents.replace(
            /return super\.application\(application, didFinishLaunchingWithOptions:/,
            `ApplicationDelegate.shared.application(application, didFinishLaunchingWithOptions: launchOptions)\n    return super.application(application, didFinishLaunchingWithOptions:`
        );
    }

    // 3. Add openURL override
    if (!contents.includes('ApplicationDelegate.shared.application') ||
        !contents.includes('open url: URL')) {
        const openURLMethod = `
  public override func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey: Any] = [:]
  ) -> Bool {
    let handledByFB = ApplicationDelegate.shared.application(app, open: url, options: options)
    let handledBySuper = super.application(app, open: url, options: options)
    return handledByFB || handledBySuper
  }
`;
        // Insert before the last closing brace of the class
        contents = contents.replace(/^}$/m, `${openURLMethod}}`);
    }

    return contents;
}

// ─── Objective-C (React Native <= 0.76) ────────────────────────────────────

function applyObjcAppDelegateChanges(contents: string): string {
    // 1. Add imports
    if (!contents.includes('FBSDKCoreKit-Swift.h')) {
        contents = contents.replace(
            /#import <React\/RCTBridge.h>/,
            `#import <React/RCTBridge.h>
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>`
        );
    }

    // 2. Add SDK init inside didFinishLaunchingWithOptions
    if (!contents.includes('FBSDKApplicationDelegate')) {
        contents = contents.replace(
            /return \[super application:application didFinishLaunchingWithOptions:launchOptions\];/,
            `[[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];`
        );
    }

    return contents;
}