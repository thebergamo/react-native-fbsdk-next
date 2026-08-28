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
 * @flow
 */

import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {
  LoginButton,
  LoginManager,
  Settings,
  ShareDialog,
  ShareLinkContent,
} from 'react-native-fbsdk-next';

const SHARE_LINK_CONTENT: ShareLinkContent = {
  contentType: 'link',
  contentUrl: 'https://www.facebook.com/',
};

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK();

export default class App extends Component<
  Record<string, never>,
  {busy: boolean}
> {
  state = {busy: false};
  _busy = false;
  _mounted = false;

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _runAction = async (action: () => Promise<string>, errorTitle: string) => {
    if (this._busy || !this._mounted) {
      return;
    }
    this._busy = true;
    this.setState({busy: true});
    try {
      const message = await action();
      if (this._mounted) {
        Alert.alert(message);
      }
    } catch (error) {
      if (this._mounted) {
        Alert.alert(
          errorTitle,
          error instanceof Error ? error.message : String(error),
        );
      }
    } finally {
      this._busy = false;
      if (this._mounted) {
        this.setState({busy: false});
      }
    }
  };

  _reauthorizeDataAccess = () =>
    this._runAction(async () => {
      const result = await LoginManager.reauthorizeDataAccess();
      return (
        'Reauthorize data access result: ' + JSON.stringify(result, null, 2)
      );
    }, 'Reauthorize data access failed');

  _shareLinkWithShareDialog = () =>
    this._runAction(async () => {
      const canShow = await ShareDialog.canShow(SHARE_LINK_CONTENT);
      if (!this._mounted) {
        return '';
      }
      if (canShow) {
        const {isCancelled, postId} =
          await ShareDialog.show(SHARE_LINK_CONTENT);
        if (isCancelled) {
          return 'Share cancelled';
        }
        return postId
          ? 'Share success with postId: ' + postId
          : 'Share successful';
      }
      return 'Sharing is unavailable on this device';
    }, 'Sharing failed');

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          testID="facebook-login"
          onLoginFinished={(error, data) => {
            Alert.alert(JSON.stringify(error || data, null, 2));
          }}
        />
        <TouchableHighlight
          accessibilityRole="button"
          accessibilityState={{disabled: this.state.busy}}
          disabled={this.state.busy}
          onPress={this._shareLinkWithShareDialog}>
          <Text style={styles.buttonText}>Share link with ShareDialog</Text>
        </TouchableHighlight>
        <TouchableHighlight
          accessibilityRole="button"
          accessibilityState={{disabled: this.state.busy}}
          disabled={this.state.busy}
          onPress={this._reauthorizeDataAccess}>
          <Text style={styles.buttonText}>Reauthorize Data Access</Text>
        </TouchableHighlight>
        <Text accessibilityLiveRegion="polite">
          {this.state.busy ? 'Working…' : ''}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 20,
    margin: 10,
  },
});
