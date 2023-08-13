import React, { useState, useRef ,useEffect} from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, Alert, alert, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const ViewAssign = ({navigation,route}) => {

    const recordId = useSelector(state => state.recordId);
   const {batchId,BatchName} = route.params;
    console.log(" batchID is ",batchId);
   
    const FakeCourse = [{ course: "KANNADA", level: "BASICS" },
    { course: "KANNADA", level: "INTERMEDIATE" },
    { course: "KANNADA", level: "INTERMEDIATE" }]

    const [final,setFinal] = useState('');

    useEffect(()=>{
        ViewAssignApi()
        console.log("recordID is",recordId);
    },[])

    const ViewAssignApi = async () => {
        let data = {};
        // data.Type = "Contact";
        // data.contactid = recordId;
        data.batchid = batchId;
        // data.contactid = "0031e00000LPqoYAAT";
        // data.batchid = "a0D1e000002InK1EAK";
    
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
        let ViewAssignRes = await response.json()
        console.log("View Assignment API res :::",  ViewAssignRes)
        setFinal(ViewAssignRes.tests);
      }
console.log("final view assign", final);

    const renderCourse = ({ item }) => {
        return (
            <View>
                <TouchableOpacity
                                onPress={() => [navigation.navigate('ViewBatch', { batchId:batchId,courseName:item.courseName, assignmentTitle:item.assignmentTitle,BatchName:BatchName })]}

                // onPress={()=>navigation.navigate('CourseBatchSelection',{course:item.courseName,level:item.level})}
                 style={{ width: "85%", backgroundColor: "lightgray", margin: 20, alignSelf: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 20 }}>
                        <Text style={{ fontWeight: "900", color: "black" }}>{item.assignmentTitle}  </Text>
                        <Text style={{ fontWeight: "900", color: "black" }}>{item.lessonPlan}  </Text>
 

                        {/* <Text style={{ fontWeight: "900", color: "black", fontSize: 19 }}>-</Text> */}
                        {/* <Text style={{ fontWeight: "900", color: "black" }}> {item.level}</Text> */}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (

        <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 23, color: "#A22451", alignSelf: "center", margin: 40 }}>ASSIGNMENT</Text>

       {final ? 
            <FlatList
                data={final}
                renderItem={renderCourse} />
                :<ActivityIndicator size="large"/> }

            <View style={{ width: "100%", height: 50, backgroundColor: "#A22451", bottom: 0, left: 0, right: 0, position: "absolute" }} />

        </View>
    )
}

export default ViewAssign;