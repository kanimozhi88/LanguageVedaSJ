import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import MyCourses from './src/screens/MyCourses';
import MycoursesPage from './src/screens/MycoursesPage';
import Assignment from './src/screens/Assignment';
import Calender from './src/screens/Calender';
import Attendance from './src/screens/Attendance';
import ChartsandDashboard from './src/screens/ChartsandDashboard';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import OtpValidation from './src/screens/OtpValidation';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import DocumentScreen from './src/screens/DocumentScreen';
import PasswordSet from './src/screens/PasswordSet';
import SelectionScreen from './src/screens/SelectionScreen';
import CourseCurriculum from './src/screens/CourseCurriculum';
import SpecificCurriculum from './src/screens/SpecificCurriculum';
import FacultyAssignment from './src/screens/FacultyAsssignment';
import ScheduleAssign from './src/screens/ScheduleAssign';
import ViewAssign from './src/screens/ViewAssign';
import CourseBatchSelection from './src/screens/CourseBatchSelection';
import ViewBatch from './src/screens/ViewBatch';
import FacultyMyCoursesPage from './src/screens/FacultyMyCoursesPage';
import SpecificFacultyCurriculum from './src/screens/FaultyLessonPlan';
import FacultyLessonPlan from './src/screens/FaultyLessonPlan';
import FacultyLessonPlanExe from './src/screens/FacultyLessonPlanExe';
import FacultyBatchScreen from './src/screens/FacultyBatchScreen';
import FacultyBatches from './src/screens/FacultyBatches';
import FacultyCalendar from './src/screens/FacultyCalendar';
import OnboardingScreen from './src/screens/OnboardingScreen';
// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { compose } from 'redux';
import StudentMyCourses from './src/screens/StudentMyCourses';
import SettingsScreen from './src/TabNavigation/ScheduleScreen';
import { useDispatch, useSelector } from 'react-redux';
import AuthNavigation from './src/AuthNavigation/AuthNavigation';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// function TabNavigation() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={StackNavigation} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }

// const StackNavigation=()=>{
//   useEffect(()=>{
//     SplashScreen.hide();
//    },[])
 
//    const [isFirstLaunch,setIsFirstLaunch] = useState(false);
//    useEffect(()=>{
//      getAppLaunchStatus();
//    },[])
//    console.log("isfirstlaucn", isFirstLaunch);
 
//    const getAppLaunchStatus = async () => {
//      const appLaunched = await AsyncStorage.getItem("isLaunched");
//      console.log("applunach status", appLaunched);
//      if(appLaunched === null){
//        setIsFirstLaunch(true)
//        AsyncStorage.setItem("isLaunched", "true");
       
//      }
//    }
//    const headerStyle = {
//     // backgroundColor: '#0066CC',
//     backgroundColor:"#A22451",
//   };

//   const headerTitleStyle = {
//     color: 'white',
//     fontWeight: 'bold',
//   };
//   return(
//     <Stack.Navigator>
// {/*  
//         {!isFirstLaunch ? 
//   <Stack.Screen
//       name="OnboardingScreen"
//       component={OnboardingScreen}
//       options={{
//        headerShown: false
//       }}
//     />
//      : <></>}
//   <Stack.Screen
//       name="LoginScreen"
//       component={LoginScreen}
//       options={{
//        headerShown:false
//       }}
//     />
      
//     <Stack.Screen
//       name="CommunityScreen"
//       component={CommunityScreen}
//       options={{
//         title: 'Welcome',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     /> */}
//     <Stack.Screen
//       name="MyCourses"
//       component={MyCourses}
//       options={{
//         headerShown:false
//        }}
//     />
   
//      <Stack.Screen
//       name="CourseCurriculum"
//       component={CourseCurriculum}
//       options={{
//         title: 'Curriculum',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="SpecificCurriculum"
//       component={SpecificCurriculum}
//       options={{
//         title: 'Curriculum',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="MycoursesPage"
//       component={MycoursesPage}
//       options={{
//         title: 'My Courses',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="Assignment"
//       component={Assignment}
//       options={{
//         title: 'Assignment',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="Attendance"
//       component={Attendance}
//       options={{
//         title: 'Attendance',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="Calender"
//       component={Calender}
//       options={{
//         headerShown:false
//        }}
//     />
//     <Stack.Screen
//       name="FacultyCalendar"
//       component={FacultyCalendar}
//       options={{
//         title: 'FacultyCalendar',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />

//     <Stack.Screen
//       name="ChartsandDashboard"
//       component={ChartsandDashboard}
//       options={{
//         title: 'Charts and Dashboards',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />

//     <Stack.Screen
//       name="WebViewScreen"
//       component={WebViewScreen}
//       options={{
//         title: 'WebViewScreen',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="FacultyAssignment"
//       component={FacultyAssignment}
//       options={{
//         title: 'Assignment',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="DocumentScreen"
//       component={DocumentScreen}
//       options={{
//         title: 'Documents Details',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="ScheduleAssign"
//       component={ScheduleAssign}
//       options={{
//         title: 'Assignment',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="ViewAssign"
//       component={ViewAssign}
//       options={{
//         title: 'Assignment',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="CourseBatchSelection"
//       component={CourseBatchSelection}
//       options={{
//         title: 'Assignment',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="ViewBatch"
//       component={ViewBatch}
//       options={{
//         title: 'Assignment',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//     name="FacultyBatches"
//     component={FacultyBatches}
//     options={{
//       title: 'Batches',
//       headerStyle,
//       headerTitleStyle,
//     }}
//     />
//     <Stack.Screen
//       name="FacultyMyCoursesPage"
//       component={FacultyMyCoursesPage}
//       options={{
//         title: 'FacultyCourses',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//        <Stack.Screen
//       name="FacultyLessonPlan"
//       component={FacultyLessonPlan}
//       options={{
//         title: 'FacultyLessonplan',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//      <Stack.Screen
//       name="FacultyLessonPlanExe"
//       component={FacultyLessonPlanExe}
//       options={{
//         title: 'FacultyLessonplanExe',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="FacultyBatchScreen"
//       component={FacultyBatchScreen}
//       options={{
//         title: 'Faculty Batchview',
//         headerStyle,
//         headerTitleStyle,
//       }}
//     />
//     <Stack.Screen
//       name="StudentMyCourses"
//       component={StudentMyCourses}
//       options={{
//        headerShown:false
//       }}
//     />
    
//   </Stack.Navigator>
  
//   )
// }

const App = () => {
  // const recordId = useSelector(state => state.recordId);
  // console.log("recordId is ", recordId);

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
  const headerStyle = {
    // backgroundColor: '#0066CC',
    backgroundColor:"#A22451",
  };

  const headerTitleStyle = {
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
      
       <AuthNavigation/>
      {/* </NavigationContainer> */}
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0066CC',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
