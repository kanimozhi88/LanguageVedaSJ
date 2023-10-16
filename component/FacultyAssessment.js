import React, { useEffect, useState, } from 'react';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../redux/actions';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import BASE_URL from '../apiConfig';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

const FacultyAssessment = ({ batchid }) => {

  const [final, setFinal] = useState();
  const dataFetchApi = useSelector(state => state.recordId);
  const navigation = useNavigation();

  console.log("batchid>>>>>>>>>>>>s", batchid);

  useEffect(() => {
    FacultyAssessemntApi();
  }, []);

  const FacultyAssessemntApi = async () => {
    let data = {};
    data.batchId = batchid;
    // data.batchId = "a0D1e000002MS5BEAW"

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`${BASE_URL}/services/apexrest/RNFacultyAssignAssessmentContollers`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let FacultyAssessment = await response.json()
    console.log("FacultyAssessment API RES", FacultyAssessment);
    setFinal(FacultyAssessment);
  }

    
  const FacultyTestActive = async (testId,status) => {
   console.log("tesid>>>>>>>>>>>>>>",testId,status)
   const existingArray = [];
    const testArray = {
      testId : testId,
      isActive : true,
      status : status
    }
    existingArray.push(testArray);
    let data = {};
    data.patchDataList = existingArray;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`${BASE_URL}/services/apexrest/RNFacultyTestActive`, {
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
    Alert.alert(" Test Assigned successfully")
   }
  }



  const renderlist = ({ item, index }) => {
    return (
      <View
        // onPress={() => navigation.navigate('FacultyAssignmentSelect', { LPExecutionId: item?.lpExecutionId, assignmentTitle: item?.assignmentTitle })}
        style={{ width: "90%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, elevation: 5 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#130F26", fontSize: 15, fontWeight: "500", marginTop: 10, marginLeft: 10 }}>LN {index + 1}-</Text>
            <Text style={{ color: "#130F26", fontSize: 15, fontWeight: "500", marginTop: 10 }}>{item?.assignmentTitle}</Text>
          </View>
          <View style={{ flexDirection: "row", marginRight: "5%", width: "25%" }}>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "#F38216", marginTop: 10 }}>Status:</Text>
            <Text style={{ fontSize: 10, fontWeight: "500", color: "#B9B9B9", marginTop: 12 }}>{item?.status !== null ? item?.status : `----`}</Text>
          </View>


        </View>
        <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
          <View style={{ flexDirection: "row", }}>
            <Text style={{ fontSize: 10, fontWeight: "500", color: "#130F26", marginTop: 3 }}>Planned Date:</Text>
            <Text style={{ fontSize: 13, fontWeight: "500", color: "#B9B9B9", }}> {item?.testDate}</Text>
          </View>

          <View style={{ flexDirection: "row", marginLeft: "10%" }}>
            <Text style={{ fontSize: 10, fontWeight: "500", color: "#130F26", marginTop: 3 }}>Execution Date:</Text>
            <Text style={{ fontSize: 13, fontWeight: "500", color: "#B9B9B9" }}> {item?.startDate !== null ? item?.startDate : null}</Text>
          </View>

        </View>
        <View style={{ flexDirection: "row", marginTop: 20, }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }}>
            <Image
              style={{ width: 18, height: 25, marginTop: 8 }}
              source={require('../assets/studentCountActive.png')} />
            <Text style={[{ fontWeight: "400", fontSize: 12, color: "#F38216", alignSelf: "center", marginLeft: 5, }]}>{item?.totalStudents} Student</Text>
          </View>

          <TouchableOpacity
          onPress={()=> FacultyTestActive(item?.testId, item?.Status)}
            disabled={item?.status === "In Progress" || item?.status === "Completed"}
            style={{ backgroundColor: (item?.status === "In Progress" || item?.status === "Completed") ? "#999999" : "#F38216", width: "25%", borderRadius: 3, alignItems: "center", marginLeft: 40, marginTop: 10, margin: 10, padding: 10 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600" }}>Publish</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() =>  navigation.navigate('Scrutinize',{LPExecutionId: item?.lessonPlanExId, assignmentTitle: item?.assignmentTitle,courseName : item?.courseName })}
            style={{ backgroundColor: "#F38216", width: "25%", borderRadius: 3, alignItems: "center", marginLeft: 15, marginTop: 10, margin: 10, padding: 5 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600",marginTop:3 }}>Scrutinize</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
  return (

    <SafeAreaView style={styles.container}>


      <View style={{ height: 530 }}>

        <FlatList
          data={final?.records}
          renderItem={renderlist}
        />
      </View>

    </SafeAreaView>
  )
}
export default FacultyAssessment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textLayout: {
    color: "#C8C6C6",
    width: "90%",
    textAlign: "justify",
    alignSelf: "center",
    fontSize: 13,
    fontWeight: "500"
  },
  seeMore: {
    color: "#D6387F",
    marginHorizontal: 20,
    fontSize: 13,
    fontWeight: "500"
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  LinearGradientStyl: {
    margin: 10,
    padding: 10,
    width: "90%",
    borderRadius: 15,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  courseName: {
    color: "#84827F",
    fontSize: 16,
    fontWeight: "600",
    margin: 5
  },
})