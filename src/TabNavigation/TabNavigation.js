import React,{useState,useEffect} from 'react';
import { View,Text,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './ScheduleScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyComponent from '../screens/MyCourses';
import CourseCurriculum from '../screens/CourseCurriculum';
import SpecificCurriculum from '../screens/SpecificCurriculum';
import MyCoursesPage from '../screens/MycoursesPage';
import Assignment from '../screens/Assignment';
import Attendance from '../screens/Attendance';
import StudentMyCourses from '../screens/StudentMyCourses';
import FacultyBatchScreen from '../screens/FacultyBatchScreen';
import FacultyLessonPlanExe from '../screens/FacultyLessonPlanExe';
import FacultyLessonPlan from '../screens/FaultyLessonPlan';
import FacultyMyCoursesPage from '../screens/FacultyMyCoursesPage';
import ViewBatch from '../screens/ViewBatch';
import CourseBatchSelection from '../screens/CourseBatchSelection';
import ViewAssign from '../screens/ViewAssign';
import ScheduleAssign from '../screens/ScheduleAssign';
import DocumentScreen from '../screens/DocumentScreen';
// import FacultyAssignment from '../screens/FacultyAsssignment';
import WebViewScreen from '../screens/WebViewScreen';
import ChartsandDashboard from '../screens/ChartsandDashboard';
import ScheduleCalendar from '../screens/Calender';
import FacultyCalendar from '../screens/FacultyCalendar';
import FacultyBatches from '../screens/FacultyBatches';
import MyCourses from '../screens/MyCourses';
import ScheduleScreen from './ScheduleScreen';
import HelpCenterScreen from './HelpCenterScreen';
import MyProfileScreen from './MyProfileScreen';
import StudentCourseSelection from '../screens/StudentCourseSelection';
import StudentAssignmentUpload from '../screens/StudentAssignmentUpload';
import NewTicket from '../screens/NewTicket';
import TicketStatus from '../screens/TicketStatus';
// import downloader from '../screens/Downloader';
import Profile from '../screens/Profile';
import ProfilePasswordChange from '../screens/ProfilePasswordChange';
import ProfileOtpValidation from '../screens/ProfileOtpValidation';
import ProfilePasswordSet from '../screens/ProfilePasswordSet';
import Login from '../screens/Login';
import WebViewDownload from '../screens/WebViewDownload';
import FacultyCourseBatch from '../screens/FacultyCourseBatch';
import FacultyBatchSelect from '../../component/FacultyBatchSelect';
import FacultyCourseSelection from '../screens/FacultyCourseSelection';
import FacultyAssessment from '../../component/FacultyAssignment';
import FacultyAssignment from '../../component/FacultyAssignment';
import FacultyAssignmentSelect from '../screens/FacultyAssignmentSelect';
import SpecificStudentTestDetails from '../screens/SpecificStudentTestDetails';
import FacultyRevision from '../screens/FacultyRevision';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation=()=>{
    
     
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
       const headerStyle = {
        // backgroundColor: '#0066CC',
        backgroundColor:"#A22451",
      };
    
      const headerTitleStyle = {
        color: 'white',
        fontWeight: 'bold',
      };
     
    return(
      <Stack.Navigator initialRouteName="MyCourses">
  {/*  
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
         headerShown:false
        }}
      />
        
      <Stack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          title: 'Welcome',
          headerStyle,
          headerTitleStyle,
        }}
      /> */}
      <Stack.Screen
        name="MyCourses"
        component={MyCourses}
        options={{
          headerShown:false
         }}
      />
       {/* <Stack.Screen
        name="downloader"
        component={downloader}
        options={{
          headerShown:false
         }}
      /> */}
       <Stack.Screen
        name="WebViewDownload"
        component={WebViewDownload}
        options={{
          headerShown:false
         }}
      />
     
       <Stack.Screen
        name="CourseCurriculum"
        component={CourseCurriculum}
        options={{
          title: 'Curriculum',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="SpecificCurriculum"
        component={SpecificCurriculum}
        options={{
          title: 'Curriculum',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="MycoursesPage"
        component={MyCoursesPage}
        options={{
          title: 'My Courses',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="Assignment"
        component={Assignment}
        options={{
          title: 'Assignment',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{
          title: 'Attendance',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="Calender"
        component={ScheduleCalendar}
        options={{
          headerShown:false
         }}
      />
      <Stack.Screen
        name="NewTicket"
        component={NewTicket}
        options={{
          headerShown:false
         }}
      />
       <Stack.Screen
        name="TicketStatus"
        component={TicketStatus}
        options={{
          headerShown:false
         }}
      />
      <Stack.Screen
        name="FacultyCalendar"
        component={FacultyCalendar}
        options={{
          title: 'FacultyCalendar',
          headerStyle,
          headerTitleStyle,
        }}
      />
  
      <Stack.Screen
        name="ChartsandDashboard"
        component={ChartsandDashboard}
        options={{
          title: 'Charts and Dashboards',
          headerStyle,
          headerTitleStyle,
        }}
      />
  
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{
          title: 'WebViewScreen',
          headerStyle,
          headerTitleStyle,
        }}
      />
      {/* <Stack.Screen
        name="FacultyAssignment"
        component={FacultyAssignment}
        options={{
          title: 'Assignment',
          headerStyle,
          headerTitleStyle,
        }}
      /> */}
      <Stack.Screen
        name="DocumentScreen"
        component={DocumentScreen}
        options={{
          title: 'Documents Details',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="ScheduleAssign"
        component={ScheduleAssign}
        options={{
          title: 'Assignment',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="ViewAssign"
        component={ViewAssign}
        options={{
          title: 'Assignment',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="CourseBatchSelection"
        component={CourseBatchSelection}
        options={{
          title: 'Assignment',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="ViewBatch"
        component={ViewBatch}
        options={{
          title: 'Assignment',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
      name="FacultyBatches"
      component={FacultyBatches}
      options={{
        headerShown:false    
        }}
      />
      <Stack.Screen
      name="FacultyCourseBatch"
      component={FacultyCourseBatch}
      options={{
        headerShown:false    
        }}
      />
      <Stack.Screen
      name="FacultyCourseSelection"
      component={FacultyCourseSelection}
      options={{
        headerShown:false    
        }}
      />
      <Stack.Screen
      name="FacultyBatchSelect"
      component={FacultyBatchSelect}
      options={{
        headerShown:false    
        }}
      />
      <Stack.Screen
      name="FacultyAssignment"
      component={FacultyAssignment}
      options={{
        headerShown:false    
        }}
      />
      <Stack.Screen
      name="FacultyAssignmentSelect"
      component={FacultyAssignmentSelect}
      options={{
        headerShown:false    
        }}
      />
      <Stack.Screen
      name="FacultyRevision"
      component={FacultyRevision}
      options={{
        headerShown:false    
        }}
      />
      <Stack.Screen
      name="SpecificStudentTestDetails"
      component={SpecificStudentTestDetails}
      options={{
        headerShown:false    
        }}
      />
      <Stack.Screen
        name="FacultyMyCoursesPage"
        component={FacultyMyCoursesPage}
        options={{
          title: 'FacultyCourses',
          headerStyle,
          headerTitleStyle,
        }}
      />
         <Stack.Screen
        name="FacultyLessonPlan"
        component={FacultyLessonPlan}
        options={{
          title: 'FacultyLessonplan',
          headerStyle,
          headerTitleStyle,
        }}
      />
       <Stack.Screen
        name="FacultyLessonPlanExe"
        component={FacultyLessonPlanExe}
        options={{
          title: 'FacultyLessonplanExe',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="FacultyBatchScreen"
        component={FacultyBatchScreen}
        options={{
          title: 'Faculty Batchview',
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="StudentMyCourses"
        component={StudentMyCourses}
        options={{
         headerShown:false
        }}
      />
      <Stack.Screen
        name="StudentCourseSelection"
        component={StudentCourseSelection}
        options={{
         headerShown:false
        }}
      />
      <Stack.Screen
        name="StudentAssignmentUpload"
        component={StudentAssignmentUpload}
        options={{
         headerShown:false
        }}
      />
      
    </Stack.Navigator>
    
    )
  }

  const StackTabHelpNavigation=()=>{
    
       const headerStyle = {
        // backgroundColor: '#0066CC',
        backgroundColor:"#A22451",
      };
    
      const headerTitleStyle = {
        color: 'white',
        fontWeight: 'bold',
      };
     
    return(
      <Stack.Navigator initialRouteName="HelpCenterScreen">
  
   
  <Stack.Screen
        name="HelpCenterScreen"
        component={HelpCenterScreen}
        options={{
          headerShown:false
         }}
      />
      <Stack.Screen
        name="NewTicket"
        component={NewTicket}
        options={{
          headerShown:false
         }}
      />
       <Stack.Screen
        name="TicketStatus"
        component={TicketStatus}
        options={{
          headerShown:false
         }}
      />
    </Stack.Navigator>
    
    )
  }

  const ProfileTabNavigation=()=>{
    
    const headerStyle = {
     // backgroundColor: '#0066CC',
     backgroundColor:"#A22451",
   };
 
   const headerTitleStyle = {
     color: 'white',
     fontWeight: 'bold',
   };
  
 return(
   <Stack.Navigator initialRouteName="MyProfileScreen">


<Stack.Screen
     name="MyProfileScreen"
     component={MyProfileScreen}
     options={{
       headerShown:false
      }}
   />
   <Stack.Screen
     name="Profile"
     component={Profile}
     options={{
       headerShown:false
      }}
   />
   <Stack.Screen
     name="ProfilePasswordChange"
     component={ProfilePasswordChange}
     options={{
       headerShown:false
      }}
   />
   <Stack.Screen
     name="ProfileOtpValidation"
     component={ProfileOtpValidation}
     options={{
       headerShown:false
      }}
   />
   <Stack.Screen
     name="ProfilePasswordSet"
     component={ProfilePasswordSet}
     options={{
       headerShown:false
      }}
   />
   <Stack.Screen
     name="Login"
     component={Login}
     options={{
       headerShown:false
      }}
   />
    
 </Stack.Navigator>
 
 )
}

const TabNavigation=()=>{

    return(

<Tab.Navigator
screenOptions={({ route }) => ({
  tabBarShowLabel:false,
  tabBarActiveTintColor: 'blue', // Change the active tab color
  tabBarInactiveTintColor: 'white', // Change the inactive tab color
  tabBarStyle: {
    backgroundColor: '#F38216', 
    height:60,position:"absolute",
    bottom:20,borderRadius:90,
    marginHorizontal:25
  },
})}
>
      <Tab.Screen name="Home" component={StackNavigation} options={{
        tabBarIcon: ({focused})=>(
          <Image source={require('../../assets/Home.png')} style={{width:30,height:30,tintColor: focused ? "white" : "white"}}/>
        ),
        headerShown:false}} />
      <Tab.Screen name="ScheduleScreen" component={ScheduleCalendar} options={{
         tabBarIcon: ({focused})=>(
          <Image source={require('../../assets/Schedule.png')} style={{width:30,height:30,tintColor: focused ? "white" : "white"}}/>
        ),
        headerShown:false}}/>
      <Tab.Screen name="HelpCenterScreen" component={StackTabHelpNavigation} options={{
         tabBarIcon: ({focused})=>(
          <Image source={require('../../assets/Helpcenter.png')} style={{width:30,height:30,tintColor: focused ? "white" : "white"}}/>
        ),
        headerShown:false}}/>
      <Tab.Screen name="MyProfileScreen" component={ProfileTabNavigation} options={{
         tabBarIcon: ({focused})=>(
          <Image source={require('../../assets/myprofile.png')} style={{width:30,height:30,tintColor: focused ? "white" : "white"}}/>
        ),
        headerShown:false}}/>

   
    </Tab.Navigator>

    )
}
export default TabNavigation;