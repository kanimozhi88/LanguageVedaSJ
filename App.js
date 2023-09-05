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

  const [isFirstLaunch,setIsFirstLaunch] = useState(false);
  useEffect(()=>{
    getAppLaunchStatus();
  },[])
  console.log("isfirstlaucn", isFirstLaunch);

  const getAppLaunchStatus = async () => {
    const appLaunched = await AsyncStorage.getItem("isLaunched");
    console.log("applunach status", appLaunched);
    if(appLaunched === null){
      setIsFirstLaunch(true)
      AsyncStorage.setItem("isLaunched", "true");
      
    }
  }

  return (
    <Provider store={store}>
      
       <AuthNavigation/>

    </Provider>
  );
};

export default App;

