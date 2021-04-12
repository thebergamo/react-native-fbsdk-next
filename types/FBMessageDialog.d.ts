import type {
  ShareContent,
} from './models/FBShareContent';

export type FBMessageDialog = {
  /**
     * Check if the dialog can be shown.
     */
  canShow(shareContent: ShareContent): Promise<boolean>;
  /**
     * Shows the dialog using the specified content.
     */
  show(shareContent: ShareContent): Promise<any>;
  /**
     * Sets whether or not the native message dialog should fail when it encounters a data error.
     */
  setShouldFailOnDataError(shouldFailOnDataError: boolean): void;
};
