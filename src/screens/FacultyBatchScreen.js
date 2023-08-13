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

const FacultyBatchScreen = ({navigation}) => {
  const FakeData = [
    { CourseName: "Tamil Language Course", endTime: "17:00:00.000Z", message: "Contact Found!", primeFaculty: "Prof.Kalyan", recordId: "0031e00000Hm4KYAAZ", startTime: "16:00:00.000Z", status: "Success", zoomLink: "https://us05web.zoom.us/j/7464043898?pwd=blVPb1BkMU03WVFQWENaRzZhd0RDUT09" },
    { CourseName: "Telugu Language Course", endTime: "17:00:00.000Z", message: "Contact Found!", primeFaculty: "Prof.Kalyan", recordId: "0031e00000Hm4KYAAZ", startTime: "16:00:00.000Z", status: "Success", zoomLink: "https://us05web.zoom.us/j/7464043898?pwd=blVPb1BkMU03WVFQWENaRzZhd0RDUT09" },
    { CourseName: "kannada Language Course", endTime: "17:00:00.000Z", message: "Contact Found!", primeFaculty: "Prof.Kalyan", recordId: "0031e00000Hm4KYAAZ", startTime: "16:00:00.000Z", status: "Success", zoomLink: "https://us05web.zoom.us/j/7464043898?pwd=blVPb1BkMU03WVFQWENaRzZhd0RDUT09" },
  ]

  const dispatch = useDispatch();
  const courseApiResult = useSelector(state => state.Result)
  console.log("stored course api result is", courseApiResult);

  const [final, setFinal] = useState();
  const [courseName,setCourseName] = useState([]);

  const dataFetchApi = useSelector(state => state.recordId);
  console.log("DATAFETCH",dataFetchApi);
  const dataLastName = useSelector(state => state.LastName);
  const dataEmail = useSelector(state => state.Email);
  const dataPhone = useSelector(state => state.Phone);

  useEffect(() => {
    // if (courseApiResult == undefined) {
    //   console.log("calling course API call");
    FacultyBatchApiCall();
    // }
  }, []);


  const onClickZoomLink=(item) =>{
    if(item.ZoomLink){
      Linking.openURL(item?.ZoomLink)
    }
  }
  const FacultyBatchApiCall = async () => {
    let data = {};
    data.Type = "Contact";
    data.contactid =  dataFetchApi;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/facultyCourseOffering`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let courseresult = await response.json()
    console.log("Faculty Batch API RES",courseresult);
    setFinal(courseresult);
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
    // console.log("COURSE CALLED", course);
    return (

        <View style={{backgroundColor:"lightblue",width:"90%",margin:10,borderRadius:20,alignContent:"center",alignItems:"center",alignSelf:"center"}}>
        <TouchableOpacity onPress={()=> navigation.navigate('FacultyMyCoursesPage', {batchid:item.RecordId,batchName:item.BatchName,CourseName:item.CourseName,contactName:item.FacultyName})}>
        <Text style={{color:"black",fontWeight:"900",padding:15}}>{item.BatchName}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color:"#A22451",fontWeight:"bold",fontSize:22,alignSelf:"center"}}>MY COURSES</Text>
  
          <FlatList
            data={final}
            renderItem={renderItem}
          />
        
    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default FacultyBatchScreen;