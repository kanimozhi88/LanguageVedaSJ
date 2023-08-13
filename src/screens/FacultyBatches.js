import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import { getCourseApiResult } from '../../redux/actions';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  SafeAreaView,
  SectionList,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import moment from 'moment';

const FacultyBatches = ({navigation}) => {
  

  const dispatch = useDispatch();
  // const courseApiResult = useSelector(state => state.Result)
  // console.log("stored course api result is", courseApiResult);

  const [final, setFinal] = useState();
  const [courseName,setCourseName] = useState([]);

  const dataFetchApi = useSelector(state => state.recordId);
  console.log("DATAFETCH",dataFetchApi);
  const dataLastName = useSelector(state => state.LastName);
  const dataEmail = useSelector(state => state.Email);
  const dataPhone = useSelector(state => state.Phone);

  useEffect(() => {
    // if (courseApiResult == undefined) {
    //   console.log("calling course API call");
      CourseApiCall();
    // }
  }, []);


  const onClickZoomLink=(item) =>{
    if(item.ZoomLink){
      Linking.openURL(item?.ZoomLink)
    }
  }
  const CourseApiCall = async () => {
    let data = {};
    data.contactId =  dataFetchApi;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyBatchDisplay`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let courseresult = await response.json()
    console.log(" faculty COURSE API RES",courseresult);
    setFinal(courseresult);
    console.log("final data is", final)
    // dispatch(getCourseApiResult(courseresult?.Result));
    
  }


  const renderItem = ({ item,index }) => {
    return (
        <View style={{height:151}}>
            <TouchableOpacity 
            onPress={()=> navigation.navigate('FacultyCourseBatch',{batchId: item?.Course_Offering_Id,courseName: item?.Course_Name})}
            style={[styles.rectangle, { backgroundColor: "#F5F7FB",width:156, }]} >
                <Text style={{color:"#727272",fontSize:20,fontWeight:"600",margin:5}}>B {index+1}</Text>
                <Text style={[{ fontWeight: "500", color: "#000000",  fontSize:15 ,margin:5}]}>{item?.Course_Name}</Text>
              <View style={{flexDirection:"row",marginTop:"35%",margin:5}}>
               <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Image
                style={{width:18,height:18}}
                source={require('../../assets/Profileorange.png')}/>
                <Text style={[{ fontWeight: "400", color: "#F28018",fontSize:12 }]}>{item?.Enrolled_Students} Students</Text>
                </View>
               
                <Text style={{ color: "#B2B2B2",fontWeight:"500",fontSize:12,fontFamily:"Poppins",marginLeft:10}}>{item?.Start_Time}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

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
        <Text style={{ color: "#1B2236", fontWeight: "600", fontSize: 16, marginLeft: 100, margin: 10 }}>My class</Text>
      </View>

      <FlatList
                data={final}
                renderItem={renderItem}
                numColumns={2}
                style={{ alignSelf: "center",margin:10,}}
            />

          
    </SafeAreaView>

  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
    // paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
  },
  rectangle: {
     
    width: 170,
    height: 140,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    // justifyContent: 'center',
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
  contentStyle: {
    marginTop: 10,
    backgroundColor: "#ffe0b2",
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,

    borderWidth: 2, borderColor: "red",
  },
  titleStyle: {
    color: "red",
    fontSize: 15
  },
  contentContainer: {
    width: "80%"
  }
  
});

export default FacultyBatches;