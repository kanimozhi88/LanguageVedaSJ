import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import 'moment-timezone'
import Timmer from '../../component/Timmer';
import { getAccessToken } from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../apiConfig';
import moment from 'moment-timezone';

const MyCourses = () => {

  const navigation = useNavigation();
  const LastName = useSelector(state => state.LastName);
  const recordId = useSelector(state => state.recordId);
  const recordType = useSelector(state => state.recordType);
  const [refreshCount, setRefreshCount] = useState(0);
  const [notificationcount, setNotificationCount] = useState('');
  const [announcementCount, setAnnouncementCount] = useState('');
  const [toggleVal, setToggleVal] = useState(true);
  const [notifyClick,setNotifyClick] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      // Increment the refreshCount to trigger a re-render
      setRefreshCount(refreshCount + 1);
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [refreshCount]); // Re-run the effect whenever refreshCount changes


  useEffect(() => {
    NotificationsApi();
    NotificationsAnnouncementApi();

  }, [])

  useEffect(() => {
    const fetchToggleSwitchValue = async () => {
      const value = await getToggleSwitchValue();
      if(value !== null){
        setToggleVal(value);
      }else{
        setToggleVal(true)
      }
    };
    const fetchNotifyClickValue = async () => {
      const value = await getNotifyClickValue();
      setNotifyClick(value);
    };

    fetchToggleSwitchValue();
    fetchNotifyClickValue();
    getNotifyClickValue();
  },);

 

  const getToggleSwitchValue = async () => {
    try {
      const value = await AsyncStorage.getItem('toggleSwitchValue');
      if (value !== null) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const getNotifyClickValue = async () => {
    try {
      const value = await AsyncStorage.getItem('notificationClick');
      if (value !== null) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      return null;
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
    console.log("NotificationsApi",  NotificationsApi);
    const currentDate = new Date().toISOString();
    let count = 0;

    JSON.parse(NotificationsApi).forEach(announcement => {
      if (moment(announcement.CreatedDate).format('YYYY-MM-DD') === moment(currentDate).format('YYYY-MM-DD')) {
        count++;
      }
    });
    setNotificationCount(count)
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
    const currentDate = new Date().toISOString();
    let count = 0;

    NotificationsAnnounceApi.forEach(announcement => {
      if (moment(announcement.CreatedDateTime).format('YYYY-MM-DD') === moment(currentDate).format('YYYY-MM-DD')) {
        count++;
      }
    });
    setAnnouncementCount(count)
  }

  const notification = notificationcount + announcementCount;


  const handleMycoursesPress = () => {
    navigation.navigate('StudentMyCourses');
  };


  return (

    <View style={{ flex: 1, backgroundColor: "white" }}>

      <View style={styles.nameViewStyle}>
        <Text style={{ fontSize: 18 }}>Hello,<Text style={styles.nameStyle}>{LastName}</Text></Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            disabled={!toggleVal}
            onPress={() => navigation.navigate('Notifications')}
            style={{ marginRight: 5 }}>
            <View style={{ flexDirection: "row" }}>
              {toggleVal ?
                <Image source={require('../../assets/Notification.png')}
                  style={styles.notificationImage} />
                :
                <Image source={require('../../assets/notificationDisable.png')}
                  style={styles.notificationImage} />
              }

              {notification > 0  && !notifyClick && toggleVal ?
                <Text style={{ right: 15, bottom: 15, backgroundColor: "#e01d85", fontWeight: "500", color: "white", width: 22, height: 22, borderRadius: 12.5, alignSelf: "center", textAlign: "center" }}>{notification}</Text>
                : null} 
            </View>
          </TouchableOpacity>

        </View>

      </View>

      {recordType == "Student" ?
        <Timmer recordId={recordId} />
        : recordType == "Faculty" ?
          <Timmer recordId={recordId} />
          : null
      }

      {recordType == "Student" ?
        <View style={styles.container}>
          <View style={styles.row}>

            <TouchableOpacity style={styles.rectangle} onPress={handleMycoursesPress}>
              <View style={[styles.image, { backgroundColor: "#e01d85" }]}>
                <Image source={require('../../assets/mycourses.png')}
                  style={styles.imageStyle} />
              </View>
              <Text style={[styles.text, { fontWeight: "700" }]}>My Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} >
              <View style={[styles.rectimage, { backgroundColor: "#e01d85" }]}>
                <Image source={require('../../assets/billing.png')}
                  style={styles.imageStyle} />
              </View>
              <Text style={[styles.text, { fontWeight: "500", marginBottom: 15, margin: 50 }]}>Billing</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.row}>

            <TouchableOpacity style={styles.rectNew} onPress={() => navigation.navigate('VideoAssets')}>
              <View style={[styles.image, { backgroundColor: "#e01d85" }]}>
                <Image source={require('../../assets/Videoassets.png')}
                  style={styles.imageStyle} />
              </View>
              <Text style={[styles.text, { fontWeight: "600" }]}>Video Assets</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('StudentAssessment')}
              style={[styles.rectangle, { marginLeft: 20 }]}
            >
              <View style={[styles.image, { backgroundColor: "#e01d85", marginBottom: 10 }]}>
                <Image source={require('../../assets/Schedule.png')}
                  style={styles.imageStyle} />
              </View>
              <Text style={[styles.text, { fontWeight: "700" }]}>Assessment</Text>
            </TouchableOpacity>

          </View>

        </View>

        : recordType == "Faculty" ?

          <View style={styles.container}>
            <View style={styles.row}>

              <TouchableOpacity style={styles.rectangle} onPress={() => navigation.navigate('FacultyBatches')}>
                <View style={[styles.image, { backgroundColor: "#e01d85" }]}>
                  <Image source={require('../../assets/mycourses.png')}
                    style={styles.imageStyle} />
                </View>
                <Text style={[styles.text, { fontWeight: "700" }]}>My Class</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('VideoAssets')}
                style={styles.square} >
                <View style={[styles.rectimage, { backgroundColor: "#e01d85" }]}>
                  <Image source={require('../../assets/billing.png')}
                    style={styles.imageStyle} />
                </View>
                <Text style={[styles.text, { fontWeight: "500", marginBottom: 15, margin: 50 }]}>Video Assets</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.row}>

              <TouchableOpacity style={styles.rectNew} >
                <View style={[styles.image, { backgroundColor: "#e01d85" }]}>
                  <Image source={require('../../assets/Videoassets.png')}
                    style={styles.imageStyle} />
                </View>
                <Text style={[styles.text, { fontWeight: "600" }]}>Help Center</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.rectangle, { marginLeft: 20 }]}
                onPress={() => navigation.navigate('FacultyRevision')}           >
                <View style={[styles.image, { backgroundColor: "#e01d85", marginBottom: 10 }]}>
                  <Image source={require('../../assets/Schedule.png')}
                    style={styles.imageStyle} />
                </View>
                <Text style={[styles.text, { fontWeight: "700" }]}>Revision</Text>
              </TouchableOpacity>

            </View>

          </View>

          : recordType == "Parent" ?
            <View style={styles.container}>
              <View style={styles.row}>

                <TouchableOpacity style={styles.rectangle} >
                  <View style={[styles.image, { backgroundColor: "#e01d85" }]}>
                    <Image source={require('../../assets/mycourses.png')}
                      style={styles.imageStyle} />
                  </View>
                  <Text style={[styles.text, { fontWeight: "700" }]}>Courses</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.rectangle} >
                  <View style={[styles.image, { backgroundColor: "#e01d85" }]}>
                    <Image source={require('../../assets/billing.png')}
                      style={styles.imageStyle} />
                  </View>
                  <Text style={[styles.text, { fontWeight: "500", }]}>Schedule</Text>
                </TouchableOpacity>

              </View>

              <View style={styles.row}>

                <TouchableOpacity style={styles.rectangle} >
                  <View style={[styles.image, { backgroundColor: "#e01d85" }]}>
                    <Image source={require('../../assets/Videoassets.png')}
                      style={styles.imageStyle} />
                  </View>
                  <Text style={[styles.text, { fontWeight: "600" }]}>Billing</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.rectangle, { marginLeft: 20 }]}
                >
                  <View style={[styles.image, { backgroundColor: "#e01d85", marginBottom: 10 }]}>
                    <Image source={require('../../assets/Schedule.png')}
                      style={styles.imageStyle} />
                  </View>
                  <Text style={[styles.text, { fontWeight: "700" }]}>Help Center</Text>
                </TouchableOpacity>

              </View>

            </View>
            : <View></View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  },
  nameViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
    margin: 10
  },
  nameStyle: {
    color: "black",
    fontSize: 20
  },
  notificationImage: {
    width: 30,
    height: 30
  },
  row: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#999999',
    marginVertical: 10,
  },
  square: {
    width: 170,
    height: 170,
    margin: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
  },
  rectangle: {
    width: 170,
    height: 130,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
  },
  rectNew: {
    width: 170,
    height: 170,
    margin: 10,
    bottom: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 40,
    marginLeft: 8
  },
  rectimage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8

  },
  imageStyle: {
    width: 30, height: 30,
    margin: 10

  },
  textBig: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontWeight: "900", color: "#e01d85"
  },
  usertxt: {
    color: "#ae0ff2",
    fontSize: 17,
    marginLeft: "10%",
    padding: 10
  }
});

export default MyCourses;
