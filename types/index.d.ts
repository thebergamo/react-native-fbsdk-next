declare module 'react-native-fbsdk-next' {
  declare const defaultVar: {
    readonly ShareOpenGraphAction: import('./models/FBShareOpenGraphAction').default;
    readonly ShareOpenGraphObject: import('./models/FBShareOpenGraphObject').default;
    readonly ShareOpenGraphValueContainer: import('./models/FBShareOpenGraphValueContainer').default;
    readonly AccessToken: import('./FBAccessToken').default;
    readonly AppEventsLogger: {
      setFlushBehavior(flushBehavior: 'auto' | 'explicit_only'): void;
      logEvent(eventName: string, ...args: (number | {
        [key: string]: string | number;
      })[]): void;
      logPurchase(purchaseAmount: number, currencyCode: string, parameters?: {
        [key: string]: string | number;
      } | null | undefined): void;
      logPushNotificationOpen(payload?: any): void;
      flush(): void;
      setUserID(userID: string | null): void;
      getUserID(): Promise<string | null | undefined>;
      getAnonymousID(): Promise<string | null | undefined>;
      getAdvertiserID(): Promise<string | null | undefined>;
      getAttributionID(): Promise<string | null | undefined>;
      updateUserProperties(parameters: {
        [key: string]: string | number;
      }): void;
      setUserData(userData: Readonly<{
        email?: string | null | undefined;
        firstName?: string | null | undefined;
        lastName?: string | null | undefined;
        phone?: string | null | undefined;
        dateOfBirth?: string | null | undefined;
        gender?: 'm' | 'f' | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zip?: string | null | undefined;
        country?: string | null | undefined;
      }>): void;
      setPushNotificationsDeviceToken(deviceToken: string): void;
      setPushNotificationsRegistrationId(registrationId: string): void;
    };
    readonly AppLink: {
      fetchDeferredAppLink(): Promise<string | null>;
    };
    readonly GameRequestDialog: {
      canShow(): Promise<any>;
      show(gameRequestContent: import('./models/FBGameRequestContent').GameRequestContent): Promise<any>;
    };
    readonly GraphRequest: import('./FBGraphRequest').default;
    readonly GraphRequestManager: import('./FBGraphRequestManager').default;
    readonly LoginManager: {
      logInWithPermissions(permissions: string[]): Promise<import('./FBLoginManager').LoginResult>;
      getLoginBehavior(): Promise<import('./FBLoginManager').LoginBehavior>;
      setLoginBehavior(loginBehavior: import('./FBLoginManager').LoginBehavior): void;
      getDefaultAudience(): Promise<import('./FBLoginManager').DefaultAudience>;
      setDefaultAudience(defaultAudience: import('./FBLoginManager').DefaultAudience): void;
      logOut(): void;
    };
    readonly MessageDialog: {
      canShow(shareContent: import('./models/FBShareContent').ShareContent): Promise<boolean>;
      show(shareContent: import('./models/FBShareContent').ShareContent): Promise<any>;
      setShouldFailOnDataError(shouldFailOnDataError: boolean): void;
    };
    readonly Settings: {
      getAdvertiserTrackingEnabled(): Promise<boolean>;
      setAdvertiserTrackingEnabled(ATE: boolean): Promise<boolean>;
      setDataProcessingOptions(options: string[], ...args: number[]): void;
      initializeSDK(): void;
    };
    readonly ShareDialog: {
      canShow(shareContent: import('./models/FBShareContent').ShareContent): Promise<boolean>;
      show(shareContent: import('./models/FBShareContent').ShareContent): Promise<any>;
      setMode(mode: 'browser' | 'web' | 'automatic' | 'webview' | 'native' | 'feed'): void;
      setShouldFailOnDataError(shouldFailOnDataError: boolean): void;
    };
    readonly LoginButton: import('./FBLoginButton').default;
    readonly SendButton: import('./FBSendButton').default;
    readonly ShareButton: import('./FBShareButton').default;
  };
  export = defaultVar;
}
// # sourceMappingURL=index.d.ts.map
