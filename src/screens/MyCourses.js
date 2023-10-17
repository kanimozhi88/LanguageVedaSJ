import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import 'moment-timezone';
import Timmer from '../../component/Timmer';
import {getAccessToken} from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../apiConfig';
import moment from 'moment-timezone';
import {SvgXml} from 'react-native-svg';
import InterestedCourses from '../../component/InterestedCourses';
import BottomDrawer from '../../component/BottomDrawer';
import { SafeAreaView } from 'react-native-safe-area-context';

const courses = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM6 4H11V12L8.5 10.5L6 12V4Z" fill="white"/>
  </svg>
`;
const schedule = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6497 2C16.0742 1.99901 16.4099 2.32884 16.4109 2.76862L16.4119 3.51824C19.1665 3.73414 20.9862 5.6112 20.9891 8.48975L21 16.9155C21.0039 20.054 19.0322 21.985 15.8718 21.99L8.15189 22C5.0112 22.004 3.01482 20.027 3.01087 16.8796L3.00001 8.55272C2.99606 5.65517 4.75153 3.78311 7.50618 3.53024L7.50519 2.78061C7.5042 2.34083 7.83002 2.01 8.26445 2.01C8.69887 2.009 9.02469 2.33883 9.02568 2.77861L9.02666 3.47826L14.8914 3.47027L14.8904 2.77062C14.8894 2.33084 15.2152 2.001 15.6497 2ZM16.0525 16.1919H16.0426C15.5884 16.2029 15.2241 16.5837 15.234 17.0435C15.235 17.5032 15.6013 17.882 16.0555 17.892C16.5185 17.891 16.8937 17.5102 16.8927 17.0405C16.8927 16.5707 16.5165 16.1919 16.0525 16.1919ZM7.91691 16.1929C7.46274 16.2129 7.1073 16.5937 7.10828 17.0535C7.12902 17.5132 7.5042 17.8731 7.95837 17.8521C8.40366 17.8321 8.75811 17.4513 8.73738 16.9915C8.7275 16.5417 8.3612 16.1919 7.91691 16.1929ZM11.9847 16.1879C11.5305 16.2089 11.1761 16.5887 11.1761 17.0485C11.1968 17.5082 11.572 17.8671 12.0262 17.8471C12.4705 17.8261 12.8259 17.4463 12.8052 16.9855C12.7953 16.5367 12.429 16.1869 11.9847 16.1879ZM7.91197 12.5947C7.4578 12.6147 7.10335 12.9955 7.10433 13.4553C7.12408 13.915 7.50025 14.2749 7.95442 14.2539C8.39872 14.2339 8.75317 13.8531 8.73244 13.3933C8.72257 12.9435 8.35725 12.5937 7.91197 12.5947ZM11.9807 12.5597C11.5266 12.5797 11.1711 12.9605 11.1721 13.4203C11.1919 13.8801 11.568 14.2389 12.0222 14.2189C12.4665 14.1979 12.821 13.8181 12.8012 13.3583C12.7904 12.9085 12.425 12.5587 11.9807 12.5597ZM16.0485 12.5647C15.5944 12.5747 15.2389 12.9445 15.2399 13.4043V13.4153C15.2498 13.8751 15.625 14.2239 16.0801 14.2139C16.5244 14.2029 16.8789 13.8221 16.869 13.3623C16.8483 12.9225 16.4918 12.5637 16.0485 12.5647ZM14.8934 5.0095L9.02864 5.01749L9.02962 5.82609C9.02962 6.25687 8.70479 6.5967 8.27037 6.5967C7.83595 6.5977 7.50914 6.25887 7.50914 5.82809L7.50815 5.05847C5.58286 5.25138 4.51754 6.38281 4.52049 8.55072L4.52149 8.86157L19.4696 8.84158V8.49175C19.4272 6.34283 18.349 5.21539 16.4138 5.04748L16.4148 5.81709C16.4148 6.24688 16.0801 6.58771 15.6556 6.58771C15.2212 6.58871 14.8944 6.24888 14.8944 5.81909L14.8934 5.0095Z" fill="white"/>
</svg>
`;
const notifiSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7071 8.79633C18.7071 10.0523 19.039 10.7925 19.7695 11.6456C20.3231 12.2741 20.5 13.0808 20.5 13.956C20.5 14.8302 20.2128 15.6601 19.6373 16.3339C18.884 17.1417 17.8215 17.6573 16.7372 17.747C15.1659 17.8809 13.5937 17.9937 12.0005 17.9937C10.4063 17.9937 8.83505 17.9263 7.26375 17.747C6.17846 17.6573 5.11602 17.1417 4.36367 16.3339C3.78822 15.6601 3.5 14.8302 3.5 13.956C3.5 13.0808 3.6779 12.2741 4.23049 11.6456C4.98384 10.7925 5.29392 10.0523 5.29392 8.79633V8.3703C5.29392 6.68834 5.71333 5.58852 6.577 4.51186C7.86106 2.9417 9.91935 2 11.9558 2H12.0452C14.1254 2 16.2502 2.98702 17.5125 4.62466C18.3314 5.67916 18.7071 6.73265 18.7071 8.3703V8.79633ZM9.07367 20.0608C9.07367 19.5573 9.53582 19.3266 9.96318 19.2279C10.4631 19.1222 13.5093 19.1222 14.0092 19.2279C14.4366 19.3266 14.8987 19.5573 14.8987 20.0608C14.8738 20.5402 14.5926 20.9653 14.204 21.2352C13.7001 21.628 13.1088 21.8767 12.4906 21.9664C12.1487 22.0107 11.8128 22.0117 11.4828 21.9664C10.8636 21.8767 10.2723 21.628 9.76938 21.2342C9.37978 20.9653 9.09852 20.5402 9.07367 20.0608Z" fill="white"/>
</svg>`;
const helpCenter = `<svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9444 11.4978C15.6875 11.4978 18.8836 12.0912 18.8836 14.4658C18.8836 16.8395 15.708 17.4545 11.9444 17.4545C8.20129 17.4545 5.00519 16.8611 5.00519 14.4875C5.00519 12.1128 8.18077 11.4978 11.9444 11.4978ZM17.9292 10.0679C19.3602 10.0413 20.8987 10.2378 21.4671 10.3773C22.6715 10.6141 23.4637 11.0975 23.7919 11.8C24.0694 12.3767 24.0694 13.0458 23.7919 13.6215C23.2899 14.7111 21.6713 15.0608 21.0422 15.1512C20.9123 15.1709 20.8078 15.0579 20.8215 14.9272C21.1429 11.9081 18.5866 10.4766 17.9253 10.1474C17.8969 10.1327 17.8911 10.1101 17.894 10.0964C17.896 10.0865 17.9077 10.0708 17.9292 10.0679ZM6.07156 10.0683C6.09305 10.0712 6.1038 10.0869 6.10575 10.0958C6.10868 10.1105 6.10282 10.1321 6.07547 10.1478C5.4132 10.477 2.8569 11.9084 3.17827 14.9266C3.19195 15.0583 3.08841 15.1703 2.95849 15.1516C2.32943 15.0612 0.710868 14.7115 0.208792 13.6219C-0.0695972 13.0452 -0.0695972 12.3771 0.208792 11.8004C0.536997 11.0979 1.32821 10.6145 2.53261 10.3768C3.10208 10.2382 4.63957 10.0417 6.07156 10.0683ZM11.9444 0C14.4929 0 16.5363 2.05338 16.5363 4.61766C16.5363 7.18095 14.4929 9.2363 11.9444 9.2363C9.39592 9.2363 7.35244 7.18095 7.35244 4.61766C7.35244 2.05338 9.39592 0 11.9444 0ZM18.1783 0.770068C20.6398 0.770068 22.5729 3.09953 21.9145 5.69426C21.4701 7.44111 19.8613 8.60142 18.0689 8.55426C17.8891 8.54935 17.7123 8.53264 17.5414 8.50317C17.4173 8.48155 17.3548 8.34106 17.4251 8.23692C18.1089 7.22496 18.4986 6.00767 18.4986 4.70097C18.4986 3.33729 18.0728 2.06596 17.3333 1.02355C17.3099 0.991126 17.2923 0.94102 17.3157 0.903685C17.3353 0.873228 17.3714 0.857509 17.4056 0.849649C17.6547 0.79856 17.9106 0.770068 18.1783 0.770068ZM5.82101 0.76997C6.08866 0.76997 6.34458 0.798462 6.59464 0.849551C6.62785 0.85741 6.66497 0.874113 6.68451 0.903587C6.70697 0.940921 6.69037 0.991028 6.66692 1.02345C5.92748 2.06586 5.5016 3.33719 5.5016 4.70087C5.5016 6.00757 5.89134 7.22486 6.57511 8.23682C6.64544 8.34096 6.58292 8.48146 6.45887 8.50307C6.28695 8.53353 6.11112 8.54925 5.93139 8.55416C4.13896 8.60132 2.53016 7.44101 2.08572 5.69416C1.42638 3.09943 3.35947 0.76997 5.82101 0.76997Z" fill="white"/>
</svg>
`;
const forward = `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 1.75L6 6.25L1.5 1.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const MyCourses = () => {
  const navigation = useNavigation();
  const LastName = useSelector(state => state.LastName);
  const recordId = useSelector(state => state.recordId);
  const recordType = useSelector(state => state.recordType);
  const [refreshCount, setRefreshCount] = useState(0);
  const [notificationcount, setNotificationCount] = useState('');
  const [announcementCount, setAnnouncementCount] = useState('');
  const [toggleVal, setToggleVal] = useState(true);
  const [notifyClick, setNotifyClick] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // Increment the refreshCount to trigger a re-render
  //     setRefreshCount(refreshCount + 1);
  //   }, 2000); // 2000 milliseconds = 2 seconds

  //   // Clear the timer when the component unmounts
  //   return () => clearTimeout(timer);
  // }, [refreshCount]); // Re-run the effect whenever refreshCount changes

  useEffect(() => {
    NotificationsApi();
    NotificationsAnnouncementApi();
  }, []);

  useEffect(() => {
    const fetchToggleSwitchValue = async () => {
      const value = await getToggleSwitchValue();
      if (value !== null) {
        setToggleVal(value);
      } else {
        setToggleVal(true);
      }
    };
    const fetchNotifyClickValue = async () => {
      const value = await getNotifyClickValue();
      setNotifyClick(value);
    };

    fetchToggleSwitchValue();
    fetchNotifyClickValue();
    getNotifyClickValue();
  });

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

    const body = JSON.stringify(data);
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(
      `${BASE_URL}/services/apexrest/rnStudentNotification`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: bearer,
        }),
        body,
      },
    );
    let NotificationsApi = await response.json();
    console.log('NotificationsApi', NotificationsApi);
    const currentDate = new Date().toISOString();
    let count = 0;

    JSON.parse(NotificationsApi).forEach(announcement => {
      if (
        moment(announcement.CreatedDate).format('YYYY-MM-DD') ===
        moment(currentDate).format('YYYY-MM-DD')
      ) {
        count++;
      }
    });
    setNotificationCount(count);
  };

  const NotificationsAnnouncementApi = async () => {
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(
      `${BASE_URL}/services/apexrest/RNAnnouncement`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: bearer,
        }),
      },
    );
    let NotificationsAnnounceApi = await response.json();
    console.log('NotificationsAnnounceApi', NotificationsAnnounceApi);
    const currentDate = new Date().toISOString();
    let count = 0;

    NotificationsAnnounceApi.forEach(announcement => {
      if (
        moment(announcement.CreatedDateTime).format('YYYY-MM-DD') ===
        moment(currentDate).format('YYYY-MM-DD')
      ) {
        count++;
      }
    });
    setAnnouncementCount(count);
  };

  const notification = notificationcount + announcementCount;

  const handleMycoursesPress = () => {
    navigation.navigate('StudentMyCourses');
  };
  const openModal = () => {
    setIsVisible(true);
  };
  const toggleDrawer = () => {
    setIsVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.nameViewStyle}>
        {recordType == 'Parent' ? (
          <TouchableOpacity
            onPress={openModal}
            style={{flexDirection: 'row', alignItems: 'center', gap: 7}}>
            <Text style={{fontSize: 18}}>
              Hello,<Text style={styles.nameStyle}>{LastName}</Text>
            </Text>
            <SvgXml xml={forward} width="9" height="9" color="#000000" />
          </TouchableOpacity>
        ) : (
          <Text style={{fontSize: 18}}>
            Hello,<Text style={styles.nameStyle}>{LastName}</Text>
          </Text>
        )}
        <BottomDrawer isVisible={isVisible} toggleDrawer={toggleDrawer} />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            disabled={!toggleVal}
            onPress={() => navigation.navigate('Notifications')}
            style={{marginRight: 5}}>
            <View style={{flexDirection: 'row'}}>
              {toggleVal ? (
                <Image
                  source={require('../../assets/Notification.png')}
                  style={styles.notificationImage}
                />
              ) : (
                <Image
                  source={require('../../assets/notificationDisable.png')}
                  style={styles.notificationImage}
                />
              )}

              {notification > 0 && !notifyClick && toggleVal ? (
                <Text
                  style={{
                    right: 15,
                    bottom: 15,
                    backgroundColor: '#e01d85',
                    fontWeight: '500',
                    color: 'white',
                    width: 22,
                    height: 22,
                    borderRadius: 12.5,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {notification}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {recordType == 'Student' ? (
        <Timmer recordId={recordId} />
      ) : recordType == 'Faculty' ? (
        <Timmer recordId={recordId} />
      ) : null}

      {recordType == 'Student' ? (
        <View style={styles.fandsContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.fandsRectangle}
              onPress={handleMycoursesPress}>
              <View style={[styles.image, {backgroundColor: '#e01d85'}]}>
                <Image
                  source={require('../../assets/mycourses.png')}
                  style={styles.imageStyle}
                />
              </View>
              <Text style={[styles.fandsText, {fontWeight: '700'}]}>
                My Courses
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square}>
              <View style={[styles.rectimage, {backgroundColor: '#e01d85'}]}>
                <Image
                  source={require('../../assets/billing.png')}
                  style={styles.imageStyle}
                />
              </View>
              <Text
                style={[
                  styles.fandsText,
                  {fontWeight: '500', marginBottom: 15, margin: 50},
                ]}>
                Billing
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rectNew}
              onPress={() => navigation.navigate('VideoAssets')}>
              <View style={[styles.image, {backgroundColor: '#e01d85'}]}>
                <Image
                  source={require('../../assets/Videoassets.png')}
                  style={styles.imageStyle}
                />
              </View>
              <Text style={[styles.fandsText, {fontWeight: '600'}]}>
                Video Assets
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('StudentAssessment')}
              style={[styles.fandsRectangle]}>
              <View
                style={[
                  styles.image,
                  {backgroundColor: '#e01d85', marginBottom: 25},
                ]}>
                <Image
                  source={require('../../assets/Schedule.png')}
                  style={styles.imageStyle}
                />
              </View>
              <Text style={[styles.fandsText, {fontWeight: '700'}]}>
                Assessment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : recordType == 'Faculty' ? (
        <View style={styles.fandsContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.fandsRectangle}
              onPress={() => navigation.navigate('FacultyBatches')}>
              <View style={[styles.image, {backgroundColor: '#e01d85'}]}>
                <Image
                  source={require('../../assets/mycourses.png')}
                  style={styles.imageStyle}
                />
              </View>
              <Text style={[styles.fandsText, {fontWeight: '700'}]}>
                My Class
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('VideoAssets')}
              style={styles.square}>
              <View style={[styles.rectimage, {backgroundColor: '#e01d85'}]}>
                <Image
                  source={require('../../assets/billing.png')}
                  style={styles.imageStyle}
                />
              </View>
              <Text
                style={[
                  styles.fandsText,
                  {fontWeight: '500', marginBottom: 15, margin: 50},
                ]}>
                Video Assets
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.rectNew}>
              <View style={[styles.image, {backgroundColor: '#e01d85'}]}>
                <Image
                  source={require('../../assets/Videoassets.png')}
                  style={styles.imageStyle}
                />
              </View>
              <Text style={[styles.fandsText, {fontWeight: '600'}]}>
                Help Center
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.fandsRectangle]}
              onPress={() => navigation.navigate('FacultyRevision')}>
              <View style={[styles.image, {backgroundColor: '#e01d85'}]}>
                <Image
                  source={require('../../assets/Schedule.png')}
                  style={styles.imageStyle}
                />
              </View>
              <Text style={[styles.fandsText, {fontWeight: '700'}]}>
                Revision
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : recordType == 'Parent' ? (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Dear, Parent</Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ParentCourseSelect')}
              style={[styles.rectangle, {backgroundColor: '#FBA1B7'}]}>
              <View>
                <SvgXml
                  xml={courses}
                  width="30"
                  height="30"
                  style={styles.image}
                />
              </View>
              <Text style={[styles.text, {fontWeight: '700'}]}>Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Calender')}
              style={[styles.rectangle, {backgroundColor: '#78C1F3'}]}>
              <View>
                <SvgXml
                  xml={schedule}
                  width="30"
                  height="30"
                  style={styles.image}
                />
              </View>
              <Text style={[styles.text, {fontWeight: '500'}]}>Schedule</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              style={[styles.rectangle, {backgroundColor: '#9BE8D8'}]}>
              <View>
                <SvgXml
                  xml={notifiSvg}
                  width="30"
                  height="30"
                  style={[styles.image]}
                />
              </View>
              <Text style={[styles.text, {fontWeight: '600'}]}>
                Notification
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('HelpCenterScreen')}
              style={[styles.rectangle, {backgroundColor: '#A6D0DD'}]}>
              <View>
                <SvgXml
                  xml={helpCenter}
                  width="30"
                  height="30"
                  style={styles.image}
                />
              </View>
              <Text style={[styles.text, {fontWeight: '700'}]}>
                Help Center
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Courses you be Intrested</Text>
          </View>
          <View style={{flex: 1}}>
            <InterestedCourses />
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 15,
    flex: 1,
  },
  fandsContainer: {
    marginTop: 5,
  },
  titleContainer: {
    margin: 5,
    // marginLeft: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  nameViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
    margin: 10,
  },
  nameStyle: {
    color: 'black',
    fontSize: 20,
  },
  notificationImage: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    // marginLeft: 5,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#999999',
    marginVertical: 5,
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
    width: 175,
    height: 130,
    // margin: 10,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
  },
  fandsRectangle: {
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
    marginLeft: 8,
  },
  rectimage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
  imageStyle: {
    width: 30,
    height: 30,
    margin: 10,
  },
  textBig: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    fontWeight: '900',
    color: '#fcfcfc',
  },
  fandsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontWeight: '900',
    color: '#e01d85',
  },
  usertxt: {
    color: '#ae0ff2',
    fontSize: 17,
    marginLeft: '10%',
    padding: 10,
  },
});

export default MyCourses;
