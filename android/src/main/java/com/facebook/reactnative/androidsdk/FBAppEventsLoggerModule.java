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
 */

package com.facebook.reactnative.androidsdk;

import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.appevents.AppEventsConstants;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.internal.AttributionIdentifiers;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;

import java.math.BigDecimal;
import java.util.Currency;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * <p>
 * This class allows the developer to log various types of events back to Facebook.
 * </p>
 * <p>
 * This client-side event logging is then available through Facebook App Insights
 * and for use with Facebook Ads conversion tracking and optimization.
 * </p>
 * <p>
 * The class has a few related roles:
 * </p>
 * <ul>
 * <li>
 * Logging predefined and application-defined events to Facebook App Insights with a
 * numeric value to sum across a large number of events, and an optional set of key/value
 * parameters that define "segments" for this event (e.g., 'purchaserStatus' : 'frequent', or
 * 'gamerLevel' : 'intermediate').  These events may also be used for ads conversion tracking,
 * optimization, and other ads related targeting in the future.
 * </li>
 * <li>
 * Methods that control the way in which events are flushed out to the Facebook servers.
 * </li>
 * </ul>
 * <p>
 * Here are some important characteristics of the logging mechanism:
 * <ul>
 * <li>
 * Events are not sent immediately when logged.  They're cached and flushed out to the
 * Facebook servers in a number of situations:
 * <ul>
 * <li>when an event count threshold is passed (currently 100 logged events).</li>
 * <li>when a time threshold is passed (currently 15 seconds).</li>
 * <li>when an app has gone to background and is then brought back to the foreground.</li>
 * </ul>
 * <li>
 * Events will be accumulated when the app is in a disconnected state, and sent when the connection
 * is restored and one of the above 'flush' conditions are met.
 * </li>
 * <li>
 * The class is intended to be used from the thread it was created on.  Multiple
 * AppEventsLoggers may be created on other threads if desired.
 * </li>
 * <li>
 * The developer can call the setFlushBehavior method to force the flushing of events to only
 * occur on an explicit call to the `flush` method.
 * </li>
 * </ul>
 * </p>
 * <p>
 * Some things to note when logging events:
 * <ul>
 * <li>
 * There is a limit on the number of unique event names an app can use, on the order of 1000.
 * </li>
 * <li>
 * There is a limit to the number of unique parameter names in the provided parameters that can
 * be used per event, on the order of 25.  This is not just for an individual call, but for all
 * invocations for that eventName.
 * </li>
 * <li>
 * Event names and parameter names must be between 2 and 40
 * characters, and must consist of alphanumeric characters, _, -, or spaces.
 * </li>
 * <li>
 * The length of each parameter value can be no more than on the order of 100 characters.
 * </li>
 * </ul>
 * </p>
 */
@ReactModule(name = FBAppEventsLoggerModule.NAME)
public class FBAppEventsLoggerModule extends ReactContextBaseJavaModule {

    public static final String NAME = "FBAppEventsLogger";

    private AppEventsLogger mAppEventLogger;
    private AttributionIdentifiers mAttributionIdentifiers;
    private ReactApplicationContext mReactContext;

    public FBAppEventsLoggerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public void initialize() {
        mAppEventLogger = AppEventsLogger.newLogger(mReactContext);
        mAttributionIdentifiers = AttributionIdentifiers.getAttributionIdentifiers(mReactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    /**
     * Set the behavior that this AppEventsLogger uses to determine when to flush logged events to
     * the server. This setting applies to all instances of AppEventsLogger.
     * @param flushBehavior the desired behavior.
     */
    @ReactMethod
    public void setFlushBehavior(String flushBehavior) {
        AppEventsLogger.setFlushBehavior(AppEventsLogger.FlushBehavior.valueOf(flushBehavior.toUpperCase(Locale.ROOT)));
    }

    /**
     * Log an app event with the specified name.
     * @param eventName eventName used to denote the event. Choose amongst the EVENT_NAME_*
     *                  constants in {@link AppEventsConstants} when possible.  Or create your own
     *                  if none of the EVENT_NAME_* constants are applicable. Event names should be
     *                  40 characters or less, alphanumeric, and can include spaces, underscores or
     *                  hyphens, but must not have a space or hyphen as the first character.  Any
     *                  given app should have no more than 1000 distinct event names.
     * @param valueToSum a value to associate with the event which will be summed up in Insights for
     *                   across all instances of the event, so that average values can be
     *                   determined, etc.
     * @param parameters Parameters to log with the event.  Insights will allow looking
     *                   at the logs of these events via different parameter values.  You can log on
     *                   the order of 25 parameters with each distinct eventName.  It's advisable to
     *                   limit the number of unique values provided for each parameter in the
     *                   thousands.  As an example, don't attempt to provide a unique
     *                   parameter value for each unique user in your app.  You won't get meaningful
     *                   aggregate reporting on so many parameter values.  The values in the bundles
     *                   should be Strings or numeric values.
     */
    @ReactMethod
    public void logEvent(String eventName, double valueToSum, ReadableMap parameters) {
        mAppEventLogger.logEvent(eventName, valueToSum, Arguments.toBundle(parameters));
    }

    /**
     * Logs a purchase event with Facebook, in the specified amount and with the specified
     * currency.
     * @param purchaseAmount Amount of purchase, in the currency specified by the 'currencyCode'
     *                       parameter. This value will be rounded to the thousandths place (e.g.,
     *                       12.34567 becomes 12.346).
     * @param currencyCode A currency corresponding to an
     *                     <a href="http://en.wikipedia.org/wiki/ISO_4217">ISO 4217</a>
     *                     currency code such as "EUR" or "USD".
     * @param parameters Arbitrary additional information for describing this event. This should
     *                   have no more than 24 entries, and keys should be mostly consistent from
     *                   one purchase event to the next.
     */
    @ReactMethod
    public void logPurchase(double purchaseAmount, String currencyCode,
      @Nullable ReadableMap parameters) {
        mAppEventLogger.logPurchase(
                BigDecimal.valueOf(purchaseAmount),
                Currency.getInstance(currencyCode),
                Arguments.toBundle(parameters));
    }

    /**
     * Logs an app event that tracks that the application was open via Push Notification.
     * @param payload Notification payload received.
     */
     @ReactMethod
     public void logPushNotificationOpen(@Nullable ReadableMap payload) {
         mAppEventLogger.logPushNotificationOpen(Arguments.toBundle(payload));
     }

    /**
     * Uploads product catalog product item as an app event.
     *
     * @param itemID – Unique ID for the item. Can be a variant for a product. Max size is 100.
     * @param availability – If item is in stock. Accepted values are: in stock - Item ships immediately out of stock - No plan to restock preorder - Available in future available for order - Ships in 1-2 weeks discontinued - Discontinued
     * @param condition – Product condition: new, refurbished or used.
     * @param description – Short text describing product. Max size is 5000.
     * @param imageLink – Link to item image used in ad.
     * @param link – Link to merchant's site where someone can buy the item.
     * @param title – Title of item.
     * @param priceAmount – Amount of purchase, in the currency specified by the 'currency' parameter. This value will be rounded to the thousandths place (e.g., 12.34567 becomes 12.346).
     * @param currencyCode – Currency used to specify the amount.
     * @param gtin – Global Trade Item Number including UPC, EAN, JAN and ISBN
     * @param mpn – Unique manufacture ID for product
     * @param brand – Name of the brand Note: Either gtin, mpn or brand is required.
     * @param parameters – Optional fields for deep link specification.
     */
    @ReactMethod
    public void logProductItem(String itemID,
                               String availability,
                               String condition,
                               String description,
                               String imageLink,
                               String link,
                               String title,
                               double priceAmount,
                               String currencyCode,
                               String gtin,
                               String mpn,
                               String brand,
                               @Nullable ReadableMap parameters) {
        mAppEventLogger.logProductItem(itemID,
                AppEventsLogger.ProductAvailability.valueOf(availability.toUpperCase(Locale.ROOT)),
                AppEventsLogger.ProductCondition.valueOf(condition.toUpperCase(Locale.ROOT)),
                description,
                imageLink,
                link,
                title,
                BigDecimal.valueOf(priceAmount),
                Currency.getInstance(currencyCode),
                gtin,
                mpn,
                brand,
                Arguments.toBundle(parameters));
    }

    /**
     * Sets a user id to associate with all app events. This can be used to associate your own
     * user id with the app events logged from this instance of an application.
     *
     * The user ID will be persisted between application instantces.
     *
     * @param userID A User ID
     */
     @ReactMethod
     public void setUserID(final String userID) {
         mAppEventLogger.setUserID(userID);
     }

    /**
     * Clears the currently set user id.
     */
     @ReactMethod
     public void clearUserID() {
         mAppEventLogger.clearUserID();
     }

     /**
      * Returns the set user id or null if not set
      *
      * @return The set User ID or null
      */
     @ReactMethod(isBlockingSynchronousMethod = true)
     @Nullable
     public String getUserID() {
       return mAppEventLogger.getUserID();
     }

     /**
      * Each app/device pair gets an GUID that is sent back with App Events and persisted with this
      * app/device pair.
      *
      * @return The GUID for this app/device pair.
      */
     @ReactMethod
     public void getAnonymousID(Promise promise) {
       try {
         promise.resolve(mAppEventLogger.getAnonymousAppDeviceGUID(mReactContext));
       } catch (Exception e) {
         promise.reject("E_ANONYMOUS_ID_ERROR", "Can not get anonymousID", e);
       }
     }

     /**
      * Returns the advertiser id or null if not set
      */
     @ReactMethod
     public void getAdvertiserID(Promise promise) {
       try {
         promise.resolve(mAttributionIdentifiers.getAndroidAdvertiserId());
       } catch (Exception e) {
         promise.reject("E_ADVERTISER_ID_ERROR", "Can not get advertiserID", e);
       }
     }

     /**
      * Returns the attribution id or null if not set
      */
     @ReactMethod
     public void getAttributionID(Promise promise) {
       try {
         promise.resolve(mAttributionIdentifiers.getAttributionId());
       } catch (Exception e) {
         promise.reject("E_ATTRIBUTION_ID_ERROR", "Can not get attributionID", e);
       }
     }

    private @Nullable String getNullableString(ReadableMap data, String key) {
      return data.hasKey(key) ? data.getString(key) : null;
    }

    /**
     * Set additional data about the user to increase chances of matching a Facebook user.
     *
     * @param userData Key-value pairs representing user data and their values.
     */
    @ReactMethod
    public void setUserData(ReadableMap userData) {
      AppEventsLogger.setUserData(
        getNullableString(userData, "email"),
        getNullableString(userData, "firstName"),
        getNullableString(userData, "lastName"),
        getNullableString(userData, "phone"),
        getNullableString(userData, "dateOfBirth"),
        getNullableString(userData, "gender"),
        getNullableString(userData, "city"),
        getNullableString(userData, "state"),
        getNullableString(userData, "zip"),
        getNullableString(userData, "country")
      );
    }

    /**
     * Explicitly flush any stored events to the server.  Implicit flushes may happen depending on
     * the value of getFlushBehavior.  This method allows for explicit, app invoked flushing.
     */
    @ReactMethod
    public void flush() {
        mAppEventLogger.flush();
    }

    /**
     * Sets and sends registration id to register the current app for push notifications.
     * @param registrationId RegistrationId received from GCM.
     */
    @ReactMethod
    public void setPushNotificationsRegistrationId(String registrationId) {
        AppEventsLogger.setPushNotificationsRegistrationId(registrationId);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        final Map<String, Object> appEvents = new HashMap<>();
        appEvents.put("AchievedLevel", AppEventsConstants.EVENT_NAME_ACHIEVED_LEVEL);
        appEvents.put("AdClick", AppEventsConstants.EVENT_NAME_AD_CLICK);
        appEvents.put("AdImpression", AppEventsConstants.EVENT_NAME_AD_IMPRESSION);
        appEvents.put("AddedPaymentInfo", AppEventsConstants.EVENT_NAME_ADDED_PAYMENT_INFO);
        appEvents.put("AddedToCart", AppEventsConstants.EVENT_NAME_ADDED_TO_CART);
        appEvents.put("AddedToWishlist", AppEventsConstants.EVENT_NAME_ADDED_TO_WISHLIST);
        appEvents.put("CompletedRegistration", AppEventsConstants.EVENT_NAME_COMPLETED_REGISTRATION);
        appEvents.put("CompletedTutorial", AppEventsConstants.EVENT_NAME_COMPLETED_TUTORIAL);
        appEvents.put("Contact", AppEventsConstants.EVENT_NAME_CONTACT);
        appEvents.put("CustomizeProduct", AppEventsConstants.EVENT_NAME_CUSTOMIZE_PRODUCT);
        appEvents.put("Donate", AppEventsConstants.EVENT_NAME_DONATE);
        appEvents.put("FindLocation", AppEventsConstants.EVENT_NAME_FIND_LOCATION);
        appEvents.put("InitiatedCheckout", AppEventsConstants.EVENT_NAME_INITIATED_CHECKOUT);
        appEvents.put("Purchased", AppEventsConstants.EVENT_NAME_PURCHASED);
        appEvents.put("Rated", AppEventsConstants.EVENT_NAME_RATED);
        appEvents.put("Searched", AppEventsConstants.EVENT_NAME_SEARCHED);
        appEvents.put("SpentCredits", AppEventsConstants.EVENT_NAME_SPENT_CREDITS);
        appEvents.put("Schedule", AppEventsConstants.EVENT_NAME_SCHEDULE);
        appEvents.put("StartTrial", AppEventsConstants.EVENT_NAME_START_TRIAL);
        appEvents.put("SubmitApplication", AppEventsConstants.EVENT_NAME_SUBMIT_APPLICATION);
        appEvents.put("Subscribe", AppEventsConstants.EVENT_NAME_SUBSCRIBE);
        appEvents.put("UnlockedAchievement", AppEventsConstants.EVENT_NAME_UNLOCKED_ACHIEVEMENT);
        appEvents.put("ViewedContent", AppEventsConstants.EVENT_NAME_VIEWED_CONTENT);
        constants.put("AppEvents", appEvents);

        final Map<String, Object> appEventParams = new HashMap<>();
        appEventParams.put("AddType", AppEventsConstants.EVENT_PARAM_AD_TYPE);
        appEventParams.put("Content", AppEventsConstants.EVENT_PARAM_CONTENT);
        appEventParams.put("ContentID", AppEventsConstants.EVENT_PARAM_CONTENT_ID);
        appEventParams.put("ContentType", AppEventsConstants.EVENT_PARAM_CONTENT_TYPE);
        appEventParams.put("Currency", AppEventsConstants.EVENT_PARAM_CURRENCY);
        appEventParams.put("Description", AppEventsConstants.EVENT_PARAM_DESCRIPTION);
        appEventParams.put("Level", AppEventsConstants.EVENT_PARAM_LEVEL);
        appEventParams.put("NumItems", AppEventsConstants.EVENT_PARAM_NUM_ITEMS);
        appEventParams.put("MaxRatingValue", AppEventsConstants.EVENT_PARAM_MAX_RATING_VALUE);
        appEventParams.put("OrderId", AppEventsConstants.EVENT_PARAM_ORDER_ID);
        appEventParams.put("PaymentInfoAvailable", AppEventsConstants.EVENT_PARAM_PAYMENT_INFO_AVAILABLE);
        appEventParams.put("RegistrationMethod", AppEventsConstants.EVENT_PARAM_REGISTRATION_METHOD);
        appEventParams.put("SearchString", AppEventsConstants.EVENT_PARAM_SEARCH_STRING);
        appEventParams.put("Success", AppEventsConstants.EVENT_PARAM_SUCCESS);
        appEventParams.put("ValueNo", AppEventsConstants.EVENT_PARAM_VALUE_NO);
        appEventParams.put("ValueYes", AppEventsConstants.EVENT_PARAM_VALUE_YES);
        constants.put("AppEventParams", appEventParams);

        return constants;
    }
}
