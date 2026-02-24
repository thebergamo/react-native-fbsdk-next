"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const GameRequestDialog = react_native_1.NativeModules.FBGameRequestDialog;
exports.default = {
    /**
     * Check if the dialog can be shown.
     */
    canShow() {
        return GameRequestDialog.canShow();
    },
    /**
     * Shows the dialog using the specified content.
     */
    show(gameRequestContent) {
        return GameRequestDialog.show(gameRequestContent);
    },
};
