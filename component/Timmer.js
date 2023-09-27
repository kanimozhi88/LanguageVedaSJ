import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getAccessToken } from '../redux/actions';
import { useSelector } from 'react-redux';
import BASE_URL from '../apiConfig';



// function CountdownTimer({ startTimestamp , recordType , endTimestamp , link}) {
//     const now  = Math.floor(Date.now() / 1000);
//     const value = startTimestamp - now;
//     const [remainingTime, setRemainingTime] = useState(value);
//     const [isJoinButtonEnabled, setIsJoinButtonEnabled] = useState(false);
//     console.log("value*****",value)

//    console.log("*****",remainingTime)
//     useEffect(() => {
//       const interval = setInterval(() => {
//         setRemainingTime(calculateRemainingTime());
  
//         if (remainingTime <= 0) {
//           clearInterval(interval);
//           // Timer has reached zero, you can handle this event as needed.
//         }
//         const fifteenMinutesInSeconds = 15 * 60;
//         setIsJoinButtonEnabled(remainingTime >= -fifteenMinutesInSeconds && remainingTime <= endTimestamp - startTimestamp);
//         console.log("remainingtime*****",remainingTime)

//     }, 1000);
  
//       return () => {
//         clearInterval(interval);
//       };
//     }, []);
  
//     function calculateRemainingTime() {
//       const currentTime = Math.floor(Date.now() / 1000);
//       return startTimestamp - currentTime;
//     }

//     const renderTime = remainingTime  ? (
//         <Text style={{ color: recordType === "Faculty" ? "#F38216" : "white" }}>
//           {Math.floor(remainingTime / 3600).toString().padStart(2, '0')}:
//           {Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0')}:
//           {Math.floor(remainingTime % 60).toString().padStart(2, '0')}
//         </Text>
//       ) : null;
  
//     // Convert remaining seconds into hours, minutes, and seconds
//     const hours = Math.floor(remainingTime / 3600);
//     const minutes = Math.floor((remainingTime % 3600) / 60);
//     const seconds = remainingTime % 60;
//     console.log(">>>>>>>>>>>>>",hours,minutes,seconds)
//     return (
//       <View>
//               {renderTime}

//         {/* {startTimestamp !== NaN ?
//         <Text style={{color: recordType ==="Faculty" ? "#F38216" :"white"}}>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</Text>
//        : null} */}
//         {/* {isJoinButtonEnabled && ( */}
//         <TouchableOpacity
//         style={{width:"95%",borderRadius:5, backgroundColor:isJoinButtonEnabled ? "#F38216": "#999999",top:45}}
//          onPress={() => Linking.openURL(link)} disabled={!isJoinButtonEnabled}>
//           <Text style={{color:"white",alignSelf:"center"}}>Join Now</Text>
//         </TouchableOpacity>
//       {/* )} */}
//       </View>
//     );
//   }



const Timmer = ({ recordId }) => {
    // console.log("passsed recotrdId", recordId);
    const [final, setFinal] = useState('');

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

    const userRecordId = useSelector(state => state.recordId);
    const Status = useSelector(state => state.status);
    const recordType = useSelector(state => state.recordType);
    const [refresh,setRefresh] = useState(false);

    useEffect(() => {
        // TimerApi();
        if (recordType == "Student") {
            TimerApi();
        } else if (recordType == "Faculty") {
            FacultyTimerApi();
        }
        else if (recordType == "Parent") { }
    }, [])

    
    // useEffect(() => {
    //     // TimerApi();
    //     if ( refresh === "true" && recordType == "Student") {
    //         TimerApi();
    //     } else if (refresh === "true" && recordType == "Faculty") {
    //         FacultyTimerApi();
    //     }
    //     else if (recordType == "Parent") { }
    // }, [refresh])




    const TimerApi = async () => {
        let data = {};
        data.contactId = recordId;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`${BASE_URL}/services/apexrest/RNStudentTimerController`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let timerResponse = await response.json()
        console.log("student timer res is", timerResponse);
        setFinal(timerResponse);
        if (timerResponse[0] !== '') {
            const now = Math.floor(Date.now() / 1000);
            const remaining = (timerResponse[0]?.startTimestamp - now);
            // console.log("now startstamp", now, timerResponse[0]?.startTimestamp, remaining)
            setRefresh(true)
            // setTimeRemaining(remaining)
        }
    }

    const FacultyTimerApi = async () => {
        let data = {};
        data.contactId = recordId;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`${BASE_URL}/services/apexrest/RNFacultyTimerController`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let timerResponse = await response.json()
        console.log("faculty timer res is", timerResponse);
        setFinal(timerResponse);
        if (timerResponse[0] !== '') {
            const now = Math.floor(Date.now() / 1000);
            const remaining = timerResponse[0]?.startTimestamp - now;
            // console.log("now startstamp", now, timerResponse[0]?.startTimestamp, remaining)
            setTimeRemaining(remaining);
        }
    }

    function CountdownTimer({ startTimestamp , recordType , endTimestamp , link}) {
        const now  = Math.floor(Date.now() / 1000);
        const value = startTimestamp - now;
        const [remainingTime, setRemainingTime] = useState(value);
        const [isJoinButtonEnabled, setIsJoinButtonEnabled] = useState(false);
    
        useEffect(() => {
          const interval = setInterval(() => {
            setRemainingTime(calculateRemainingTime());
      
            if (remainingTime <= 0) {
              clearInterval(interval);
              // Timer has reached zero, you can handle this event as needed.
            }
            const fifteenMinutesInSeconds = 15 * 60;
            setIsJoinButtonEnabled(remainingTime >= -fifteenMinutesInSeconds && remainingTime <= endTimestamp - startTimestamp);
    
        }, 1000);
      
          return () => {
            clearInterval(interval);
          };
        }, []);
      
        function calculateRemainingTime() {
          const currentTime = Math.floor(Date.now() / 1000);
          return startTimestamp - currentTime;
        }
    
        const renderTime = remainingTime  ? (
            <Text style={{ color: recordType === "Faculty" ? "#F38216" : "white" }}>
              {Math.floor(remainingTime / 3600).toString().padStart(2, '0')}:
              {Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0')}:
              {Math.floor(remainingTime % 60).toString().padStart(2, '0')}
            </Text>
          ) : null;
      
        // Convert remaining seconds into hours, minutes, and seconds
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        return (
          <View>
                  {renderTime}
    
            {/* {startTimestamp !== NaN ?
            <Text style={{color: recordType ==="Faculty" ? "#F38216" :"white"}}>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</Text>
           : null} */}
            {/* {isJoinButtonEnabled && ( */}
            <TouchableOpacity
            style={{width:"95%",borderRadius:5, backgroundColor:isJoinButtonEnabled ? "#F38216": "#999999",top:45}}
             onPress={() => Linking.openURL(link)} disabled={!isJoinButtonEnabled}>
              <Text style={{color:"white",alignSelf:"center"}}>Join Now</Text>
            </TouchableOpacity>
          {/* )} */}
          </View>
        );
      }
   
    return (
        <LinearGradient
            colors={['#F38216', '#D33189']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ margin: 10, padding: 30, width: "95%", borderRadius: 10, alignSelf: "center" }}
        >
            <View style={{ flexDirection: "row",marginLeft:30 }}>
                <View>
                    <Text style={{ color: "white", fontWeight: "800" }}>Today Class</Text>
                    <Text style={{ color: "white", fontWeight: "bold" }}>{final[0]?.courseName}</Text>
                    <Text style={{ color: "white", fontWeight: "bold" }}>{final[0]?.timeBlockName}</Text>

                </View>
                <View>

{  final[0]?.startTimestamp !=='' && final[0]?.endTimestamp !=='' && final[0] !=='' && final?.length !== 0  ? 
                    <View style={{ height: 90, width: 90, borderRadius: 45, borderWidth: 2, borderColor: recordType ==="Faculty" ? "#F38216" :"white",marginLeft:"40%" }}>

                            <View style={{top:30,marginLeft:15}}>

                                <CountdownTimer  startTimestamp={final[0]?.startTimestamp} recordType={recordType} endTimestamp={final[0]?.endTimestamp} link={final[0]?.zoomLink !== null ? final[0]?.zoomLink : null} />
                                
                            </View>
                    </View>
                    : 
                    <View style={{marginLeft:"50%",bottom:"90%"}}>
                    <Text style={{ color:"white",alignSelf: "center", top:50 }}>No Events</Text>
                    </View>
                    }


                </View>
            </View>
        </LinearGradient>


    );
};

export default Timmer;
