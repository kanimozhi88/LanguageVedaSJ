/*import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import { getCourseApiResult } from '../../redux/actions';
import { BarChart } from 'react-native-chart-kit';
import { View,Text } from 'react-native';

const ChartsandDashboard = () => {
  const dispatch = useDispatch();
  const courseApiResult = useSelector(state => state.Result)
  console.log("stored course api result is", courseApiResult);

  const [final, setFinal] = useState([]);

  const dataFetchApi = useSelector(state => state.recordId);
  const dataLastName = useSelector(state => state.LastName);

  useEffect(() => {
    if(courseApiResult == undefined){
      console.log("calling course API call");
      CourseApiCall();
    }
  }, []);

  const CourseApiCall = async () => {
    let data = {};
    data.Type = "TestScore";
    data.contactid = dataFetchApi;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/v1/Student-chart/`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let courseresult = await response.json()

    setFinal(courseresult?.Result);
    console.log("final data is", final)
    dispatch(getCourseApiResult(courseresult?.Result));
  }

  // Define chart data
  const chartData = {
    labels: final.map(data => data.TestName),
    datasets: [{
      data: final.map(data => data.Score),
    }]
  }

  return (
    <View>
      <Text>TestScore of {dataLastName}</Text>
      <BarChart
      barRadius={5}
      barWidthPercentage={0.65}
      barColor='lightgreen'
      
        data={chartData}
        width={300}
        height={220}
        yAxisLabel="%"
        chartConfig={{
          
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
            backgroundColor:`#dff4d7`,
          
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
}

export default ChartsandDashboard;*/
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAccessToken } from '../../redux/actions';
// import { getCourseApiResult } from '../../redux/actions';
// import { BarChart } from 'react-native-chart-kit';
// import { View, Text , Dimensions } from 'react-native';

// const ChartsandDashboard = () => {
//   const dispatch = useDispatch();
//   const courseApiResult = useSelector(state => state.Result);
//   console.log("stored course api result is", courseApiResult);

//   const [testScoreData, setTestScoreData] = useState([]);
//   const [attendanceData, setAttendanceData] = useState([]);

//   const dataFetchApi = useSelector(state => state.recordId);
//   const dataLastName = useSelector(state => state.LastName);

//   useEffect(() => {
//     if(courseApiResult === undefined) {
//       console.log("calling course API calls");
//       fetchChartData();
//     } else {
//       setTestScoreData(courseApiResult.testScoreData);
//       setAttendanceData(courseApiResult.attendanceData);
//     }
//   }, []);

//   const fetchChartData = async () => {
//     const requests = [
//       {
//         "Type": "TestScore",
//         "contactid": dataFetchApi
//       },
//       {
//         "Type": "Attendance",
//         "contactid": dataFetchApi
//       }
//     ];

//     const chartData = {};
//     const token = await getAccessToken();
//     const bearer = 'Bearer ' + token;

//     for(const req of requests) {
//       const body = JSON.stringify(req);
//       const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/v1/Student-chart/`, {
//         method: 'POST',
//         headers: new Headers({
//           "Content-Type": "application/json",
//           "Authorization": bearer
//         }),
//         body,
//       });
//       const result = await response.json();
      
//       if(req.Type === "TestScore") {
//         setTestScoreData(result?.Result);
//         chartData.testScoreData = result?.Result;
//       } else if(req.Type === "Attendance") {
//         setAttendanceData(result?.Result);
//         chartData.attendanceData = result?.Result;
//       }

//       dispatch(getCourseApiResult(chartData?.Result));
//     }
    

//   // Define chart data for TestScore
//   const testScoreChartData = {
//     labels: testScoreData.map(chartData => chartData.TestName),
//     datasets: [{
//       chartData: testScoreData.map(chartData=> chartData.Score),
//     }]
//   }

//   // Define chart data for Attendance
//   const attendanceChartData = {
//     labels: attendanceData.map(chartData => chartData.Month),
//     datasets: [{
//       chartData: attendanceData.map(chartData => chartData.Percent),
//     }]
//   }
//   return (
//     <View>
//       <Text>Test Score Chart:</Text>
//       <BarChart
//         chartData={testScoreData}
//         width={300}
//         height={220}
//         yAxisLabel=""
//         chartConfig={{
//           backgroundColor: '#e26a00',
//           backgroundGradientFrom: '#fb8c00',
//           backgroundGradientTo: '#ffa726',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//       />
  
//       <Text>Attendance Chart:</Text>
//       <BarChart
//         chartData={attendanceData}
//         width={300}
//         height={220}
//         yAxisLabel=""
//         chartConfig={{
//           backgroundColor: '#e26a00',
//           backgroundGradientFrom: '#fb8c00',
//           backgroundGradientTo: '#ffa726',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//       />
//     </View>
//   );  
// }}
// export default ChartsandDashboard;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/actions';
import { getCourseApiResult } from '../../redux/actions';
import { BarChart } from 'react-native-chart-kit';
import { View, Text, Dimensions } from 'react-native';

const ChartsandDashboard = () => {
    const dispatch = useDispatch();
    const courseApiResult = useSelector(state => state.Result);
    console.log("stored course api result is", courseApiResult);

    const [testScoreData, setTestScoreData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);

    const dataFetchApi = useSelector(state => state.recordId);
    const dataLastName = useSelector(state => state.LastName);

    useEffect(() => {
        if (courseApiResult === undefined) {
            console.log("calling course API calls");
            fetchChartData();
        } else {
            setTestScoreData(courseApiResult.testScoreData);
            setAttendanceData(courseApiResult.attendanceData);
        }
    }, []);

    const fetchChartData = async () => {
        const requests = [
            {
                "Type": "TestScore",
                "contactid": dataFetchApi
            },
            {
                "Type": "Attendance",
                "contactid": dataFetchApi
            }
        ];

        const chartData = {};
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;

        for (const req of requests) {
            const body = JSON.stringify(req);
            const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/v1/Student-chart/`, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }),
                body,
            });
            const result = await response.json();

            if (req.Type === "TestScore") {
                setTestScoreData(result?.Result);
                chartData.testScoreData = result?.Result;
            } else if (req.Type === "Attendance") {
                setAttendanceData(result?.Result);
                chartData.attendanceData = result?.Result;
            }

            console.log('attendance----', setAttendanceData);

            dispatch(getCourseApiResult(chartData));
        }

    };

    // Define chart data for TestScore
    const testScoreChartData = {
        labels: testScoreData.map(chartData => chartData.TestName),
        datasets: [{
            data: testScoreData.map(chartData => chartData.Score),
        }]
    };

    // Define chart data for Attendance
    const attendanceChartData = {
        labels: attendanceData.map(chartData => chartData.DurationDays),
        datasets: [{
            data: attendanceData.map(chartData => chartData.Date),
        }]
    };

    return (
        <View>
            <Text>Test Score Chart: </Text>
            <BarChart
                data={testScoreChartData}
                width={Dimensions.get("window").width - 40}
                height={220}
                yAxisLabel=""
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
            />

            < Text > Attendance Chart: </Text>
            <BarChart
                chartData={attendanceChartData}
                width={300}
                height={220}
                yAxisLabel=""
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }
                }
            />
        </View>
    );
}

export default ChartsandDashboard;