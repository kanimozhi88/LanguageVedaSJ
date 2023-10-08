import React from 'react';
import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import StudentMyCourses from '../screens/StudentMyCourses';
import DocumentScreen from '../screens/DocumentScreen';
import WebViewScreen from '../screens/WebViewScreen';
import ScheduleCalendar from '../screens/Calender';
import FacultyBatches from '../screens/FacultyBatches';
import MyCourses from '../screens/MyCourses';
import HelpCenterScreen from './HelpCenterScreen';
import MyProfileScreen from './MyProfileScreen';
import StudentCourseSelection from '../screens/StudentCourseSelection';
import StudentAssignmentUpload from '../screens/StudentAssignmentUpload';
import NewTicket from '../screens/NewTicket';
import TicketStatus from '../screens/TicketStatus';
import Profile from '../screens/Profile';
import ProfilePasswordChange from '../screens/ProfilePasswordChange';
import ProfileOtpValidation from '../screens/ProfileOtpValidation';
import ProfilePasswordSet from '../screens/ProfilePasswordSet';
import WebViewDownload from '../screens/WebViewDownload';
import FacultyCourseBatch from '../screens/FacultyCourseBatch';
import FacultyBatchSelect from '../../component/FacultyBatchSelect';
import FacultyCourseSelection from '../screens/FacultyCourseSelection';
import FacultyAssignment from '../../component/FacultyAssignment';
import FacultyAssignmentSelect from '../screens/FacultyAssignmentSelect';
import SpecificStudentTestDetails from '../screens/SpecificStudentTestDetails';
import FacultyRevision from '../screens/FacultyRevision';
import RevisionCourseSelection from '../screens/RevisionCourseSelection';
import VideoAssets from '../screens/VideoAssets';
import ViewVideoAssets from '../screens/ViewVideoAssets';
import StudentAssessment from '../screens/StudentAssessment';
import StudentAssessmentSelect from '../screens/StudentAssessmentSelect';
import StudentCourseAssessment from '../screens/StudentCourseAssessment';
import StudentTakeAssessment from '../screens/StudentTakeAssessment';
import AssessmentReport from '../screens/AssessmentReport';
import Scrutinize from '../screens/Scrutinize';
import FacultyStudentDetails from '../screens/FacultyStudentDetails';
import Notifications from '../screens/Notifications';
import ParentCourseSelection from '../screens/ParentCourseSelection';
import ParentCourseBatch from '../screens/ParentCourseBatch';
import ParentAssignment from '../../component/ParentAssignment';
import ParentAssesment from '../../component/ParentAssesment';
import ParentCourse from '../../component/ParentCourse';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="MyCourses">
      <Stack.Screen
        name="MyCourses"
        component={MyCourses}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebViewDownload"
        component={WebViewDownload}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Calender"
        component={ScheduleCalendar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewTicket"
        component={NewTicket}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TicketStatus"
        component={TicketStatus}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{
          headerShown: false,
          tabBarStyle: {display: 'none'},
        }}
      />
      <Stack.Screen
        name="DocumentScreen"
        component={DocumentScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="FacultyBatches"
        component={FacultyBatches}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FacultyCourseBatch"
        component={FacultyCourseBatch}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FacultyCourseSelection"
        component={FacultyCourseSelection}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FacultyBatchSelect"
        component={FacultyBatchSelect}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="FacultyAssignment"
        component={FacultyAssignment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FacultyAssignmentSelect"
        component={FacultyAssignmentSelect}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FacultyRevision"
        component={FacultyRevision}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RevisionCourseSelection"
        component={RevisionCourseSelection}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Scrutinize"
        component={Scrutinize}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FacultyStudentDetails"
        component={FacultyStudentDetails}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ParentCourseBatch"
        component={ParentCourseBatch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ParentCourseSelect"
        component={ParentCourseSelection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ParentAssignment"
        component={ParentAssignment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ParentAssesment"
        component={ParentAssesment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ParentBatchSelect"
        component={ParentCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoAssets"
        component={VideoAssets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewVideoAssets"
        component={ViewVideoAssets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpecificStudentTestDetails"
        component={SpecificStudentTestDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StudentAssessment"
        component={StudentAssessment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StudentAssessmentSelect"
        component={StudentAssessmentSelect}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StudentCourseAssessment"
        component={StudentCourseAssessment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AssessmentReport"
        component={AssessmentReport}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StudentTakeAssessment"
        component={StudentTakeAssessment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="StudentMyCourses"
        component={StudentMyCourses}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StudentCourseSelection"
        component={StudentCourseSelection}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StudentAssignmentUpload"
        component={StudentAssignmentUpload}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const StackTabHelpNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HelpCenterScreen">
      <Stack.Screen
        name="HelpCenterScreen"
        component={HelpCenterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewTicket"
        component={NewTicket}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TicketStatus"
        component={TicketStatus}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileTabNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="MyProfileScreen">
      <Stack.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfilePasswordChange"
        component={ProfilePasswordChange}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileOtpValidation"
        component={ProfileOtpValidation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfilePasswordSet"
        component={ProfilePasswordSet}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={props => {
        return {
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'blue', // Change the active tab color
          tabBarInactiveTintColor: 'white', // Change the inactive tab color
          tabBarStyle: {
            backgroundColor: '#F38216',
            height: 60,
            position: 'absolute',
            bottom: 20,
            borderRadius: 90,
            marginHorizontal: 25,
            // ...props.route.name === 'WebViewScreen' ? { display: 'none' } : {},
          },
        };
      }}>
      <Tab.Screen
        name="Home"
        component={StackNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/Home.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? 'white' : 'white',
              }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ScheduleScreen"
        component={ScheduleCalendar}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/Schedule.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? 'white' : 'white',
              }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="HelpCenterScreen"
        component={StackTabHelpNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/Helpcenter.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? 'white' : 'white',
              }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyProfileScreen"
        component={ProfileTabNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/myprofile.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? 'white' : 'white',
              }}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;
