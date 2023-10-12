import React, {useEffect, useState} from 'react';
import {Linking, Text} from 'react-native';
import {Image} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {getAccessToken} from '../redux/actions';
import BASE_URL from '../apiConfig';

const clock = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00065 1.33337C11.6873 1.33337 14.6673 4.32004 14.6673 8.00004C14.6673 11.6867 11.6873 14.6667 8.00065 14.6667C4.32065 14.6667 1.33398 11.6867 1.33398 8.00004C1.33398 4.32004 4.32065 1.33337 8.00065 1.33337ZM7.76732 4.62004C7.49398 4.62004 7.26732 4.84004 7.26732 5.12004V8.48671C7.26732 8.66004 7.36065 8.82004 7.51398 8.91337L10.1273 10.4734C10.2073 10.52 10.294 10.5467 10.3873 10.5467C10.554 10.5467 10.7207 10.46 10.814 10.3C10.954 10.0667 10.8807 9.76004 10.6407 9.61337L8.26732 8.20004V5.12004C8.26732 4.84004 8.04065 4.62004 7.76732 4.62004Z" fill="#B9B9B9" fill-opacity="0.54"/>
</svg>
`;
const star = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1418 8.27292C10.9605 8.4486 10.8772 8.70266 10.9185 8.95183L11.5407 12.3954C11.5932 12.6872 11.47 12.9826 11.2257 13.1513C10.9864 13.3263 10.6679 13.3473 10.4069 13.2073L7.30696 11.5905C7.19917 11.5331 7.07949 11.5023 6.957 11.4988H6.76733C6.70154 11.5086 6.63715 11.5296 6.57835 11.5618L3.47776 13.1863C3.32448 13.2633 3.1509 13.2906 2.98082 13.2633C2.56648 13.1849 2.29001 12.7901 2.3579 12.3737L2.98082 8.93013C3.02212 8.67887 2.93883 8.4234 2.75755 8.24492L0.230183 5.79524C0.0188106 5.59017 -0.0546798 5.28221 0.0419076 5.00435C0.135695 4.72718 0.375064 4.52491 0.664126 4.47941L4.14267 3.97478C4.40724 3.94748 4.63961 3.78651 4.75859 3.54854L6.29139 0.405947C6.32779 0.335956 6.37468 0.271565 6.43137 0.216972L6.49436 0.167978C6.52726 0.131583 6.56506 0.101487 6.60705 0.0769899L6.68334 0.0489936L6.80232 0H7.09699C7.36015 0.0272964 7.59182 0.184776 7.7129 0.419945L9.266 3.54854C9.37799 3.77741 9.59566 3.93629 9.84693 3.97478L13.3255 4.47941C13.6194 4.52141 13.8651 4.72438 13.9624 5.00435C14.0541 5.28501 13.975 5.59297 13.7594 5.79524L11.1418 8.27292Z" fill="#F38216"/>
</svg>
`;

const ParentCourseTile = ({batchId, contactId, CourseName}) => {
  const [tileData, setTileData] = useState(null);

  useEffect(() => {
    parentCourseApi();
  }, []);

  // time converter function
  const convertTo12HourFormat = time => {
    if (time) {
      const [hour, minute] = time.split(':');
      const hourInt = parseInt(hour, 10);
      const suffix = hourInt >= 12 ? 'PM' : 'AM';
      const displayHour = hourInt > 12 ? hourInt - 12 : hourInt;
      return `${displayHour}:${minute} ${suffix}`;
    } else {
      return 'N/A'; // Handle the case when time is undefined
    }
  };
  const openZoomLink = link => {
    // Use Linking to open the Zoom link in the device's default browser.
    Linking.openURL(link);
  };
  const parentCourseApi = async () => {
    let data = {};
    data.batchId = batchId;
    data.contactId = contactId;
    const body = JSON.stringify(data);
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(
      `${BASE_URL}/services/apexrest/RNCourseAttendanceLessonPlans`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: bearer,
        }),
        body,
      },
    );
    let result = await response.json();
    console.log('parent course tile curriculum ====', result);
    setTileData(result);
  };
  return (
    <View style={styles.courseTile}>
      <View>
        <Image
          source={require('../assets/coursegirl.png')}
          style={styles.image}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, {textDecorationLine: 'underline'}]}
            onPress={() => openZoomLink(tileData?.courseSchedules[0].zoomLink)}>
            {CourseName}
          </Text>
        </View>
        <View style={styles.desItems}>
          <SvgXml xml={clock} width="12" height="12" color="#000000" />
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: -0.3,
              lineHeight: 12,
            }}>
            {tileData?.courseSchedules[0].Months || '-- months'} Months
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <View style={styles.titleContainer}>
          <Text>Mentor : </Text>
          <Text style={[styles.title, {color: '#F38216'}]}>
            {tileData?.courseSchedules[0].facultyName}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text>Timing : </Text>
          <Text style={styles.title}>
            {convertTo12HourFormat(tileData?.courseSchedules[0].startTimeAlone)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ParentCourseTile;
const styles = StyleSheet.create({
  courseTile: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
    width: 340,
    height: 212,
    margin: 10,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    marginHorizontal: 25,
  },
  image: {
    width: 340,
    height: 146,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: '500',
    fontSize: 14,

    letterSpacing: -0.3,
    color: '#474646',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 7,
  },
  desItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
});
