import type {
  ShareContentCommonParameters,
} from './FBShareContent';
import type {
  SharePhoto,
} from './FBSharePhoto';
import type {
  ShareVideo,
} from './FBShareVideo';
/**
 * A model for video content to be shared.
 */
export type ShareVideoContent = {
  /**
     * The type of content to be shared is photo.
     */
  contentType: 'video';
  /**
     * Common parameters for share content;
     */
  commonParameters?: ShareContentCommonParameters;
  /**
     * URL for the content being shared.
     */
  contentUrl?: string;
  /**
     * Video to be shared.
     */
  video: ShareVideo;
  /**
     *  Description of the video.
     */
  contentDescription?: string;
  /**
     * Title of the video.
     */
  contentTitle?: string;
  /**
     * The photo that represents the video.
     */
  previewPhoto?: SharePhoto;
};
