import type {
  ShareLinkContent,
} from './FBShareLinkContent';
import type {
  ShareOpenGraphContent,
} from './FBShareOpenGraphContent';
import type {
  SharePhotoContent,
} from './FBSharePhotoContent';
import type {
  ShareVideoContent,
} from './FBShareVideoContent';

export type ShareContent = ShareLinkContent | SharePhotoContent | ShareVideoContent | ShareOpenGraphContent;
/**
 * A base interface for content to be shared.
 */
export type ShareContentCommonParameters = {
  /**
     * List of IDs for taggable people to tag with this content.
     */
  peopleIds?: Array<string>;
  /**
     * The ID for a place to tag with this content.
     */
  placeId?: string;
  /**
     * A value to be added to the referrer URL when a person follows a link from
     * this shared content on feed.
     */
  ref?: string;
  /**
     * A hashtag to be added to the share interface. The hashtag must be 32 characters or less.
     */
  hashtag?: string;
};
