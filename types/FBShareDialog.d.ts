import type {
  ShareContent,
} from './models/FBShareContent';

type ShareDialogMode = ShareDialogModeIOS | ShareDialogModeAndroid;
type ShareDialogModeAndroid =
/**
 * The mode is determined automatically.
 */
'automatic'
/**
 * The native dialog is used.
 */
| 'native'
/**
 * The web dialog is used.
 */
| 'web'
/**
 * The feed dialog is used.
 */
| 'feed';
type ShareDialogModeIOS = 'automatic' | 'browser' | 'webview'
/**
 * The native dialog is used.
 */
| 'native';
export type FBShareDialog = {
  /**
     * Check if the dialog can be shown.
     */
  canShow(shareContent: ShareContent): Promise<boolean>;
  /**
     * Shows the dialog using the specified content.
     */
  show(shareContent: ShareContent): Promise<any>;
  /**
     * Sets the mode for the share dialog.
     */
  setMode(mode: ShareDialogMode): void;
  /**
     * Sets whether or not the native share dialog should fail when it encounters a data error.
     */
  setShouldFailOnDataError(shouldFailOnDataError: boolean): void;
};
