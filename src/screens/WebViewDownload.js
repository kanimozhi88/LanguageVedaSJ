import React from "react";
import {View,Text,Image} from 'react-native';
import WebView from "react-native-webview";

const WebViewDownload=({route})=>{
    const {uri} = route.params;
    return(
        <View style={{flex:1,}}>
            <WebView
            style={{flex:1,}}
             source={{uri:uri}}/>
        </View>
    )
}
 export default WebViewDownload;