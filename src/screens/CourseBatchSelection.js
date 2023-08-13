import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, Alert, alert, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const CourseBatchSelection = ({ route, navigation }) => {
    const recordId = useSelector(state => state.recordId);
    console.log("Record id is::",recordId);
    const [selectbtn, setselectBtn] = useState(false);
    const dataFetchApi = useSelector(state => state.recordId)
    const [final, setFinal] = useState('');
    const batchNames = [{ batchname: "Morning_Batch_1" }, { batchname: "Evening_Batch_5" }, { batchname: "Morning_Batch_3" }, { batchname: "Evening_Batch_4" }, { batchname: "Morning_Batch_4" }]
    const course = route.params.course;
    const level = route.params.level;
    console.log("passed course and level is", course)
    


    const renderBatch = ({ item }) => {
        return (
            <TouchableOpacity
                        onPress={()=> navigation.navigate('ViewAssign',{batchId: item.RecordId,BatchName:item.BatchName})}

                // onPress={() => [navigation.navigate('ViewBatch', { batch: item.BatchName, course: course }), setselectBtn(true)]}
                style={styles.selectionStyle} >
                {item.BatchName !== null ?
                    <>
                        <View style={styles.btnstyle} />
                       
                            <Text style={{ color: "black", fontWeight: "bold", fontSize: 19,marginHorizontal:20 }}>{item.BatchName}</Text>
                        </> : <></>}
            </TouchableOpacity>
        )
    }
    useEffect(() => {
        BatchnameApi();
    }, [])


    const BatchnameApi = async () => {
        let data = {};
        // data.Type = "Contact";
        // data.contactid = "0031e00000Hm4KYAAZ";
        data.contactid = recordId;
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
        let BatchApiRes = await response.json()
        console.log("Batch API res :::", BatchApiRes)
        setFinal(BatchApiRes);
        // if (OTPApiResult?.Status === 'Success') {
        //   setIsVisible(true);
        //   // Alert.alert(
        //   //   "Check your Indox",
        //   //   "OTP sent sucessfully",
        //   // [{text: 'OK', onPress: () => navigation.navigate('OtpValidation',{email:email})}]
        //   // )
        // }
    }
    console.log("setted final res", final);


    return (
        <View style={{ flex: 1 }}>
            {final ?
                <FlatList
                    data={final}
                    renderItem={renderBatch} />
                : <ActivityIndicator size="large" />}

            <View style={{ width: "100%", height: 50, backgroundColor: "#A22451", bottom: 0, left: 0, right: 0, position: "absolute" }} />
        </View>
    )
}
export default CourseBatchSelection;
const styles = StyleSheet.create({
    textStyle: {
        margin: 20, color: "#A22451", fontWeight: "bold", fontSize: 19
    },
    selectionStyle: {
        flexDirection: "row",
        margin: 20,
        alignSelf: "center",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "65%"
    },
    btnstyle: { width: 15, height: 15, borderRadius: 7.5, borderColor: "red", borderWidth: 2 },
    selectBtn: {
        width: 15, height: 15, borderRadius: 7.5, borderColor: "red", borderWidth: 2, backgroundColor: "#A22451"
    }
})