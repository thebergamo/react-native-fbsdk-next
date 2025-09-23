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
import type {DirectEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface LoginFinishedEvent {
  readonly type: string;
  readonly error?: string;
  readonly result?: {
    readonly isCancelled: boolean;
    readonly grantedPermissions?: ReadonlyArray<string>;
    readonly declinedPermissions?: ReadonlyArray<string>;
  };
}

interface NativeProps extends ViewProps {
  // Props
  permissions?: ReadonlyArray<string>;
  defaultAudience?: string;
  loginBehaviorAndroid?: string;
  tooltipBehaviorIOS?: string;
  nonceIOS?: string;
  loginTrackingIOS?: string;
  
  // Events
  onChange?: DirectEventHandler<LoginFinishedEvent>;
}

export default codegenNativeComponent<NativeProps>('RCTFBLoginButton') as HostComponent<NativeProps>;
