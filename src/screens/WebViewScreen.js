import React , {useEffect} from 'react';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({route, navigation}) => {
  const {link} = route.params;
//   useEffect(() => {
//     navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }});
//     return () =>
//         navigation.getParent()?.setOptions({ tabBarStyle: {display: 'flex'} });
// }, [navigation]);


    return(
     <WebView source={{ uri: link }} style={{ flex: 1}} />
    
  )
}

export default WebViewScreen;