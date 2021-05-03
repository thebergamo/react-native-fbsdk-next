import * as React from 'react';
import type {
  DefaultAudience,
  LoginBehaviorAndroid,
  LoginResult,
  LoginTracking,
} from './FBLoginManager';

type Event = any;
type TooltipBehaviorIOS = 'auto' | 'force_display' | 'disable';
/**
 * A button that initiates a log in or log out flow upon tapping.
 */
export class LoginButton extends React.Component<{
  /**
     * Represents the permissions to request when the login button
     * is pressed.
     */
  permissions?: Array<string>;
  /**
     * The callback invoked upon error/completion of a login request.
     */
  onLoginFinished?: (error: any, result: LoginResult) => void;
  /**
     * The callback invoked upon completion of a logout request.
     */
  onLogoutFinished?: () => void;
  /**
     * The behavior to use when attempting a login.
     * @platform android
     */
  loginBehaviorAndroid?: LoginBehaviorAndroid;
  /**
     * The default audience to target when attempting a login.
     */
  defaultAudience?: DefaultAudience;
  /**
     * For iOS only, the desired tooltip behavior.
     * @platform ios
     */
   tooltipBehaviorIOS?: TooltipBehaviorIOS;
  
   /**
    * Gets or sets an optional nonce to use for login attempts. A valid nonce must be a non-empty string without
    * whitespace. An invalid nonce will not be set. Instead, default unique nonces will be used for login attempts.
    * @platform ios
  */
  nonceIOS?: string,

  /**
    * Gets or sets the desired tracking preference to use for login attempts. Defaults to `enabled`
    * @platform ios
  */
   loginTrackingIOS?: LoginTracking,
  
  /**
     * View style, if any.
     */
  style?: any;
}> {
  static defaultProps: {
    style: typeof styles.defaultButtonStyle;
  };
  _eventHandler(event: Event): void;
  render(): JSX.Element;
}
export const styles: {
  defaultButtonStyle: {
    height: number;
    width: number;
  };
};
