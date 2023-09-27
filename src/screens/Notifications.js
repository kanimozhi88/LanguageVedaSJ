import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Platform, PermissionsAndroid, StyleSheet, SafeAreaView, ImageBackground, Alert, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { getAccessToken } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import TruncatedText from '../../component/TruncatedText';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BASE_URL from '../../apiConfig';

// import RNFetchBlob from 'react-native-fetch-blob';



const Notifications = ({ navigation, route }) => {

  // const [count,SetCount] = useState(0);
  const dataFetchApi = useSelector(state => state.recordId);
  const [final, setFinal] = useState('');
  const [retrievedData, setRetrievedData] = useState('');
  const [erroemsg, setErrorMsg] = useState('');
  const Normaloptions = ['Camera', 'Gallery', 'Document/pdf'];
  const actionSheetRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [images, setImages] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);
  const [uploadApi, setUploadApi] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const recordId = useSelector(state => state.recordId);
  const [announceRes,setAnnounceRes] = useState('');
  const scrollViewRef = useRef(null);



  useEffect(() => {
    NotificationsApi();
    NotificationsAnnouncementApi();
    saveNotificationClickAsyncStorage();

  }, [])

  const saveNotificationClickAsyncStorage = async (isOn) => {
    try {
      await AsyncStorage.setItem('notificationClick', JSON.stringify(true));
      console.log('Notification click ', true);
    } catch (error) {
      console.error('Notification click error: ', error);
    }
  };

  const NotificationsApi = async () => {
    let data = {};
    data.contactId = recordId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`${BASE_URL}/services/apexrest/rnStudentNotification`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let NotificationsApi = await response.json()
    console.log("NotificationsApi", JSON.parse(NotificationsApi));
    const val = JSON.parse(NotificationsApi);
    setFinal(val);

  }

  const NotificationsAnnouncementApi = async () => {

    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`${BASE_URL}/services/apexrest/RNAnnouncement`, {
      method: 'GET',
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": bearer
        }),

    });
    let NotificationsAnnounceApi = await response.json()
    console.log("NotificationsAnnounceApi", NotificationsAnnounceApi);
    // const val = JSON.parse(NotificationsAnnounceApi);
    setAnnounceRes(NotificationsAnnounceApi)
  }

  const AssignmentItem = ({ assignment , type }) => {
    const [showMessage, setShowMessage] = useState(false);

    const toggleMessage = () => {
      setShowMessage(!showMessage);
    };

    return (
      <View style={{width:"90%",alignSelf:"center",}}>
        <TouchableOpacity onPress={toggleMessage} style={{ backgroundColor: "#00000", borderRadius: 15, borderWidth: 1, borderColor: "#fffff", padding: 10, marginBottom: 10 }}>
          <View style={{ flexDirection: "row" ,justifyContent:"space-between"}}>
            <Text style={{ color: "#1B2236", fontWeight: "600", fontSize: 12,}}>{ type == "announcement" ?  assignment?.AnnouncementTitle : assignment?.Title}</Text>
            <Text style={{ color: "#1B2236", fontWeight: "600", fontSize: 12,}}>{type == "announcement" ?  assignment?.AnnouncementDate : assignment?.TimeStamp}</Text>
          </View>
          {showMessage && (
            <View style={{marginTop:5}}>
              <Text style={{ color: "#f07241", fontWeight: "600", fontSize: 12,}}>{type == "announcement" ? assignment?.AnnouncementMessage : assignment.Message}</Text>
            </View>
          )}

        </TouchableOpacity>

      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10 }}>
          <Image
            source={require('../../assets/orangebackarrow.jpg')}
            style={{ width: 40, height: 40, alignSelf: "center" }} />
        </TouchableOpacity>
        <Text style={{ color: "#1B2236", fontWeight: "600", fontSize: 16, marginLeft: 100, margin: 10 }}>Notification</Text>
      </View>

      <ScrollView ref={scrollViewRef}>

        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ color: "#1B2236", fontWeight: "600", fontSize: 16, marginTop: 20,marginBottom:15 }}>Notifications</Text>
        </View>

       <View>
       {final !== '' ?
        final.map((item, index) => (
          <AssignmentItem key={index} assignment={item} type= "notification"/>
        ))
        : null}
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ color: "#1B2236", fontWeight: "600", fontSize: 16, marginTop: 20,marginBottom:15 }}>Announcement</Text>
        </View>

        <View style={{marginBottom:"30%"}}>
       {announceRes !== '' ?
        announceRes.map((item, index) => (
          <AssignmentItem key={index} assignment={item} type= "announcement" />
        ))
        : null}
        </View>


      </ScrollView>



    </SafeAreaView>
  )
}
export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // bottom:7
  },
})