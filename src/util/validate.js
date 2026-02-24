"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectKeyValuesAreStrings = objectKeyValuesAreStrings;
exports.isNull = isNull;
exports.isObject = isObject;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isFinite = isFinite;
exports.isInteger = isInteger;
exports.isBoolean = isBoolean;
exports.isArray = isArray;
exports.isUndefined = isUndefined;
exports.isDefined = isDefined;
exports.isAlphaNumericUnderscore = isAlphaNumericUnderscore;
exports.isValidUrl = isValidUrl;
exports.isValidGraphAPIVersion = isValidGraphAPIVersion;
exports.isOneOf = isOneOf;
exports.noop = noop;
/**
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Taken from react-native-firebase: https://github.com/invertase/react-native-firebase/blob/master/packages/app/lib/common/validate.js
 *
 * @format
 */
const AlphaNumericUnderscore = /^[a-zA-Z0-9_]+$/;
function objectKeyValuesAreStrings(object) {
    if (!isObject(object)) {
        return false;
    }
    const entries = Object.entries(object);
    for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];
        if (!isString(key) || !isString(value)) {
            return false;
        }
    }
    return true;
}
/**
 * Simple is null check.
 */
function isNull(value) {
    return value === null;
}
/**
 * Simple is object check.
 */
function isObject(value) {
    return value
        ? typeof value === 'object' && !Array.isArray(value) && !isNull(value)
        : false;
}
/**
 * Simple is date check
 * https://stackoverflow.com/a/44198641
 */
function isDate(value) {
    // use the global isNaN() and not Number.isNaN() since it will validate an Invalid Date
    return (!!value &&
        Object.prototype.toString.call(value) === '[object Date]' &&
        !isNaN(Number(value)));
}
/**
 * Simple is function check
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(value) {
    return value ? typeof value === 'function' : false;
}
/**
 * Simple is string check
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * Simple is number check
 */
function isNumber(value) {
    return typeof value === 'number';
}
/**
 * Simple finite check
 */
function isFinite(value) {
    return Number.isFinite(value);
}
/**
 * Simple integer check
 */
function isInteger(value) {
    return Number.isInteger(value);
}
/**
 * Simple is boolean check
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
/**
 * Simple is array check
 */
function isArray(value) {
    return Array.isArray(value);
}
/**
 * Simple is undefined check
 */
function isUndefined(value) {
    return typeof value === 'undefined';
}
/**
 * Simple is not null nor undefined check
 */
function isDefined(value) {
    return !isNull(value) && !isUndefined(value);
}
/**
 * /^[a-zA-Z0-9_]+$/
 */
function isAlphaNumericUnderscore(value) {
    return AlphaNumericUnderscore.test(value);
}
/**
 * URL test
 */
const IS_VALID_URL_REGEX = /^(http|https):\/\/[^ "]+$/;
function isValidUrl(url) {
    return IS_VALID_URL_REGEX.test(url);
}
/**
 * Matches Graph API versions of the form v2.7
 */
const IS_VALID_GRAPH_API_VERSION = /^(v([0-9]+).([0-9]+))/;
function isValidGraphAPIVersion(version) {
    return IS_VALID_GRAPH_API_VERSION.test(version);
}
/**
 * Array includes
 */
function isOneOf(value, oneOf = []) {
    if (!isArray(oneOf)) {
        return false;
    }
    return oneOf.includes(value);
}
function noop() {
    // noop-🐈
}
