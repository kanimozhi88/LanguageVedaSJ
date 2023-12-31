import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import PasswordSet from '../screens/PasswordSet';
import OtpValidation from '../screens/OtpValidation';
import TabNavigation from '../TabNavigation/TabNavigation';
import SplashScreen from 'react-native-splash-screen';
import WebViewScreen from '../screens/WebViewScreen';


const Stack = createNativeStackNavigator();

const AuthNavigation = ({isFirstLaunch}) => {
    const recordId = useSelector(state => state.recordId);
    const Status = useSelector(state => state.status);
    const statusOtp = useSelector(state => state.statusOtp);

    console.log("recordId is ", recordId,Status);
    useEffect(() => {
        SplashScreen.hide();
    }, [])

    // const [isFirstLaunch, setIsFirstLaunch] = useState(true);
    // useEffect(() => {
    //     getAppLaunchStatus();
    // }, [])

    // const getAppLaunchStatus = async () => {
    //     const appLaunched = await AsyncStorage.getItem("isLaunched");
    //     console.log("applunach status", appLaunched);
    //     if (appLaunched == null) {
    //         setIsFirstLaunch(true)
    //         AsyncStorage.setItem("isLaunched", "true");

    //     }
    // }
   
    return (
     <NavigationContainer>
         {(recordId !== '' || recordId !== null || Status === 'Success') && statusOtp !== 'Success' ?(
        <Stack.Navigator>
            { isFirstLaunch ?
                <Stack.Screen
                    name="OnboardingScreen"
                    component={OnboardingScreen}
                    options={{
                        headerShown: false
                    }}
                />
                : <></>}
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="OtpValidation"
                component={OtpValidation}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="PasswordSet"
                component={PasswordSet}
                options={{
                    headerShown: false
                }}
            />
            
            {/* {recordId !== '' : <></> :<></>} */}
        </Stack.Navigator>
       
       ) : <TabNavigation/>}
        </NavigationContainer> 
        
        
       
    )
}

export default AuthNavigation;