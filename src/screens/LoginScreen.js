import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, ImageBackground ,KeyboardAvoidingView,Dimensions,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken, getLoginStatus, getProfilePhotoMethod } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getDataMethod, getLastNameMethod, getCourseApiResult, getEmailMethod, getPhoneMethod, getRecordType } from '../../redux/actions';
import ForgotPasswordScreen from './ForgotPasswordScreen';
// import SvgUri from 'react-native-svg-uri';


//import CloudImg from '../../assets/cloudImg.png'
const LoginScreen = ({ route }) => {

  const dispatch = useDispatch();
  const recordType = useSelector(state => state.recordType);
  console.log("RecordType is::::", recordType);
  const [Phone, setMobileNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const restrictedPattern = /^[a-zA-Z0-9]*$/;

  const handleMobileNumberChange = (text) => {
    // if(restrictedPattern.test(text)){
    setMobileNumber(text);
    // setError('');
    // }else{
    //   setError("Special characters are not allowed");
    // }
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };


  const ValidateInput = () => {
    if (!Phone) {
      setError("Please fill  mobile number.");
      return false;
    }
    // if (birthDate.length !== 8) {
    //   setError("Invalid date of birth format. Please use DDMMYYYY format.");
    //   return false;
    // }
    if (Phone.length !== 10) {
      setError("Invalid mobile number format. Please enter a valid 10-digit mobile number.");
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
            onPress: () => navigation.navigate('OtpValidation',{email:Phone}),
          },
        ]
      );
    }
  }


  const handleSubmit = async () => {
    let data = {};
    // data.Type = "contact";
    data.Email = Phone;
    data.Password = Password;
    // data.recordType = recordType;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    console.log('token........>' + token);
    console.log('body...>' + JSON.stringify(body));
    const bearer = 'Bearer ' + token;
    console.log('bearer------>' + bearer);
    console.log(JSON.stringify(token));
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/v1/search-records/`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let result = await response.json()

    console.log("login api response is", result);
    dispatch(getDataMethod(result?.Result?.recordId));
    dispatch(getLoginStatus(result?.Result?.status));
    dispatch(getRecordType(result?.Result?.recordType));
    dispatch(getLastNameMethod(result?.Result?.LastName));
    dispatch(getEmailMethod(result?.Result?.Email));
    dispatch(getPhoneMethod(result?.Result?.Phone));
    dispatch(getProfilePhotoMethod(result?.Result?.profilePhoto));

    console.log(JSON.stringify(result));
    if (result.Result.status === "Success" && result) {

      // navigation.navigate('MyCourses', { recordType: result.Result.recordType, recordId: result.Result.recordId,LastName:result.Result.LastName });
      console.log('SUCCESS');
    }
    else {
      alert('if you are not registered  please do sign up');
    }
  }

  return (

    <View style={styles.container}>
      <Image source={require('../../assets/Rectanglebackground.png')}
        style={{ width: Dimensions.get('window').width, height: "40%", }}
        resizeMode='stretch'
      >
      
      </Image>
      <Image source={require('../../assets/whitelogo.png')}
          style={{ alignSelf: "center",position:"absolute",height:"30%",width:"70%" }}
          resizeMode='contain' />
      
      <View style={{ justifyContent: "center",bottom:15  }}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={{ color: "#b8328f", fontSize: 25, fontWeight: "bold", marginHorizontal:20}}>Welcome!</Text>
        <Text style={{ fontSize: 16,  marginHorizontal:20 }}>Log In To Continue</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "black", marginHorizontal:20 }}>User Id</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mail address"
            // keyboardType="number-pad"
            onChangeText={text => handleMobileNumberChange(text)}
            value={Phone}
          />
          {error !== '' && <Text>{error}</Text>}

          <Text style={{ color: "black", marginHorizontal:20,marginTop:10 }}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => handlePasswordChange(text)}
            value={Password}
          />
        </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => {
            if( Phone !== ''){
              // navigation.navigate('ForgotPasswordScreen')
              // <ForgotPasswordScreen email={Phone}/>
              OTPApiRequest(Phone);
              
          }else
          alert("Please enter valid user Id")
        }}
        >
          <Text style={{ marginTop: 5, alignSelf: "center" }}>Forgot password? </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={{ backgroundColor: "orange", width: "90%", height: 50, borderRadius: 10, alignSelf: "center",marginTop:10 }}
          onPress={() => handleSubmit()}
        // onPress={() => navigation.navigate('MyCourses')}
        >
          <Text style={{ color: "white", alignSelf: "center", fontWeight: "bold", padding: 10, fontSize: 16,textAlignVertical:"center",height:50 }}>Log In</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
        onPress={()=>  navigation.navigate('RegisterScreen')}
         style={{marginTop:10,padding:20,alignSelf:"center"}}>
          <Text>Register</Text>
        </TouchableOpacity> */}

      </View>


    </View>
  );
}


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

export default LoginScreen;