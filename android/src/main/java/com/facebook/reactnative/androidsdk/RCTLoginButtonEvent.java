package com.facebook.reactnative.androidsdk;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;

public class RCTLoginButtonEvent extends Event<RCTLoginButtonEvent> {
    public static final String EVENT_NAME = "topChange";
    private final WritableMap mEvent;

    public RCTLoginButtonEvent(int surfaceId, int viewTag, WritableMap event) {
        super(surfaceId,viewTag);
        mEvent = event;
    }

    @NonNull
    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    protected WritableMap getEventData() {
        return mEvent;
    }
}
