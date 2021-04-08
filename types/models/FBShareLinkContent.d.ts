import type {
  ShareContentCommonParameters,
} from './FBShareContent';
/**
 * A model for status and link content to be shared.
 */
export type ShareLinkContent = {
  /**
     * The type of content to be shared is link.
     */
  contentType: 'link';
  /**
     * Common parameters for share content;
     */
  commonParameters?: ShareContentCommonParameters;
  /**
     * URL for the content being shared.
     */
  contentUrl: string;
  /**
     * The Description of the link.
     * If not specified, this field is automatically populated by information scraped
     * from the contentURL,  typically the title of the page.
     * @deprecated `contentDescription` is deprecated from Graph API 2.9.
     * For more information, see https://developers.facebook.com/docs/apps/changelog#v2_9_deprecations.
     */
  contentDescription?: string;
  /**
     * The title to display for this link.
     * @deprecated `contentTitle` is deprecated from Graph API 2.9.
     * For more information, see https://developers.facebook.com/docs/apps/changelog#v2_9_deprecations.
     */
  contentTitle?: string;
  /**
     * The URL of a picture to attach to this comment.
     * @deprecated `imageUrl` is deprecated from Graph API 2.9.
     * For more information, see https://developers.facebook.com/docs/apps/changelog#v2_9_deprecations.
     */
  imageUrl?: string;
  /**
     * The predefine quote to attacth to this comment.
     * If specified, the quote text will render with custom styling on top of the link.
     */
  quote?: string;
};
