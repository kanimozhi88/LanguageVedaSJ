package com.languageveda;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyCustomModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactApplicationContext;

    MyCustomModule(ReactApplicationContext reactContext){
        super(reactContext);
        reactApplicationContext = reactContext;
    }
    @NonNull
    @Override
    public String getName() {
        return "XYZ";
    }

    @ReactMethod
    public void goToNextScreen(){
//        Intent intent = new Intent(reactApplicationContext,DemoActivity.class);
    }
}
