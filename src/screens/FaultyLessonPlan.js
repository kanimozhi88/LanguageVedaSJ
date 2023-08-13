import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import * as Progress from 'react-native-progress';
import { isDate } from 'moment';

const FacultyLessonPlan = ({ route }) => {

    
    const {CourseName, batchId} = route.params;
    const [totalNum,setTotalNum] = useState(0);
    const [average,setAverage] = useState(0);
    const [ percentage,setPercentage] = useState(0);
    // const [count,SetCount] = useState(0);
    const dataFetchApi = useSelector(state => state.recordId);
    const [final, setFinal] = useState('');
    const [loading,setLoading] = useState(false);
    console.log("passed coursname batcgid",CourseName,batchId);


    useEffect(() => {
        FacultyCurriculumApiCall();
    }, [])

    useEffect(()=>{
        let sum= 0;
       { final.length ?
        final.forEach(item => {
            sum += item.Progress;
            setTotalNum(sum);
    
        }) : null}
        setPercentage(((sum/(final?.length))/100).toFixed(2))
    },[final])

    const FacultyCurriculumApiCall = async () => {
        let data = {};
        data.CourseName = CourseName;
        // data.CourseName = "Malayalam";
        // data.batchId = "a0D1e000002Ip7MEAS";
        data.batchId = batchId;

        setLoading(true);
        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/lessonPlanExecutions`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let curriculumresult = await response.json()
        console.log("Faculty lessonPlan response in", curriculumresult);
        setFinal(curriculumresult);
        // dispatch(getCourseApiResult(courseresult?.Result));
        setLoading(false);
        // let sum= 0;
        // final.forEach(item => {
        //     sum += item.Progress;
        //     setTotalNum(sum);
            
        // });
        // const avg = totalNum/(final.length*100);
        // setAverage(totalNum/(final.length*100));
        // const percentageValue = (avg* 100).toFixed(0);
        // setPercentage(percentageValue);
    }
    

console.log("sum is", totalNum)

    const renderItem = ({ item, index }) => {
        // let avg = 0;
        // avg += item.Progress;
        // setPercentage(avg/final?.length)
        // console.log("avg value is", avg,percentage);
       
        return (
            <View>
            {/* <Progress.Bar progress={avg} width={230} color={item.Status == "yet To Start" ? 'blue' : item.Status == "In Progress" ? '#A22451' : item.Status == "Completed" ? 'green' : 0} style={{ backgroundColor: "white", margin: 3,alignSelf:"center" }} />
            <View style={{ flexDirection: "row", marginLeft: "60%" }}>
                <Text>{percentageValue}%</Text>
                <View style={{ width: 10, height: 10, backgroundColor: item.Status == "Yet To Start" ? 'blue' : item.Status == "In Progress" ? 'black' : item.Status == "Completed" ? 'green' : 0, margin: 5 }} />
                <Text style={{ color: "black", fontWeight: "600" }}>{item.Status}</Text>
            </View> */}


            <View
                style={{ width: "80%", backgroundColor: "#d0c6f5", alignSelf: "center", borderRadius: 20, marginTop: 30 }}>
                <View style={{ flexDirection: "row" }}>

                    <View>
                        <Text style={{ color: "#B7547F", fontSize: 39, fontWeight: "800", margin: 5 }}>{index + 1}.</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ color: "black", fontSize: 13, fontWeight: "700", margin: 10 }}>{item.TopicName}</Text>
                        <Progress.Bar progress={item.Progress/100} width={250} color={item.Status == "Yet To Start" ? 'blue' : item.Status == "In Progress" ? '#A22451' : item.Status == "Completed" ? 'green' : 0} style={{ backgroundColor: "white", margin: 3 }} />
                        <View style={{ flexDirection: "row", marginLeft: "60%" }}>
                            <View style={{ width: 10, height: 10, backgroundColor: item.Status == "Yet To Start" ? 'blue' : item.Status == "In Progress" ? 'black' : item.Status == "Completed" ? 'green' : 0, margin: 5 }} />
                            <Text style={{ color: "black", fontWeight: "600" }}>{item.Status}</Text>
                        </View>
                    </View>
                </View>
            </View>
            </View>
        )
    }

    return (
        <View style={{flex:1}}>
            
            <View style={{ flexDirection: "row", marginLeft: 50 }}>
                {/* <Text>Goback</Text> */}
                {/* <Image
                    source={require('../../assets/backarrow.png')}
                    style={{ backgroundColor: "orange", borderRadius: 15, width: 30, height: 30, alignSelf: "center" }} /> */}
                <Image
                    source={require('../../assets/mycourse.png')}
                    style={{ backgroundColor: "orange", borderRadius: 15, width: 30, height: 30, alignSelf: "center" }} />
                <Text style={{ color: "#A22451", fontWeight: "800", fontSize: 16, alignSelf: "center", margin: 10 }}>Lesson Plans</Text>
            </View>

            <Text style={{ color: "black", fontSize: 18, fontWeight: "900",margin:30 }}>{CourseName}</Text>
{!isNaN(percentage) ? 
<View>
            <Progress.Bar progress={percentage} width={270} style={{ backgroundColor: "white", margin: 3,alignSelf:"center" }} />
            <View style={{ flexDirection: "row", marginLeft: "60%" }}>
            <Text style={{ color: 'red' }}>{percentage * 100}%</Text>
            </View> 
            </View>: null}

            {loading ? <ActivityIndicator size="large" color="pink"/> :
            final.length ?
                <FlatList
                    data={final}
                    renderItem={renderItem} /> : <Text style={{alignSelf:"center",fontWeight:"bold"}}>No courses available</Text>

            }
            {/* <View style={{ width: 550, height: 550, borderRadius: 250, backgroundColor: "#A22451", position: 'absolute', bottom: -800, left: -70 }} /> */}

        </View>
    )
};
export default FacultyLessonPlan;