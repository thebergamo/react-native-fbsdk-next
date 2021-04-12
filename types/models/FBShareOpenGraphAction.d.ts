import {
  ShareOpenGraphValueContainer,
} from './FBShareOpenGraphValueContainer';
/**
 * Represents an open graph action.
 */
export class ShareOpenGraphAction extends ShareOpenGraphValueContainer {
  /**
     * The action type.
     */
  actionType: string;
  constructor(actionType: string);
}
