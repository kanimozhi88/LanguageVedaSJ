import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getCalenderApiResult } from '../../redux/actions';
import { Calendar, Agenda } from 'react-native-calendars';
import moment from 'moment';
import EventCalendar from 'react-native-events-calendar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Linking,
  Dimensions
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

const ScheduleCalendar = ({route}) => {
  // const {recordId} = route.params;


  const recordId = useSelector(state => state.recordId);
  const [calendarConvertedData, setCalendarConvertedData] = useState([]);
console.log("record id is", recordId);
  const data = [
    {
        "zoomLink": "https://us05web.zoom.us/j/83394301149?pwd=eVVmaTZBM2x6blJzdWZjVUgxMFZFdz09",
        "timeBlock": "10am-11-am",
        "studentName": "Mrithul Mrithul",
        "startTime": "2023-06-29T04:30:00.000Z",
        "startDate": "2023-05-19T00:00:00.000Z",
        "recordId": "a0B1e000002RMo0EAG",
        "primeFaculty": null,
        "endTime": null,
        "endDate": "2023-09-01T00:00:00.000Z",
        "courseName": "Malayalam",
        "batchName": "Malayalam:MorningBatch __1",
        "backgroundColor": "red"
    },
    {
        "zoomLink": null,
        "timeBlock": "4.30 pm to 5.30",
        "studentName": "Mrithul Mrithul",
        "startTime": "2023-06-29T11:00:00.000Z",
        "startDate": "2023-06-01T00:00:00.000Z",
        "recordId": "a0B1e000002RajvEAC",
        "primeFaculty": "Alice Doee",
        "endTime": "2023-06-29T12:00:00.000Z",
        "endDate": "2023-07-31T00:00:00.000Z",
        "courseName": "Bengali",
        "batchName": "Evening_Batch_3",
        "backgroundColor": "#FFD4D4"
    },
    {
        "zoomLink": null,
        "timeBlock": "4.30 pm to 5.30",
        "studentName": "Mrithul Mrithul",
        "startTime": "2023-06-29T11:00:00.000Z",
        "startDate": "2023-06-01T00:00:00.000Z",
        "recordId": "a0B1e000002RlTwEAK",
        "primeFaculty": "Alice Doee",
        "endTime": "2023-06-29T12:00:00.000Z",
        "endDate": "2023-07-31T00:00:00.000Z",
        "courseName": "Bengali",
        "batchName": "Evening_Batch_3",
        "backgroundColor": "#FFD4D4"
    },
    {
        "zoomLink": "https://us05web.zoom.us/j/82325526743?pwd=K2JPK3QvUGU1QkpWanhCbkJybDRZZz09",
        "timeBlock": null,
        "studentName": "Mrithul Mrithul",
        "startTime": null,
        "startDate": "2023-06-06T00:00:00.000Z",
        "recordId": "a0B1e000002RlW2EAK",
        "primeFaculty": null,
        "endTime": null,
        "endDate": "2023-07-06T00:00:00.000Z",
        "courseName": "Sanskrit",
        "batchName": "OK- Weekday Batch",
        "backgroundColor": "red"
    }
]

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

  const [events, setEvents] = useState([
    {
      start: '2023-07-06 11:15:00',
      end: '2023-07-06 11:29:00',
      title: 'New Year Party',
      summary: 'xyz Location',
      backgroundColor:"yellow"
    },
    {
      start: '2023-07-06 12:30:00',
      end: '2023-07-06 13:30:00',
      title: 'New Year Wishes',
      summary: 'Call to every one',
      backgroundColor:"blue"
    },
    {
      start: '2023-07-04 15:30:50',
      end: '2023-07-04 16:30:00',
      title: 'Parag Birthday Party',
      summary: 'Call him',
      backgroundColor:"orange"
    },
    {
      start: '2023-07-04 15:45:00',
      end: '2023-07-04 16:20:00',
      title: 'My Birthday Party',
      summary: 'Lets Enjoy',
      backgroundColor:"red"
    },
    {
      start: '2023-06-29 16:10:00',
      end: '2023-06-29 17:40:00',
      title: 'Engg Expo 2020',
      summary: 'Expoo Vanue not confirm',
      backgroundColor:"green"
    },
  ]);
  
  const eventClicked = (event) => {
    const startTime = new Date(event.start);
    const bufferStartTime = new Date(startTime.getTime() - 15 * 60 * 1000);
    const endTime = new Date(event.end);
  
    if (Date.now() >= bufferStartTime && Date.now() <= endTime) {
      // if (event.zoomLink) {
        Linking.openURL(event.zoomLink);
      //  alert(JSON.stringify(event));
    }
  };

  let { width } = Dimensions.get('window');
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
    // CalenderApi();
    scheduleCalendarApi();
  }, [])

  useEffect(()=>{
    if(final?.length){
    convertToCalendarData();
    }
  },[final])

  useEffect(() => {
    prepareListData()
  }, [calenderApiResponse])

  // useEffect(() => {
  //   if (calenderApiResponse == undefined) {
  //     CalenderApi();
  //   }
  // }, [calenderApiResponse]);

  const filterArrayDates = (selected) => {
    let Finaldata = [];
    let newArray = [];
    console.log("Required calenderApiResponse::", calenderApiResponse);
    if (calenderApiResponse !== undefined && calenderApiResponse !== '') {
      console.log("INSIDE IF COND Required calenderApiResponse::", sortedData);
      calenderApiResponse?.enrollments?.filter((item) => {
        console.log("needed item is", item, selected, sortedData);
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
    data.contactid = recordId;

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
    // setFinal(calenderresult);
    // dispatch(getCalenderApiResult(calenderresult));
  }

  const scheduleCalendarApi = async () => {
    let data = {};
    data.contactId = recordId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNCalendar`, {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": bearer
        }),
        body,
    });
    let timerResponse = await response.json()
    console.log("schedule calendar res is", timerResponse);
    setFinal(timerResponse);
}

const convertToCalendarData = ()=> {
let tempArray = [];
if (final?.length) {
  for (let i = 0; i < final.length; i++) {
    let obj = {
      start: final[i]?.start,
      end: final[i]?.endTime,
      title: final[i]?.courseName,
      summary: final[i]?.courseOfferingName,
      zoomLink: final[i]?.zoomLink,

    };
    tempArray.push(obj);
  }
}
console.log("temparray is", tempArray);
setCalendarConvertedData(tempArray);
}
console.log("calendarConverteddata is", calendarConvertedData);
 
  const markedDate = {
    [selected]: {
      selected: true,
      selectedColor: '#e01d85',
      borderRadius:5,
    },
    };
  
  const renderHeader = (date) => {
    const month = date.toString('MMMM');
    const year = date.getFullYear().toString();
    return (
      <View>
        <Text style={styles.monthText}>{month}</Text>
        <Text style={styles.yearText}>{year}</Text>
      </View>
    );
  };
 

  return (
    <SafeAreaView
      style={styles.container}>

      <Calendar
        onDayPress={onDaySelected}
        markedDates={markedDate}
        renderArrow={(direction) => <Text style={styles.arrow}>{direction === 'left' ? '<' : '>'}</Text>}
        renderHeader={renderHeader}
        monthFormat={' '}
        style={{ height: "50%", width: "95%", alignSelf: "center" }} />
    
      
      <View style={styles.containerView}>

        <EventCalendar
          eventTapped={eventClicked}
          events={calendarConvertedData}
          //passing the Array of event
          width={width}
          style={{backgroundColor:"red"}}
          //Container width
          size={60}
          //number of date will render before and after initDate
          //(default is 30 will render 30 day before initDate and 29 day after initDate)
          initDate={selected === '' ? new Date() : selected}
          //show initial date (default is today)
          scrollToFirst
          //scroll to first event of the day (default true)
        />
              <Text style={{ color: "orange", fontWeight: "bold", fontSize: 19,backgroundColor:"white",position:"absolute",bottom:325,width:"100%",padding:15,}}>Schedule Today</Text>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
    backgroundColor: "white"
  },
  containerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: 'black',
    fontSize: 20,
    width:30,
    height:30,borderRadius:8,
    borderWidth:1,borderColor:"lightgray",
    elevation:4,backgroundColor:"white",textAlign:"center"
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"#474747"
  },
  yearText: {
    fontSize: 16,
    color: 'gray',
    alignSelf:"center"
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
  timeSlotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width:"50%"
  },
  timeSlot: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSlotText: {
    color: 'black',
  },
  timeSlotsContentContainer: {
    paddingHorizontal: 10,
  },
  agendaContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  agendaItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  courseName: {
    fontWeight: 'bold',
  },
  timeBlock: {
    marginTop: 5,
  },
});

export default ScheduleCalendar;