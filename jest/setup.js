

import {mockAppEventParams, mockAppEvents} from './mocks';

jest.mock('../src', () => {
  const nonMocked = jest.requireActual('./src');
  return {
    AppEventsLogger: {
      logEvent: jest.fn(),
      logPurchase: jest.fn(),
      setUserID: jest.fn(),
      AppEventParams: mockAppEventParams,
      AppEvents: mockAppEvents,
    },
    LoginManager: {
      logInWithPermissions: jest.fn(),
    },
    Settings: {
      initializeSDK: jest.fn(),
    },
    LoginButton: nonMocked.LoginButton,
  };
});
