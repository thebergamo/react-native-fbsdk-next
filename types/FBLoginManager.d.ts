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
const defaultExport: {
  /**
     * Logs the user in with the requested permissions.
     */
  logInWithPermissions(permissions: Array<string>): Promise<LoginResult>;
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
export default defaultExport;
