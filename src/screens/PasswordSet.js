import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, alert, Image, ImageBackground,Dimensions } from "react-native";
import { getAccessToken } from '../../redux/actions';
import { useNavigation } from '@react-navigation/native';



const PasswordSet = ({ route }) => {

  const navigation = useNavigation();
  const [password, setPasword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState('');
  const [error, setError] = useState('')
  const [enable,isEnable] = useState(false);
  const email = route.params.email;
  const Otp = route.params.code;
  const data = route.params;

  const handleParentPasswordChange = (text) => {
    setPasword(text);
    setIsValid(validatePassword(text));
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password)
  }

  const validateRes = () => {
    console.log("inside")
    if (password.length > 0 && confirmPassword.length > 0) {
      console.log("calling function")
     isEnable(true)
      PasswordSetApi();
    } else {
      setError('Fied cant be empty')
      console.log(" NOT calling function")
    }
  }
  console.log("email, otp,", email,password,Otp);
  
  const PasswordSetApi = async () => {
    let data = {};
    data.email = email;
    data.newPassword = password;
    data.Otp = Otp
    // data.contactid = dataFetchApi;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    console.log("TOKEN IS", token);
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/updateContactPasswordByEmail`, {
      method: 'PATCH',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let PasswordSetApiResult = await response.json()


    console.log("PASSWORD SET API RESULT :::", PasswordSetApiResult)
    const JsonApiPasswordRes = JSON.parse(PasswordSetApiResult);
    if (JsonApiPasswordRes?.Status === 'Success') {
      Alert.alert(
        "Successfull",
        "Password updated successfully",
        [{ text: 'OK', onPress: () => navigation.navigate('LoginScreen') }]
      );
    }
  }


  return (
    <View style={{flex:1,backgroundColor:"white"}}>
       <Image source={require('../../assets/Rectanglebackground.png')}
        style={{ width: Dimensions.get('window').width, height: "40%", }}
        resizeMode='stretch'
      >
      
      </Image>
      <Image source={require('../../assets/whitelogo.png')}
          style={{ alignSelf: "center",position:"absolute",height:"30%",width:"70%" }}
          resizeMode='contain' />
          
      <View style={{bottom:30 }}>
        <Text style={{ color: "#b8328f", fontSize: 25, fontWeight: "bold",marginHorizontal:20 }}>Create Password!</Text>

        <Text style={{ color: "black", marginTop: 15,marginHorizontal:20 }}>New password</Text>
        <View style={{ alignSelf:"center",marginLeft:5,flexDirection: "row", backgroundColor: "white", marginTop: 5, borderWidth: 1, borderColor: "lightgray", width: "90%", borderRadius: 10 }} >

          <TextInput
            value={password}
            onChangeText={text => handleParentPasswordChange(text)}
            style={styles.textInputStyle} />
          <Image
            source={require('../../assets/orangeye.jpeg')}
            style={{ marginHorizontal:160, height: 45,width:45,alignSelf:"center" }}
          />
        </View>
        {error !== '' && password === '' ? (
          <Text style={{ color: "red",marginHorizontal:20 }}>Field cant be Empty</Text>
        ) : null}

        {!isValid && password.length > 0 ? (
          <Text style={{ color: "red", fontSize: 13, marginHorizontal: 20,marginTop:5 }}>Password must contain 8 characters, 1 uppercase,1 lowercase, 1 number and 1 special character</Text>
        ) : null}

        <Text style={{ marginTop: 20, color: "black", marginHorizontal:20 }}>Confirm password</Text>
        <View style={{alignSelf:"center", marginLeft:5,flexDirection: "row", backgroundColor: "white", marginTop: 5, borderWidth: 1, borderColor: "lightgray", width: "90%",  borderRadius: 10 }} >

          <TextInput
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.textInputStyle} />
          <Image
            source={require('../../assets/orangeye.jpeg')}
            style={{ width: 45, height: 45,marginHorizontal:160,alignSelf:"center" }}
          />
        </View>
        {error !== '' && confirmPassword === '' ? (
          <Text style={{ color: "red",marginHorizontal:20,marginTop:5 }}>Field cant be Empty</Text>
        ) : null}

        {password != confirmPassword && confirmPassword.length > 0 ? <Text style={{ color: "red", marginHorizontal:20,marginTop:5 }}> Password didn't match</Text> : null}

      </View>
      <TouchableOpacity
        onPress={() => validateRes()}
        style={{backgroundColor: error !== '' && confirmPassword === '' && password == '' ? "lightgray":"orange", width: "90%",height:50, borderRadius: 10, alignSelf:"center" }}>
        <Text style={{ alignSelf: "center", padding: 10, color: "white", fontWeight: "600", fontSize: 19 }}>
          Log In
        </Text>
      </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: "40%",
    backgroundColor: "white",

    // borderRadius:30,
    marginTop: 10,
    // paddingHorizontal:30
  }
})
export default PasswordSet;