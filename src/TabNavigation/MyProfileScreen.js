import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
// import RNFetchBlob from 'react-native-fetch-blob';
import WebView from 'react-native-webview';
import { CommonActions } from '@react-navigation/native';
import { getDataMethod } from '../../redux/actions';
import { getLoginStatus } from '../../redux/actions';


const MyProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const LastName = useSelector(state => state.LastName);
  const Email = useSelector(state => state.Email);
  const Phone = useSelector(state => state.Phone);
  const [imagePath, setImagePath] = useState('');
  const userrecordId = useSelector(state => state.recordId);
  const Status = useSelector(state => state.status);



  const profilePhoto = useSelector(state => state.profilePhoto);
  const urlRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/i;
  const matches = profilePhoto.match(urlRegex);

  useEffect(()=>{
    if (matches && matches.length === 2) {
      const url = matches[1];
      setImagePath(url);
      console.log("url>>>>", url); // Output: https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg
    } else {
      console.log("URL not found in the response.");
    }
  
  },[])

  console.log("profilephoto", profilePhoto)

  // Call the function to download and save the image
  useEffect(() => {
    // downloadAndSaveImage();

  }, [])

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flexDirection: "row", marginTop: "10%" }}>

        {/* {imagePath !== '' && <Image source={{ uri: imagePath }} style={styles.image} />} */}
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "red", overflow: "hidden", marginHorizontal: "5%" }}>
          <WebView
            style={{ width: 100, height: 100, }}
            source={{ uri: imagePath }}
          />
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
        <Image
          style={{ height: 20, width: 20, marginLeft: "60%" }}
          source={require('../../assets/graysidearrow.png')} />
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 0.2, borderBottomColor: "#979797", margin: 5 }} />

      <TouchableOpacity
        onPress={() => [
          //   dispatch(getDataMethod('')),
          // dispatch(getLoginStatus('')),
          console.log("recordId profile", userrecordId, Status)]}
        // onPress={() => {
        //   // Perform your logout logic here, clear any authentication tokens or user data

        //   // Reset the navigation stack to the "Login" screen in the "AuthStack" navigator
        //   navigation.dispatch(
        //     CommonActions.reset({
        //       index: 0,
        //       routes: [{ name: 'Login' }],
        //     })
        //   );
        // }}
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
})