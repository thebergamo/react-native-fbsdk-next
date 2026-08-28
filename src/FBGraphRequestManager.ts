/**
 * Copyright (c) 2015-present, Facebook, Inc. All rights reserved.
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
import GraphRequest, {
  GraphRequestCallback,
  GraphRequestParameters,
} from './FBGraphRequest';
import {NativeModules} from 'react-native';

const NativeGraphRequestManager = NativeModules.FBGraphRequest;

export type Callback = (
  error?: Record<string, unknown> | null,
  result?: Record<string, unknown> | null,
) => void;

function _verifyParameters(request: GraphRequest) {
  if (request.config?.parameters) {
    for (const key of Object.keys(request.config.parameters)) {
      const param = request.config.parameters[key];

      if (
        typeof param === 'object' &&
        typeof (param as GraphRequestParameters)?.string === 'string'
      ) {
        continue;
      }
      throw new Error(
        "Unexpected value for parameter '" +
          key +
          "'. Request parameters " +
          "need to be objects with a 'string' field.",
      );
    }
  }
}

class FBGraphRequestManager {
  requestBatch: Array<GraphRequest> = [];
  requestCallbacks: Array<GraphRequestCallback | undefined> = [];
  batchCallback: Callback | null = null;

  /**
   * Add a graph request.
   */
  addRequest(request: GraphRequest): FBGraphRequestManager {
    _verifyParameters(request);
    this.requestBatch.push(request);
    this.requestCallbacks.push(request.callback);
    return this;
  }

  /**
   * Add call back to the GraphRequestManager. Only one callback can be added.
   * Note that invocation of the batch callback does not indicate success of every
   * graph request made, only that the entire batch has finished executing.
   */
  addBatchCallback(callback: Callback): FBGraphRequestManager {
    this.batchCallback = callback;
    return this;
  }

  /**
   * Executes requests in a batch.
   * Note that when there's an issue with network connection the batch callback
   * behavior differs in Android and iOS.
   * On iOS, the batch callback returns an error if the batch fails with a network error.
   * On Android, the batch callback always returns {"result": "batch finished executing"}
   * after the batch time out. This is because detecting network status requires
   * extra permission and it's unncessary for the sdk. Instead, you can use the NetInfo module
   * in react-native to get the network status.
   * @param timeout Timeout in milliseconds on both platforms. Zero or omission
   * retains the native SDK default. Must be an integer from 0 to 2147483647.
   */
  start(timeout?: number) {
    if (
      timeout !== undefined &&
      (!Number.isInteger(timeout) || timeout < 0 || timeout > 2147483647)
    ) {
      throw new Error('Timeout must be an integer from 0 to 2147483647 ms.');
    }
    if (this.requestBatch.length === 0) {
      throw new Error(
        'Add at least one graph request before starting a batch.',
      );
    }
    const requestCallbacks = this.requestCallbacks.slice();
    const batchCallback = this.batchCallback;
    const callback = (
      error: Record<string, unknown> | null,
      result: Record<string, unknown> | null,
      response: Record<string, Parameters<GraphRequestCallback>>,
    ) => {
      if (response) {
        requestCallbacks.forEach((innerCallback, index) => {
          const requestResponse = response[index];
          if (innerCallback && requestResponse) {
            innerCallback(requestResponse[0], requestResponse[1]);
          }
        });
      }
      if (batchCallback) {
        batchCallback(error, result);
      }
    };

    NativeGraphRequestManager.start(
      this.requestBatch.slice(),
      timeout || 0,
      callback,
    );
  }
}

export default FBGraphRequestManager;
