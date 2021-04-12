export type FBSettings = {
  /**
     * For iOS only, get AdvertiserTrackingEnabled status.
     * @platform ios
     */
  getAdvertiserTrackingEnabled(): Promise<boolean>;
  /**
     * For iOS only, set AdvertiserTrackingEnabled status, only works in iOS 14 and above.
     * @platform ios
     */
  setAdvertiserTrackingEnabled(ATE: boolean): Promise<boolean>;
  /**
     * Set data processing options
     */
  setDataProcessingOptions(options: Array<string>, ...args: Array<number>): void;
  /**
     * Initialize the sdk
     */
  initializeSDK(): void;
};
