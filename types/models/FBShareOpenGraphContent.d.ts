import {
   ShareOpenGraphAction,
} from './FBShareOpenGraphAction';
import type {
  ShareContentCommonParameters,
} from './FBShareContent';
/**
 * Represents a content object containing information about an Open Graph Action.
 */
export type ShareOpenGraphContent = {
  /**
     * The type of content to be shared is open graph content.
     */
  contentType: 'open-graph';
  /**
     * Common parameters for share content;
     */
  commonParameters?: ShareContentCommonParameters;
  /**
     * URL for the content being shared.
     */
  contentUrl?: string;
  /**
     * Open Graph Action to be shared.
     */
  action: ShareOpenGraphAction;
  /**
     * Property name that points to the primary Open Graph Object in the action.
     */
  previewPropertyName: string;
};
