import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
// import { NativeModules } from 'react-native';
// const {CalendarModule} = NativeModules;
// console.log(CalendarModule);
// CalendarModule.CreateCalendarEvent(res => console.log(res));
// import { } from 'react-native-gesture-handler';


const CommunityScreen = ({ navigation }) => {
  const HandleLogin = () => {
    // navigation.navigate('LoginScreen');
  }
  const HandleRegister = () => {
    navigation.navigate('RegisterScreen');
  }
  const HandleForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  }
  return (
    <View style={styles.container}>


      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => HandleLogin()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => HandleRegister()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.border} />
      {/* Add other content of your page here */}
      <View>
        <TouchableOpacity onPress={() => HandleForgotPassword()}>
          <Text>ForgotPassword</Text>
        </TouchableOpacity>
      </View>

      
    </View>


  );
};

const styles = StyleSheet.create({
  container: {

  },
  buttonsContainer: {
    flexDirection: 'row',
    color: 'purple',
    justifyContent: 'flex-end',
    margin: 10,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 25
  },
  border: {
    borderBottomWidth: 2,
    borderBottomColor: 'Red',

    margin: 15,
  },
});

export default CommunityScreen;

// import React from 'react';
// import {View,Text,ScrollView} from 'react-native';

// const CommunityScreen = ({navigation}) => {
//     return (
//         <ScrollView>
//             <Text>LANGUAGE VEDA</Text>
//             <Text>Community screen</Text>
//         </ScrollView>
//     )
// }

// export default CommunityScreen;
