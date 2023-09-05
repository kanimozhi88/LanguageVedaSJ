import React from 'react';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({route}) => {
  const {link} = route.params;

    return(
     <WebView source={{ uri: link }} style={{ flex: 1}} />
    
  )
}

export default WebViewScreen;