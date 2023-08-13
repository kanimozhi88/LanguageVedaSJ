import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../redux/actions';
import * as Progress from 'react-native-progress';
import { isDate } from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const StudentCourseCurriculum = ({batchId,courseName}) => {

    // console.log("batchid is", batchid);
    // const {CourseName, batchId} = route.params;
    const [totalNum,setTotalNum] = useState(0);
    const [average,setAverage] = useState(0);
    const [ percentage,setPercentage] = useState(0);
    // const [count,SetCount] = useState(0);
    const dataFetchApi = useSelector(state => state.recordId);
    const [final, setFinal] = useState('');
    const [loading,setLoading] = useState(false);


    useEffect(() => {
        StudentCurriculumApiCall();
    }, [])

    
    const StudentCurriculumApiCall = async () => {
      let data = {};
      // data.CourseName = CourseName;
      // data.CourseName = "Malayalam";
      // data.batchId = "a0D1e000002Ip7MEAS";
      data.batchId = batchId;

      const body = JSON.stringify(data)
      const token = await getAccessToken();
      const bearer = 'Bearer ' + token;
      const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/lessonPlanExecutions`, {
          method: 'POST',
          headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": bearer
          }),
          body,
      });
      let curriculumresult = await response.json()
      console.log("student course curriculum", curriculumresult);
      setFinal(curriculumresult);

  }
  
  const statusOrder = ["Yet To Start", "In Progress", "Completed"];
if(final !== ''){
// Sort the data based on the Status key
  const sortedData = final?.lessonPlanExecutions.sort((a, b) => {
  const statusA = statusOrder.indexOf(a.Status);
  const statusB = statusOrder.indexOf(b.Status);
  return statusA - statusB;
});
console.log(sortedData);
}



const totalProgress = (final?.lessonPlanExecutions ?? []).reduce((total, obj) => total + (obj.Progress || 0), 0);
const averageProgress = totalProgress / Math.max(final?.lessonPlanExecutions?.length, 1);
const roundedAverage = Number(averageProgress.toFixed(0));
// setPercentage(roundedAverage);
console.log(`Total Progress in curriculum: ${totalProgress}`);
console.log(`Average Progress in curriculum: ${averageProgress}`);
console.log("roundedAverage in curriculum", roundedAverage);


//Overall percentage
    const [currentStatusFill, setStatusFill] = useState(0);
    const statusTargetFill = roundedAverage;
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
    }, [currentStatusFill, statusTargetFill]);

    

console.log("sum is", totalNum)

    const renderItem = ({ item, index }) => {
       
        return (
            <View
                style={{ width: "90%",backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10,elevation:5 }}>
                    
                        <Text style={{ color: "black", fontSize: 16, fontWeight: "500", margin: 10 }}>{item.TopicName}</Text>
                        <View style={{marginHorizontal:"90%",}}>
                      {item.Progress === 100 ?
                      <Image
                      source={require('../assets/Trackeractive.png')}
                      style={{height:23,width:23,}}/> :
                      <Image
                      source={require('../assets/TrackerInActive.png')}
                      style={{height:23,width:23,}}/>}
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center",marginHorizontal:70}}>
                          <View style={{height:4,margin:10}}>
                        <Progress.Bar progress={item.Progress/100} width={131} height={4}color={"#F38216"} style={{  borderColor:"white",borderRadius:10,borderWidth:0.08,borderColor:"#F38216"}} />
                        </View>
                            <Text style={{ color: "#F38216", fontWeight: "500",margin:10,fontSize:16,fontFamily:"Poppins" }}>{item.Progress}%</Text>
                    
                    </View>
            </View>
        )
    }

    return (
        <View style={{flex:1}}>
          
          <LinearGradient
        colors={['#F38216', '#D33189']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ margin: 10, padding: 20, width: "95%", borderRadius: 15, alignSelf: "center", flexDirection: "row", justifyContent: "space-around",}}
      >

          <View>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600"}}>{courseName}</Text>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600"}}>REVISION 25</Text>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600"}}>BackUp Class 05</Text>
          </View>
          <View>
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "white", marginTop: 5 }}>
            {/* {overAllStatus !== NaN ? */}
              <AnimatedCircularProgress
                style={{ alignSelf: "center", margin: 5, color: "orange" }}
                size={90}
                width={20}
                // duration={1000}
                fill={currentStatusFill}
                rotation={0}
                lineCap="round"
                tintColor="orange"
                backgroundColor="lightgray">
                {(fill) => (
                  <Text style={{ fontSize: 13 ,color:"#D6387F",fontWeight:"700"}}>{`${Math.round(fill)}%`}</Text>
                )}
              </AnimatedCircularProgress> 
          </View>
          <Text style={{ color: "white", marginTop: 5, fontWeight: "500",fontSize:12,alignSelf:"center" }}>Over All Status</Text>
          </View>

      </LinearGradient>

      <Text style={{ color: "#F38216", fontSize: 16, fontWeight: "600",margin:20}}>{courseName}</Text>
<View style={{height:330}}>
<FlatList
 data={final?.lessonPlanExecutions}
 renderItem={renderItem}/>
 </View>
        </View>
    )
};
export default StudentCourseCurriculum;