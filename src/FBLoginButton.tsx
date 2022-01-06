/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Developer Principles and Policies
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @format
 */
import {
  DefaultAudience,
  LoginBehaviorAndroid,
  LoginResult,
  LoginTracking,
} from './FBLoginManager';
import {PropsOf} from './utils';
import * as React from 'react';
import {requireNativeComponent, StyleSheet, ViewStyle} from 'react-native';

export type Event = {
  nativeEvent?: {
    type?: 'loginFinished' | 'logoutFinished';
    error: Record<string, unknown>;
    result: LoginResult;
  };
};
export type TooltipBehaviorIOS = 'auto' | 'force_display' | 'disable';

/**
 * A button that initiates a log in or log out flow upon tapping.
 */
class LoginButton extends React.Component<{
  /**
   * Represents the permissions to request when the login button
   * is pressed.
   */
  permissions?: Array<string>;

  /**
   * The callback invoked upon error/completion of a login request.
   */
  onLoginFinished?: (
    error: Record<string, unknown>,
    result: LoginResult,
  ) => void;

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
  nonceIOS?: string;

  /**
   * Gets or sets the desired tracking preference to use for login attempts. Defaults to `enabled`
   * @platform ios
   */
  loginTrackingIOS?: LoginTracking;

  /**
   * View style, if any.
   */
  style?: ViewStyle;

  /**
   * testID, if any.
   */
  testID?: string;
}> {
  static defaultProps: {
    style: typeof styles.defaultButtonStyle;
  };

  _eventHandler(event: Event) {
    if (typeof event !== 'object' || !event || !event.nativeEvent) {
      return;
    }
    const eventDict = event.nativeEvent;
    if (eventDict.type === 'loginFinished') {
      if (this.props.onLoginFinished) {
        this.props.onLoginFinished(eventDict.error, eventDict.result);
      }
    } else if (eventDict.type === 'logoutFinished') {
      if (this.props.onLogoutFinished) {
        this.props.onLogoutFinished();
      }
    }
  }

  render() {
    return (
      <RCTFBLoginButton
        {...this.props}
        onChange={this._eventHandler.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  defaultButtonStyle: {
    height: 30,
    width: 190,
  },
});

LoginButton.defaultProps = {
  style: styles.defaultButtonStyle,
};

type RCTFBLoginButtonProps = PropsOf<LoginButton> & {
  onChange: (event: Event) => void;
};

const RCTFBLoginButton =
  requireNativeComponent<RCTFBLoginButtonProps>('RCTFBLoginButton');

export default LoginButton;
