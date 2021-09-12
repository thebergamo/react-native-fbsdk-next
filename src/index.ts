/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Developer Principles and Policies
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @format
 */

import ShareOpenGraphAction from './models/FBShareOpenGraphAction';
import FBShareOpenGraphObject from './models/FBShareOpenGraphObject';
import FBShareOpenGraphValueContainer from './models/FBShareOpenGraphValueContainer';
import FBAccessToken from './FBAccessToken';
import FBAuthenticationToken from './FBAuthenticationToken';
import FBAppEventsLogger from './FBAppEventsLogger';
import FBAppLink from './FBAppLink';
import FBGameRequestDialog from './FBGameRequestDialog';
import FBGraphRequest from './FBGraphRequest';
import FBGraphRequestManager from './FBGraphRequestManager';
import FBLoginManager from './FBLoginManager';
import FBMessageDialog from './FBMessageDialog';
import FBProfile from './FBProfile';
import FBSettings from './FBSettings';
import FBShareDialog from './FBShareDialog';
import FBLoginButton from './FBLoginButton';
import FBSendButton from './FBSendButton';
import FBShareButton from './FBShareButton';

// TODO: [TS Migration]: Removed getters and used normal export. Discuss before merging.
export {
  //native models
  ShareOpenGraphAction,
  FBShareOpenGraphObject as ShareOpenGraphObject,
  FBShareOpenGraphValueContainer as ShareOpenGraphValueContainer,

  //native modules
  FBAccessToken as AccessToken,
  FBAuthenticationToken as AuthenticationToken,
  FBAppEventsLogger as AppEventsLogger,
  FBAppLink as AppLink,
  FBGameRequestDialog as GameRequestDialog,
  FBGraphRequest as GraphRequest,
  FBGraphRequestManager as GraphRequestManager,
  FBLoginManager as LoginManager,
  FBMessageDialog as MessageDialog,
  FBProfile as Profile,
  FBSettings as Settings,
  FBShareDialog as ShareDialog,

  //native components
  FBLoginButton as LoginButton,
  FBSendButton as SendButton,
  FBShareButton as ShareButton,
};
