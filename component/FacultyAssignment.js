import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../redux/actions';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';

const FacultyAssignment = ({batchid }) => {

  const [final, setFinal] = useState();
  const dataFetchApi = useSelector(state => state.recordId);
  const navigation = useNavigation();

  console.log("DATAFETCH", dataFetchApi);
  
  useEffect(() => {
    FacultyAssignmentApi();
  }, []);

  const FacultyAssignmentApi = async () => {
    let data = {};
    data.batchid = batchid;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNBatchTestDetails`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let FacultyAssignment = await response.json()
    console.log(" facultyasignment API RES",   FacultyAssignment);
    setFinal(FacultyAssignment);
    console.log("final data is", final)
  }


 

  const renderlist=({item,index})=>{
    return(
        <TouchableOpacity
        onPress={()=> navigation.navigate('FacultyAssignmentSelect',{LPExecutionId: item?.lpExecutionId,assignmentTitle:item?.assignmentTitle })}
        style={{ width: "90%",backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10,elevation:5 }}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={{flexDirection:"row"}}>
                <Text style={{ color: "black", fontSize: 16, fontWeight: "500", margin: 10 }}>LN {index+1}-</Text>
                <Text style={{ color: "black", fontSize: 16, fontWeight: "500", margin: 10}}>{item?.assignmentTitle}</Text>
                </View>
               <View style={{flexDirection:"row",marginRight:20}}>
                <Text style={{ fontSize: 16, fontWeight: "500", color:"#B2B2B2"}}>Batch:</Text>
                <Text style={{ fontSize: 16, fontWeight: "500",color:"#F38216"}}>B1</Text>
                </View>
                

                </View>
                <View style={{flexDirection:"row",margin:10}}>
                <Text style={{fontSize:14,fontWeight:"500",color:"black"}}>Assignment No: </Text>
                <Text style={{fontSize:14,fontWeight:"500",color:"#F38216"}}>{item?.lessonPlan}</Text>

                </View>
                <View style={{flexDirection:"row",margin:5}}>
               <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Image
                style={{width:18,height:18}}
                source={require('../assets/Profile.png')}/>
                <Text style={[{ fontWeight: "400",fontSize:12 }]}>{item?.enrolledStudents} Students</Text>
                </View>
                <Text style={{color:"black",fontSize:14,fontWeight:"400",marginLeft:"40%"}}>Subject:</Text>
                <Text style={{ color: "#B2B2B2",fontWeight:"500",fontSize:12,fontFamily:"Poppins",marginLeft:10}}>{item?.courseName}</Text>
                </View>
     </TouchableOpacity>
    )
  }
  return (

    <SafeAreaView style={styles.container}>
     

<View style={{height:530}}>

<FlatList
data={final?.tests}
renderItem={renderlist}
/>
  </View>     

    </SafeAreaView>
  )
}
export default FacultyAssignment;

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
  courseName:{ color: "#84827F", fontSize: 16, fontWeight: "600",margin:5},
})