import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, ImageBackground ,KeyboardAvoidingView,Dimensions,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../../redux/actions';

const ProfilePasswordChange = ({ navigation }) => {
    const [Phone, setMobileNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleMobileNumberChange = (text) => {
    // if(restrictedPattern.test(text)){
    setMobileNumber(text);
    // setError('');
    // }else{
    //   setError("Special characters are not allowed");
    // }
  };

  const ValidateInput = () => {
    if (!Phone) {
      setError("Please fill  mobile number.");
      return false;
    }
    setError('');
    return true;
  };


  const OTPApiRequest = async (email) => {
    let data = {};
    data.email = email;
    // data.contactid = dataFetchApi;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    console.log("token needed is::", token);
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/updateContactOTPByEmail`, {
      method: 'PATCH',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let OTPApiResult = await response.json()
    console.log("OTP API RESULT :::", typeof OTPApiResult)
    if (OTPApiResult?.Status === 'Success') {
      // setIsVisible(true);
      // alert("OTP SENT")
      Alert.alert(
        'OTP sent successfully',
        'Sent successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ProfileOtpValidation',{email:Phone}),
          },
        ]
      );
    }
  }


return(
<View style={{flex:1,backgroundColor:"white"}}>
<Text style={{ color: "black", marginHorizontal:20,marginTop:"10%" }}>User Id</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mail address"
            // keyboardType="number-pad"
            onChangeText={text => handleMobileNumberChange(text)}
            value={Phone}
          />
          {error !== '' && <Text>{error}</Text>}

          <TouchableOpacity
          style={{backgroundColor:"orange",margin:20,alignSelf:"center",padding:10}}
          onPress={() => {
            if( Phone !== ''){
              // navigation.navigate('ForgotPasswordScreen')
              // <ForgotPasswordScreen email={Phone}/>
              OTPApiRequest(Phone);
              
          }else
          alert("Please enter valid user Id")
        }}
        >
          <Text style={{ marginTop: 5, alignSelf: "center", color:"white"}}>Submit</Text>
        </TouchableOpacity>
</View>
)}


export default ProfilePasswordChange;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      // padding: 20,
      backgroundColor: "white"
    },
    HeadingStyle: {
      color: "blue",
      fontWeight: "bold",
      fontSize: 20,
      alignSelf: 'center',
      marginHorizontal: 10
    },
    ItemViewStyle: {
      flexDirection: "row",
      padding: 20,
      alignSelf: 'center'
    },
    HeadingImageStyle: {
      height: 70,
      width: 70,
    },
  
    input: {
  
      width: '90%',
      height: 50,
      backgroundColor: "white",
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      margin: 10,
      padding: 10,
      alignSelf:"center"
    },
  },
  );
  