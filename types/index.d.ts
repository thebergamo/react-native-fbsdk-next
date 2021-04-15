declare module 'react-native-fbsdk-next' {
  const FBSDK: {
    readonly ShareOpenGraphAction: typeof import('./models/FBShareOpenGraphAction').ShareOpenGraphAction;
    readonly ShareOpenGraphObject: typeof import('./models/FBShareOpenGraphObject').ShareOpenGraphObject;
    readonly ShareOpenGraphValueContainer: typeof import('./models/FBShareOpenGraphValueContainer').ShareOpenGraphValueContainer;
    readonly AccessToken: typeof import('./FBAccessToken').FBAccessToken;
    readonly AuthenticationToken: typeof import('./FBAuthenticationToken').FBAuthenticationToken;
    readonly AppEventsLogger: import('./FBAppEventsLogger').FBAppEventsLogger;
    readonly AppLink: import('./FBAppLink').FBAppLink;
    readonly GameRequestDialog: import('./FBGameRequestDialog').FBGameRequestDialog;
    readonly GraphRequest: typeof import('./FBGraphRequest').FBGraphRequest;
    readonly GraphRequestManager: typeof import('./FBGraphRequestManager').FBGraphRequestManager;
    readonly LoginManager: import('./FBLoginManager').FBLoginManager;
    readonly MessageDialog: import('./FBMessageDialog').FBMessageDialog;
    readonly Profile: typeof import('./FBProfile').FBProfile;
    readonly Settings: import('./FBSettings').FBSettings;
    readonly ShareDialog: import('./FBShareDialog').FBShareDialog;
    readonly LoginButton: typeof import('./FBLoginButton').LoginButton;
    readonly SendButton: typeof import('./FBSendButton').SendButton;
    readonly ShareButton: typeof import('./FBShareButton').ShareButton;
  };
  export = FBSDK;
}
