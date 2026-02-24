"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const ShareDialog = react_native_1.NativeModules.FBShareDialog;
exports.default = {
    /**
     * Check if the dialog can be shown.
     */
    canShow(shareContent) {
        return ShareDialog.canShow(shareContent);
    },
    /**
     * Shows the dialog using the specified content.
     */
    show(shareContent) {
        return ShareDialog.show(shareContent);
    },
    /**
     * Sets the mode for the share dialog.
     */
    setMode(mode) {
        ShareDialog.setMode(mode);
    },
    /**
     * Sets whether or not the native share dialog should fail when it encounters a data error.
     */
    setShouldFailOnDataError(shouldFailOnDataError) {
        ShareDialog.setShouldFailOnDataError(shouldFailOnDataError);
    },
};
