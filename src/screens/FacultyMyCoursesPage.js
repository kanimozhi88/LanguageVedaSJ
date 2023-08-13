import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import { getCourseApiResult } from '../../redux/actions';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  SafeAreaView,
  SectionList,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import moment from 'moment';

const FacultyMyCoursesPage = ({navigation,route}) => {
  const {batchid,batchName,CourseName,contactName} = route.params;
  console.log("batchid passed is", batchid)
  const FakeData = [
    { CourseName: "Tamil Language Course", endTime: "17:00:00.000Z", message: "Contact Found!", primeFaculty: "Prof.Kalyan", recordId: "0031e00000Hm4KYAAZ", startTime: "16:00:00.000Z", status: "Success", zoomLink: "https://us05web.zoom.us/j/7464043898?pwd=blVPb1BkMU03WVFQWENaRzZhd0RDUT09" },
    { CourseName: "Telugu Language Course", endTime: "17:00:00.000Z", message: "Contact Found!", primeFaculty: "Prof.Kalyan", recordId: "0031e00000Hm4KYAAZ", startTime: "16:00:00.000Z", status: "Success", zoomLink: "https://us05web.zoom.us/j/7464043898?pwd=blVPb1BkMU03WVFQWENaRzZhd0RDUT09" },
    { CourseName: "kannada Language Course", endTime: "17:00:00.000Z", message: "Contact Found!", primeFaculty: "Prof.Kalyan", recordId: "0031e00000Hm4KYAAZ", startTime: "16:00:00.000Z", status: "Success", zoomLink: "https://us05web.zoom.us/j/7464043898?pwd=blVPb1BkMU03WVFQWENaRzZhd0RDUT09" },
  ]

  

  const [final, setFinal] = useState();
  const [courseName,setCourseName] = useState([]);

  const dataFetchApi = useSelector(state => state.recordId);
  console.log("DATAFETCH",dataFetchApi);
  
  useEffect(() => {
      // FacultyCourseApiCall();
  }, []);

  const FacultyCourseApiCall = async () => {
    let data = {};
    // data.Type = "Contact";
    data.batchid =  batchid;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNBatchTestDetails/`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let courseresult = await response.json()
    console.log("Faculty COURSE API RES",courseresult);
    setFinal(courseresult.tests);
    console.log("final data is", final)
    // dispatch(getCourseApiResult(courseresult?.Result));
    
  }


  const renderItem = ({ item, index }) => {
    const converttime = (timestring)=>{
      // const time = timestring.slice(0,-5);
      // const [hours,minutes] = time.split(':');
      // const peroid = parseInt(hours) >=12? 'PM' : 'AM';
      // const formattedhours = ((parseInt(hours)+11)% 12) + 1;
      // const formattedminute = minutes;

      // return `${formattedhours}:${formattedminute} ${peroid}`;
      const formattedTime = moment(timestring).format('h:mm A');
      return formattedTime;

    }
    const course = item.CourseName;
    return (

        <View style={{backgroundColor:"lightblue",width:"90%",margin:10,borderRadius:20,alignContent:"center",alignItems:"center",alignSelf:"center"}}>
        <Text style={{color:"black",fontSize:26,fontWeight:"900",padding:15}}>{item.assignmentTitle}</Text>
        
        
        <View style={{flexDirection:"row",width:"100%",padding:10,justifyContent:"space-evenly"}}>
        <Text style={{color:"black",fontWeight:"900",fontSize:17}}>LessonPlan</Text>
        <Text style={{color:"black",fontWeight:"900",fontSize:17,marginLeft:"43%"}}>{item.lessonPlan}</Text>
        </View>
      
        <TouchableOpacity
        onPress={()=> navigation.navigate('FacultyLessonPlan',{coursename: item.courseName,batchId:batchid})}
        style={{backgroundColor:"white",margin:10,width:'80%',borderRadius:10}}> 
          <Text style={{color:"black",fontWeight:"800",padding:20,alignSelf:"center",}}>LessonPlans</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=> navigation.navigate('FacultyLessonPlanExe', {coursename: item.courseName,batchId:batchid,batchName:item.batchName,contactName:item.studentName,assignmentTitle:item.assignmentTitle,lessonPlan:item.lessonPlan})}
        style={{backgroundColor:"white",margin:10,width:"80%",borderRadius:10}}>
          <Text style={{color:"black",fontWeight:"800",padding:20,alignSelf:"center",}}>LessonPlan Execution</Text>
        </TouchableOpacity>
       
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color:"#A22451",fontWeight:"bold",fontSize:22,alignSelf:"center"}}>{batchName}</Text>
  
          {/* <FlatList
            data={final}
            renderItem={renderItem}
          /> */}
         
          <TouchableOpacity
        onPress={()=> navigation.navigate('FacultyLessonPlan',{batchId:batchid,CourseName:CourseName})}
        style={{backgroundColor:"lightblue",margin:10,width:'80%',borderRadius:10}}> 
          <Text style={{color:"black",fontWeight:"800",padding:20,alignSelf:"center",}}>LessonPlans</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=> navigation.navigate('FacultyLessonPlanExe', {batchId:batchid,CourseName:CourseName,contactName:contactName})}
        style={{backgroundColor:"lightblue",margin:10,width:"80%",borderRadius:10}}>
          <Text style={{color:"black",fontWeight:"800",padding:20,alignSelf:"center",}}>LessonPlan Execution</Text>
        </TouchableOpacity>
      
    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  contentStyle: {
    marginTop: 10,
    backgroundColor: "#ffe0b2",
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,

    borderWidth: 2, borderColor: "red",
  },
  titleStyle: {
    color: "red",
    fontSize: 15
  },
  contentContainer: {
    width: "80%"
  }
});

export default FacultyMyCoursesPage;