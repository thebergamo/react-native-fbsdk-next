/**
 * Controls when an AppEventsLogger sends log events to the server
 */
type AppEventsFlushBehavior =
/**
 * Flush automatically: periodically (every 15 seconds or after every 100 events), and
 * always at app reactivation. This is the default value.
 */
'auto'
/**
 * Only flush when AppEventsLogger.flush() is explicitly invoked.
 */
| 'explicit_only';
type Params = {
  [key: string]: string | number;
};
/**
 * Info about a user to increase chances of matching a Facebook user.
 * See https://developers.facebook.com/docs/app-events/advanced-matching for
 * more info about the expected format of each field.
 */
type UserData = Readonly<{
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: ('m' | 'f') | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
}>;
type AppEvent = {
  AchievedLevel: string;
  AdClick: string;
  AdImpression: string;
  AddedPaymentInfo: string;
  AddedToCart: string;
  AddedToWishlist: string;
  CompletedRegistration: string;
  CompletedTutorial: string;
  Contact: string;
  CustomizeProduct: string;
  Donate: string;
  FindLocation: string;
  InitiatedCheckout: string;
  Purchased: string;
  Rated: string;
  Searched: string;
  SpentCredits: string;
  Schedule: string;
  StartTrial: string;
  SubmitApplication: string;
  Subscribe: string;
  UnlockedAchievement: string;
  ViewedContent: string;
};
type AppEventParam = {
  AddType: string;
  Content: string;
  ContentID: string;
  ContentType: string;
  Currency: string;
  Description: string;
  Level: string;
  NumItems: string;
  MaxRatingValue: string;
  OrderId: string;
  PaymentInfoAvailable: string;
  RegistrationMethod: string;
  SearchString: string;
  Success: string;
  ValueNo: string;
  ValueYes: string;
};
export type FBAppEventsLogger = {
  /**
     * Sets the current event flushing behavior specifying when events
     * are sent back to Facebook servers.
     */
  setFlushBehavior(flushBehavior: AppEventsFlushBehavior): void;
  /**
     * Logs an event with eventName and optional arguments.
     * This function supports the following usage:
     * logEvent(eventName: string);
     * logEvent(eventName: string, valueToSum: number);
     * logEvent(eventName: string, parameters: {[key:string]:string|number});
     * logEvent(eventName: string, valueToSum: number, parameters: {[key:string]:string|number});
     * See https://developers.facebook.com/docs/app-events/android for detail.
     */
  logEvent(eventName: string, ...args: Array<number | Params>): void;
  /**
     * Logs a purchase. See http://en.wikipedia.org/wiki/ISO_4217 for currencyCode.
     */
  logPurchase(purchaseAmount: number, currencyCode: string, parameters?: Params | null | undefined): void;
  /**
     * Logs an app event that tracks that the application was open via Push Notification.
     */
  logPushNotificationOpen(payload?: any | null): void;
  /**
     * Explicitly kicks off flushing of events to Facebook.
     */
  flush(): void;
  /**
     * Sets a custom user ID to associate with all app events.
     * The userID is persisted until it is cleared by passing nil.
     */
  setUserID(userID: string | null): void;
  /**
     * Returns user id or null if not set
     */
  getUserID(): Promise<string | undefined | null>;
  /**
     * Returns anonymous id or null if not set
     */
  getAnonymousID(): Promise<string | undefined | null>;
  /**
     * Returns advertiser id or null if not set
     */
  getAdvertiserID(): Promise<string | undefined | null>;
  /**
     * Returns advertiser id or null if not set.
     * @platform android
     */
  getAttributionID(): Promise<string | undefined | null>;
  /**
     * Sends a request to update the properties for the current user, set by
     * setUserID. You must call setUserID before making this call.
     */
  updateUserProperties(parameters: Params): void;
  /**
     * Set additional data about the user to increase chances of matching a Facebook user.
     */
  setUserData(userData: UserData): void;
  /**
     * For iOS only, sets and sends device token to register the current application for push notifications.
     * @platform ios
     */
  setPushNotificationsDeviceToken(deviceToken: string): void;
  /**
     * For Android only, sets and sends registration id to register the current app for push notifications.
     * @platform Android
     */
  setPushNotificationsRegistrationId(registrationId: string): void;
  /**
   * Predefined event names for logging events common to many apps.
   */
  AppEvents: AppEvent,
  /**
   *  Predefined event name parameters for common additional information to accompany events logged through the `logEvent`.
   */
  AppEventParams: AppEventParam,
};
