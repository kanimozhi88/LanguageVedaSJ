import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getAccessToken} from '../redux/actions';
import BASE_URL from '../apiConfig';
import AnimatedCircularProgressBar from './AnimatedCircularProgressBar';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const ParentCourse = ({batchId, contactId, CourseName}) => {
  const [data, setData] = useState(null);
  const maxHeight = useWindowDimensions();

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
    console.log('parent course ====', result);
    setData(result);
  };
  //Total Attendance percentage cal
  const calculatePercentage = (value, total) => {
    return (total / value) * 100;
  };
  const calculateOverallCourseDurationDaysPercentage = data => {
    if (!data || data.length === 0) {
      return 0;
    }

    const totalDuration = data.reduce(
      (total, item) => total + item.CourseDurationDays,
      0,
    );
    const overallPercentage = calculatePercentage(totalDuration, data.length); // Assuming the total course duration is 30 days for each object

    return overallPercentage;
  };

  const overallPercentage = calculateOverallCourseDurationDaysPercentage(
    data?.attendance,
  );
  //Attence Progress Bar
  const [currentAttendancetFill, setCurrentAttendanceFill] = useState(0);
  const targetFill = overallPercentage;
  const duration = 600; // Animation duration in milliseconds
  const intervalDuration = 1000; // Interval duration in milliseconds (time between each update)

  useEffect(() => {
    let animationInterval;
    const step =
      (targetFill - currentAttendancetFill) * (intervalDuration / duration);

    if (currentAttendancetFill < targetFill) {
      animationInterval = setInterval(() => {
        setCurrentAttendanceFill(prevFill => {
          const newFill = prevFill + step;
          return newFill >= targetFill ? targetFill : newFill;
        });
      }, intervalDuration);
    }
    return () => clearInterval(animationInterval);
  }, [currentAttendancetFill, targetFill]);

  return (
    <ScrollView
      // style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}>
      {data ? (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{CourseName}</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              {data.courseSchedules[0]?.courseDescription
                ? data.courseSchedules[0]?.courseDescription
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
                <Text style={styles.subtitle}>Class on</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.3,
                    lineHeight: 21,
                    color: '#474646',
                  }}>
                  {data.courseSchedules[0]?.Monday ? 'Mon' : ''}
                  {data.courseSchedules[0]?.Tuesday ? ', Tue' : ''}
                  {data.courseSchedules[0]?.Wednesday ? ', Wed' : ''}
                  {data.courseSchedules[0]?.Thursday ? ', Thu' : ''}
                  {data.courseSchedules[0]?.Friday ? ', Fri' : ''}
                  {data.courseSchedules[0]?.Saturday ? ', Sat' : ''}
                  {data.courseSchedules[0]?.Sunday ? ', Sun' : ''}
                </Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Start Date</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.3,
                    lineHeight: 21,
                    color: '#474646',
                  }}>
                  {data.courseSchedules[0]?.startDate
                    ? new Date(
                        data.courseSchedules[0]?.startDate,
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
                <Text style={styles.subtitle}>Class Timings</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.3,
                    lineHeight: 21,
                    color: '#474646',
                  }}>
                  {data.courseSchedules[0]?.startTimeAlone
                    ? convertTo12HourFormat(
                        data.courseSchedules[0]?.startTimeAlone,
                      )
                    : 'Not available'}
                </Text>
              </View>
              <View>
                <Text style={styles.subtitle}>End Date</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.3,
                    lineHeight: 21,
                    color: '#474646',
                  }}>
                  {data.courseSchedules[0]?.endDate
                    ? new Date(
                        data.courseSchedules[0]?.endDate,
                      ).toLocaleDateString()
                    : 'Not available'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Attendance</Text>
          </View>
          <View
            style={{
              width: 130,
              height: 130,
              borderRadius: 65,
              borderColor: '#999999',
              borderWidth: 1,
              alignSelf: 'center',
            }}>
            <AnimatedCircularProgress
              style={{alignSelf: 'center', margin: 4, color: 'orange'}}
              size={120}
              width={20}
              fill={currentAttendancetFill}
              rotation={0}
              lineCap="round"
              tintColor="#AFFFCF"
              backgroundColor="#F9F9F9">
              {fill => (
                <Text style={{fontSize: 18, color: 'white'}}>{`${Math.round(
                  fill,
                )}%`}</Text>
              )}
            </AnimatedCircularProgress>
          </View>
          <Text
            style={{
              color: '#000000',
              marginTop: 10,
              alignSelf: 'center',
              fontWeight: '500',
              fontSize: 12,
            }}>
            Attendance
          </Text>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Class Details</Text>
          </View>
          <View style={{marginBottom: 100}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 120,
                marginHorizontal: 22,
              }}>
              <View>
                <Text style={styles.subtitle}>Revision Class</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Backup Class</Text>
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
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.3,
                    color: '#474646',
                  }}>
                  {data.courseSchedules[0]?.totalRevisions
                    ? data.courseSchedules[0]?.totalRevisions
                    : 'Not available'}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.3,
                    color: '#474646',
                  }}>
                  {data.courseSchedules[0]?.totalRevisions
                    ? data.courseSchedules[0]?.totalRevisions
                    : 'Not available'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center'}}>
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
    color: '#474646',
  },
  subtitleContainer: {
    marginBottom: 15,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#474646',
    letterSpacing: -0.3,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  scrollViewContainer: {
    flexGrow: 1,
    // This allows the content to grow vertically
  },
});
