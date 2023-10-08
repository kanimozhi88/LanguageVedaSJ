import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image, KeyboardAvoidingView, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken, getLoginOtpStatus, getLoginStatus, getProfilePhotoMethod } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getDataMethod, getLastNameMethod, getCourseApiResult, getEmailMethod, getPhoneMethod, getRecordType } from '../../redux/actions';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import OTPTextView from 'react-native-otp-textinput';
import BASE_URL from '../../apiConfig';
import { Appearance, useColorScheme } from 'react-native';

const LoginScreen = ({ route }) => {

  const colorScheme = useColorScheme();
  const inputTextColor = colorScheme === 'dark' ? 'white' : 'black';
  const inputBackgroundColor = colorScheme === 'dark' ? 'black' : 'white';

  const dispatch = useDispatch();
  const recordType = useSelector(state => state.recordType);
  const otpInputRef = useRef(null);


  console.log("RecordType is::::", recordType);
  const [Phone, setMobileNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [recordId, setRecordId] = useState('');
  const [errors, setErrors] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [otpTextShow, setOtpTextShow] = useState(true);

  const restrictedPattern = /^[a-zA-Z0-9]*$/;

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleError = error => {
    setErrors(error);
  };
  const storeIntoNumeric = () => {
    const codeFormatted = parseInt(`${one}${two}${Three}${four}${five}${six}`);
    console.log("SAVED OTP IS", inputOtp);
    if (inputOtp !== '' && inputOtp.length >= 4) {
      navigation.navigate('PasswordSet', { email: email, code: inputOtp })
    }
    else {
      setErrorMessage("Please Enter OTP")
    }
  }


  const OTPApiRequest = async (email) => {
    let data = {};
    data.email = email;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    console.log("token needed is::", token);
    const response = await fetch(`${BASE_URL}/services/apexrest/updateContactOTPByEmail`, {
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
      Alert.alert(
        'OTP sent successfully',
        'Sent successfully',
        [
          {
            text: 'OK',
            // onPress: () => navigation.navigate('OtpValidation', { email: Phone }),
            onPress: () => handleOTP()
          },
        ]
      );
    }
  }




  const handleSubmitForOtp = async () => {
    let data = {};
    data.Email = Phone;
    data.Password = Password;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    console.log('token........>' + token);
    console.log('body...>' + JSON.stringify(body));
    const bearer = 'Bearer ' + token;
    console.log('bearer------>' + bearer);
    console.log(JSON.stringify(token));
    const response = await fetch(`${BASE_URL}/services/apexrest/v1/search-records/`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let result = await response.json()
    setRecordId(result?.Result?.recordId);
    if (result.Result.status === "Success" && result) {
      Alert.alert(
        'OTP sent successfully',
        'OTP sent successfully to registered Mail Id',
        [
          {
            text: 'OK',
            // onPress: () => navigation.navigate('OtpValidation', { email: Phone }),
            onPress: () => [setShowOtp(true), setOtpTextShow(false), otpInputRef.current.focus()]

          },
        ]
        
      );
    }
    else {
      alert('if you are not registered  please do sign up');
    }

    console.log("login api response is", result);
    dispatch(getDataMethod(result?.Result?.recordId));
    dispatch(getLoginStatus(result?.Result?.status));
    dispatch(getRecordType(result?.Result?.recordType));
    dispatch(getLastNameMethod(result?.Result?.LastName));
    dispatch(getEmailMethod(result?.Result?.Email));
    dispatch(getPhoneMethod(result?.Result?.Phone));
    dispatch(getProfilePhotoMethod(result?.Result?.profilePhoto));

    console.log(JSON.stringify(result));



  }



  const handleOTP = async () => {
    let data = {};
    data.contactId = recordId;
    data.otp = Password;


    const body = JSON.stringify(data)
    const token = await getAccessToken();
    console.log('token........>' + token);
    console.log('body...>' + JSON.stringify(body));
    const bearer = 'Bearer ' + token;
    console.log('bearer------>' + bearer);
    console.log(JSON.stringify(token));
    const response = await fetch(`${BASE_URL}/services/apexrest/verifyotp`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let result = await response.json()

    console.log("OTP api response is", result);
    dispatch(getLoginOtpStatus(result?.status));
    if (result.status === "Error" && result) {
      Alert.alert(
        'Invaldi OTP',
        'Entered OTP is not valid, Please try again',
        [
          {
            text: 'OK',
            // onPress: () => navigation.navigate('OtpValidation', { email: Phone }),
            onPress: () => {
              setShowOtp(true);
              setOtpTextShow(false);
              setShowResend(true)
              // Use the ref to focus on the OTP input field
              otpInputRef.current.focus();
            }
          },
        ]
      );
    }
  }

  return (

    <View style={styles.container}>

      <Image source={require('../../assets/Rectanglebackground.png')}
        style={styles.logoImage}
        resizeMode='stretch'
      >
      </Image>

      <Image source={require('../../assets/whitelogo.png')}
        style={styles.iconImage}
        resizeMode='contain' />

      <View style={{ justifyContent: "center", bottom: 15 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.welcomeTxt}>Welcome!</Text>
          <Text style={styles.continueTxt}>Log In To Continue</Text>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.userIdTxt}>User Id</Text>
            <TextInput
            placeholderTextColor={"#1B2236"}
              style={[styles.input, { color: inputTextColor, 
                // backgroundColor: inputBackgroundColor 
              }]}
              placeholder="Enter User name"
              onChangeText={text => handleMobileNumberChange(text)}
              value={Phone}
            />

            {error !== '' && <Text>{error}</Text>}
            {otpTextShow ?
              <TouchableOpacity
                style={{ alignSelf: "center", borderBottomColor: "#F38216", borderBottomWidth: 1 }}
                onPress={() => handleSubmitForOtp()}>
                <Text style={{ color: "#F38216", fontSize: 12 }}>Send OTP</Text>
              </TouchableOpacity>
              : null}

            {/* <Text style={styles.passwordTxt}>Enter OTP</Text> */}
            {showOtp ?
              <TextInput
              placeholderTextColor={"#1B2236"}
                style={styles.input}
                placeholder="Enter OTP"
                secureTextEntry
                onChangeText={text => handlePasswordChange(text)}
                value={Password}
                ref={otpInputRef}
              />
              : null}

            {showResend ?
              <TouchableOpacity
                style={{ alignSelf: "center", borderBottomColor: "#F38216", borderBottomWidth: 1 }}
                onPress={() => handleSubmitForOtp()}>
                <Text style={{ color: "#F38216", fontSize: 12 }}>Resend OTP</Text>
              </TouchableOpacity>
              : null}

            {/* <Text style={{ marginTop: 15, fontSize: 12, marginHorizontal:5}}>Enter Your 4 Digit Number That send to +91******</Text>
            <OTPTextView
            //  style={{width:"80%"}}
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
            /> */}
          </View>
        </KeyboardAvoidingView>
        {/* <TouchableOpacity
          onPress={() => {
            if (Phone !== '') {
              OTPApiRequest(Phone);
            } else
              alert("Please enter valid user Id")
          }}
        >
          <Text style={styles.forgotPwd}>Forgot password? </Text>
        </TouchableOpacity> */}


        <TouchableOpacity
          disabled={Password ? false : true}
          style={[styles.logInView, { backgroundColor: Password ? "orange" : "gray" }]}
          onPress={() => handleOTP()}
        >
          <Text style={styles.logInTxt}>Log In</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  logoImage: {
    width: Dimensions.get('window').width,
    height: "40%",
  },
  iconImage: {
    alignSelf: "center",
    position: "absolute",
    height: "30%",
    width: "70%"
  },
  welcomeTxt: {
    color: "#b8328f",
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 20
  },
  continueTxt:
  {
    fontSize: 16,
    marginHorizontal: 20
  },
  userIdTxt: {
    color: "black",
    marginHorizontal: 20
  },
  passwordTxt: {
    color: "black",
    marginHorizontal: 20,
    marginTop: 10
  },
  forgotPwd: {
    marginTop: 5,
    alignSelf: "center"
  },
  logInView: {
    backgroundColor: "orange",
    width: "90%",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10
  },
  logInTxt: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    padding: 10,
    fontSize: 16,
    textAlignVertical: "center",
    height: 50
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
    backgroundColor: 'white', // Set the default background color
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignSelf: "center",
  },
});
export default LoginScreen;