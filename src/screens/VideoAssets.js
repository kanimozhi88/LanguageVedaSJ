import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import BASE_URL from '../../apiConfig';

const VideoAssets = ({ navigation }) => {


    const [final, setFinal] = useState();
    const dataFetchApi = useSelector(state => state.recordId);
    const recordType = useSelector(state => state.recordType);

    useEffect(() => {
        if (recordType == "Student") {
            studentVideoAssets();
        } else if (recordType == "Faculty") {
            facultyVideoAssets();
        } else if (recordType == "Parent") {

        }
    }, []);


    const studentVideoAssets = async () => {
        let data = {};
        data.contactId = dataFetchApi;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`${BASE_URL}/services/apexrest/RNCourseDisplay`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let studentVedioAssets = await response.json()
        console.log(" studentVedioAssets API RES", studentVedioAssets);
        setFinal(studentVedioAssets);
        console.log("final data is", final)
    }

    const facultyVideoAssets = async () => {
        let data = {};
        data.contactId = dataFetchApi;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`${BASE_URL}/services/apexrest/RNFacultyBatchDisplay`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let facultyVedioAssets = await response.json()
        console.log("  facultyVedioAssets API RES", facultyVedioAssets);
        setFinal(facultyVedioAssets);
        console.log("final data is", final)
    }


    const renderItem = ({ item, index }) => {
        return (
            <View style={{ height: 151 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ViewVideoAssets', { courseId : item?.courseId , Course_Name : recordType === "Faculty" ? item?.Course_Name : recordType === "Student" ? item?.CourseName : null})}
                    style={[styles.rectangle, { backgroundColor: recordType === "Faculty" ? item?.Background_Color : recordType === "Student" ? item?.BackgroundColor : null, width: 156, }]} >
                    <Text style={[{ fontWeight: "500", color: "#FFFFFF", fontSize: 15, marginLeft: 30, marginTop: 40 }]}>{recordType === "Faculty" ? item?.Course_Name : recordType === "Student" ? item?.CourseName : null}</Text>
                    <View style={{flexDirection:"row",marginTop:40,alignItems:"center"}}>
                        <Image
                            style={{ width: 16, height: 16,marginLeft:10 }}
                            source={require('../../assets/Play.png')} />
                        <Text style={[{ fontWeight: "500", color: "#FFFFFF", fontSize: 15,marginLeft:5 }]}>{item?.totalVideos} Videos</Text>

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
                <Text style={{ color: "#1B2236", fontWeight: "600", fontSize: 16, marginLeft: 100, margin: 10 }}>Video Assets</Text>
            </View>

            <FlatList
                data={final}
                renderItem={renderItem}
                numColumns={2}
                style={{ alignSelf: "center", margin: 10, }}
            />

        </SafeAreaView>

    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    rectangle: {

        width: 170,
        height: 140,
        margin: 10,
        borderRadius: 10,
        elevation: 5,
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

export default VideoAssets;