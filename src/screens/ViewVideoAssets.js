import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../../redux/actions';
import WebView from "react-native-webview";
import VideoPlayer from 'react-native-video-player';
import BASE_URL from '../../apiConfig';

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';

const ViewVideoAssets = ({ navigation, route }) => {

    const [final, setFinal] = useState();
    const { courseId, Course_Name } = route.params;
    const [showWebView, setShowWebView] = useState(false);
    const [webviewUri, setWebviewUri] = useState(null);

    useEffect(() => {
        viewVideoAssets();
    }, []);


    const viewVideoAssets = async () => {
        let data = {};
        data.courseId = courseId;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`${BASE_URL}/services/apexrest/VideoAssetDisplay`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let viewVedioAssets = await response.json()
        console.log("  viewVedioAssets API RES", viewVedioAssets);
        setFinal(viewVedioAssets);
    }


    const renderItem = ({ item, index }) => {
        return (
            <View style={{ height: 151, flexDirection: "row" }}>
                <VideoPlayer
                    video={{ uri: item?.videoLink}}
                    videoWidth={1600}
                    videoHeight={900}
                    onError={(error) => console.error('VideoPlayer Error:', error)}
                    thumbnail ={require("../../assets/thumbnail.jpg")}
                    autoPlay ={true}
                />
                
                <TouchableOpacity
                    onPress={() => navigation.navigate('WebViewScreen', { link: item?.videoLink })}
                    style={{ marginLeft: 10, marginTop: 40, width: "40%" }}>
                    <Text numberOfLines={2}
                        style={{ textDecorationLine: 'underline', color: "#000000", fontSize: 10, fontWeight: "500", lineHeight: 24 }} >
                        {item?.VideoName}
                    </Text>
                    <Text numberOfLines={2}
                        style={{color: "#000000", fontSize: 10, fontWeight: "500", lineHeight: 24 }} >
                        {item?.videoDescription}
                    </Text>
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
            <Text style={{ marginHorizontal: 20, marginTop: 20, color: "#4D4C4B", fontSize: 16, fontWeight: "600" }}>{Course_Name}</Text>
            <FlatList
                style={{ marginHorizontal: 5, width: "90%" }}
                data={final}
                renderItem={renderItem}
            />
           {showWebView ? 
        <WebView
          source={{ uri: webviewUri }}
          style={{ flex: 1,height:"100%" }}
        />
        : null
           }

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

export default ViewVideoAssets;