/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import type {ViewProps} from 'react-native';
import type {HostComponent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface ShareContent {
  readonly contentType: string;
  readonly contentUrl?: string;
  readonly contentTitle?: string;
  readonly contentDescription?: string;
  readonly imageUrl?: string;
  readonly peopleIds?: ReadonlyArray<string>;
  readonly placeId?: string;
  readonly ref?: string;
}

interface NativeProps extends ViewProps {
  // Props
  shareContent?: ShareContent;
}

export default codegenNativeComponent<NativeProps>('RCTFBShareButton') as HostComponent<NativeProps>;
