import React, { useEffect, useRef, useState } from 'react';
import { View, Text,Platform,PermissionsAndroid, StyleSheet, SafeAreaView, ImageBackground, Alert, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { getAccessToken } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import TruncatedText from '../../component/TruncatedText';

// import RNFetchBlob from 'react-native-fetch-blob';



const StudentCourseAssessment = ({ navigation, route }) => {

  // const [count,SetCount] = useState(0);
  const dataFetchApi = useSelector(state => state.recordId);
  const [final, setFinal] = useState('');
  const [retrievedData, setRetrievedData] = useState('');
  const { testId } = route.params;
  const [erroemsg, setErrorMsg] = useState('');
  const Normaloptions = ['Camera', 'Gallery', 'Document/pdf'];
  const actionSheetRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [images, setImages] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);
  const [uploadApi, setUploadApi] = useState(false);
  const [showSubmit,setShowSubmit] = useState(false);
  const recordId = useSelector(state => state.recordId);

  const scrollViewRef = useRef(null);

  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };


  useEffect(() => {
    StudentAssessmentUpload();
  }, [])

 

  const StudentAssessmentUpload = async () => {
    let data = {};
    data.testId = testId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNStudentSpecificTestDetails`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let assignmentresult = await response.json()
    console.log("student course Assessment upload", JSON.parse(assignmentresult));
    const val = JSON.parse(assignmentresult);
    setFinal(val?.TestDetails);
    
  }
  console.log("finaldara>>>>>>>>>>>",final);


  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10 }}>
          <Image
            source={require('../../assets/orangebackarrow.jpg')}
            style={{ width: 40, height: 40, alignSelf: "center" }} />
        </TouchableOpacity>
        <Text style={{ color: "#F38216", fontWeight: "600", fontSize: 16, marginLeft: 100, margin: 10 }}>Assessment</Text>
      </View>

      <ScrollView ref={scrollViewRef}>
        {final !== '' ?
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#1B2236", marginHorizontal: 20, marginTop: 30 }}>Instruction To Follow</Text>
            <HTML source={{ html: final?.Instructions }} />
          </View> : <></>}


          {final !== ''  ?
          <View>

            <Text style={{ fontSize: 16, fontWeight: "600", color: "#1B2236", marginHorizontal: 25, }}>Assignment</Text>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#1B2236", marginHorizontal: 30, }}>Topic : <Text style={{ fontSize: 14, fontWeight: "400", color: "#979797", marginHorizontal: 30, fontFamily: "Poppins" }}>{final?.AssignmentTitle}</Text></Text>
            </View>

            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#1B2236", marginHorizontal: 30, }}>Subject : <Text style={{ fontSize: 14, fontWeight: "400", color: "#979797", marginHorizontal: 30, fontFamily: "Poppins" }}>{final?.CourseName}</Text></Text>
            </View>

            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#1B2236", marginHorizontal: 30, }}>Last Date : <Text style={{ fontSize: 14, fontWeight: "400", color: "#979797", marginHorizontal: 30, fontFamily: "Poppins" }}>{final?.TestDate}</Text></Text>
            </View>
          </View> : <></>}

          {final !== '' ?
          <View style={{flexDirection:"row",marginTop:20,width:"100%",justifyContent:"space-between"}}>
        <Text style={{ fontSize: 14, fontWeight: "500", color: "#1B2236", marginHorizontal: 30, }}>Score : <Text style={{ fontSize: 14, fontWeight: "400", color: "#979797", marginHorizontal: 30, fontFamily: "Poppins" }}>{final?.TotalMarks}</Text></Text>
        <Text style={{ fontSize: 14, fontWeight: "500", color: "#1B2236", marginHorizontal: 30, }}>Status : <Text style={{ fontSize: 14, fontWeight: "400", color: "#979797", marginHorizontal: 30, fontFamily: "Poppins" }}>{final?.Status}</Text></Text>  
          </View>
          : null}

        <View style={{ width: "100%", alignSelf: "center" }}>
          {final !== '' ?
            <TruncatedText questions={final?.Questions} />
            : <></>}
        </View>

      
        {final !== '' ?
         <View style={{ marginHorizontal:25, marginTop:20}}>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "400" }}>Comments</Text>
          <View style={{ backgroundColor: "#C8C6C64A", padding: 15, marginTop: 10,borderRadius:5,width:296}}>
            <Text style={{color:"#000000",fontSize:14,fontWeight:"500"}}>{final?.feedBack}</Text>
          </View>
        </View> : null}

        {final !== '' && final?.Status === "Yet To Start" ?
          <TouchableOpacity
            onPress={() => navigation.navigate('StudentTakeAssessment', {testId: testId})}
            style={{ backgroundColor: "#F38216", width: "60%", alignSelf: "center", alignItems: "center", borderRadius: 5, padding: 10, marginTop: 25 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>Take Assessment</Text>
          </TouchableOpacity> : <></>}

          </ScrollView>


     
    </SafeAreaView>
  )
}
export default StudentCourseAssessment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // bottom:7
  },
})