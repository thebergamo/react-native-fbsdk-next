/* eslint-env jest */
const LoginButton = require('../../lib/commonjs/FBLoginButton').default;

export const mockAppEvents = {
  AchievedLevel: 'fb_mobile_level_achieved',
  AdClick: 'AdClick',
  AdImpression: 'AdImpression',
  AddedPaymentInfo: 'fb_mobile_add_payment_info',
  AddedToCart: 'fb_mobile_add_to_cart',
  AddedToWishlist: 'fb_mobile_add_to_wishlist',
  CompletedRegistration: 'fb_mobile_complete_registration',
  CompletedTutorial: 'fb_mobile_tutorial_completion',
  Contact: 'Contact',
  CustomizeProduct: 'CustomizeProduct',
  Donate: 'Donate',
  FindLocation: 'FindLocation',
  InitiatedCheckout: 'fb_mobile_initiated_checkout',
  Purchased: 'fb_mobile_purchase',
  Rated: 'fb_mobile_rate',
  Schedule: 'Schedule',
  Searched: 'fb_mobile_search',
  SpentCredits: 'fb_mobile_spent_credits',
  StartTrial: 'StartTrial',
  SubmitApplication: 'SubmitApplication',
  Subscribe: 'Subscribe',
  UnlockedAchievement: 'fb_mobile_achievement_unlocked',
  ViewedContent: 'fb_mobile_content_view',
};

export const mockAppEventParams = {
  AddType: 'ad_type',
  Content: 'fb_content',
  ContentID: 'fb_content_id',
  ContentType: 'fb_content_type',
  Currency: 'fb_currency',
  Description: 'fb_description',
  Level: 'fb_level',
  MaxRatingValue: 'fb_max_rating_value',
  NumItems: 'fb_num_items',
  OrderId: 'fb_order_id',
  PaymentInfoAvailable: 'fb_payment_info_available',
  RegistrationMethod: 'fb_registration_method',
  SearchString: 'fb_search_string',
  Success: 'fb_success',
  ValueNo: '0',
  ValueYes: '1',
};

export default {
  AccessToken: {
    refreshCurrentAccessTokenAsync: jest.fn(),
    getCurrentAccessToken: jest.fn(),
  },
  AppEventsLogger: {
    logEvent: jest.fn(),
    logPurchase: jest.fn(),
    setUserID: jest.fn(),
    clearUserID: jest.fn(),
    AppEventParams: mockAppEventParams,
    AppEvents: mockAppEvents,
  },
  LoginManager: {
    logInWithPermissions: jest.fn(),
    logOut: jest.fn(),
  },
  Settings: {
    initializeSDK: jest.fn(),
  },
  LoginButton,
};
