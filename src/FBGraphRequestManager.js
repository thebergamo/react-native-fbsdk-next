"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const NativeGraphRequestManager = react_native_1.NativeModules.FBGraphRequest;
function _verifyParameters(request) {
    if (request.config?.parameters) {
        for (const key in request.config.parameters) {
            const param = request.config.parameters[key];
            if (typeof param === 'object' &&
                param?.string) {
                continue;
            }
            throw new Error("Unexpected value for parameter '" +
                key +
                "'. Request parameters " +
                "need to be objects with a 'string' field.");
        }
    }
}
class FBGraphRequestManager {
    requestBatch = [];
    requestCallbacks = [];
    batchCallback = null;
    /**
     * Add a graph request.
     */
    addRequest(request) {
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
    addBatchCallback(callback) {
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
     */
    start(timeout) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        const callback = (error, result, response) => {
            if (response) {
                that.requestCallbacks.forEach((innerCallback, index) => {
                    if (innerCallback) {
                        innerCallback(response[index][0], response[index][1]);
                    }
                });
            }
            if (that.batchCallback) {
                that.batchCallback(error, result);
            }
        };
        NativeGraphRequestManager.start(this.requestBatch, timeout || 0, callback);
    }
}
exports.default = FBGraphRequestManager;
