import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../redux/actions';
import * as Progress from 'react-native-progress';
import { isDate } from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PieChart from 'react-native-pie-chart';
import { useNavigation } from '@react-navigation/native';




const StudentCourseAssignment = ({ batchId, courseName }) => {

    // console.log("batchid is", batchid);
    // const {CourseName, batchId} = route.params;
    const navigation = useNavigation();

    const [totalNum, setTotalNum] = useState(0);
    const [average, setAverage] = useState(0);
    const [percentage, setPercentage] = useState(0);
    // const [count,SetCount] = useState(0);
    const dataFetchApi = useSelector(state => state.recordId);
    const [final, setFinal] = useState('');
    const [loading, setLoading] = useState(false);
    const [seriesArr,setSeriesArr] = useState({
        completed:1,
        submitted:1,
        InProgress:1,
        Redo:1
    });



    useEffect(() => {
        StudentCurriculumApiCall();
    }, [])
 
    useEffect(()=>{
        getPieChartStatus();
    },[final])

    const StudentCurriculumApiCall = async () => {
        let data = {};
        data.contactId = dataFetchApi;
        data.batchId = batchId;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/testassignmentController`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let assignmentresult = await response.json()
        console.log("student course Assignment", assignmentresult);
        const { records } = assignmentresult;
        //   setFinal(assignmentresult.records);
        // const records = assignmentresult.records;
        console.log("student course Assignment records", records);
        setFinal(records);
    }
    console.log("final value", final)

    const statusOrder = ["Assignment Submitted", "Vetting In Progress", "Redo", "Completed"];
    if(final !== ''){
    const sortedData = final.sort((a, b) => {
        const statusA = statusOrder.indexOf(a.status);
        const statusB = statusOrder.indexOf(b.status);
        return statusA - statusB;
      });
      console.log("sorted data is",sortedData);

    }

    const getPieChartStatus = ()=>{
    let completedCount = 0;
    let redoCount = 0;
    let vettingInProgressCount = 0;
    let assignmentSubmittedCount = 0;
    {final !== '' && final.length > 0 ?
    final.forEach(record => {
      switch (record.status) {
        case 'Completed':
          completedCount++;
          break;
        case 'Redo':
          redoCount++;
          break;
        case 'Vetting In Progress':
          vettingInProgressCount++;
          break;
        case 'Assignment Submitted':
          assignmentSubmittedCount++;
          break;
        default:
          break;
      }
    }) : null
    
}
// setSeriesArr({...seriesArr,completed:completedCount,submitted:assignmentSubmittedCount,InProgress:vettingInProgressCount,Redo:redoCount})
setSeriesArr({
    completed: completedCount,
    submitted: assignmentSubmittedCount,
    InProgress: vettingInProgressCount,
    Redo: redoCount,
  });
}

    
    console.log('Completed Count:', seriesArr.completed);
    console.log('submitted Count:', seriesArr.submitted);
    console.log('Vetting In Progress Count:', seriesArr.InProgress);
    console.log('redo Submitted Count:', seriesArr.Redo);
    const widthAndHeight = 145
    const series = [seriesArr.completed, seriesArr.submitted, seriesArr.InProgress, seriesArr.Redo]
    // const series = [1,0,0,0]
    const sliceColor = ['#9B88ED', '#04BFDA', '#FB67CA', '#FFA84A']

    const renderItem = ({ item, index }) => {

        return (
            // <View></View>
            <TouchableOpacity
            onPress={()=>{navigation.navigate('StudentAssignmentUpload',{testId:item.id})}}
                style={{ width: "99%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, elevation: 5, padding: 10, }}>
                <View style={{ flexDirection: "row",alignItems:"center", justifyContent:"space-around"}}>
                    <Image
                        style={{}}
                        source={require('../assets/langicon.png')} />

                    <Text numberOfLines={2} style={{ color: "black", fontSize: 16, fontWeight: "500", margin: 10,alignSelf:"center",width:100 }}>{item.assignmentTitle}</Text>
               
                <View
                    style={{
                        width: 89,backgroundColor: item.status === "Vetting In Progress" ?
                            "#FF9533" :
                            item.status === "Completed" ?
                                "#67CB65" :
                                item.status === "Redo" ? "#E74444" : item.status === "Assignment Submitted" ? "#84d3f0" : "red", borderRadius: 10,
                    }}
                >
                    {item.status === "Vetting In Progress" ?
                        <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}>In-Progress</Text> :
                        item.status === "Completed" ?
                            <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}>Completed</Text> :
                            item.status === "Redo" ? <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}> Redo</Text> :
                                item.status === "Assignment Submitted" ?
                                    <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}>Submitted</Text> : <></>}

                </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        // <View></View>
        <View style={{ flex: 1 }}>

            <LinearGradient
                colors={['#F38216', '#D33189']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ margin: 10, padding: 10, width: "85%", borderRadius: 15, alignSelf: "center", flexDirection: "row", justifyContent: "space-around", }}
            >

                <View>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>{courseName}</Text>
                 <View style={{flexDirection:"row",marginTop:10}}>
                 <View style={{width: 13,height:13,backgroundColor:"white",borderRadius:7,alignItems:"center",justifyContent:"center",alignSelf:"center",}}>
                 <View style={{width:9,height:9,backgroundColor:"#9B88ED",borderRadius:5,margin:2}}>
                    </View>
                    </View>
                    <Text style={{fontSize:12,fontWeight:400,color:"white",alignSelf:"center",marginHorizontal:10}}>Completed</Text>
                    <Text style={{fontSize:12,fontWeight:400,color:"white",}}>({seriesArr.completed})</Text>
                    </View>

                    <View style={{flexDirection:"row",marginTop:10}}>
                 <View style={{width: 13,height:13,backgroundColor:"white",borderRadius:7,alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
                 <View style={{width:9,height:9,backgroundColor:"#04BFDA",borderRadius:5,margin:2}}>
                    </View>
                    </View>
                    <Text style={{fontSize:12,fontWeight:400,color:"white",alignSelf:"center",marginHorizontal:10}}>Submitted</Text>
                    <Text style={{fontSize:12,fontWeight:400,color:"white",}}>({seriesArr.submitted})</Text>
                    </View>

                    <View style={{flexDirection:"row",marginTop:10}}>
                 <View style={{width: 13,height:13,backgroundColor:"white",borderRadius:7,alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
                 <View style={{width:9,height:9,backgroundColor:"#FB67CA",borderRadius:5,margin:2}}>
                    </View>
                    </View>
                    <Text style={{fontSize:12,fontWeight:400,color:"white",alignSelf:"center",marginHorizontal:10}}>In-Progress</Text>
                    <Text style={{fontSize:12,fontWeight:400,color:"white",}}>({seriesArr.InProgress})</Text>
                    </View>

                    <View style={{flexDirection:"row",marginTop:10}}>
                 <View style={{width: 13,height:13,backgroundColor:"white",borderRadius:7,alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
                 <View style={{width:9,height:9,backgroundColor:"#FFA84A",borderRadius:5,margin:2}}>
                    </View>
                    </View>
                    <Text style={{fontSize:12,fontWeight:400,color:"white",alignSelf:"center",marginHorizontal:10}}>Redo</Text>
                    <Text style={{fontSize:12,fontWeight:400,color:"white",}}>({seriesArr.Redo})</Text>
                    </View>

                    <View style={{flexDirection:"row",marginTop:10}}>
                    <Text style={{fontSize:12,fontWeight:400,color:"white",alignSelf:"center",marginHorizontal:22}}>Total</Text>
                    <Text style={{fontSize:12,fontWeight:400,color:"white",}}>({seriesArr.completed + seriesArr.submitted + seriesArr.InProgress + seriesArr.Redo})</Text>
                    </View>

                </View>
                <View>

  {seriesArr.completed !== 0 || seriesArr.submitted !== 0 || seriesArr.InProgress !== 0 || seriesArr.Redo ?
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                        coverRadius={0.55}
                    />  : <></> }

                </View>

            </LinearGradient>

            <Text style={{ color: "#F38216", fontSize: 16, fontWeight: "600", margin: 20 }}>{courseName}</Text>
            {final !== '' && final !== undefined ?
            <View style={{height:340}}>
                <FlatList
                    data={final}
                    renderItem={renderItem}
                />
                </View>
                 : null}
        </View>
    )
};
export default StudentCourseAssignment;