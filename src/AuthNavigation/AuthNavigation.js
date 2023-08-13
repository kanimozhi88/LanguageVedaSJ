import React,{useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import PasswordSet from '../screens/PasswordSet';
import OtpValidation from '../screens/OtpValidation';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import Signup from '../screens/RegisterScreen';
import TabNavigation from '../TabNavigation/TabNavigation';
import SplashScreen from 'react-native-splash-screen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigation = () => {
    const recordId = useSelector(state => state.recordId);
    const Status = useSelector(state => state.status);

    console.log("recordId is ", recordId,Status);
    useEffect(() => {
        SplashScreen.hide();
    }, [])

    const [isFirstLaunch, setIsFirstLaunch] = useState(false);
    useEffect(() => {
        getAppLaunchStatus();
    }, [])
    console.log("isfirstlaucn", isFirstLaunch);

    const getAppLaunchStatus = async () => {
        const appLaunched = await AsyncStorage.getItem("isLaunched");
        console.log("applunach status", appLaunched);
        if (appLaunched === null) {
            setIsFirstLaunch(true)
            AsyncStorage.setItem("isLaunched", "true");

        }
    }
    const headerStyle = {
        // backgroundColor: '#0066CC',
        backgroundColor: "#A22451",
    };

    const headerTitleStyle = {
        color: 'white',
        fontWeight: 'bold',
    };
    return (
     <NavigationContainer>
         {recordId === '' || recordId === null || Status !== 'Success'  ?(
        <Stack.Navigator>
            {!isFirstLaunch ?
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
                name="RegisterScreen"
                component={Signup}
                options={{
                    title: 'SignUp',
                    headerStyle,
                    headerTitleStyle,
                }}
            />

            <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
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