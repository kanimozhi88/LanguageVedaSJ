import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker'


import {
  StyleSheet,
  Text,
  View,
  Linking,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';


const FacultyCourseSelection = ({ navigation, route }) => {

  const recordId = useSelector(state => state.recordId);
  const [final, setFinal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reopencheck, setReopenCheck] = useState(false);
  const [description, setDescription] = useState('');
  const [retrievedData, setRetrievedData] = useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [revisionDate, setRevisionDate] = useState(new Date())
  const [revisionOpen, setRevisionOpen] = useState(false)
  const [formatedExeDate, setFormatedExeDate] = useState();
  const [formatedRevisionDate, setFormatedRevisionDate] = useState();
  const [touchableEnable, setTouchableEnable] = useState(false);
  const [testArray,setTestArray] = useState('');
  const [assignEnable,setAssignEnable] = useState(true);

  const [reopenStatus, setReopenStatus] = useState(false);
  const [reopenRes, setReopenRes] = useState('');

  const { LPExecutionId, Status } = route.params;

  useEffect(() => {
    FacultyCourseSelection();
    FacultyCourseRetrieval();
  }, [])

  const FacultyCourseSelection = async () => {
    let data = {};
    data.LPExecutionId = LPExecutionId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultylessonPlanExecutionsAndTests`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let FacultyCourseSelecRes = await response.json()
    console.log("FacultyCourseSelection", FacultyCourseSelecRes);
    setFinal(FacultyCourseSelecRes);
    if (final?.lessonPlanExecutions?.StartTime !== null && final?.lessonPlanExecutions?.EndTime
      !== null) {
      const startTime = new Date(final?.lessonPlanExecutions?.StartTime);
      const endTime = new Date(final?.lessonPlanExecutions?.EndTime);
      const currentTime = new Date();
      const fifteenMinutesBeforeStartTime = new Date(startTime.getTime() - 15 * 60000);
      const isTouchable = currentTime >= fifteenMinutesBeforeStartTime && currentTime <= endTime;
      setTouchableEnable(isTouchable);

    }
  
  }

  console.log("testarray is>>>>>>>>>",testArray);

  const [data, setData] = useState(final?.testResponses);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleCheckBox = (testId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.some((item) => item.testId === testId)) {
        // If the testId already exists, remove it from the array (uncheck)
        return prevSelectedItems.filter((item) => item.testId !== testId);
      } else {
        // If the testId is not in the array, add it with isActive: true (check)
        return [...prevSelectedItems, { testId: testId, isActive: true }];
      }
    });
  };

  console.log("selecteditems", selectedItems);

  const FacultyTestActive = async () => {
    let data = {};
    data.patchDataList = testArray;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyTestActive`, {
      method: 'PATCH',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let FacultyTestActive = await response.json()
    console.log("faculty TestActive", FacultyTestActive);
   if(Array.isArray(FacultyTestActive)){
    Alert.alert("Assigment Uploaded successfully")
   }
   setAssignEnable(false)
  }

  const FacultyCourseRetrieval = async () => {
    let data = {};
    data.lpExecutionId = LPExecutionId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyLessonPlanFileContent`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let testFileRetrieval = await response.json()
    console.log("faculty testfile retrieval", testFileRetrieval);
    const jsontestfileRetrievalRes = JSON.parse(testFileRetrieval)
    setRetrievedData(jsontestfileRetrievalRes?.Attachments);
    console.log("retriveddata ", retrievedData);
  }

  

  const rendertestLessons = ({ item }) => {
    return (
      <View>
        <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 5, flexDirection: "row" }}>

          <View style={{ width: "80%", flexDirection: "row" }}>
            {/* <CheckBox
              disabled={false}
              value={selectedItems.some((selectedItem) => selectedItem.testId === item.testId)}
              onValueChange={() => toggleCheckBox(item.testId)}
            /> */}
            <Text style={{ color: "#242634", fontSize: 14, fontWeight: "500", margin: 5 }}>{item?.LessonPlan} - </Text>
            <Text style={{ color: "#242634", fontSize: 14, fontWeight: "500", margin: 5 }}>{item?.assignmentTitle}</Text>
          </View>
          <MenuProvider>
            <View style={{ height: 50, top: 5, }}>
              <PopupMenuExample PublicDownloadUrl={item?.PublicDownloadUrl} />
            </View>
          </MenuProvider>
        </View>
        <View style={{ height: 1, width: "100%", backgroundColor: "#EBEFF2" }} />

      </View>
    )
  }

  const PopupMenuExample = (PublicDownloadUrl) => {
    console.log("typeofurl", typeof PublicDownloadUrl, PublicDownloadUrl);

    return (
      <View style={{ flex: 1 }}>
        <Menu >
          <MenuTrigger >
            <Image
              source={require('../../assets/dots.png')}
              style={{ alignSelf: "center" }}
            />
          </MenuTrigger>
          <MenuOptions style={{ borderWidth: 1, borderColor: "lightgray", borderRadius: 5 }} >
            {/* <MenuOption onSelect={() => navigation.navigate('DocumentScreen', { base64: base64, type: type })}>
                  <Text>View</Text>
                </MenuOption> */}
            <MenuOption onSelect={() => {
              if (PublicDownloadUrl.PublicDownloadUrl !== undefined) {
                const updatedUrl = PublicDownloadUrl.PublicDownloadUrl.replace("/", "");
                navigation.navigate('WebViewDownload', { uri: updatedUrl })
                // requestStoragePermission(updatedUrl,type)
              }
            }
            }>
              <Text>View</Text>
            </MenuOption>
            <MenuOption onSelect={() => {
              if (PublicDownloadUrl.PublicDownloadUrl !== undefined) {
                const updatedUrl = PublicDownloadUrl.PublicDownloadUrl.replace("/", "");
                navigation.navigate('WebViewDownload', { uri: updatedUrl })
                // requestStoragePermission(updatedUrl,type)
              }
            }
            }>
              <Text>Download</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const PopupMenuSecond = ({ PublicDownloadUrl, base64, type, index }) => {

    return (
      <View style={{ flex: 1 }}>
        <Menu >
          <MenuTrigger >
            <Image
              source={require('../../assets/dots.png')}
              style={{ alignSelf: "center" }}
            />
          </MenuTrigger>
          <MenuOptions style={{ borderWidth: 1, borderColor: "lightgray", borderRadius: 5 }} >
            <MenuOption onSelect={() => navigation.navigate('DocumentScreen', { base64: base64, type: type })}>
              <Text>View</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const formatDate = (inputDate) => {
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    // setFormatedExeDate( `${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };



  const validateInput = () => {
    if (date !== '' && revisionDate !== null && description !== "") {
      ExeDateUpdate();
    } else {
      Alert.alert("select test type and enter description")
    }
  }

  console.log("date revsiondate>>>", formatDate(date), formatDate(revisionDate));

  const ExeDateUpdate = async () => {
    let data = {};
    data.LessonPlanExecutionId = LPExecutionId;
    data.TeacherExecutionDate = formatDate(date);
    data.Status = "Completed";
    data.Remarks = description

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyLpExecutionDateUpdate`, {
      method: 'PATCH',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let ExeDateUpdate = await response.json()
    console.log("ExeDateUpdate", ExeDateUpdate);
 Alert.alert(
          "Successful",
      "Uploaded sucessfully",
       [{text: 'OK', onPress: () => setDescription('')}]
       )

  }

  const handleTouchableOpacity = () => {
    Linking.openURL(final?.lessonPlanExecutions?.ZoomLink);
  };

  const validateTest = () => {
    if(final !== ''){
      const newArray = final?.testResponses.map((item) => ({
        testId: item.testId,
        IsActive: true,
      }))
      setTestArray(newArray);
      FacultyTestActive()
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10 }}>
            <Image
              source={require('../../assets/orangebackarrow.jpg')}
              style={{ width: 40, height: 40, alignSelf: "center" }} />
          </TouchableOpacity>
          <Text style={{ color: "#1B2236", fontWeight: "500", fontSize: 16, marginLeft: 100, margin: 10 }}>Course Detail</Text>
        </View>

        <View style={{ marginTop: 20, marginHorizontal: 25 }}>
          <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Topic Name</Text>
          <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
            {final !== '' ?
              <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 40 }}>{final?.lessonPlanExecutions[0]?.TopicName}</Text>
              : null}
          </View>
        </View>

        <View style={{ marginTop: 20, marginHorizontal: 25 }}>
          <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Sub Topic Name</Text>
          <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
            {final !== '' ?
              <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 40 }}>{final?.lessonPlanExecutions[0]?.Subtopics}</Text>
              : null}
          </View>
        </View>

        <View style={{ marginTop: 20, marginHorizontal: 25 }}>
          <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Activity</Text>
          <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 ,height:"30%"}}>
            {final !== '' ?
              <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 40 }}>{final?.lessonPlanExecutions[0]?.Activity}</Text>
              : null}
          </View>
        </View>

        <View style={{ marginTop: 20, marginHorizontal: 25,bottom:"20%" }}>
          <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500",marginBottom:10 }}>Assignment</Text>
          {final !== '' ?
            final?.testResponses.map((item) =>
            <View>
            <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 5, flexDirection: "row" }}>
    
              <View style={{ width: "80%", flexDirection: "row" }}>
                <Text style={{ color: "#242634", fontSize: 14, fontWeight: "500", margin: 5 }}>{item?.LessonPlan} - </Text>
                <Text style={{ color: "#242634", fontSize: 14, fontWeight: "500", margin: 5 }}>{item?.assignmentTitle}</Text>
              </View>
              <MenuProvider>
                <View style={{ height: 50, top: 5, }}>
                  <PopupMenuExample PublicDownloadUrl={item?.PublicDownloadUrl} />
                </View>
              </MenuProvider>
            </View>
            <View style={{ height: 1, width: "100%", backgroundColor: "#EBEFF2" }} />
    
          </View>
            )
            : null}

          {Status === "Completed" && final?.testResponses?.length > 0 ?
            <View style={{ width: "100%", backgroundColor: "#F5F7FB", }}>

              <TouchableOpacity
               disabled={!assignEnable}
                onPress={() => validateTest()}
                style={{ backgroundColor: assignEnable ? "#F38216" : "gray", width: "40%", padding: 10, alignSelf: "center", alignItems: "center", borderRadius: 5, marginTop: 20, margin: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "600" }}>Assign</Text>
              </TouchableOpacity>

            </View>
            : null}
        </View>

        <View style={{  marginTop: "10%", marginHorizontal: 25,bottom:"20%" }}>
          <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500",marginBottom:10 }}>Content</Text>
          {Array.isArray(retrievedData) && retrievedData.length > 0 ? (
            retrievedData.map((item, index) => (
              <View key={index} style={{ backgroundColor: "#F5F7FB", width: "100%", flexDirection: "row", paddingBottom: 5, justifyContent: "space-evenly", alignItems: "center", alignSelf: "center" }}>

                <Text style={{ margin: 5, width: "75%", color: "#242634", fontSize: 14, fontWeight: "500" }}>{item?.filename.length > 25 ? item?.filename.substring(0, 25) + "..." : item.filename}</Text>
                <MenuProvider>
                  <View style={{ height: 35, top: 15 }}>
                    <PopupMenuSecond PublicDownloadUrl={item?.PublicDownloadUrl} base64={item?.content} type={item?.Type} index={-1} />
                  </View>
                </MenuProvider>
              </View>
            ))
          ) : null}
        </View>

       { final !== '' && final?.lessonPlanExecutions[0]?.Status === "Completed" ? 
          <View style={{ marginTop: 20, marginHorizontal: 25,bottom:"20%" }}>
          <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Status</Text>
          <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
            {final !== '' ?
              <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 40 }}>{final?.lessonPlanExecutions[0]?.Status}</Text>
              : null}
          </View>
        </View>: null
       }

        {/* <TouchableOpacity
          onPress={touchableEnable ? handleTouchableOpacity : null}
          disabled={!touchableEnable}
          style={{ backgroundColor: touchableEnable ? "#F38216" : "gray", width: "35%", alignSelf: "center", alignItems: "center", marginBottom: "20%", padding: 10, borderRadius: 5 }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "600" }}>Join Now</Text>
        </TouchableOpacity> */}

        <View style={{  bottom: "18%",marginHorizontal:25 }}>
          <View>
            <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500", }}>Execution</Text>
            <View style={{ width: "100%", flexDirection: "row", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10, borderRadius: 5 }}>
              <Image
                style={{ width: 18, height: 20, }}
                source={require('../../assets/Calendarblack.png')} />
              {Status === "Completed" && final !== '' ?
                <Text style={{ color: "#1B2236", fontSize: 16, fontWeight: "400", marginLeft: 5 }}>{moment(final?.lessonPlanExecutions[0]?.RevisionDate).format('DD/MM/YY')}</Text>
                :
                //  showDatePicker ?
                <View>
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <Text >  {formatDate(date)}</Text>
                  </TouchableOpacity>
                  {open && (
                    <DatePicker
                      date={date}
                      mode="date"
                      onDateChange={(selectedDate) => { [setOpen(false), setDate(selectedDate)] }}
                      onCancel={() => setOpen(false)}
                    />
                  )}
                </View>
              }
            </View>
          </View>
          {/* <View style={{}}>
            <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Revision</Text>
            <View style={{ width: "100%", flexDirection: "row", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10, borderRadius: 5 }}>
              <Image
                style={{ width: 18, height: 20, }}
                source={require('../../assets/Calendarblack.png')} />
              {Status === "Completed" && final !== '' ?
                <Text style={{ color: "#1B2236", fontSize: 16, fontWeight: "400", marginLeft: 5 }}>{moment(final?.lessonPlanExecutions[0]?.DateofCompletion).format('DD/MM/YY')}</Text>
                :
                <View>
                  <TouchableOpacity onPress={() => setRevisionOpen(true)}>
                    <Text >  {formatDate(revisionDate)}</Text>
                  </TouchableOpacity>
                  {revisionOpen && (
                    <DatePicker
                      date={revisionDate}
                      mode="date"
                      style={{ height: 200, marginRight: 90 }}
                      onDateChange={(selectedDate) => { [setRevisionOpen(false), setRevisionDate(selectedDate)] }}
                      onCancel={() => setRevisionOpen(false)}
                    />
                  )}
                </View>
              }
            </View>
          </View> */}
        </View>


        <View style={{ marginHorizontal: 25, bottom: "15%",marginBottom:"60%"}}>
          <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Feedback</Text>
          <View style={{ width: "100%", backgroundColor: "#F5F7FB", height: 145, marginTop: 10 }}>
            {final !== '' && Status === "Completed" ?
              <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginHorizontal: 40, textAlign: "justify", }}>{final?.lessonPlanExecutions[0]?.Remarks}</Text>
              :
              <TextInput
                placeholder='Type Message'
                placeholderTextColor={"#C8C6C6"}
                onChangeText={text => setDescription(text)}
                value={description}
                style={{ width: 290, height: 175, borderColor: "#F38216", textAlign: "center", textAlignVertical: "top" }} />
            }
          </View>
        </View>



        <TouchableOpacity
          disabled={!date || revisionDate === null || description === ''}
          onPress={() => validateInput()}
          style={[styles.saveButton, !date || revisionDate === null || description === '' && styles.disabledButton,{bottom:"30%"}]}

        // style={{ backgroundColor: "#F38216", width: "35%", alignSelf: "center", alignItems: "center", marginBottom: "20%", padding: 10, borderRadius: 5 }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "600" }}>Submit</Text>
        </TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  )
}
export default FacultyCourseSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  saveButton: {
    backgroundColor: '#F38216',
    width: "35%", alignSelf: "center", alignItems: "center", marginBottom: "20%", padding: 10, borderRadius: 5
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
    width: "35%", alignSelf: "center", alignItems: "center", marginBottom: "20%", padding: 10, borderRadius: 5
    // Add a different style for the disabled button
  },
})