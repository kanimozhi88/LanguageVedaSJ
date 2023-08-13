import React, { Component } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';




const WebViewScreen = ({route}) => {
  const {link} = route.params;


    return(
     <WebView source={{ uri: link }} style={{ flex: 1 }} />
    
  )
}

  export default WebViewScreen;