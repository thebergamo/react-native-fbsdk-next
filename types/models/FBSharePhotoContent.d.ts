import type {
  ShareContentCommonParameters,
} from './FBShareContent';
import type {
  SharePhoto,
} from './FBSharePhoto';
/**
 * A model for photo content to be shared.
 */
export type SharePhotoContent = {
  /**
     * The type of content to be shared is photo.
     */
  contentType: 'photo';
  /**
     * Common parameters for share content;
     */
  commonParameters?: ShareContentCommonParameters;
  /**
     * URL for the content being shared.
     */
  contentUrl?: string;
  /**
     * Photos to be shared.
     */
  photos: Array<SharePhoto>;
};
