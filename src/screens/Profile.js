import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import { useNavigation } from '@react-navigation/native';

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
    TextInput,
    Alert,
} from 'react-native';
import moment from 'moment';
import { Dropdown } from "react-native-element-dropdown";


const Profile = ({navigation}) =>{
    const LastName = useSelector(state => state.LastName);
    const Email = useSelector(state => state.Email);
    const Phone = useSelector(state => state.Phone);
   
   
    return(
        <SafeAreaView style={styles.container}>
             <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10 }}>
                        <Image
                            source={require('../../assets/orangebackarrow.jpg')}
                            style={{ width: 40, height: 40, alignSelf: "center" }} />
                    </TouchableOpacity>
                    <Text style={{ color: "#F38216", fontWeight: "600", fontSize: 16, marginLeft: 100, margin: 10 }}>Profile</Text>
                </View>

        <View style={{ marginTop: "20%", marginHorizontal: 25 }}>
                    <Text style={{ color: "#979797", fontSize: 15, fontWeight: "500" }}>Name</Text>
                    <View style={{ width: "70%",borderColor:"#979797",borderWidth:0.8, padding: 15, }}>
                        <Text style={{ color: "#1B2236", fontSize: 14, fontWeight: "500", marginHorizontal: 20 }}>{LastName}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <Text style={{ color: "#979797", fontSize: 15, fontWeight: "500" }}>E-Mail</Text>
                    <View style={{ width: "70%",borderColor:"#979797",borderWidth:0.8, padding: 15, }}>
                        <Text style={{ color: "#1B2236", fontSize: 14, fontWeight: "500", marginHorizontal: 20 }}>{Email}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <Text style={{ color: "#979797", fontSize: 15, fontWeight: "500" }}>PH No</Text>
                    <View style={{ width: "70%",borderColor:"#979797",borderWidth:0.8, padding: 15, }}>
                        <Text style={{ color: "#1B2236", fontSize: 14, fontWeight: "500", marginHorizontal: 20 }}>{Phone}</Text>
                    </View>
                </View>


    </SafeAreaView>
    )
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
})