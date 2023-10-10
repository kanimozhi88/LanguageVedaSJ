import React, { useEffect, useState } from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigation from './src/AuthNavigation/AuthNavigation';


const App = () => {
 
  useEffect(()=>{
   SplashScreen.hide();
  },[])

  const [isFirstLaunch,setIsFirstLaunch] = useState(true);
  useEffect(()=>{
    getAppLaunchStatus();
  },[])

  const getAppLaunchStatus = async () => {
    const appLaunched = await AsyncStorage.getItem("isLaunched");
    console.log("applunach status inapp", appLaunched);
    if(appLaunched == null){
      setIsFirstLaunch(true);
      await AsyncStorage.setItem("isLaunched", "true");
      
    }else{
      setIsFirstLaunch(false)
    }
    
  }

  return (
    <Provider store={store}>
      
       {/* <AuthNavigation/> */}

       {isFirstLaunch ? (
        // Show onboarding screens if it's the first launch
        <AuthNavigation isFirstLaunch={isFirstLaunch} />
      ) : (
        // Otherwise, navigate to the main content
        <AuthNavigation />
      )}

    </Provider>
  );
};

export default App;

