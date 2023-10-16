package com.languageveda;

import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CalendarModule extends ReactContextBaseJavaModule {
//    private static ReactApplicationContext reactApplicationContext;

    CalendarModule(ReactApplicationContext reactContext){
        super(reactContext);
//        reactApplicationContext = reactContext;
    }
    @NonNull
    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void CreateCalendarEvent(Callback callback){
        Log.d("Calendar Module", "Logged msg from Module");
        callback.invoke("data returned from native calendar module Test ");
    }
}
