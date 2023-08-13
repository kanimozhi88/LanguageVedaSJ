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
    Modal,
} from 'react-native';
import moment from 'moment';
import { Dropdown } from "react-native-element-dropdown";


const TicketStatus = ({ navigation, route }) => {

    const recordId = useSelector(state => state.recordId);
    const [final, setFinal] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [reopencheck, setReopenCheck] = useState(false);
    const [description, setDescription] = useState('');
    const [reopenStatus,setReopenStatus] = useState(false);
    const [reopenRes,setReopenRes] = useState('');

    const { caseId } = route.params;

    useEffect(() => {
        TicketStatus();
    }, [])

    const TicketStatus = async () => {
        let data = {};
        data.caseId = caseId;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/LvSpecificCase`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let TicketStatusRes = await response.json()
        console.log("TicketStatusRes", TicketStatusRes);
        setFinal(TicketStatusRes);
    }

    const ReopenTicket = async () => {
        let data = {};
        data.caseId = caseId;
        data.Status = "Reopen";
        data.reopenDescription = description;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/LvReOpenSpecificCase`, {
            method: 'PATCH',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let ReopenTicketRes = await response.json()
        console.log("ReOpenTicketRes", ReopenTicketRes);
        setReopenRes(ReopenTicketRes);
        setReopenStatus(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10 }}>
                        <Image
                            source={require('../../assets/orangebackarrow.jpg')}
                            style={{ width: 40, height: 40, alignSelf: "center" }} />
                    </TouchableOpacity>
                    <Text style={{ color: "#F38216", fontWeight: "600", fontSize: 16, marginLeft: 100, margin: 10 }}>Ticket Status</Text>
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <Text style={{ color: "#F38216", fontSize: 15, fontWeight: "500" }}>Date</Text>
                    <View style={{ width: "80%", backgroundColor: "#EFEFEF", padding: 15, marginTop: 10 }}>
                        <Text style={{ color: "#1B2236", fontSize: 14, fontWeight: "500", marginHorizontal: 20 }}>{moment(final[0]?.createdDate).format('DD/MM/YYYY')}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <Text style={{ color: "#F38216", fontSize: 15, fontWeight: "500" }}>Ticket No</Text>
                    <View style={{ width: "80%", backgroundColor: "#EFEFEF", padding: 15, marginTop: 10 }}>
                        <Text style={{ color: "#1B2236", fontSize: 14, fontWeight: "500", marginHorizontal: 20 }}>{final[0]?.caseNo}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <Text style={{ color: "#F38216", fontSize: 15, fontWeight: "500" }}>Issue Type</Text>
                    <View style={{ width: "80%", backgroundColor: "#EFEFEF", padding: 15, marginTop: 10 }}>
                        <Text style={{ color: "#1B2236", fontSize: 14, fontWeight: "500", marginHorizontal: 20 }}>{final[0]?.Type}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <Text style={{ color: "#F38216", fontSize: 15, fontWeight: "500" }}>Issue Description</Text>
                    <View style={{ width: "80%", backgroundColor: "#EFEFEF", padding: 15, marginTop: 10 }}>
                        <Text style={{ color: "#1B2236", fontSize: 14, fontWeight: "500" }}>{final[0]?.description}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20, }}>
                    <Text style={{ color: "#F38216", fontSize: 15, fontWeight: "500", marginLeft: 220 }}>Resolve Description</Text>
                    <View style={{ width: "80%", backgroundColor: final[0]?.status === "Closed" || final[0]?.status === "Done" ? "#C0F7FF" : "#EFEFEF", padding: 15, marginTop: 10, marginLeft: 70 }}>
                        <Text style={{ color: "#1B2236", fontSize: 14, fontWeight: "500" }}>{final[0]?.resolutionDescription}</Text>
                    </View>
                </View>

              {!reopencheck ? 
                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <Text style={{ color: "#F38216", fontSize: 15, fontWeight: "500" }}>Status</Text>
                    <View style={{ width: "80%", backgroundColor: final[0]?.status === "Closed" || final[0]?.status === "Done" ? "#A2E6D2":"#F38216", padding: 15, marginTop: 10, borderRadius: 5 }}>
                        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "500", alignSelf: "center" }}>{final[0]?.status}</Text>
                    </View>
                </View> : 
                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#F38216", fontSize: 15, fontWeight: "500" }}>Reopened-Issue</Text>
                <TextInput
        placeholder='Type Message'
        placeholderTextColor={"#C8C6C6"}
        onChangeText={text => setDescription(text)}
        value={description}
        style={{width:290,borderRadius:5,marginTop:20,textAlignVertical:"top",backgroundColor:"#EFEFEF"}}/>
      
            </View>}

{reopenStatus ?
            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <Text style={{ color: "#F38216", fontSize: 15, fontWeight: "500" }}>Status</Text>
                    <View style={{ width: "80%", backgroundColor: "#A2E6D2", padding: 15, marginTop: 10, borderRadius: 5 }}>
                        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "500", alignSelf: "center" }}>{reopenRes?.Status}</Text>
                    </View>
                </View> : null}
                
                {final[0]?.status === "Closed" || final[0]?.status === "Done" && !reopencheck ?
                <View style={{width:"75%",alignSelf:"center",margin:30}}>
                    <Text style={{color:"#979797",fontSize:13,fontWeight:"500",alignSelf:"center",textAlign:"center",textAlignVertical:"center"}}>If your Not Satisfied with resolution You can Reopen The Ticket</Text>
                </View> : <></>}

               {!reopencheck ?
                <TouchableOpacity
                    onPress={()=> setModalVisible(true)}
                    disabled={(final[0]?.status !== "Closed" && final[0]?.status !== "Done")}
                    style={{ opacity: (final[0]?.status !== "Closed" && final[0]?.status !== "Done") ? 0.5 : 1,padding:10 ,backgroundColor: (final[0]?.status === "Closed" || final[0]?.status === "Done" ) ? "#F38216" : "#D9D9D9",width:"35%",alignItems:"center",alignSelf:"center",margin:60,bottom:30,borderRadius:5}}
                >
                    <Text style={{color: (final[0]?.status === "Closed" || final[0]?.status === "Done" )? "white": "#979797",fontSize:15,fontWeight:"700"}}>Reopen</Text>
                </TouchableOpacity> : 
                <TouchableOpacity
                onPress={()=> ReopenTicket()}
                disabled={final[0]?.status !== "Closed" && final[0]?.status !== "Done"}
                style={{ opacity: final[0]?.status !== "Closed" && final[0]?.status !== "Done" ? 0.5 : 1,padding:10 ,backgroundColor: final[0]?.status === "Closed" || final[0]?.status === "Done" ? "#F38216" : "#D9D9D9",width:"35%",alignItems:"center",alignSelf:"center",margin:60,bottom:30,borderRadius:5}}
            >
                <Text style={{color:"white",fontSize:15,fontWeight:"700"}}>Submit</Text>
            </TouchableOpacity>}

                <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ justifyContent: "center",backgroundColor: "lightgray" }}
      >
        <View style={{ width: "80%", height: "20%", backgroundColor: "pink", marginTop: "70%", alignSelf: "center" }}>
         <Text style={{color:"#F38216",fontSize:15,fontWeight:"700",alignSelf:"center"}}>Are You Sure You Want To Re Open?</Text>
        <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:"25%"}}>
            <TouchableOpacity
            onPress={()=> setModalVisible(false)}
           style={{backgroundColor:"white",padding:10,width:"35%",borderRadius:5}}> 
            <Text style={{color:"#979797",fontSize:15,fontWeight:"700",alignSelf:"center"}}>No</Text>
            </TouchableOpacity>
           <TouchableOpacity
            onPress={()=> [setModalVisible(false),setReopenCheck(true)]}
           style={{backgroundColor:"#F38216",padding:5,width:"35%",borderRadius:5,alignItems:"center"}}>
           <Text style={{color:"#FFFFFF",fontSize:15,fontWeight:"700",alignSelf:"center"}}>Yes</Text>
           </TouchableOpacity>
        </View>

        </View>
      </Modal>

            </ScrollView>
        </SafeAreaView>
    )
}
export default TicketStatus;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
})