import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet,SafeAreaView, FlatList } from 'react-native';
import { getAccessToken } from '../../redux/actions';
import moment from 'moment';


const FacultyAssignmentSelect = ({ route,navigation }) => {
    const { LPExecutionId, assignmentTitle } = route.params;
    console.log("received exeid", LPExecutionId);
    const [final, setFinal] = useState('');

    useEffect(() => {
        FacultyTeststatus();
    }, []);

    const FacultyTeststatus = async () => {
        let data = {};
        data.LessonPlanExId = LPExecutionId;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RnFacultyTestStatusofStudent`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let FacultyTeststatus = await response.json()
        console.log(" FacultyTeststatus API RES", FacultyTeststatus);
        setFinal(FacultyTeststatus);
        console.log("final data is", final)
    }

    const renderTestStatus = ({item,index})=>{
        return(
<TouchableOpacity 
onPress={()=> navigation.navigate('SpecificStudentTestDetails',{Id: item?.Id,assignmentTitle:assignmentTitle,Status:item?.Status})}
style={{flexDirection:"row",padding:10,backgroundColor: (index+1)%2 === 0 ? "#F5F7FB" : "white"}}>
    <Text style={{width:"15%",marginLeft:40,color:"black"}}>{index+1}</Text>
    <Text style={{width:"25%",marginLeft:15,color:"black"}}>{moment(item?.TestDate).format('DD/MM/YYYY')}</Text>
    <Text numberOfLines={2} style={{width:"25%",color:"black"}}>{item?.ContactName}</Text>
    <Text style={{width:"25%",marginLeft:5,color: item?.Status == "Redo" ? "red" : item?.Status == "Completed" ? "green" :"black"}}>{item?.Status}</Text>
</TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backarrowView}>
                    <Image
                        source={require('../../assets/orangebackarrow.jpg')}
                        style={styles.backarrowImg} />

                </TouchableOpacity>
                <Text style={{ color: "#1B2236", fontSize: 16, fontWeight: "500", marginLeft: "5%", alignSelf: "center", marginTop: 10 }}>{assignmentTitle}</Text>
            </View>

  <View style={{flexDirection:"row",justifyContent:"space-around",backgroundColor:"#F5F7FB",marginTop:20 }}>
    <Text style={styles.txtStyle}>S.No</Text>
    <Text style={styles.txtStyle}> Date</Text>
    <Text style={styles.txtStyle}>Name</Text>
    <Text style={styles.txtStyle}>Status</Text>
  </View>

  <FlatList
  data={final}
  renderItem={renderTestStatus}/>


        </SafeAreaView>
    )
}

export default FacultyAssignmentSelect;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    txtStyle:{ color: "black", fontSize: 16, fontWeight: "500", margin: 10 },
    backarrowView: { width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10, marginTop: 10 },
    backarrowImg: { width: 40, height: 40, alignSelf: "center", borderRadius: 10 },
    indicatorStyl: { backgroundColor: '#D6387F', width: 45, marginLeft: 45 },
})