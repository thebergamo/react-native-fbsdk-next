type AccessTokenMap = {
  accessToken: string;
  permissions: Array<string>;
  declinedPermissions: Array<string>;
  expiredPermissions: Array<string>;
  applicationID: string;
  userID: string;
  expirationTime: number;
  lastRefreshTime: number;
  dataAccessExpirationTime: number;
  accessTokenSource?: string;
};
/**
 * Represents an immutable access token for using Facebook services.
 */
export class FBAccessToken {
  /**
     * The access token string.
     */
  accessToken: string;

  /**
     * The known granted permissions.
     */
  permissions: Array<string>;

  /**
     * The known declined permissions.
     */
  declinedPermissions: Array<string>;

  /**
     * The known expired permissions.
     */
  expiredPermissions: Array<string>;

  /**
     * The app ID.
     */
  applicationID: string;

  /**
     * The user ID.
     */
  userID: string;

  /**
     * The expiration time of the access token.
     * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
     */
  expirationTime: number;

  /**
     * The last refresh time of the access token.
     * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
     */
  lastRefreshTime: number;

  /**
     * The data access expiration time of the access token.
     * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
     */
  dataAccessExpirationTime: number;

  /**
     * The source of access token.
     * @platform android
     */
  accessTokenSource: string | undefined | null;
  constructor(tokenMap: AccessTokenMap);
  /**
     * Getter for the access token that is current for the application.
     */
  static getCurrentAccessToken(): Promise<FBAccessToken | undefined | null>;
  /**
     * Setter for the access token that is current for the application.
     */
  static setCurrentAccessToken(accessToken: AccessTokenMap): void;
  /**
     * Updates the current access token with up to date permissions,
     * and extends the expiration date, if extension is possible.
     */
  static refreshCurrentAccessTokenAsync(): Promise<any>;
  /**
     * Adds a listener for when the access token changes. Returns a functions which removes the
     * listener when called.
     */
  static addListener(listener: (accessToken?: FBAccessToken | null) => void): () => void;
  /**
     * Gets the date at which the access token expires. The value is the number of
     * milliseconds since Jan. 1, 1970, midnight GMT.
     */
  getExpires(): number;
  /**
     * Get the list of permissions associated with this access token. Note that the most up-to-date
     * list of permissions is maintained by Facebook, so this list may be outdated if permissions
     * have been added or removed since the time the AccessToken object was created. See
     * https://developers.facebook.com/docs/reference/login/#permissions for details.
     */
  getPermissions(): Array<string>;
  /**
     * Gets the list of permissions declined by the user with this access token. It represents the
     * entire set of permissions that have been requested and declined. Note that the most
     * up-to-date list of permissions is maintained by Facebook, so this list may be outdated if
     * permissions have been granted or declined since the last time an AccessToken object was
     * created. See https://developers.facebook.com/docs/reference/login/#permissions for details.
     */
  getDeclinedPermissions(): Array<string>;
  getExpiredPermissions(): Array<string>;
  /**
     * Gets the date at which the token was last refreshed. Since tokens expire, the Facebook SDK
     * will attempt to renew them periodically. The value is the number of milliseconds since
     * Jan. 1, 1970, midnight GMT.
     */
  getLastRefresh(): number;
  getDataAccessExpiration(): number;
  /**
     * Gets the ID of the Facebook Application associated with this access token.
     */
  getApplicationId(): string;
  /**
     * Gets user ID associated with this access token.
     */
  getUserId(): string;
}
