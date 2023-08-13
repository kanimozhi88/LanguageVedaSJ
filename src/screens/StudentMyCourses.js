import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
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
} from 'react-native';
import moment from 'moment';

const StudentMyCourses = ({ navigation }) => {
   
    const dispatch = useDispatch();
    const courseApiResult = useSelector(state => state.Result)
    console.log("stored course api result is", courseApiResult);

    const [final, setFinal] = useState();
    const dataFetchApi = useSelector(state => state.recordId);
    console.log("DATAFETCH", dataFetchApi);

    useEffect(() => {
        CourseApiCall();
    }, []);

    const CourseApiCall = async () => {
        let data = {};
        data.Type = "Contact";
        data.contactid = dataFetchApi;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNCourseDisplay`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let courseresult = await response.json()
        console.log(" student MyCOURSE API RES", courseresult);
        setFinal(courseresult);
        console.log("final data is", final)
        // dispatch(getCourseApiResult(courseresult?.Result));

    }
    const renderItem = ({ item }) => {
        return (
            <View style={{height:151}}>
                <TouchableOpacity 
                onPress={()=> navigation.navigate('StudentCourseSelection',{batchId: item?.batchId,courseName: item?.CourseName})}
                style={[styles.rectangle, { backgroundColor: item?.BackgroundColor,width:152 }]} >
                    <View >
                        <Image source={require('../../assets/langicon.png')}
                            style={styles.imageStyle} />
                    </View>
                    <Text style={[{ fontWeight: "600", color: "white", marginBottom: 20, margin: 10, marginLeft: 30,fontSize:16 }]}>{item?.CourseName}</Text>
                    <Text style={{ color: "white", marginLeft: 30 ,fontWeight:"300",fontSize:10,fontFamily:"Poppins"}}>{moment(item?.startDate).format('MMMM DD, YYYY')}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity
                onPress={()=> navigation.goBack()} 
                style={{ width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10 }}>
                    <Image
                        source={require('../../assets/orangebackarrow.jpg')}
                        style={{ width: 40, height: 40, alignSelf: "center"}} />
                </TouchableOpacity>
                <Text style={{ color: "#F38216", fontWeight: "600", fontSize: 16, marginLeft: 100,margin:10 }}>My Courses</Text>
            </View>


            <FlatList
                data={final}
                renderItem={renderItem}
                numColumns={2}
                style={{ alignSelf: "center",margin:10, }}
            />

        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    rectangle: {
     
        width: 170,
        height: 140,
        margin: 10,
        borderRadius: 22,
        elevation: 5,
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        // marginBottom: 40,
        marginLeft: 8
    },
    imageStyle: {
        width: 30, 
        height: 30,
       marginLeft:10,
       bottom:10
    },
});

export default StudentMyCourses;