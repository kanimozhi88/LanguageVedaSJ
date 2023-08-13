import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import { useNavigation } from '@react-navigation/native';

import {
    StyleSheet,
    Text,
    View,
    Linking,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import moment from 'moment';
import { Dropdown } from "react-native-element-dropdown";


const NewTicket = ({navigation}) =>{

    const testTypeValues = [{Type:"Problem"},{Type:"Feature Request"},{Type:"Question"}]
    const [testType, setTestType] = useState(null);
    const [description, setDescription] = useState('');
    const recordId = useSelector(state => state.recordId);

    const onSelect=(item)=>{
        console.log("item is ", item);
       setTestType(item?.Type);
    } 
    console.log("testType",testType);

    const SubmitTicket = async () => {
        let data = {};
        data.contactId = recordId;
        data.Type = testType;
        data.description = description;
        data.status = "New";
        data.Origin = "Phone"

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/LvCasesCreation`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let submitTicketeRes = await response.json()
        console.log("submit Tikcet Res", submitTicketeRes);
        if(submitTicketeRes?.caseId !== ""){
            Alert.alert(
                'Uploaded Successfully',
                'OK',
                [{text: 'OK',onPress: () => {setTestType(''),setDescription('')}}
                ],
                { cancelable: false }
              );        }

    }


    const validateInput =()=>{
       if(testType !== '' && testType !== null && description !== ""){
        SubmitTicket();
       }else{
        Alert.alert("select test type and enter description")
       }
    }
    return(
        <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity
            onPress={()=> navigation.goBack()} 
            style={{ width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10 }}>
                <Image
                    source={require('../../assets/orangebackarrow.jpg')}
                    style={{ width: 40, height: 40, alignSelf: "center"}} />
            </TouchableOpacity>
            <Text style={{ color: "#F38216", fontWeight: "600", fontSize: 16, marginLeft: 100,margin:10 }}>New Ticket</Text>
        </View>
<View style={{marginTop:40,marginHorizontal:25}}>
      <Text style={{color:"#000000", fontSize:15,fontWeight:"400",}}>Issue Type</Text>
      <Dropdown
                        style={{
                          width: 248,
                          height:40,
                          borderRadius: 3,
                        borderColor:"#F38216",
                        borderWidth:1,
                        marginTop:20,
                        }}
                        itemTextStyle={{color: "#C8C6C6",fontSize:14,fontWeight:"400",}}
                        iconStyle={{ width: 30, height:30 }}
                        data={testTypeValues}
                        labelField="Type"
                        valueField="Type"
                        placeholder={'Select Type'}
                        placeholderStyle={{color: "#C8C6C6",fontSize:14,fontWeight:"400",marginHorizontal:50}}
                        onChange={(data) => {
                            console.log("data is",data?.Type)
                            // setTestType(data)
                          onSelect(data)
                        }}
                        value={testType !== null ? testType : undefined} // Set the value prop correctly
                        selectedStyle={styles.selectedStyle}
                      />
      </View> 
      <View style={{marginTop:40,marginHorizontal:25}}>
        <Text style={{color:"#000000",fontSize:15,fontWeight:"400"}}>Message</Text>
        <TextInput
        placeholder='Type Message'
        placeholderTextColor={"#C8C6C6"}
        onChangeText={text => setDescription(text)}
        value={description}
        style={{width:290,height:175,borderColor:"#F38216",borderWidth:1,borderRadius:5,marginTop:20,textAlign:"center",textAlignVertical:"top" }}/>
      </View>

<TouchableOpacity 
onPress={()=> validateInput()}
style={{backgroundColor:"#F38216",width:"30%",marginTop:70,alignSelf:"center",padding:10,borderRadius:5}}>
    <Text style={{color:"#FFFFFF",fontSize:15,fontWeight:"700",alignSelf:"center"}}>
        Submit
    </Text>
</TouchableOpacity>
    </SafeAreaView>
    )
}
export default NewTicket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
})