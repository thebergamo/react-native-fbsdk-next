"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AEMReporterIOS = exports.ShareButton = exports.SendButton = exports.LoginButton = exports.ShareDialog = exports.Settings = exports.Profile = exports.MessageDialog = exports.LoginManager = exports.GraphRequestManager = exports.GraphRequest = exports.GameRequestDialog = exports.AppLink = exports.AppEventsLogger = exports.AuthenticationToken = exports.AccessToken = void 0;
var FBAccessToken_1 = require("./FBAccessToken");
Object.defineProperty(exports, "AccessToken", { enumerable: true, get: function () { return __importDefault(FBAccessToken_1).default; } });
var FBAuthenticationToken_1 = require("./FBAuthenticationToken");
Object.defineProperty(exports, "AuthenticationToken", { enumerable: true, get: function () { return __importDefault(FBAuthenticationToken_1).default; } });
var FBAppEventsLogger_1 = require("./FBAppEventsLogger");
Object.defineProperty(exports, "AppEventsLogger", { enumerable: true, get: function () { return __importDefault(FBAppEventsLogger_1).default; } });
var FBAppLink_1 = require("./FBAppLink");
Object.defineProperty(exports, "AppLink", { enumerable: true, get: function () { return __importDefault(FBAppLink_1).default; } });
var FBGameRequestDialog_1 = require("./FBGameRequestDialog");
Object.defineProperty(exports, "GameRequestDialog", { enumerable: true, get: function () { return __importDefault(FBGameRequestDialog_1).default; } });
var FBGraphRequest_1 = require("./FBGraphRequest");
Object.defineProperty(exports, "GraphRequest", { enumerable: true, get: function () { return __importDefault(FBGraphRequest_1).default; } });
var FBGraphRequestManager_1 = require("./FBGraphRequestManager");
Object.defineProperty(exports, "GraphRequestManager", { enumerable: true, get: function () { return __importDefault(FBGraphRequestManager_1).default; } });
var FBLoginManager_1 = require("./FBLoginManager");
Object.defineProperty(exports, "LoginManager", { enumerable: true, get: function () { return __importDefault(FBLoginManager_1).default; } });
var FBMessageDialog_1 = require("./FBMessageDialog");
Object.defineProperty(exports, "MessageDialog", { enumerable: true, get: function () { return __importDefault(FBMessageDialog_1).default; } });
var FBProfile_1 = require("./FBProfile");
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return __importDefault(FBProfile_1).default; } });
var FBSettings_1 = require("./FBSettings");
Object.defineProperty(exports, "Settings", { enumerable: true, get: function () { return __importDefault(FBSettings_1).default; } });
var FBShareDialog_1 = require("./FBShareDialog");
Object.defineProperty(exports, "ShareDialog", { enumerable: true, get: function () { return __importDefault(FBShareDialog_1).default; } });
var FBLoginButton_1 = require("./FBLoginButton");
Object.defineProperty(exports, "LoginButton", { enumerable: true, get: function () { return __importDefault(FBLoginButton_1).default; } });
var FBSendButton_1 = require("./FBSendButton");
Object.defineProperty(exports, "SendButton", { enumerable: true, get: function () { return __importDefault(FBSendButton_1).default; } });
var FBShareButton_1 = require("./FBShareButton");
Object.defineProperty(exports, "ShareButton", { enumerable: true, get: function () { return __importDefault(FBShareButton_1).default; } });
var FBAEMReporter_1 = require("./FBAEMReporter");
Object.defineProperty(exports, "AEMReporterIOS", { enumerable: true, get: function () { return __importDefault(FBAEMReporter_1).default; } });
