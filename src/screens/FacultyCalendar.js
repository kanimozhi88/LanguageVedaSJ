import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getCalenderApiResult } from '../../redux/actions';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Linking
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

const FacultyCalendar = () => {

  const FakeData = [
    {
      BatchName: "Evening_Batch_4",
      CourseName: "Tamil Language Course",
      StudentName: "sri Sri Sri",
      ZoomLink: "https://us05web.zoom.us/j/7464043898?pwd=blVPb1BkMU03WVFQWENaRzZhd0RDUT09",
      endDate: "2023-04-10",
      endTime: "2023-04-05T11:30:00.000Z",
      message: null,
      primeFaculty: "Prof.Kalyan",
      recordId: "a0B1e0000013T3mEAE",
      startDate: "2023-02-04",
      startTime: "2023-04-05T04:30:00.000Z",
      status: "Success"
    },
    {
      BatchName: "Morning_Batch_4",
      CourseName: "Kannad Language Course",
      StudentName: "sri Sri Sri",
      ZoomLink: "https://meet.google.com/gcs-uikr-obh",
      endDate: "2023-05-29",
      endTime: null,
      message: null,
      primeFaculty: null,
      recordId: "a0B1e0000013bTJEAY",
      startDate: "2023-04-04",
      startTime: "2023-04-05T05:30:00.000Z",
      status: "Success"
    },
  ]

  const dispatch = useDispatch();
  const calenderApiResponse = useSelector(state => state.calendarApiResp)
  console.log("stored calendar api result is", calenderApiResponse);

  const [final, setFinal] = useState([]);
  const [DataForMarker, setDataForMarker] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [selected, setSelected] = useState('');
  const [todayDate, setTodayDate] = useState('');
  useEffect(() => {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    setSelected(currentDate)
    setTodayDate(currentDate)
  }, [])

  useEffect(() => {
    CalenderApi();
  }, [])

  useEffect(() => {
    prepareListData()
  }, [calenderApiResponse])

  useEffect(() => {
    if (calenderApiResponse == undefined) {
      CalenderApi();
    }
  }, [calenderApiResponse]);

  const filterArrayDates = (selected) => {
    let Finaldata = [];
    let newArray = [];
    console.log("Required calenderApiResponse::", calenderApiResponse);
    if (calenderApiResponse !== undefined && calenderApiResponse !== '') {
      console.log("INSIDE IF COND Required calenderApiResponse::");
      calenderApiResponse?.enrollments?.filter((item) => {
        if (sortedData.includes(`${selected}${item.courseName}`)) {
          Finaldata.push(item);
        }
      })
    }
    console.log("FINAL DATA IS +++", Finaldata)
    const Obj1 = { enrollments: Finaldata }
    const Obj2 = { tests: calenderApiResponse?.tests }
    newArray.push(Obj1, Obj2)
    return newArray;

  };

  const callThisMethod = (item) => {
    let startDateTest = item?.startDate;
    let endDateTest = item?.endDate;
    const startDate = moment(startDateTest);
    const endDate = moment(endDateTest);
    const numberOfDays = endDate.diff(startDate, 'days') + 1;
    for (let i = 0; i < numberOfDays; i++) {
      // console.log("FOR COND IS :::")
      let CourseName = item?.courseName;
      const date = moment(startDate).add(i, 'days');
      let dateObj = moment(date).format("YYYY-MM-DD")
      let NewdateObj = moment(date).format("YYYY-MM-DD") + CourseName
      DataForMarker.push(dateObj);
      sortedData.push(NewdateObj);

    }
  }

  const prepareListData = () => {
    console.log('praepare list ::::', calenderApiResponse)
    if (calenderApiResponse !== undefined && calenderApiResponse !== '') {
      calenderApiResponse?.enrollments.map((item) => {
        callThisMethod(item)
      })
    }
  };

  const markedDates = DataForMarker.reduce((obj, date) => {
    obj[date] = { marked: true, dotColor: 'red' }
    obj[selected] = {
      selected: true,
      disableTouchEvent: true,
      selectedColor: 'orange',
      selectedTextColor: 'red'
    }
    return obj;
  }, {});

  const onDaySelected = (day) => {
    setSelected(day.dateString);
  }

  const FinalArrayDates = filterArrayDates(selected);
  FinalArrayDates.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  console.log("FINAL ARRAY DATES", FinalArrayDates);

  const CalenderApi = async () => {
    let data = {};
    data.Type = "Contact";
    data.contactid = "0031e00000Hm4KYAAZ";

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/enrollmentsandtests`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let calenderresult = await response.json()
    console.log("calenderresult+++", calenderresult);
    setFinal(calenderresult);
    dispatch(getCalenderApiResult(calenderresult));
  }

  const renderItem = ({ item }) => {
    console.log("ITEMMM NEEDEDD", item);
    console.log("TEST DATE format", moment(item?.tests?.testDate).format("YYYY-MM-DD"), selected)
    return (
      <View style={{ alignSelf: 'center' }}>

        {item.tests && item.tests.map((testItem, index) => (
          selected == moment(testItem?.testDate).format("YYYY-MM-DD") ?
            <View style={{
              flexDirection: "row", marginTop: 10, backgroundColor: '#D3D3D3',
              borderRadius: 10, padding: 20, marginTop: 25, justifyContent: "space-between"
            }}>
              <View style={{ width: "95%" }}>
                <Text style={{ color: 'black' }}>{moment(testItem.testDate).format("DD-MM-YYYY")}</Text>
                <Text style={{ color: 'black' }}>{testItem.testType} </Text>
                <Text style={{ color: 'black' }}>{testItem.studentName}</Text>
              </View>
            </View>
            : <></> 
        ))}

        {item.enrollments && item.enrollments.map((enrollmentItem, index) => (
          <View style={{
            flexDirection: "row", marginTop: 10, backgroundColor: '#D3D3D3',
            borderRadius: 10, padding: 20, marginTop: 25, justifyContent: "space-between"
          }}>
            <View style={{ width: "63%" }}>
              <Text style={{ color: 'black' }}>{enrollmentItem.courseName}</Text>
              <Text style={{ color: 'black' }}>{moment(enrollmentItem.startDate).format("DD-MM-YYYY")}</Text>
            </View>
            <TouchableOpacity
              disabled={selected == todayDate ? false : true}
              onPress={() => Linking.openURL(enrollmentItem.zoomLink)}
              style={{
                justifyContent: "center", margin: 20,
                backgroundColor: selected == todayDate ? "green" : "gray", width: 80, height: 30, borderRadius: 10
              }}>
              <Text style={{ alignSelf: "center", fontWeight: "800", color: "white" }}>JOIN</Text>
            </TouchableOpacity>
          </View>
        ))}

      </View>
    )
  }

  return (
    <SafeAreaView
      style={styles.container}>

      <Calendar
        onDayPress={onDaySelected}
        markingType='simple'
        markedDates={markedDates}
        disabledDaysIndexes={[0, 6]}
        style={{ height: "50%" }} />
      <ScrollView
        style={{ marginTop: 40 }}>
        {FinalArrayDates?.length > 0 ? (
          <FlatList
            data={FinalArrayDates}
            renderItem={renderItem}
          />
        ) : (
          <Text style={{ alignSelf: "center", margin: 50, color: "red", fontWeight: "800" }}>
            No Courses Available for the selected Date
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default FacultyCalendar;