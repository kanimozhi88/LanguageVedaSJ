import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import * as Progress from 'react-native-progress';
import { isDate } from 'moment';

const SpecificCurriculum = ({ route }) => {

    const dataLastName = useSelector(state => state.LastName);
    const dataEmail = useSelector(state => state.Email);
    const dataPhone = useSelector(state => state.Phone);
    const [totalNum,setTotalNum] = useState(0);
    const [average,setAverage] = useState(0);
    const [ percentage,setPercentage] = useState(0)
    const course = route.params.course;
    const courseId = route.params.courseId;
    const dataFetchApi = useSelector(state => state.recordId);
    const [final, setFinal] = useState('');
    console.log("Received course name is", course);
    console.log("REceived couseId is",courseId)
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        CurriculumApiCall();
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


    const CurriculumApiCall = async () => {
        let data = {};
        data.batchId = courseId;
        setLoading(true);
        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/StudentBatchlessonplans`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let curriculumresult = await response.json()
        console.log("Curriculum response in", curriculumresult);
        setFinal(curriculumresult);
        // dispatch(getCourseApiResult(courseresult?.Result));
        setLoading(false);
    }
    console.log("sum is", totalNum)
    const renderItem = ({ item, index }) => {
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
            <View style={{ flexDirection: "row", padding: 20 }}>
                <Image
                     style={{ width: 60, height: 60, borderRadius: 30 }}
                     source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                 <View style={{ marginLeft: 10 }}>
                     <Text style={{ fontWeight: "bold", color: "black" }}>{dataLastName}</Text>
                     <Text style={{ fontWeight: "bold", color: "black" }}>{dataEmail}</Text>
                     <Text style={{ fontWeight: "bold", color: "black" }}>{dataPhone}</Text>
                 </View>
            </View> 
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

            <Text style={{ color: "black", fontSize: 18, fontWeight: "900",margin:30 }}>{course}</Text>
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

    // return (
    //     <View style={{flex:1}}>
    //         <View style={{ flexDirection: "row", padding: 20 }}>
    //             <Image
    //                 style={{ width: 60, height: 60, borderRadius: 30 }}
    //                 source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
    //             <View style={{ marginLeft: 10 }}>
    //                 <Text style={{ fontWeight: "bold", color: "black" }}>{dataLastName}</Text>
    //                 <Text style={{ fontWeight: "bold", color: "black" }}>{dataEmail}</Text>
    //                 <Text style={{ fontWeight: "bold", color: "black" }}>{dataPhone}</Text>
    //             </View>
    //         </View>
    //         <View style={{ flexDirection: "row", marginLeft: 50 }}>
    //             {/* <Text>Goback</Text> */}
    //             <Image
    //                 source={require('../../assets/backarrow.png')}
    //                 style={{ backgroundColor: "orange", borderRadius: 15, width: 30, height: 30, alignSelf: "center" }} />
    //             <Image
    //                 source={require('../../assets/mycourse.png')}
    //                 style={{ backgroundColor: "orange", borderRadius: 15, width: 30, height: 30, alignSelf: "center" }} />
    //             <Text style={{ color: "#A22451", fontWeight: "800", fontSize: 16, alignSelf: "center", margin: 10 }}>COURSE CURRICULUM</Text>
    //         </View>

    //         <Text style={{ color: "black", marginLeft: 10, fontSize: 18, fontWeight: "900" }}>{course}</Text>

    //         {/* <TouchableOpacity
    //             style={{ width: "80%", backgroundColor: "lightblue", padding: 20, alignSelf: "center", borderRadius: 20, marginTop: 30 }}>
    //             <Text style={{ alignSelf: "center", color: "black", fontSize: 13, fontWeight: "700" }}>INTRODUCTION TO {course}</Text>
    //             <Progress.Bar progress={0.8} width={200} color='red' />
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //             style={{ width: "80%", backgroundColor: "lightblue", padding: 20, alignSelf: "center", borderRadius: 20, marginTop: 30 }}>
    //             <Text style={{ alignSelf: "center", color: "black", fontSize: 13, fontWeight: "700" }}>INTRODUCTION TO {course}</Text>
    //             <Progress.Bar progress={1} width={200} color='green' />
    //         </TouchableOpacity> */}

    //         {loading ? <ActivityIndicator size="large" color="pink"/> :
    //         final.length ?
    //             <FlatList
    //                 data={final}
    //                 renderItem={renderItem} /> : <Text style={{alignSelf:"center",fontWeight:"bold"}}>No courses available</Text>

    //         }
    //         {/* <View style={{ width: 550, height: 550, borderRadius: 250, backgroundColor: "#A22451", position: 'absolute', bottom: -800, left: -70 }} /> */}

    //     </View>
    // )
};
export default SpecificCurriculum;