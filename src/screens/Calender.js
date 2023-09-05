import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import EventCalendar from 'react-native-events-calendar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Linking,
  Dimensions
} from 'react-native';

const ScheduleCalendar = ({route}) => {
  const recordId = useSelector(state => state.recordId);
  const [calendarConvertedData, setCalendarConvertedData] = useState([]);
  const recordType = useSelector(state => state.recordType);

  console.log("recordType id is>>>>>>>.", recordType);

  const eventClicked = (event) => {
    const startTime = new Date(event.start);
    const bufferStartTime = new Date(startTime.getTime() - 15 * 60 * 1000);
    const endTime = new Date(event.end);
  
    if (Date.now() >= bufferStartTime && Date.now() <= endTime) {
      if (event.zoomLink) {
        Linking.openURL(event.zoomLink);
      }
    }
  };

  let { width } = Dimensions.get('window');
  const calenderApiResponse = useSelector(state => state.calendarApiResp)

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
    if(recordType == "Student"){
    scheduleCalendarApi();
    }else if(recordType == "Faculty")
    {
      FacultyCalenderApi();
    }
    else if( recordType == "Parent")
    {}
  }, [])

  useEffect(()=>{
    if(final?.length){
    convertToCalendarData();
    }
  },[final])

  useEffect(() => {
    prepareListData()
  }, [calenderApiResponse])


  const filterArrayDates = (selected) => {
    let Finaldata = [];
    let newArray = [];
    if (calenderApiResponse !== undefined && calenderApiResponse !== '') {
      calenderApiResponse?.enrollments?.filter((item) => {
        if (sortedData.includes(`${selected}${item.courseName}`)) {
          Finaldata.push(item);
        }
      })
    }
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

  const onDaySelected = (day) => {
    setSelected(day.dateString);
  }

  const FinalArrayDates = filterArrayDates(selected);
  FinalArrayDates.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  const FacultyCalenderApi = async () => {
    let data = {};
    data.contactId = recordId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyCalendar`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let calenderresult = await response.json()
    console.log("calenderresult Faculty +++", calenderresult);
    setFinal(calenderresult);
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
setCalendarConvertedData(tempArray);
}
 
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
          width={width}
          style={{backgroundColor:"red"}}
          size={60}
          initDate={selected === '' ? new Date() : selected}
          scrollToFirst
        />
      <Text style={{ color: "orange", fontWeight: "bold", fontSize: 19,backgroundColor:"white",position:"absolute",bottom:325,width:"100%",padding:15,}}>Schedule Today</Text>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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