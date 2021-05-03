/**
 * Indicates which default audience to use for sessions that post data to Facebook.
 */
export type DefaultAudience = // Indicates that the user's friends are able to see posts made by the application.
'friends' | 'everyone' | 'only_me';
export type LoginBehavior = LoginBehaviorIOS | LoginBehaviorAndroid;
/**
 * Indicate how Facebook Login should be attempted on Android.
 */
export type LoginBehaviorAndroid =
/**
 * Attempt login in using the Facebook App, and if that does not work fall back to web dialog auth.
 */
'native_with_fallback' | 'native_only' | 'web_only';
/**
 * Indicate how Facebook Login should be attempted on iOS.
 */
export type LoginBehaviorIOS = 'browser';
/**
 * Shows the results of a login operation.
 */
export type LoginResult = {
  isCancelled: boolean;
  grantedPermissions?: Array<string>;
  declinedPermissions?: Array<string>;
};

export type LoginTracking = 'enabled' | 'limited';

export type FBLoginManager = {
  /**
   * Log in with the requested permissions.
   * @param loginTrackingIOS IOS only: loginTracking: 'enabled' | 'limited', default 'enabled'.
   * @param nonceIOS IOS only: Nonce that the configuration was created with. A unique nonce will be used if none is provided to the factory method. 
   */
   logInWithPermissions(
      permissions: Array<string>,
      loginTrackingIOS?: LoginTracking,
      nonceIOS?: string
   ): Promise<LoginResult>;
  /**
     * Getter for the login behavior.
     */
  getLoginBehavior(): Promise<LoginBehavior>;
  /**
     * Setter for the login behavior.
     */
  setLoginBehavior(loginBehavior: LoginBehavior): void;
  /**
     * Getter for the default audience.
     */
  getDefaultAudience(): Promise<DefaultAudience>;
  /**
     * Setter for the default audience.
     */
  setDefaultAudience(defaultAudience: DefaultAudience): void;
  /**
     * Logs out the user.
     */
  logOut(): void;
};
