import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getAccessToken } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PieChart from 'react-native-pie-chart';
import { useNavigation } from '@react-navigation/native';


const HelpCenterScreen = ({ navigation }) => {
    const recordId = useSelector(state => state.recordId);
    const [final, setFinal] = useState('');
    const [statusCounts, setStatusCounts] = useState({
        Reopen: 0,
        'Ticket Raised': 0,
        'Ticket In progress': 0,
        Closed: 0,
        Done:0
    });

    const data = [
        { value: 35, color: '#FFC300' },
        { value: 20, color: '#FF5733' },
        { value: 45, color: '#C70039' },
    ];

    const sum = statusCounts['Ticket Raised'] + statusCounts['Reopen'];
    const doneCloseSum = statusCounts['Closed'] + statusCounts['Done'];
    const widthAndHeight = 150
    const series = [doneCloseSum, sum, statusCounts['Ticket In progress']]
    const sliceColor = ['#FFFFFF', '#f0c654', 'pink']


    useEffect(() => {
        RaiseTicket();
    }, [final])


    const RaiseTicket = async () => {
        let data = {};
        data.contactId = recordId;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/Lvcases`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let RaiseTicketRes = await response.json()
        console.log("raise ticket res", RaiseTicketRes);
        setFinal(RaiseTicketRes);
        const counts = {
            Reopen: 0,
            'Ticket Raised': 0,
            'Ticket In progress': 0,
            Closed: 0,
            Done:0,
        };
        if(final !== ''){

        
        final.forEach((item) => {
            const { status } = item;
            counts[status] += 1;
        });
        setStatusCounts(counts);
        }
        // final.forEach((item) => {
        //     const { status } = item;
        //     statusCounts[status] = (statusCounts[status] || 0) + 1;
        //   });
        //   setStatusCounts(counts);

    }

    



    const renderItem = ({ item, index }) => {

        return (
            // <View></View>
            <TouchableOpacity
                onPress={() => { navigation.navigate('TicketStatus', { caseId: item.caseId }) }}
                style={{ width: "100%", backgroundColor: "white", alignSelf: "center", marginTop: 10, padding: 10, }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>


                    <Text numberOfLines={2} style={{ color: "#A5A5A5", fontSize: 16, fontWeight: "500", margin: 10, alignSelf: "center", width: 100 }}>{moment(item?.createdDate).format('DD/MM/YYYY')}</Text>
                    <Text numberOfLines={2} style={{ color: "#A5A5A5", fontSize: 16, fontWeight: "500", margin: 10, alignSelf: "center", width: 100 }}>{item.caseNo}</Text>

                    <View
                        style={{
                            width: 89, backgroundColor: item.status === "New" ?
                                "#E74444" :
                                item.status === "Ticket Raised" ?
                                    "#E74444" :
                                    item.status === "Ticket In progress" ? "#FF9533" : item.status === "Reopen" ? "#A2E6D2" : item.status === "Closed" ? "#A2E6D2" : item.status === "Done" ? "#A2E6D2" : "red", borderRadius: 10,
                        }}
                    >
                        {item.status === "New" ?
                            <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}> New</Text> :
                            item.status === "Ticket Raised" ?
                                <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}>Ticket Raised</Text> :
                                item.status === "Ticket In progress" ? <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}> Ticket In progress</Text> :
                                    item.status === "Reopen" ?
                                        <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}>Reopen</Text> :
                                        item.status === "Closed" ?
                                            <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}>Closed</Text> :
                                            item.status === "Done" ?
                                            <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}>Done</Text> :
                                             null}

                    </View>
                    <Image
                        style={{ height: 20, width: 20, }}
                        source={require('../../assets/sidearrow.png')} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <LinearGradient
                colors={['#F38216', '#D6387F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ marginTop: 20, width: "100%", borderRadius: 25, alignSelf: "center", flexDirection: "row", justifyContent: "space-around", }}
            >

                <View style={{ marginTop: 40 }}>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "600", margin: 10 }}>Closed- {(statusCounts['Closed'] + statusCounts['Done']) || 0}</Text>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "600", margin: 10 }}>Open- {(statusCounts['Ticket Raised'] + statusCounts['Reopen']) || 0}</Text>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "600", margin: 10 }}>InProgress-{statusCounts['Ticket In progress']}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: "600", color: "#FFFFFF", alignSelf: "center" }}>Ticket Status</Text>
                   {statusCounts['Closed'] !== 0 || statusCounts['Reopen'] !== 0 || statusCounts['Ticket Raised'] !== 0 || statusCounts['Ticket In progress'] !==0 ?
                    <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} style={{ margin: 15 }} />
                    :null}
                </View>

            </LinearGradient>
            <TouchableOpacity
                onPress={() => navigation.navigate('NewTicket')}
                style={{ height: 92, borderRadius: 5, marginTop: 30, }}>
                <Text style={{ color: "#F38216", fontSize: 16, fontWeight: "600", marginHorizontal: 26 }}>Help Center</Text>
                <View style={{ flexDirection: "row", marginTop: 20, marginHorizontal: 26 }}>
                    <Text style={{ color: "#4D4C4B", fontSize: 16, fontWeight: "600" }}>New Tickets</Text>
                    <Image
                        style={{ height: 20, width: 20, marginLeft: 250 }}
                        source={require('../../assets/sidearrow.png')} />
                </View>
            </TouchableOpacity>
            <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#F38216", fontSize: 16, fontWeight: "600", marginHorizontal: 26 }}>Ticket Status</Text>
                <FlatList
                    style={{ height: 300 }}
                    data={final}
                    renderItem={renderItem} />
            </View>
        </View>
    )
}
export default HelpCenterScreen;