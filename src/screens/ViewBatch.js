import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, Alert, alert, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from "react-native-element-dropdown";
import { DropDownPicker } from 'react-native-dropdown-picker';


const ViewBatch = ({ route, navigation }) => {
    const { batchId, courseName,assignmentTitle ,BatchName} = route.params;
  console.log("passed batchid is", batchId);
    const [studentDetails, setStudentDetails] = useState('');
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [selectedContactName, setSelectedContactName] = useState(null);

    const [attachments, setAttachments] = useState([])
    const [selectedAssignmentTitle, setSelectedAssignmentTitle] = useState('');
    const [selectedBatchName, setSelectedBatchName] = useState('');
    const [selected, setSelected] = useState(false);
    const [notFound,setNotFound] = useState(false);
    const [images, setImages] = useState([]);
    console.log("selected value", selectedContactId);
    console.log("notfound value", notFound);

    useEffect(() => {
        StudentApi()
    }, [])

    const counterForUae = [
        {name: '50'},
        {name: '52'},
        {name: '54'},
        {name: '55'},
        {name: '56'},
        {name: '58'},]
    const data = [{ testType: "Quiz", testDate: "2023-06-09", status: "Success", lessonPlanExecution: "LP-0215", contactName: "priya", contactId: "0031e00000LPqoYAAT", batchName: "Malayalam Basic-morning1", assignmentTitle: "Malayalam letters" }]
    const validate=()=>{
      setSelected(true);
        if(selectedContactName){
            RetriveAttachApi();
        }
    }

    const attachValidate=()=>{
      
    }
    const StudentApi = async () => {
        let data = {};
        data.batchId = batchId;
        // data.batchId = "a0D1e000002Ip7gEAC";

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/v1/ContactsByCourseOffering`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let StudentAPIRes = await response.json()
        console.log("Student API res :::", StudentAPIRes)
        const finalStuDetails = JSON.parse(StudentAPIRes);
        console.log("Student  final API res :::", finalStuDetails)
        setStudentDetails(finalStuDetails.contacts)
        console.log("student name", studentDetails);

    }

    const RetriveAttachApi = async () => {
        let data = {};
        // data.batchName = "MorningBatch Malayalam";
        data.batchName = BatchName;
        data.courseName = courseName;
        // data.courseName = "Malayalam";
        // data.contactId = "0031e00000LPqoYAAT";
        data.contactId = selectedContactId;
        data.assignmentTitle = assignmentTitle;
        // data.assignmentTitle = "Malayalam alphabets";
console.log("selected batname coursename contactid assignmenTit", BatchName,courseName,selectedContactId,assignmentTitle)

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/StudentTestfileRetrieval/`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let RetriveAttachRes = await response.json()
        console.log("Retrive attachment API res :::", RetriveAttachRes)
        const finalRetrieveRes = JSON.parse(RetriveAttachRes);
        console.log("final retrive data is", finalRetrieveRes);
        setAttachments(finalRetrieveRes.Attachments)
        if(attachments.length == 0){
          setNotFound(true);
        }
    }

    console.log("Attachemnt stored", attachments);
    console.log("needed itesm",selected,selectedContactId,selectedAssignmentTitle,selectedBatchName);

    
    const handleDropDown = (value, index) => {
        setSelectedContactName(value);
        const selectedItem = studentDetails.find((item) => item.contactName === value);
        if (selectedItem) {
            setSelectedBatchName(selectedItem.batchName);
            setSelectedContactId(selectedItem.contactId);
            setSelectedAssignmentTitle(selectedItem.assignmentTitle);
        }
    }

    const onSelect=(item)=>{
   console.log("item is ", item);
   setSelectedContactName(item.contactName);
       
            setSelectedBatchName(item.batchName);
            setSelectedContactId(item.contactId);
            setSelectedAssignmentTitle(item.assignmentTitle);
        
    }
    console.log("contactid,assigntitle,batchname", selectedContactId, selectedAssignmentTitle, selectedBatchName);

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 23, color: "#A22451", alignSelf: "center", margin: 20 }}>VIEW ASSIGNMENT</Text>
                      
            <View style={{ flexDirection: "row", width: "50%", justifyContent: "space-evenly", margin: 10 }}>
                {/* <Text style={{ color: "black", fontSize: 19, alignSelf: "center" }}>{batchname}</Text> */}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", width: "90%", justifyContent: "space-between", margin: 30 }}>
                <Text style={{ color: "black", fontWeight: "900", fontSize: 18, }}>STUDENT NAME</Text>

                {studentDetails ?
            <Dropdown
                        style={{
                          width: 180,
                          height:40,
                        //   justifyContent:'flex-start',
                        //   alignSelf:'flex-end',
                        //   alignItems:'flex-end',
                          borderRadius: 3,
                        borderColor:"black",
                        borderWidth:1,
                        }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={{color: "#6C757D"}}
                        iconStyle={{ width: 25, height:25 }}
                        data={studentDetails}
                        labelField="contactName"
                        valueField="contactName"
                        placeholder={'Select Student'}
                        onChange={(data) => {
                          onSelect(data)
                        }}
                        selectedStyle={styles.selectedStyle}
                      /> : <ActivityIndicator/> }

            </View>

            <TouchableOpacity
                onPress={() => [validate()]}
                style={{ backgroundColor: "#A22451", width: 100, alignSelf: "center", borderRadius: 20 }}>
                <Text style={{ padding: 10, color: "white", fontWeight: "800", alignSelf: "center" }}>VIEW</Text>
            </TouchableOpacity>
            {selected && selectedContactName == undefined ? <Text style={{ color: "red", alignSelf: "center" }}>Please select Student details</Text> : <></>}
          {attachments?.length == 0 && notFound ? <Text style={{alignSelf:"center",margin:20}}> No Attachment Found{notFound}</Text> : null}
          {attachments ?  
            <ScrollView horizontal={true}>
                {attachments.map((item, index) => {
                    const Filename = `${item.filename}`;
                   
                    return (
                        <View style={{padding:10}}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('DocumentScreen', { base64: item.content, type: item.Type })}
                        >
                          {item.Type == 'pdf' ? <View style={{ backgroundColor: "white", width: 100, height: 100, alignSelf: "center" }}>
                          {/* <TouchableOpacity
                    style={{}}
                    onPress={() => deleteApiImage(item.filename,item.ContentDocumentId,-1)}>
                      <Image
                       source={require('../../assets/cross.png')}
                       style={{width:15,height:15,marginLeft:85}}/>
                  </TouchableOpacity> */}
                            <Text style={{ fontWeight: "600",textAlignVertical:"center",textAlign:"center",justifyContent:"center",height:75 }}>{Filename}</Text>
                          </View> : 
                         <View style={{ backgroundColor: "white", width: 100, height: 100, alignSelf: "center" }}>
                           {/* <TouchableOpacity
                    style={{ }}
                    onPress={() => deleteApiImage(item.filename,item.ContentDocumentId,-1)}>
                      <Image
                       source={require('../../assets/cross.png')}
                       style={{width:15,height:15,marginLeft:85}}/>
                  </TouchableOpacity> */}
                          <Image
                          // resizeMode='center'
                            source={{ uri: `data:image/png;base64,` + item.content }}
                            style={{ width: 100, height: 85 }}
                          />
                          </View>
                          }
                        </TouchableOpacity>
                      </View>
                    )
                })}
            </ScrollView> :  <Text style={{alignSelf:"center",margin:20}}>No Attachments Found</Text> }


            
            <View style={{ width: "100%", height: 50, backgroundColor: "#A22451", bottom: 0, left: 0, right: 0, position: "absolute" }} />

        </View>
    )
}
export default ViewBatch;
const styles = StyleSheet.create({
    dropdown: {
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        bottom: 20,
        backgroundColor: "red",
        borderRadius: 3,
        borderColor:"black",
        borderWidth:2,

      },
      placeholderStyle: {
        fontSize: 14,
        textAlign: "center",
        
        // marginTop:15,
        color: "black",
        
      },
      selectedTextStyle: {
        fontSize: 16,
        textAlign: "center",
        textAlignVertical:"center",
        // marginTop:15,
        color: "black",
       
      },
      selectedStyle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        backgroundColor: "red",
        shadowColor: "#000",
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    
        elevation: 2,
        borderRadius: 3,
        borderColor:"orange",
        borderWidth:2
      },
})