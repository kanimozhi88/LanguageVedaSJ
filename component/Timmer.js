import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getAccessToken } from '../redux/actions';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Countdown from 'react-native-countdown-component';
import moment from 'moment';
import { removeEvent } from 'highcharts';
import { useSelector } from 'react-redux';



const CountdownTimer = ({ startTime }) => {
    const [countdown, setCountdown] = useState('');
    const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = (startTime + 19800000) - now;
            // console.log("distance val", distance, startTime, now);
            if (distance >= 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                setCountdown(`${hours}h ${minutes}m ${seconds}s`);
            } else {
                setCountdown('Event started');
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);
    const [hours, minutes, seconds] = countdown.split(':').map(Number);
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    const timer = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds
        setElapsedTimeInSeconds(elapsedTime);
    }, 1000);
    const progressPercentage = (totalTimeInSeconds - elapsedTimeInSeconds) / totalTimeInSeconds;
    // return <Text>{countdown}</Text>;
    return (
        <AnimatedCircularProgress
            size={70}
            width={1}
            fill={progressPercentage}
            tintColor="#00e0ff"
            backgroundColor="white">
            {
                (fill) => (
                    <Text>
                        {countdown}
                    </Text>
                )
            }
        </AnimatedCircularProgress>
    );
};



const Timmer = ({ recordId }) => {
    console.log("passsed recotrdId", recordId);
    const [final, setFinal] = useState('');

    const [timer, setTimer] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

    const [showButton, setShowButton] = useState(false);
    const userRecordId = useSelector(state => state.recordId);
    const Status = useSelector(state => state.status);


    

    

    useEffect(() => {
        TimerApi();
    }, [])

    
    // useEffect(() => {
        // if(final[0] !== ''){
        // const now = Math.floor(Date.now() / 1000);
        // const remaining = final[0]?.startTimestamp - now;
        // console.log("now startstamp", now, final[0]?.startTimestamp)
        // setTimeRemaining(remaining);
        // }
    //   }, []);
    
      const isButtonActive = timeRemaining > -900 && timeRemaining <= 0; // 900 seconds = 15 minutes
    
      const handleButtonPress = () => {
        Linking.openURL(final[0]?.zoomLink);
      };

    const TimerApi = async () => {
        let data = {};
        data.contactId = recordId;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNStudentTimerController`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let timerResponse = await response.json()
        console.log("timer res is", timerResponse);
        setFinal(timerResponse);
        if(timerResponse[0] !== ''){
            const now = Math.floor(Date.now() / 1000);
            const remaining = timerResponse[0]?.startTimestamp - now;
            console.log("now startstamp", now, timerResponse[0]?.startTimestamp,remaining)
            setTimeRemaining(remaining);
            }
    }

   console.log("final is", final);
    // const [nearestEvent, setNearestEvent] = useState(null);

    // useEffect(() => {
    //     if (final !== '') {
    //         // sortAgain();
    //         const now = new Date().getTime();
    //         const finalData = final.map((item) => {
    //             let updatedTimestamp;
    //             if(item.startTime !== null && item.startTime !== '' && item.startTime !== NaN){
    //             console.log("needed starttime", item.startTime);
    //             const startTime = new Date(item.startTime)
    //             startTime.setUTCHours(startTime.getUTCHours() - 5);
    //             startTime.setUTCMinutes(startTime.getUTCMinutes() - 30);
    //             updatedTimestamp = startTime.toISOString();
    //             console.log("starttime>>>>>>>>>", startTime);
    //             console.log("needed updatedTimestamp", updatedTimestamp)
    //             }
    //             item.startTime = new Date(updatedTimestamp).getTime();
    //             return item;
    //         });

    //         var currentUTCTime = new Date().getTime(); // Get the current UTC time in milliseconds
    //         const sortedEvents = finalData.sort(function (a, b) {
    //             var diffA = Math.abs(a.startTime - currentUTCTime);
    //             var diffB = Math.abs(b.startTime - currentUTCTime);
    //             return diffA - diffB;
    //         });
    //         setNearestEvent(sortedEvents[0]);
    //         // console.log("after sorting needed", sortedEvents[0].startTime);
    //     }
    // },[final]);
//   console.log("nearest", nearestEvent);
//     if (!nearestEvent) {
//         return (
//             <LinearGradient
//                 colors={['#F38216', '#D6387F']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={{ margin: 10, padding: 20, width: "95%", borderRadius: 10, alignSelf: "center" }}
//             >
//                 <Text>No upcoming events</Text>
//             </LinearGradient>

//         )
//     }

    // const startTime = new Date(nearestEvent.startTime)
    // startTime.setUTCHours(startTime.getUTCHours() - 5);
    // startTime.setUTCMinutes(startTime.getUTCMinutes() - 30);
    // const updatedTimestamp = startTime.toISOString();
    // const finalTime = new Date(updatedTimestamp).getTime();

    // const fifteenMinutesBefore = (finalTime + 19800000) - 15 * 60 * 1000;
    // const fifteenMinutesAfter = (finalTime + 19800000) + 15 * 60 * 1000;
    // const now = new Date().getTime();
    // console.log("starttime is", finalTime);
    // console.log("now, before and after fifteen ", now, fifteenMinutesBefore, fifteenMinutesAfter, nearestEvent.startTime);
    
    return (
        <LinearGradient
            colors={['#F38216', '#D33189']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ margin: 10, padding: 20, width: "95%", borderRadius: 10, alignSelf: "center" }}
        >
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <View>
                    <Text style={{ color: "white", fontWeight: "800" }}>Today Class</Text>
                    <Text style={{ color: "white", fontWeight: "bold" }}>{final[0]?.courseName}</Text>
                </View>
                <View>
               
                <View style={{height:120,width:120,borderRadius:60,borderWidth:2,borderColor:"white"}}>

                {timeRemaining > 0 && userRecordId !== ''  ?
                <View>
                    {/* <Text>yes events</Text> */}
                <Countdown
        until={timeRemaining}
        onFinish={() => setTimeRemaining(0)}
        size={13}
        timeToShow={['H', 'M', 'S']}
        digitStyle={{ backgroundColor: '#D33189',marginTop:40 }}
        digitTxtStyle={{ color: 'white' ,marginTop:0}}
      /> 
    </View>
      : <Text style={{alignSelf:"center",top:50}}>No events</Text>}
      {console.log("userRecordId",userRecordId,Status)}
      </View>

      {timeRemaining < 900 || timeRemaining <= 0  ? (
        <TouchableOpacity onPress={handleButtonPress} style={{ backgroundColor: '#F38216', padding: 10,borderRadius:5,marginTop:10 }}>
          <Text style={{ color: '#FFF',alignSelf:"center" }}>Join</Text>
        </TouchableOpacity>
      ) : null}  
                        {/* {console.log("needed finalTime",finalTime)} */}
                    
                    {/* <CountdownTimer startTime={finalTime} /> */}
                    
                    
                </View>

            </View>


        </LinearGradient>


    );
};

export default Timmer;
