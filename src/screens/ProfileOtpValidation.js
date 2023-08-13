import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, alert, Alert, Image, Modal, ImageBackground } from "react-native";
import { getAccessToken } from '../../redux/actions';
import { useNavigation } from '@react-navigation/native';
import OTPTextView from 'react-native-otp-textinput';
const ProfileOtpValidation = ({ navigation, route }) => {

  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [Three, setThree] = useState('');
  const [four, setFour] = useState('');
  const [five, setFive] = useState('');
  const [six, setSix] = useState('');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  console.log("one to six output", one, two, Three, four, five, six);
  const email = route.params.email;
  console.log("passed email id", email);

  const storeIntoNumeric = () => {
    const codeFormatted = parseInt(`${one}${two}${Three}${four}${five}${six}`);
    console.log("SAVED OTP IS", inputOtp);
    if(inputOtp !== '' && inputOtp.length >= 4){
    navigation.navigate('ProfilePasswordSet', { email: email, code: inputOtp })
    }
    else{
      setErrorMessage("Please Enter OTP")
    }
  }
  const setToNull = () => {
    setOne('');
    setTwo('');
    setThree('');
    setFour('');
    setFive('');
    setSix();
  }

  const handleError = error => {
    setErrors(error);
  };
  const OTPApiRequest = async (email) => {
    let data = {};
    data.email = email;
    // data.contactid = dataFetchApi;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/updateContactOTPByEmail`, {
      method: 'PATCH',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let OTPApiResult = await response.json()


    console.log("OTP API RESULT :::", OTPApiResult)

    if(OTPApiResult?.Status === 'Success'){
      Alert.alert(
        "Otp sent",
        "OTP sent to Mail sucessfully",
      [{text: 'OK'}]
      )
    }
  }


  return (
    <View style={{flex:1, backgroundColor:"white"}}>
      <TouchableOpacity 
      onPress={()=> navigation.goBack()}>
      <Image source={require('../../assets/orangebackarrow.jpg')}
       style={{height:40,width:40,marginTop:30,marginHorizontal:20}}/>
      </TouchableOpacity>
       
      <View style={{margin:20}} >
        <Text style={{ color: "#B7547F", fontWeight: "bold", fontSize: 32, }}>Verification</Text>
        <Text style={{ marginTop: 15,fontSize:22,alignSelf:"center"}}>Enter Your 4 Digit Number That send to +91******</Text>
        <OTPTextView
          inputCount={4}
          tintColor="orange"
          offTintColor="orange"
          // ref={e => (this.otpInput = e)}
          onFocus={() => handleError(null)}
          textInputStyle={styles.roundedTextInput}
          handleTextChange={text => {
            setInputOtp(text);
          }}
          inputCellLength={1}
        />
        {errorMessage !== ""  ? <Text style={{color:"red"}}> {errorMessage}</Text>:<></>}
      </View>
      <Text style={{ justifyContent: "center", alignSelf: "center",fontSize:18,marginTop:15 }}>Don't Receive The OTP?</Text>
      <TouchableOpacity
        onPress={() => [OTPApiRequest(email), setToNull()]}>
        <Text style={{ color: "orange", justifyContent: "center", alignSelf: "center", fontWeight: "800", marginTop: 5,fontSize:17 }}>RESEND OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => storeIntoNumeric()}
        style={{ backgroundColor: "orange", width: "90%", alignSelf: "center", borderRadius: 10, marginTop: 60 }}>
        <Text style={{ color: "white", padding: 10, alignSelf: "center", fontWeight: "700", fontSize: 19 }}>Continue</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ justifyContent: "center" }}
      >
        <View style={{ width: "90%", height: "50%", backgroundColor: "pink", marginTop: "50%", alignSelf: "center" }}>
          <ImageBackground
            source={require('../../assets/otpscreen.png')}
            style={{ width: "100%", height: 290, alignSelf: "center" }}
            resizeMode='cover'>
            <View style={{ width: "100%", backgroundColor: "#B7547F", marginTop: 200 }}>
              <Text style={{ padding: 20, alignSelf: "center", color: "white", fontSize: 19, fontWeight: "600" }}>Check your Inbox</Text>
              <Text style={{ alignSelf: "center", color: "white", fontSize: 24, fontWeight: "900" }}>OTP sent Successfully</Text>
              <TouchableOpacity
                onPress={() => [navigation.navigate('OtpValidation', { email: email }), setModalVisible(false)]} >
                <Text style={{ backgroundColor: "white", marginTop: 50, margin: 15, marginLeft: 330, color: "black", alignSelf: "center", padding: 3, fontWeight: "700" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>


        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: 50,
    height: 50,
    // borderRadius:25,
    borderColor: "#A22451",
    borderWidth: 3,
    textAlign: "center",
    textAlignVertical: "center"
  },
  roundedTextInput: {
    marginTop:25,
borderBottomWidth:2
    // borderRadius: 5,
    // borderWidth: 4,
    // borderColor:"red"
  },
});

export default ProfileOtpValidation;