import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../redux/actions';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const StudentCourseSelect = ({batchId,courseName }) => {

  const [final, setFinal] = useState();
  const dataFetchApi = useSelector(state => state.recordId);
  console.log("DATAFETCH", dataFetchApi);
  
  useEffect(() => {
    StudentCourseSelection();
  }, []);

  const StudentCourseSelection = async () => {
    let data = {};
    data.contactId = dataFetchApi;
    data.batchId = batchId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNCourseAttendanceLessonPlans`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let courseresult = await response.json()
    console.log(" studentCourseSelection API RES",   courseresult);
    setFinal(courseresult);
    console.log("final data is", final)
  }

  const ShowMoreText = ({ text, numberOfLinesToShow }) => {
    const [showFullText, setShowFullText] = useState(false);
    const [textMeasured, setTextMeasured] = useState(false);
    const [lineHeight, setLineHeight] = useState(0);
    const textRef = useRef();

    const toggleShowFullText = () => {
      setShowFullText(!showFullText);
    };

    const handleTextLayout = () => {
      if (!textMeasured) {
        textRef.current.measure((x, y, width, height, pageX, pageY) => {
          const lineheight = height / numberOfLinesToShow;
          setLineHeight(lineheight);
          setTextMeasured(true);
        });
      }
    };

    return (
      <View>
        <Text
          style={styles.textLayout}
          numberOfLines={showFullText ? undefined : numberOfLinesToShow}
          onLayout={handleTextLayout}
          ref={textRef}
        >
          {text}
        </Text>
        {textMeasured && !showFullText && (
          <TouchableOpacity
            onPress={toggleShowFullText}
          >
          <Text style={styles.seeMore}>See More</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

//Total overAllStatus percentage cal
  const totalProgress = final?.lessonPlan?.reduce((sum, item) => sum + item.Progress, 0);
  const maxProgress = final?.lessonPlan?.length * 100; // Assuming each item has a maximum progress of 100
  const totalProgressPercentage = (totalProgress / maxProgress) * 100;
  console.log(`Total Progress: ${totalProgressPercentage.toFixed(2)}%`);
  const overallStatus= Number( totalProgressPercentage.toFixed(0));
  console.log("overallstatus", overallStatus);

//Joinnow btn
const currentTime = new Date();
const start = new Date(final?.courseSchedules[0]?.start);
const end = new Date(final?.courseSchedules[0]?.endTime);

const isTouchableEnabled =
  currentTime.getTime() >= start.getTime() - 15 * 60 * 1000 &&
  currentTime.getTime() <= end.getTime();

const handleTouchablePress = () => {
  if (isTouchableEnabled) {
    Linking.openURL(final?.courseSchedules[0]?.zoomLink);
    console.log('TouchableOpacity pressed');
  }
};

//Total Attendance percentage cal
  const calculatePercentage = (value, total) => {
    return (total / value) * 100;
  };

  const calculateOverallCourseDurationDaysPercentage = (data) => {
    if (!data || data.length === 0) {
      return 0;
    }

    const totalDuration = data.reduce((total, item) => total + item.CourseDurationDays, 0);
    const overallPercentage = calculatePercentage(totalDuration, data.length ); // Assuming the total course duration is 30 days for each object

    return overallPercentage;
  };

  const overallPercentage = calculateOverallCourseDurationDaysPercentage(final?.attendance);
  console.log("overallPercentage", overallPercentage);

//Attence Progress Bar
  const [currentAttendancetFill, setCurrentAttendanceFill] = useState(0);
  const targetFill = overallPercentage;
  const duration = 600; // Animation duration in milliseconds
  const intervalDuration = 1000; // Interval duration in milliseconds (time between each update)

  useEffect(() => {
    let animationInterval;
    const step = (targetFill - currentAttendancetFill) * (intervalDuration / duration);

    if (currentAttendancetFill < targetFill) {
      animationInterval = setInterval(() => {
        setCurrentAttendanceFill((prevFill) => {
          const newFill = prevFill + step;
          return newFill >= targetFill ? targetFill : newFill;
        });
      }, intervalDuration);
    }
    return () => clearInterval(animationInterval);
  }, [currentAttendancetFill, targetFill]);

  //OverAll Status Progress Bar
  const [currentStatusFill, setStatusFill] = useState(0);
  const statusTargetFill = overallStatus;
  const statusDuration = 500; // Animation duration in milliseconds
  const statusIntervalDuration = 1000; // Interval duration in milliseconds (time between each update)

  useEffect(() => {
    let animationInterval;
    const step = (statusTargetFill - currentStatusFill) * (statusIntervalDuration / statusDuration);
    if (currentStatusFill < statusTargetFill) {
      animationInterval = setInterval(() => {
        setStatusFill((prevFill) => {
          const newFill = prevFill + step;
          return newFill >= statusTargetFill ? statusTargetFill : newFill;
        });
      }, statusIntervalDuration);
    }
    return () => clearInterval(animationInterval);
  }, [currentStatusFill, statusTargetFill]);

  
  return (

    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F38216', '#D33189']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.LinearGradientStyl}
      >
        <View>
          <Text style={styles.courseName}>{courseName}</Text>
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "white", marginTop: 5 }}>
            
              <AnimatedCircularProgress
                style={{ alignSelf: "center", margin: 5, color: "orange" }}
                size={90}
                width={22}
                fill={currentStatusFill}
                rotation={0}
                lineCap="round"
                tintColor="orange"
                backgroundColor="lightgray">
                {(fill) => (
                  <Text style={{ fontSize: 13 ,color:"#D6387F",fontWeight:"700"}}>{`${Math.round(fill)}%`}</Text>
                )}
              </AnimatedCircularProgress>
          </View>
          <Text style={{ color: "white", marginTop: 5, fontWeight: "500",fontSize:12,alignSelf:"center" }}>Over All Status</Text>
        </View>

        <View>
          <View style={{ width: 130, height: 130, borderRadius: 65, borderColor: "lightgray", borderWidth: 1 }}>
            <AnimatedCircularProgress
              style={{ alignSelf: "center", margin: 4, color: "orange" }}
              size={120}
              width={20}
              fill={currentAttendancetFill}
              rotation={0}
              lineCap="round"
              tintColor="#AFFFCF"
              backgroundColor="#F9F9F9">
              {(fill) => (
                <Text style={{ fontSize: 18 ,color:"white"}}>{`${Math.round(fill)}%`}</Text>
              )}
            </AnimatedCircularProgress>
          </View>
          <Text style={{ color: "white", marginTop: 5, alignSelf: "center", fontWeight: "500",fontSize:12 }}>Attendance</Text>
        </View>

      </LinearGradient>

      <ScrollView>
        <Text style={{ color: "#F38216", fontWeight: "600", fontSize: 16, marginHorizontal: 20, marginTop: 10 }}>{courseName}</Text>
        <ShowMoreText text={final?.courseSchedules[0]?.courseDescription} numberOfLinesToShow={4} />
        <View style={{ flexDirection: "row", marginHorizontal: 20, margin: 5, marginTop: 30 }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require('../assets/Show.png')} />
            <Text style={{ color: "#979797", margin: 2 }}> 150 Live Classes</Text>
          </View>

          <View style={{ flexDirection: "row", marginHorizontal: 40 }}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require('../assets/Calendarblack.png')} />
            <Text style={{ color: "#979797", margin: 2 }}>{final?.courseSchedules[0]?.Months} Months</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginHorizontal: 20, margin: 5 }}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require('../assets/TimeSquare.png')} />
          <Text style={{ color: "#979797", margin: 2 }}>1 Hour Per Class</Text>
        </View>

        <View style={{ flexDirection: "row", marginHorizontal: 20, margin: 5 }}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require('../assets/Profile.png')} />
          <Text style={{ color: "#979797", margin: 2 }}>Expert Mentors</Text>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 20, margin: 5 }}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require('../assets/Paper.png')} />
          <Text style={{ color: "#979797", margin: 2 }}>Tests & Practice's</Text>
        </View>
 

        <TouchableOpacity
          onPress={handleTouchablePress}
          disabled={!isTouchableEnabled}
          style={{
            backgroundColor: isTouchableEnabled ? '#F38216' : 'gray',
            padding: 10,
            alignSelf: "center",
            width: "55%",
            marginTop: 40,
            borderRadius: 5,
            //   position:"absolute"
          }}
        >
          <Text style={{ color: 'white', alignSelf: "center", fontSize: 16, fontWeight: "600" }}>
            Join Now
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}
export default StudentCourseSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // marginTop:10,
    // paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
  },
  textLayout:{ color: "#C8C6C6", width: "90%", textAlign: "justify", alignSelf: "center",fontSize:13,fontWeight:"500" },
  seeMore:{ color: "#D6387F", marginHorizontal: 20,fontSize:13,fontWeight:"500" },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  LinearGradientStyl:{ margin: 10, padding: 10, width: "90%", borderRadius: 15, alignSelf: "center", flexDirection: "row", justifyContent: "space-around",},
  courseName:{ color: "white", fontSize: 16, fontWeight: "600"},
})