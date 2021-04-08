import type {
  GameRequestContent,
} from './models/FBGameRequestContent';

const defaultExport: {
  /**
     * Check if the dialog can be shown.
     */
  canShow(): Promise<any>;
  /**
     * Shows the dialog using the specified content.
     */
  show(gameRequestContent: GameRequestContent): Promise<any>;
};
export = defaultExport;
