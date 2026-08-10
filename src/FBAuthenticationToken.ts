/**
 * @format
 *
 * Cross-platform AuthenticationToken getter.
 * getAuthenticationTokenIOS remains as an alias for existing call sites.
 */
import {NativeModules} from 'react-native';

const AuthenticationToken = NativeModules.FBAuthenticationToken;

export type AuthenticationTokenMap = {
  authenticationToken: string;
  nonce: string;
  graphDomain: string;
};

/**
 * Represents an immutable authentication token for Facebook Limited Login / OIDC.
 */
class FBAuthenticationToken {
  /**
   * The raw token string from the authentication response
   */
  authenticationToken: string;

  /**
   * The nonce from the decoded authentication response
   */
  nonce: string;

  /**
   * The graph domain where the user is authenticated.
   */
  graphDomain: string;

  /**
   * @param tokenMap Native token map from FBAuthenticationToken module
   */
  constructor(tokenMap: AuthenticationTokenMap) {
    this.authenticationToken = tokenMap.authenticationToken;
    this.nonce = tokenMap.nonce;
    this.graphDomain = tokenMap.graphDomain;
    Object.freeze(this);
  }

  /**
   * Getter for the current AuthenticationToken (iOS and Android).
   *
   * @returns Current token instance or null when Limited Login JWT is unavailable
   */
  static getAuthenticationToken(): Promise<FBAuthenticationToken | null> {
    if (!AuthenticationToken || typeof AuthenticationToken.getAuthenticationToken !== 'function') {
      return Promise.resolve(null);
    }
    return new Promise<FBAuthenticationToken | null>((resolve) => {
      AuthenticationToken.getAuthenticationToken(
        (tokenMap: AuthenticationTokenMap | null) => {
          if (tokenMap) {
            resolve(new FBAuthenticationToken(tokenMap));
          } else {
            resolve(null);
          }
        },
      );
    });
  }

  /**
   * iOS-named alias for {@link getAuthenticationToken}. Kept so existing call sites
   * and iOS behavior remain stable after the cross-platform patch.
   *
   * @returns Current token instance or null
   */
  static getAuthenticationTokenIOS(): Promise<FBAuthenticationToken | null> {
    return FBAuthenticationToken.getAuthenticationToken();
  }
}

export default FBAuthenticationToken;
