"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const MessageDialog = react_native_1.NativeModules.FBMessageDialog;
exports.default = {
    /**
     * Check if the dialog can be shown.
     */
    canShow(shareContent) {
        return MessageDialog.canShow(shareContent);
    },
    /**
     * Shows the dialog using the specified content.
     */
    show(shareContent) {
        return MessageDialog.show(shareContent);
    },
    /**
     * Sets whether or not the native message dialog should fail when it encounters a data error.
     */
    setShouldFailOnDataError(shouldFailOnDataError) {
        MessageDialog.setShouldFailOnDataError(shouldFailOnDataError);
    },
};
