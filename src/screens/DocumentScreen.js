import React from 'react';
import { View, Text, Image } from 'react-native';
import PDFView from 'react-native-pdf';


const DocumentScreen = ({ props, route }) => {
    console.log("PARAM VALUE", route.params.type);
    console.log("Base64 passed value", route.params.base64);
    return (
        <View style={{flex:1}}>
            {route.params.type == 'image' ?
                <Image
                    source={{ uri: `data:image/png;base64,` + route.params.base64 }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode='contain'
                />
                :
                <PDFView
                    source={{ uri: `data:application/pdf;base64,${route.params.base64}` }}
                    style={{ width: "100%", height: "100%" }}
                />
            }
        </View>
    )
};

export default DocumentScreen;