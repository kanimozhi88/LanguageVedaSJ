import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, alert, Alert, KeyboardAvoidingView, Modal, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getDataMethod, getLastNameMethod, getCourseApiResult } from '../../redux/actions';
import OtpValidation from './OtpValidation';


//import CloudImg from '../../assets/cloudImg.png'
const ForgotPasswordScreen = () => {

  const dispatch = useDispatch();
  const dataFetchApi = useSelector(state => state.recordId)
  const dataLastName = useSelector(state => state.LastName)

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [otpResult, setOtpResult] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  console.log('dataFetchApi:::::: ', dataFetchApi);
  console.log("last Name response::", dataLastName);

  const ValidateInput = () => {
    console.log("inside")
    // const emailRegex = /\S+@\S+\.\S+/;
    if (email) {
      setEmailError(false)
      OTPApiRequest(email);
      // navigation.navigate("PasswordSet")
    } else {
      setEmailError(true);

    }
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
      alert("OTP SENT")
      // Alert.alert(
      //   "Check your Indox",
      //   "OTP sent sucessfully",
      // [{text: 'OK', onPress: () => navigation.navigate('OtpValidation',{email:email})}]
      // )
    }
  }


  console.log('email stored is', email);
  return (
<></>
    // <View style={styles.container} >
    //   <ImageBackground source={require('../../assets/Rectanglebackground.png')}
    //     style={{ width: "100%", height: 321 }}
    //     resizeMode='contain'
    //   >
    //     <Image source={require('../../assets/logo.png')}
    //       style={{ alignSelf: "center", marginTop: "15%" }} />
    //   </ImageBackground>

    //   <View style={{ margin: 15 }}>
    //     <Text style={{ color: "#b8328f", fontSize: 25, fontWeight: "bold", }}>Verification</Text>
    //     <Text style={{ fontSize: 22, color: "gray", marginTop: 5 }}>Please Enter A Email or Mobile Number</Text>

    //     <Text style={{ color: "black", marginTop: 40 }}>E-mail/Phone Number</Text>
    //     <TextInput
    //       style={{
    //         width: '80%', height: 50, backgroundColor: "white", borderColor: 'gray', borderWidth: 1, borderRadius: 10,
    //         margin: 5,
    //         padding: 10,
    //       }}
    //       placeholder="Email or Phone Number"
    //       secureTextEntry
    //       onChangeText={text => setEmail(text)}
    //       value={email}
    //     />

    //     {emailError && email === '' ? <View>
    //       <Text style={{ color: "red" }}>Cant be empty</Text>
    //     </View> : <></>}
    //   </View>
    //   <TouchableOpacity
    //     // onPress={()=>OTPApiRequest(email)}
    //     // onPress={ ()=> navigation.navigate('OtpValidation',{email:email})}
    //     onPress={() => ValidateInput()}
    //     style={{ backgroundColor: emailError && email === '' ? "lightgray" : "orange", width: "80%", borderRadius: 10, marginTop: 40, alignSelf: "center" }}>
    //     <Text style={{ alignSelf: "center", padding: 10, color: "white", fontSize: 19, fontWeight: "600" }}>Get OTP</Text>
    //   </TouchableOpacity>

    //   {/* <View style={{width:550,height:550,borderRadius:275,backgroundColor:"#A22451",position:'absolute',bottom:-410,left:-60}}/> */}

    //   <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={isVisible}
    //     style={{ justifyContent: "center" }}
    //   >
    //     <View style={{ width: "90%", height: "50%", backgroundColor: "pink", marginTop: "50%", alignSelf: "center" }}>
    //       <ImageBackground
    //         source={require('../../assets/otpscreen.png')}
    //         style={{ width: "100%", height: 290, alignSelf: "center" }}
    //         resizeMode='cover'>
    //         <View style={{ width: "100%", backgroundColor: "#B7547F", marginTop: 200 }}>
    //           <Text style={{ padding: 20, alignSelf: "center", color: "white", fontSize: 19, fontWeight: "600" }}>Check your Inbox</Text>
    //           <Text style={{ alignSelf: "center", color: "white", fontSize: 24, fontWeight: "900" }}>OTP sent Successfully</Text>
    //           <TouchableOpacity
    //             onPress={() => [navigation.navigate('OtpValidation', { email: email }), setIsVisible(false)]} >
    //             <Text style={{ backgroundColor: "white", marginTop: 50, margin: 15, marginLeft: 330, color: "black", alignSelf: "center", padding: 3, fontWeight: "700" }}>OK</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </ImageBackground>


    //     </View>
    //   </Modal>


    // </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20,
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
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
},
);

export default ForgotPasswordScreen;