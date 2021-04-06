/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import type {
  ShareContent,
} from './models/FBShareContent';

class SendButton extends React.Component<{
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
const styles: {
  defaultButtonStyle: {
    height: number;
    width: number;
  };
};
export default SendButton;
// # sourceMappingURL=FBSendButton.d.ts.map
