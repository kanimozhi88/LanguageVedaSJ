import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,Modal,TextInput, Image, Alert, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import moment from 'moment';
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from 'react-native-date-picker'



const FacultyRevision = ({ route, navigation }) => {
    const [final, setFinal] = useState('');
    const dataFetchApi = useSelector(state => state.recordId);
    const [modalVisible, setModalVisible] = useState(false);
    const [batchRes,setBatchRes] = useState('');
    const [testType, setTestType] = useState(null);
    const [selectedType, setSelectedType] = useState(null); // Store the selected value
    const [modifiedBatchRes,setModifiedBatchRes] = useState('');
    const [batchSelection,setBatchSelection] = useState('');
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [topic,setTopic] = useState('');
    const [selectedRevisionReason,setSelectedRevisionReason] = useState('');
    const [selectedRevisionRemarks,setselectedRevisionRemarks] = useState('');
    const [description, setDescription] = useState('');

    const revisionReason = [{Type:"Primary Teacher Not Available"},{Type:"Student Requested For Revision"},{Type:"Exams Are Approaching"},{Type:"Others"}]
    const revisionRemarks = [{Type:"Yet To Start"},{Type:"In Progress"},{Type:"Completed"},{Type:"NONE"}]





    // const onSelect=(item)=>{
    //     console.log("item is ", item);
    //    setTestType(item?.Type);
    // } 

    const formatDate = (inputDate) => {
      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const day = String(inputDate.getDate()).padStart(2, '0');
      // setFormatedExeDate( `${year}-${month}-${day}`);
      return `${year}-${month}-${day}`;
    };
    
      const onSelect = (selectedItem) => {
        setSelectedType(selectedItem);
        const selectedCourseOfferingId = selectedItem?.Course_Offering_Id;
        console.log('Selected Course_Offering_Id:', selectedCourseOfferingId);
      };



    useEffect(() => {
        FacultyRevisionApi();
        CourseApiCall();
    }, []);


    const FacultyRevisionApi = async () => {
        console.log("dataFetchApi>>>>>", dataFetchApi)

        let data = {};
        data.contactId = dataFetchApi;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/rnRevisionStatusDisplay`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let FacultyRevisionRes = await response.json()
        console.log(" FacultyRevisionRes API RES", FacultyRevisionRes);
        setFinal(FacultyRevisionRes);
        console.log("final data is", final)
    }

    const CourseApiCall = async () => {
        let data = {};
        data.contactId =  dataFetchApi;
    
        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyBatchDisplay`, {
          method: 'POST',
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": bearer
          }),
          body,
        });
        let courseresult = await response.json()
        console.log(" faculty COURSE API RES",courseresult);
        setBatchRes(courseresult);
        console.log("courseresult data is", final)
        const modifiedBatchRes = courseresult.map((item, index) => ({
            ...item,
            batchIndex: `B${index + 1}`,
          }));
          setModifiedBatchRes(modifiedBatchRes)
        // dispatch(getCourseApiResult(courseresult?.Result));
        
      }

      const facultyBatchSelection = async (selectedType) => {

        console.log(">>>>>>>>selection",selectedType);
        let data = {};
        data.contactId = dataFetchApi;
        data.batchId = selectedType;
    
        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyCourseAttendanceLessonPlans`, {
          method: 'POST',
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": bearer
          }),
          body,
        });
        let courseresult = await response.json()
        console.log(" faculty batchSelection API RES",   courseresult);
        setBatchSelection(courseresult?.lessonPlan)
        // setFinal(courseresult);
        // console.log("final data is", final)
      }

      const FacultyRevisionUpdate = async () => {
        let data = {};
        const requestList = [{batchId:selectedType?.Course_Offering_Id, lessonPlanId: topic, revisionDate :formatDate(date), revisionReason : selectedRevisionReason, revisionStatus: selectedRevisionRemarks, feedBack: description}]
        console.log("requestList>>>>>>>>>>",requestList);
        data.requestList = requestList;
        
    
        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/facultyRevisions`, {
          method: 'POST',
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": bearer
          }),
          body,
        });
        let facultyRevisionRes = await response.json()
        console.log("facultyRevisionRes", facultyRevisionRes);
     Alert.alert(
              "Successful",
          "Records Created successfully",
           [{text: 'OK', onPress: () => setDescription('')}]
           )
    
      }
     
   console.log("batchselec>++++++++++>>",batchSelection)
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backarrowView}>
                    <Image
                        source={require('../../assets/orangebackarrow.jpg')}
                        style={styles.backarrowImg} />

                </TouchableOpacity>
                <Text style={{ color: "#F38216", fontSize: 16, fontWeight: "600", marginLeft: "25%", alignSelf: "center", marginTop: 10 }}>Revision</Text>
            </View>



            { final !== '' && final?.revisions.map((item) =>


                <TouchableOpacity
                    key={item?.LPExecutionId}
                    onPress={() => navigation.navigate('FacultyCourseSelection', { LPExecutionId: item?.LPExecutionId, Status: item?.Status })}
                    style={{ width: "90%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, elevation: 5 }}>
                    <View style={{flexDirection:"row"}}>
                    <Text style={{ color: "#B9B9B9", fontSize: 16, fontWeight: "500", margin: 10 }}>{item?.topicName}</Text>
                    <View style={{flexDirection:"row",margin:12}}>
                    <Text style={{ color: "#B9B9B9", fontSize: 13, fontWeight: "700", }}>Status: </Text>
                    <Text style={{ color: "#B9B9B9", fontSize: 14, fontWeight: "500",}}>{item?.revisionStatus}</Text>
                    </View>
                    </View>
                    <View style={{ flexDirection: "row", margin: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: "500", marginLeft: 5,color:"#B9B9B9" }}>{item?.lessonPlanNumber}</Text>
                    </View>
                    <View style={{ flexDirection: "row", margin: 10 }}>
                        <Text style={{ color: "#B9B9B9", fontSize: 13, fontWeight: "700", marginLeft: 5 }}>Date: </Text><Text style={{ color: "#F38216", fontSize: 14, fontWeight: "500", marginLeft: 5 }}>{item?.revisionDate}</Text>
                    </View>
                </TouchableOpacity>
            )
            }

<TouchableOpacity onPress={()=>{setModalVisible(true)}} style={styles.floatingButton}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ justifyContent: "center",backgroundColor: "lightgray" }}
      >
        <View style={{ width: "100%", height: "90%", marginTop:"19%",backgroundColor: "white",lignSelf: "center" }}>
         <Text style={{color:"#000000",fontSize:16,fontWeight:"500",margin:15}}>Create Revision</Text>
        <ScrollView>
         <View style={{ marginTop: 5, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Batch</Text>
                    {batchRes !== '' ?
                     <Dropdown
                     style={{
                       width: 248,
                       height:40,
                       borderRadius: 3,
                     borderColor:"#F5F7FB",
                     backgroundColor:"#F5F7FB",
                     borderWidth:1,
                     marginTop:5,
                     }}
                     itemTextStyle={{color: "black",fontSize:14,fontWeight:"400",}}
                     iconStyle={{ width: 30, height:30 }}
                     data={modifiedBatchRes}
                     labelField="batchIndex"
                     valueField="Course_Offering_Id"
                     placeholder={'Select Type'}
                     placeholderStyle={{color: "black",fontSize:14,fontWeight:"400",marginHorizontal:50}}
                     onChange={(data) => {
                         console.log("data is>>>>>>>>>",data?.Course_Offering_Id)
                         // setTestType(data)
                       onSelect(data)
                       facultyBatchSelection(data?.Course_Offering_Id);
                     }}
                     value={selectedType} // Set the value prop correctly
                     selectedStyle={{color:"black"}}
                   />                  
                     : null}
             
            </View> 

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Topic</Text>
                    {batchSelection !== '' ?
                     <Dropdown
                     style={{
                       width: 248,
                       height:40,
                       borderRadius: 3,
                     borderColor:"#F5F7FB",
                     backgroundColor:"#F5F7FB",
                     borderWidth:1,
                     marginTop:5,
                     }}
                     itemTextStyle={{color: "black",fontSize:14,fontWeight:"400",}}
                     iconStyle={{ width: 30, height:30 }}
                     data={batchSelection}
                     labelField="TopicName"
                     valueField="TopicName"
                     placeholder={'Select Type'}
                     placeholderStyle={{color: "black",fontSize:14,fontWeight:"400",marginHorizontal:50}}
                     onChange={(data) => {
                         console.log("data is>>>>>>>>>",data)
                         // setTestType(data)
                         setTopic(data.LPExecutionId)
                      
                     }}
                     value={selectedType} // Set the value prop correctly
                     selectedStyle={{color:"black"}}
                   />                  
                     : null
                     
                     }
             
            </View> 
     
            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Date</Text>
                <View style={{ width: "70%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 5 }}>
                    {final !== '' ?
                     <View>
                     <TouchableOpacity onPress={() => setOpen(true)}>
                       <Text >  {formatDate(date)}</Text>
                     </TouchableOpacity>
                     {open && (
                       <DatePicker
                         date={date}
                         mode="date"
                         onDateChange={(selectedDate) => { [setOpen(false), setDate(selectedDate)] }}
                         onCancel={() => setOpen(false)}
                       />
                     )}
                   </View>
                        : null}
                </View>
            </View>
            
            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Revision Reason</Text>
                    {batchRes !== '' ?
                     <Dropdown
                     style={{
                       width: 248,
                       height:40,
                       borderRadius: 3,
                     borderColor:"#F5F7FB",
                     backgroundColor:"#F5F7FB",
                     borderWidth:1,
                     marginTop:5,
                     }}
                     itemTextStyle={{color: "black",fontSize:14,fontWeight:"400",}}
                     iconStyle={{ width: 30, height:30 }}
                     data={revisionReason}
                     labelField="Type"
                     valueField="Type"
                     placeholder={'Select Type'}
                     placeholderStyle={{color: "black",fontSize:14,fontWeight:"400",marginHorizontal:50}}
                     onChange={(data) => {
                         console.log("data is>>>>>>>>>",data?.Course_Offering_Id)
                         // setTestType(data)
                      setSelectedRevisionReason(data.Type)
                     }}
                     value={selectedRevisionReason} // Set the value prop correctly
                     selectedStyle={{color:"black"}}
                   />                  
                     : null}
             
            </View> 

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Revision Remarks</Text>
                    {batchRes !== '' ?
                     <Dropdown
                     style={{
                       width: 248,
                       height:40,
                       borderRadius: 3,
                     borderColor:"#F5F7FB",
                     backgroundColor:"#F5F7FB",
                     borderWidth:1,
                     marginTop:5,
                     }}
                     itemTextStyle={{color: "black",fontSize:14,fontWeight:"400",}}
                     iconStyle={{ width: 30, height:30 }}
                     data={revisionRemarks}
                     labelField="Type"
                     valueField="Type"
                     placeholder={'Select Type'}
                     placeholderStyle={{color: "black",fontSize:14,fontWeight:"400",marginHorizontal:50}}
                     onChange={(data) => {
                         console.log("data is>>>>>>>>>",data?.Course_Offering_Id)
                         // setTestType(data)
                      setselectedRevisionRemarks(data.Type)
                     }}
                     value={selectedRevisionRemarks} // Set the value prop correctly
                     selectedStyle={{color:"black"}}
                   />                  
                     : null}
             
            </View> 

            <View style={{ marginHorizontal: 25, marginTop:20}}>
          <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Feedback</Text>
          <View style={{ width: "100%", backgroundColor: "#F5F7FB", height: 145, marginTop: 5 }}>
              <TextInput
                placeholder='Type Message'
                placeholderTextColor={"#C8C6C6"}
                onChangeText={text => setDescription(text)}
                value={description}
                style={{ width: 290, height: 175, borderColor: "#F38216", textAlign: "center", textAlignVertical: "top" }} />
            
          </View>
        </View>

            <TouchableOpacity
          disabled={!date || selectedRevisionRemarks === '' || selectedRevisionReason === ''}
          onPress={() => FacultyRevisionUpdate()}
          style={[styles.saveButton, !date || selectedRevisionRemarks === null || selectedRevisionReason === '' && styles.disabledButton,{marginTop:50}]}

        // style={{ backgroundColor: "#F38216", width: "35%", alignSelf: "center", alignItems: "center", marginBottom: "20%", padding: 10, borderRadius: 5 }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "600" }}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{setModalVisible(false)}} style={[styles.floatingButton,{transform: [{ rotate: '45deg' }]}]}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>

        </ScrollView>
        </View>
      </Modal>

        </SafeAreaView>
    )
}

export default FacultyRevision;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    txtStyle: { color: "black", fontSize: 16, fontWeight: "500", margin: 10 },
    backarrowView: { width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10, marginTop: 10 },
    backarrowImg: { width: 40, height: 40, alignSelf: "center", borderRadius: 10 },
    indicatorStyl: { backgroundColor: '#D6387F', width: 45, marginLeft: 45 },
    floatingButton: {
        position: 'absolute',
        bottom: 90,
        right: 20,
        backgroundColor: '#F38216',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        elevation: 3,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      saveButton: {
        backgroundColor: '#F38216',
        width: "35%", alignSelf: "center", alignItems: "center", marginBottom: "20%", padding: 10, borderRadius: 5
      },
      saveButtonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
      },
      disabledButton: {
        backgroundColor: 'gray',
        width: "35%", alignSelf: "center", alignItems: "center", marginBottom: "20%", padding: 10, borderRadius: 5
        // Add a different style for the disabled button
      },
})