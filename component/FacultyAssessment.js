import React, { useEffect, useState, } from 'react';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../redux/actions';
import { useNavigation } from '@react-navigation/native';

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
    data.batchid = batchid;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyAssignAssessmentContollers`, {
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




  const renderlist = ({ item, index }) => {
    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate('FacultyAssignmentSelect', { LPExecutionId: item?.lpExecutionId, assignmentTitle: item?.assignmentTitle })}
        style={{ width: "90%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, elevation: 5 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "black", fontSize: 16, fontWeight: "500", margin: 10 }}>LN {index + 1}-</Text>
            <Text style={{ color: "black", fontSize: 16, fontWeight: "500", margin: 10 }}>{item?.assignmentTitle}</Text>
          </View>
          <View style={{ flexDirection: "row", marginRight: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#B2B2B2" }}>Status:</Text>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#F38216" }}>{item?.status}</Text>
          </View>


        </View>
        <View style={{ flexDirection: "row", margin: 10 }}>
            <View style={{ flexDirection: "row", margin: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "black" }}>Planned Date</Text>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#F38216" }}>{item?.testDate}</Text>
          </View>

          <View style={{ flexDirection: "row", margin: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "black" }}>Execution Date</Text>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#F38216" }}>{item?.startDate}</Text>
          </View>

        </View>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Image
              style={{ width: 18, height: 18 }}
              source={require('../assets/Profile.png')} />
            <Text style={[{ fontWeight: "400", fontSize: 12 }]}>{item?.enrolledStudents} Students</Text>
          </View>

<TouchableOpacity>
    <Text>Publish</Text>
</TouchableOpacity>
<TouchableOpacity>
    <Text>Scrutinize</Text>
</TouchableOpacity>

        </View>
      </TouchableOpacity>
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