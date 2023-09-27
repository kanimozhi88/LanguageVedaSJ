import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import moment from 'moment';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BASE_URL from '../../apiConfig';


const AssessmentReport = ({ navigation, route }) => {

    const testId = route.params;
    console.log("passed testId:::::::::", testId);
    const [final, setFinal] = useState();
    const [percentageVal, setPercentageVal] = useState();
    const dataFetchApi = useSelector(state => state.recordId);
    // const [statusTargetFill,setStatusTargetFill] = useState('');

    useEffect(() => {
        AsssessmentReportApi();
    }, [percentageVal]);

    const AsssessmentReportApi = async () => {
        let data = {};
        data.Type = "Contact";
        data.testId = testId?.testId;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`${BASE_URL}/services/apexrest/RNStudentAssessmentScore`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let AsssessmentReportApi = await response.json()
        console.log(" student AsssessmentReportApi  RES",   AsssessmentReportApi);
        setFinal(AsssessmentReportApi?.records[0]);
        console.log("final data is", final)
        const totalMarks = final?.totalMarks;
        const totalMarksObtained = final?.totalMarksObtained;

        let percentage = 0;

        if (totalMarksObtained !== 0) {
            percentage = (totalMarksObtained / totalMarks) * 100;
            setPercentageVal(percentage)
            console.log("inside call>>>>>>>>",percentage)
        }
    }

  console.log("percentage:::::::::",percentageVal)
    const [currentStatusFill, setStatusFill] = useState(0);
    const statusTargetFill = percentageVal;
    const statusDuration = 500; // Animation duration in milliseconds
    const statusIntervalDuration = 1000; // Interval duration in milliseconds (time between each update)

    useEffect(() => {
        let animationInterval;
        const step = (statusTargetFill - currentStatusFill) * (statusIntervalDuration / statusDuration);

        if (currentStatusFill < statusTargetFill) {
            animationInterval = setInterval(() => {
                setStatusFill((prevFill) => {
                    const newFill = prevFill + step;
                    return newFill >= statusTargetFill ? statusTargetFill : newFill;
                });
            }, statusIntervalDuration);
        }

        return () => clearInterval(animationInterval);
    }, [currentStatusFill, statusTargetFill,percentageVal]);


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
                <Text style={{ color: "#F38216", fontWeight: "600", fontSize: 16, marginLeft: 100, margin: 10 }}>Assessment Report</Text>
            </View>


            <View>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "400", marginHorizontal: 25,marginTop:30 }}>Score</Text>
{final !== '' ?
<View>
                <AnimatedCircularProgress
                    style={{ alignSelf: "center", margin: 5, color: "orange" }}
                    size={100}
                    width={10}
                    duration={1000}
                    fill={currentStatusFill}
                    rotation={0}
                    lineCap="round"
                    tintColor="#6ef5fa"
                    backgroundColor="#f0f7f7">
                    {(fill) => (
                        <View style={{alignSelf:"center"}}>
                        <Text style={{ fontSize: 13, color: "#D6387F", fontWeight: "700",textAlign:"center" }}>{`${Math.round(fill)}%`}</Text>
                       <Text style={{fontSize:12,textAlign:"center",color:"#b0aeae"}}>Total Marks: {final?.totalMarks}</Text>
                       </View>
                    )}
                </AnimatedCircularProgress>
                <View style={{alignSelf:"center",marginTop:10}}>
                   {final?.totalMarksObtained ?
                    <Text style={{marginLeft:20,color:"black",fontSize:14,fontWeight:"700"}}>{final?.totalMarksObtained} / {final?.totalMarks}</Text>
                   : null}
                    <Text style={{ color: "#b0aeae", fontSize: 16, fontWeight: "400" }}>Total Score</Text>
                </View>
</View>
: null}

                {final !== '' ?
                    <View style={{ marginHorizontal: 25, marginTop: 20 }}>
                        <Text style={{ color: "#b0aeae", fontSize: 16, fontWeight: "400" }}>Assessment</Text>
                        <View style={{ padding: 15, marginTop: 5, borderRadius: 5, width: 296 }}>

                            {final !== '' ?
                                <Text style={{ color: "#000000", fontSize: 14, fontWeight: "500" }}>{final?.courseName}</Text>
                                : null}
                        </View>
                    </View> : null}


                {final !== '' ?
                    <View style={{ marginHorizontal: 25, marginTop: 20 }}>
                        <Text style={{ color: "#b0aeae", fontSize: 16, fontWeight: "400" }}>Assessment Date</Text>
                        <View style={{ padding: 15, marginTop: 5, borderRadius: 5, width: 296 }}>
                            <Text style={{ color: "#000000", fontSize: 14, fontWeight: "500" }}>{final?.testDate}</Text>
                        </View>
                    </View> : null}

                {final !== '' ?
                    <View style={{ marginHorizontal: 25, marginTop: 20 }}>
                        <Text style={{ color: "black", fontSize: 16, fontWeight: "400" }}>Feedback</Text>
                        <View style={{ backgroundColor: "#C8C6C64A", padding: 15, marginTop: 10, borderRadius: 5, width: 296 }}>
                            <Text style={{ color: "#000000", fontSize: 14, fontWeight: "500" }}>{final?.feedBack}</Text>
                        </View>
                    </View> : null}

            </View>



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
    courseNameTxt: { fontWeight: "600", color: "white", marginBottom: 20, margin: 10, marginLeft: 30, fontSize: 16 },
    rectangle: {

        width: 170,
        height: 140,
        margin: 10,
        borderRadius: 22,
        elevation: 5,
        justifyContent: 'center',
    },
    dateStyle: { color: "white", marginLeft: 30, fontWeight: "300", fontSize: 10, fontFamily: "Poppins" },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 8
    },
    imageStyle: {
        width: 30,
        height: 30,
        marginLeft: 10,
        bottom: 10
    },
});

export default AssessmentReport;