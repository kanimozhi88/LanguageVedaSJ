import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, Alert, alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from "react-native-element-dropdown";

import moment from 'moment';


const ScheduleAssign = ({route}) => {

     const {batchId,contactName,lessonPlan,assignmentTitle} = route.params;
    // const [contactName, setContactName] = useState('');
    const [testType, setTestType] = useState('');
    const [assignName, setAssignName] = useState('');
    const [submissionDate, setSubmissionDate] = useState('');

    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dataFetchApi = useSelector(state => state.recordId)

  const testTypeValues = [{Type:"Assessment"},{Type:"Assignment"}]

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            const formatteddate = new Date(date).toISOString()
            // setSelectedDate(date.toISOString().split('T')[0]);
            const finaldate = moment(formatteddate).format('YYYY-MM-DD')
            setSelectedDate(finaldate);
            console.log("selected date", date);
            console.log("formatted dtae", formatteddate);
            console.log("final date", finaldate);
        }
        setShowDatePicker(false);
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };
    const onSelect=(item)=>{
        console.log("item is ", item);
       setTestType(item.Type);
             
         }

    const ScheduleAssignmentApi = async () => {
        console.log("contactname testdate testtype batchid assignmentti lessonplan ", contactName,selectedDate,testType,batchId,assignmentTitle,lessonPlan)
        let data = {};
        data.contactName = contactName;
        // data.contactName = "Kani";
        data.testDate = selectedDate;
        data.testType = testType;
        // data.testType = "Assessment";
        data.batchId = batchId;
        // data.batchName = "MorningBatch_1";
        data.assignmentTitle = assignmentTitle;
        // data.lessonPlan = "Assessment";
        data.lessonPlan = lessonPlan;

        // data.contactid = dataFetchApi;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/v1/TestCreation`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let ScheduleAssigResult = await response.json()
        console.log("Schedule Assignment result is::", ScheduleAssigResult)
        if (ScheduleAssigResult?.response.status === 'Success') {
            Alert.alert(
                "Success",
                "Assignment scheduled successfully",
                [{ text: 'OK' }]
            )
        }
    }

    return (
        <View>
            <Text style={{ color: "#A22451", fontWeight: "bold", fontSize: 23, alignSelf: "center", margin: 30 }}>SCHEDULE ASSIGNMENT</Text>

            <ScrollView>
                <View style={{ backgroundColor: "lightgray", width: "100%", borderRadius: 20, alignSelf: "center" }}>

                    <View style={{ flexDirection: "row", margin: 10, justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "black", fontWeight: "900" }}>CONTACT NAME</Text>
                        <Text>{contactName}</Text>
                        {/* <TextInput
                            value={contactName}
                            onChangeText={(text) => setContactName(text)}
                            placeholder='Enter Name'
                            style={{ width: "50%", borderColor: "black", borderWidth: 1 }} /> */}
                    </View>

                    <View style={{ flexDirection: "row", margin: 10, justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "black", fontWeight: "900" }}> TEST DATE</Text>

                        <TouchableOpacity
                            style={{ width: "50%" }} onPress={showDatePickerModal}>
                            <TextInput
                                style={styles.textInput}
                                editable={false}
                                placeholder="Select Date"
                                value={selectedDate}
                            />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                testID="datePicker"
                                value={new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            // onChange={(date)=> setSubmissionDate(date)}

                            />
                        )}
                    </View>

                    <View style={{ flexDirection: "row", margin: 10, justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "black", fontWeight: "900" }}>TEST TYPE</Text>
                        <Dropdown
                        style={{
                          width: 180,
                          height:40,
                          borderRadius: 3,
                        borderColor:"black",
                        alignSelf:"center",
                        borderWidth:1,
                        }}
                        itemTextStyle={{color: "#6C757D"}}
                        iconStyle={{ width: 30, height:30 }}
                        data={testTypeValues}
                        labelField="Type"
                        valueField="Type"
                        placeholder={'Select Test Type'}
                        onChange={(data) => {
                            // setTestType(data)
                          onSelect(data)
                        }}
                        // selectedStyle={styles.selectedStyle}
                      />
                    </View>

                    <View style={{ flexDirection: "row", margin: 10, justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "black", fontWeight: "900",alignSelf:"center" }}>ASSIGNMENT TITLE</Text>
                        <Text>{assignmentTitle}</Text>
                    </View>



                    <TouchableOpacity
                        onPress={() => ScheduleAssignmentApi()}
                        style={{ backgroundColor: "white", width: 100, borderRadius: 10, alignSelf: "center", margin: 20 }}>
                        <Text style={{ color: "black", fontWeight: "900", padding: 10, alignSelf: "center" }}>SAVE</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}
export default ScheduleAssign;

const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        borderWidth: 1,
        // backgroundColor:"gray",


    },
    datePicker: {
        width: 200,
        marginTop: 10,
    },
})