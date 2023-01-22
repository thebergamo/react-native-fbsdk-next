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

export function objectKeyValuesAreStrings(object: object) {
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
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Simple is object check.
 */
export function isObject(value: unknown): value is object {
  return value
    ? typeof value === 'object' && !Array.isArray(value) && !isNull(value)
    : false;
}

/**
 * Simple is date check
 * https://stackoverflow.com/a/44198641
 */
export function isDate(value: unknown): value is Date {
  // use the global isNaN() and not Number.isNaN() since it will validate an Invalid Date
  return (
    !!value &&
    Object.prototype.toString.call(value) === '[object Date]' &&
    !isNaN(Number(value))
  );
}

/**
 * Simple is function check
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return value ? typeof value === 'function' : false;
}

/**
 * Simple is string check
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Simple is number check
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * Simple finite check
 */
export function isFinite(value: number): value is number {
  return Number.isFinite(value);
}

/**
 * Simple integer check
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}

/**
 * Simple is boolean check
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Simple is array check
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Simple is undefined check
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

/**
 * Simple is not null nor undefined check
 */
export function isDefined<T>(value: T): value is Exclude<T, null | undefined> {
  return !isNull(value) && !isUndefined(value);
}

/**
 * /^[a-zA-Z0-9_]+$/
 */
export function isAlphaNumericUnderscore(value: string) {
  return AlphaNumericUnderscore.test(value);
}

/**
 * URL test
 */
const IS_VALID_URL_REGEX = /^(http|https):\/\/[^ "]+$/;
export function isValidUrl(url: string) {
  return IS_VALID_URL_REGEX.test(url);
}

/**
 * Matches Graph API versions of the form v2.7
 */
const IS_VALID_GRAPH_API_VERSION = /^(v([0-9]+).([0-9]+))/;
export function isValidGraphAPIVersion(version: string) {
  return IS_VALID_GRAPH_API_VERSION.test(version);
}

/**
 * Array includes
 */
export function isOneOf(value: unknown, oneOf: unknown[] = []) {
  if (!isArray(oneOf)) {
    return false;
  }
  return oneOf.includes(value);
}

export function noop() {
  // noop-🐈
}
