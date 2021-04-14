import * as React from 'react';
import type {
  ShareContent,
} from './models/FBShareContent';

export class SendButton extends React.Component<{
  /**
     * Content to be shared.
     */
  shareContent: ShareContent;
  /**
     * View style, if any.
     */
  style?: any;
}> {
  static defaultProps: {
    style: typeof styles.defaultButtonStyle;
  };
  render(): JSX.Element;
}
export const styles: {
  defaultButtonStyle: {
    height: number;
    width: number;
  };
};
