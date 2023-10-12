import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getAccessToken} from '../redux/actions';
import BASE_URL from '../apiConfig';

const ParentCourse = ({batchId, contactId, CourseName}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    parentCourseApi();
  }, []);

  // time converter function
  const convertTo12HourFormat = time => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const suffix = hourInt >= 12 ? 'PM' : 'AM';
    const displayHour = hourInt > 12 ? hourInt - 12 : hourInt;
    return `${displayHour}:${minute} ${suffix}`;
  };

  const parentCourseApi = async () => {
    let requestData = {
      batchId: batchId,
      contactId: contactId,
    };
    const body = JSON.stringify(requestData);
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
    setData(result);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}>
      {data ? (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{CourseName}</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              {data.courseSchedules[0].courseDescription
                ? data.courseSchedules[0].courseDescription
                : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text"}
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Course Details</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 10,
              marginHorizontal: 25,
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 15,
              }}>
              <View>
                <Text>Class on</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.3,
                    lineHeight: 21,
                  }}>
                  {data.courseSchedules[0].Monday ? 'Mon' : ''}
                  {data.courseSchedules[0].Tuesday ? ', Tue' : ''}
                  {data.courseSchedules[0].Wednesday ? ', Wed' : ''}
                  {data.courseSchedules[0].Thursday ? ', Thu' : ''}
                  {data.courseSchedules[0].Friday ? ', Fri' : ''}
                  {data.courseSchedules[0].Saturday ? ', Sat' : ''}
                  {data.courseSchedules[0].Sunday ? ', Sun' : ''}
                </Text>
              </View>
              <View>
                <Text>Start Date</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.3,
                    lineHeight: 21,
                  }}>
                  {data.courseSchedules[0].startDate
                    ? new Date(
                        data.courseSchedules[0].startDate,
                      ).toLocaleDateString()
                    : 'Not available'}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 15,
              }}>
              <View>
                <Text>Class Timings</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.3,
                    lineHeight: 21,
                  }}>
                  {data.courseSchedules[0].startTimeAlone
                    ? convertTo12HourFormat(
                        data.courseSchedules[0].startTimeAlone,
                      )
                    : 'Not available'}
                </Text>
              </View>
              <View>
                <Text>End Date</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.3,
                    lineHeight: 21,
                  }}>
                  {data.courseSchedules[0].endDate
                    ? new Date(
                        data.courseSchedules[0].endDate,
                      ).toLocaleDateString()
                    : 'Not available'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Class Details</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 120,
              marginHorizontal: 22,
            }}>
            <View>
              <Text>Revision Class</Text>
            </View>
            <View>
              <Text>Backup Class</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 120,
              marginHorizontal: 22,
              marginVertical: 15,
            }}>
            <View>
              <Text
                style={{fontSize: 14, fontWeight: 'bold', letterSpacing: -0.3}}>
                {data.courseSchedules[0].totalRevisions
                  ? data.courseSchedules[0].totalRevisions
                  : 'Not available'}
              </Text>
            </View>
            <View>
              <Text
                style={{fontSize: 14, fontWeight: 'bold', letterSpacing: -0.3}}>
                {data.courseSchedules[0].totalRevisions
                  ? data.courseSchedules[0].totalRevisions
                  : 'Not available'}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Loading...</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ParentCourse;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  titleContainer: {
    marginVertical: 15,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: -0.3,
  },
  subtitleContainer: {
    marginBottom: 15,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  scrollViewContainer: {
    flexGrow: 1,
    // This allows the content to grow vertically
  },
  scrollView: {
    maxHeight: 350, // Adjust this value to your desired maximum height
  },
});
