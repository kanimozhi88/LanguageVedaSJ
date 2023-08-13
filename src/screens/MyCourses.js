import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import 'moment-timezone'
import Timmer from '../../component/Timmer';
import { getDataMethod } from '../../redux/actions';

const MyCourses = ({ route }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const LastName = useSelector(state => state.LastName);
  const recordId = useSelector(state => state.recordId);
  const recordType = useSelector(state => state.recordType);

  const handleMycoursesPress = () => {
    navigation.navigate('StudentMyCourses');
  };

  const handleAssignmentPress = () => {
    navigation.navigate('Assignment');
  };

  const handleAttendancePress = () => {
    navigation.navigate('Attendance');
  };
  const handleCalenderPress = () => {
    navigation.navigate('Calender', { recordId: recordId });
  };
  const handleChartsandDashboardPress = () => {
    navigation.navigate('ChartsandDashboard');
  };

  return (

    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.nameViewStyle}>
        <Text style={{ fontSize: 18 }}>Hello,<Text style={styles.nameStyle}>{LastName}</Text></Text>
        <TouchableOpacity
          // onPress={() => { dispatch(getDataMethod('')) }}
          >
          <Image source={require('../../assets/Notification.png')}
            style={styles.notificationImage} />
        </TouchableOpacity>
      </View>
      {recordType == "Student" ?
      <Timmer recordId={recordId} />
      : null}

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

            {/* <TouchableOpacity style={[styles.square]} onPress={handleAssignmentPress}>
              <View style={[styles.rectimage, { backgroundColor: "#e01d85" }]}>
                <Image source={require('../../assets/billing.png')}
                  style={styles.imageStyle} />
              </View>
              <Text style={[styles.text, { fontWeight: "600", marginBottom: 65, margin: 15, marginRight: 50 }]}>Reports</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.square} onPress={handleChartsandDashboardPress}>
              <View style={[styles.rectimage, { backgroundColor: "#e01d85" }]}>
                <Image source={require('../../assets/billing.png')}
                  style={styles.imageStyle} />
              </View>
              <Text style={[styles.text, { fontWeight: "500", marginBottom: 15, margin: 50 }]}>Billing</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.row}>

            {/* <TouchableOpacity style={styles.rectNew} onPress={handleChartsandDashboardPress}>
              <View style={[styles.rectimage, { backgroundColor: "#e01d85" }]}>
                <Image source={require('../../assets/billing.png')}
                  style={styles.imageStyle} />
              </View>
              <Text style={[styles.text, { fontWeight: "500", marginBottom: 15, margin: 50 }]}>Billing</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.rectNew} onPress={handleAttendancePress}>
              <View style={[styles.image, { backgroundColor: "#e01d85" }]}>
                <Image source={require('../../assets/Videoassets.png')}
                  style={styles.imageStyle} />
              </View>
              <Text style={[styles.text, { fontWeight: "600" }]}>Video Assets</Text>
            </TouchableOpacity>
             <TouchableOpacity
            style={[styles.rectangle, { marginLeft: 20}]}
            // onPress={handleCalenderPress}
            >
            <View style={[styles.image, { backgroundColor: "#e01d85", marginBottom: 10 }]}>
              <Image source={require('../../assets/Schedule.png')}
                style={styles.imageStyle} />
            </View>
            <Text style={[styles.text, { fontWeight: "700" }]}>Assessment</Text>
          </TouchableOpacity>

          </View>
          {/* <TouchableOpacity
            style={[styles.rectangle, { marginLeft: 20, bottom: 30 }]}
            onPress={handleCalenderPress}>
            <View style={[styles.image, { backgroundColor: "#e01d85", marginBottom: 10 }]}>
              <Image source={require('../../assets/Schedule.png')}
                style={styles.imageStyle} />
            </View>
            <Text style={[styles.text, { fontWeight: "700" }]}>Schedule</Text>
          </TouchableOpacity> */}

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

           {/* <TouchableOpacity style={[styles.square]} onPress={handleAssignmentPress}>
             <View style={[styles.rectimage, { backgroundColor: "#e01d85" }]}>
               <Image source={require('../../assets/billing.png')}
                 style={styles.imageStyle} />
             </View>
             <Text style={[styles.text, { fontWeight: "600", marginBottom: 65, margin: 15, marginRight: 50 }]}>Reports</Text>
           </TouchableOpacity> */}
           <TouchableOpacity style={styles.square} >
             <View style={[styles.rectimage, { backgroundColor: "#e01d85" }]}>
               <Image source={require('../../assets/billing.png')}
                 style={styles.imageStyle} />
             </View>
             <Text style={[styles.text, { fontWeight: "500", marginBottom: 15, margin: 50 }]}>Video Assets</Text>
           </TouchableOpacity>

         </View>
         <View style={styles.row}>

           {/* <TouchableOpacity style={styles.rectNew} onPress={handleChartsandDashboardPress}>
             <View style={[styles.rectimage, { backgroundColor: "#e01d85" }]}>
               <Image source={require('../../assets/billing.png')}
                 style={styles.imageStyle} />
             </View>
             <Text style={[styles.text, { fontWeight: "500", marginBottom: 15, margin: 50 }]}>Billing</Text>
           </TouchableOpacity> */}
           <TouchableOpacity style={styles.rectNew} >
             <View style={[styles.image, { backgroundColor: "#e01d85" }]}>
               <Image source={require('../../assets/Videoassets.png')}
                 style={styles.imageStyle} />
             </View>
             <Text style={[styles.text, { fontWeight: "600" }]}>Help Center</Text>
           </TouchableOpacity>
            <TouchableOpacity
           style={[styles.rectangle, { marginLeft: 20}]}
           onPress={() => navigation.navigate('FacultyRevision')}           >
           <View style={[styles.image, { backgroundColor: "#e01d85", marginBottom: 10 }]}>
             <Image source={require('../../assets/Schedule.png')}
               style={styles.imageStyle} />
           </View>
           <Text style={[styles.text, { fontWeight: "700" }]}>Revision</Text>
         </TouchableOpacity>

         </View>
         {/* <TouchableOpacity
           style={[styles.rectangle, { marginLeft: 20, bottom: 30 }]}
           onPress={handleCalenderPress}>
           <View style={[styles.image, { backgroundColor: "#e01d85", marginBottom: 10 }]}>
             <Image source={require('../../assets/Schedule.png')}
               style={styles.imageStyle} />
           </View>
           <Text style={[styles.text, { fontWeight: "700" }]}>Schedule</Text>
         </TouchableOpacity> */}

       </View>
          : recordType == "Parent" ?
            <></> : <></>
      }

{/* <TouchableOpacity 
onPress={()=> navigation.navigate('downloader')}
>
  <Text>click</Text>
</TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  },
  nameViewStyle: { flexDirection: "row", justifyContent: "space-between", marginTop: 30, width: "90%", alignSelf: "center", margin: 10 },
  nameStyle: { color: "black", fontSize: 20 },
  notificationImage: { width: 30, height: 30 },
  row: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
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
