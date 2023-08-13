import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet,Button, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import * as Progress from 'react-native-progress';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { isDate } from 'moment';

const FacultyLessonPlanExe = ({ route , navigation}) => {

  const { CourseName, batchId ,batchName,contactName,lessonPlan,assignmentTitle} = route.params;

  const [totalNum, setTotalNum] = useState(0);
  const [average, setAverage] = useState(0);
  const [percentage, setPercentage] = useState(0);
  // const [count,SetCount] = useState(0);
  const dataFetchApi = useSelector(state => state.recordId);
  const [final, setFinal] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [selectedDate, setSelectedDate] = useState({});
  const [currentItemId,setCurrentItemId] = useState(null)
  const [currentName, setCurrentName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemDate, setSelectedItemDate] = useState({});
  const [particularDateSelectedVal,setParticularDateSelectedVal] = useState('');

 
console.log("contactname passed", contactName);


  useEffect(() => {
    FacultyCurriculumApiCall();
  }, [])


  const handleDateChange = (event, date) => {
    if (date !== undefined) {
        const formatteddate = new Date(date).toISOString()
        // setSelectedDate(date.toISOString().split('T')[0]);
        const finaldate = moment(formatteddate).format('YYYY-MM-DD')
        const finalValue = `${finaldate} ${particularDateSelectedVal}`
        console.log("final val", finalValue);
        setSelectedDate(finaldate);
        console.log("selected date", date);
        console.log("formatted dtae", formatteddate);
        console.log("final date", finaldate);
    }
    setShowDatePicker(false);
};
 


  const FacultyCurriculumApiCall = async () => {
    let data = {};
    data.CourseName = CourseName;
    data.batchId = batchId;

    setLoading(true);
    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/lessonPlanExecutions`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let curriculumresult = await response.json()
    console.log("Faculty Lessonplanexe response in", curriculumresult);
    setFinal(curriculumresult);
    // dispatch(getCourseApiResult(courseresult?.Result));
    setLoading(false);
  }

  const ExecutionDateApi = async (batchId,lpExecutionId) => {
    console.log("batchid, exeid passed", batchId,lpExecutionId);
    let data = {};
    data.batchId = batchId;
    // data.batchId = "a0D1e000002Ip7MEAS";
    data.lpExecutionId = lpExecutionId;
    // data.lpExecutionId = "a0z1e0000017XfXAAU";
    data.newExecutionDate =selectedDate;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/lessonplanexecutiondate/`, {
      method: 'PATCH',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let ExecutionApiRes = await response.json()
    console.log("Faculty execution lesson date", ExecutionApiRes);
    if(ExecutionApiRes.ResultStatus == "Success"){
      Alert.alert("Saved successfully")
    }
    
  }
 const showDatePickerModal = (lpexcecutionId) => {
  setShowDatePicker(true);
  setParticularDateSelectedVal(lpexcecutionId);
  setSelectedDate(new Date().toISOString().split('T')[0]);
};
  console.log("sum is", totalNum)
  

  const renderItem = ({ item, index }) => {
   

    return (

      <View style={{ width: "90%", backgroundColor: "#74b88d", alignSelf: "center", borderRadius: 20, marginTop: 30, padding: 5 }}>
        <Text style={{ margin: 10, color: "black", fontWeight: "900" }}>{item.TopicName}</Text>
        <View style={{ flexDirection: "row", margin: 5, justifyContent: "space-between" }}>
          <Text style={{ color: "black" }}>LessonPlan Type : </Text>
          <Text style={{ color: "black" }}>{item.LPType}</Text>
        </View>
        <View style={{ flexDirection: "row", margin: 5, justifyContent: "space-between" }}>
          <Text style={{ color: "black" }}>Co- Ordinator Planning Date : </Text>
          <Text style={{ color: "black" }}>{moment  (item.CoordinatorsPlanningDate).format("DD-MM-YYYY")}</Text>

        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: "black" }}>Teacher Execution Date : </Text>
        
          <TouchableOpacity
                            style={{ width: "50%" }} onPress={() =>showDatePickerModal(item.lpexcecutionId)}>
                            <TextInput
                                style={styles.textInput}
                                editable={false}
                                placeholder="Select Date"
                                value={particularDateSelectedVal == item.lpexcecutionId ? selectedDate : " select a date"}
                            />
                        </TouchableOpacity>
                       


        </View>
        
        <View style={{ flexDirection: "row", justifyContent: "flex-end", margin: 5 }}>
          {item.LPType == "Assignment" ?
            <TouchableOpacity
            onPress={()=> navigation.navigate('ScheduleAssign',{batchId:item.batchId,contactName:contactName,lessonPlan:item.lessonPlan,assignmentTitle:item.TopicName})}
              style={{ backgroundColor: "white", padding: 5, borderRadius: 10, margin: 5 }}
            >
              <Text style={{ color: "black" }}>Create Test</Text>
            </TouchableOpacity> : null}
          <TouchableOpacity
           onPress={()=> ExecutionDateApi(item.batchId,item.lpexcecutionId)}
            style={{ backgroundColor: "white", padding: 5, borderRadius: 10, margin: 5 }}
          >
            <Text style={{ color: "black" }}>SAVE</Text>
          </TouchableOpacity>
        </View>

      </View>

    )
  }

  return (
    <View style={{ flex: 1 }}>
           <Text style={{ color: "#A22451", fontSize: 18, fontWeight: "900", margin: 30 }}>LESSON PLAN EXECUTION</Text>
      {showDatePicker && (
  <DateTimePicker
    testID="datePicker"
    value={selectedDate ? new Date(selectedDate) : new Date()}
    mode="date"
    display="default"
    onChange={handleDateChange}
  />
)}


      {loading ? <ActivityIndicator size="large" color="pink" /> :
        final.length ?
          <FlatList
            data={final}
            renderItem={renderItem} /> : <Text style={{ alignSelf: "center", fontWeight: "bold" }}>No courses available</Text>

      }
      {/* <View style={{ width: 550, height: 550, borderRadius: 250, backgroundColor: "#A22451", position: 'absolute', bottom: -800, left: -70 }} /> */}

    </View>
  )
};
export default FacultyLessonPlanExe;
const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "black"
    // padding: 10,
    // borderWidth: 1,
    // backgroundColor:"gray",


  },
  datePicker: {
    // width: 200,

  },
})