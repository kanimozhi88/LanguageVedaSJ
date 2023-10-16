import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WebView from 'react-native-webview';
import { getDataMethod,getLoginOtpStatus } from '../../redux/actions';
import ToggleSwitch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MyProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  // const ToggleSwitch = useSelector(state => state.toggleSwitch);
  // console.log("dispatched value",toggleSwitch)
  const LastName = useSelector(state => state.LastName);
  const Email = useSelector(state => state.Email);
  const [imagePath, setImagePath] = useState('');
  const userrecordId = useSelector(state => state.recordId);
  const Status = useSelector(state => state.status);
  const [toggleSwitch, setToggleSwitch] = useState(true);
  const [matches,setMatches] = useState('');


  const profilePhoto = useSelector(state => state.profilePhoto);
  const urlRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/i;
  // if(profilePhoto !== null){
  //   setMatches(profilePhoto.match(urlRegex))
  // }
  // const matches = profilePhoto.match(urlRegex);
 

  useEffect(() => {
    if(profilePhoto !== null){
    setMatches(profilePhoto.match(urlRegex))
  }
    if (matches && matches.length === 2) {
      const url = matches[1];
      // setImagePath(url);
    }
  }, [])

  const saveToggleValueToAsyncStorage = async (isOn) => {
    try {
      await AsyncStorage.setItem('toggleSwitchValue', JSON.stringify(isOn));
      console.log('Toggle switch value saved to AsyncStorage: ', isOn);
    } catch (error) {
      console.error('Error saving toggle switch value: ', error);
    }
  };




  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flexDirection: "row", marginTop: "10%" }}>

        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "red", overflow: "hidden", marginHorizontal: "5%" }}>
          {imagePath !== '' ? 
          <WebView
            style={{ width: 100, height: 100, }}
            source={{ uri: imagePath }}
          />
          :
          <Image
          style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "red", overflow: "hidden",  }}
          source={require('../../assets/profileimage.png')}/>
          } 
        </View>

        <View style={{ marginTop: 40, }}>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>{LastName}</Text>
          <Text style={{ color: "#979797" }}>{Email}</Text>
        </View>
      </View>
      <View style={{ borderBottomWidth: 0.2, borderBottomColor: "white", elevation: 5, marginTop: 10 }} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={{ width: "90%", alignSelf: "center", marginTop: "15%", flexDirection: "row", }}>
        <Image
          source={require('../../assets/profilepic.png')}
          style={{ width: 25, height: 25, }} />
        <Text style={{ color: "#979797", fontSize: 16, fontWeight: "600", marginLeft: "5%" }}>
          Profile
        </Text>
        <Image
          style={{ height: 20, width: 20, marginLeft: "70%" }}
          source={require('../../assets/graysidearrow.png')} />
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 0.2, borderBottomColor: "#979797", margin: 5 }} />

      <TouchableOpacity
        onPress={() => navigation.navigate('ProfilePasswordChange')}
        style={{ width: "90%", alignSelf: "center", flexDirection: "row", margin: 5 }}>
        <Image
          source={require('../../assets/passwordchange.png')}
          style={{ width: 25, height: 25, }} />
        <Text style={{ color: "#979797", fontSize: 16, fontWeight: "600", marginLeft: "5%" }}>
          Change Password
        </Text>
        <Image
          style={{ height: 20, width: 20, marginLeft: "48%" }}
          source={require('../../assets/graysidearrow.png')} />
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 0.2, borderBottomColor: "#979797", margin: 5 }} />

      <TouchableOpacity style={{ width: "90%", alignSelf: "center", flexDirection: "row", margin: 5 }}>
        <Image
          source={require('../../assets/notificationgray.png')}
          style={{ width: 25, height: 25, }} />
        <Text style={{ color: "#979797", fontSize: 16, fontWeight: "600", marginLeft: "5%" }}>
          Notification
        </Text>

        <ToggleSwitch
         style={{marginHorizontal:"52%"}}
          isOn={toggleSwitch}
          onColor="green"
          offColor="#999999"
          size="medium"
          onToggle={isOn => [setToggleSwitch(isOn), 
            saveToggleValueToAsyncStorage(isOn)
            //  dispatch(getToggleResponse(toggleSwitch))
          ]}
        />

      </TouchableOpacity>
      <View style={{ borderBottomWidth: 0.2, borderBottomColor: "#979797", margin: 5 }} />

      <TouchableOpacity
        onPress={() => [
          dispatch(getDataMethod('')),
          dispatch(getLoginOtpStatus('')),

          // dispatch(getLoginStatus('')),
          console.log("recordId profile", userrecordId, Status)]}
        style={{ flexDirection: "row", alignSelf: "center", marginTop: "15%" }}>
        <Image
          source={require('../../assets/logout.png')}
          style={{ width: 25, height: 25, }} />
        <Text style={{ color: "#979797", fontSize: 16, fontWeight: "600", marginLeft: 5 }}>Log Out</Text>
      </TouchableOpacity>

    </SafeAreaView>

  )
}
export default MyProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // marginTop:10,
    // paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
})