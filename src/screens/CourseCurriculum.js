import React from 'react';
import { View, Text, Image ,TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const CourseCurriculum = ({navigation, route}) => {

    const dataLastName = useSelector(state => state.LastName);
    const dataEmail = useSelector(state => state.Email);
    const dataPhone = useSelector(state => state.Phone);
   
    const course = route.params.course;
    const courseId=route.params.courseId;
    console.log("COURSES PASSED ID IS",courseId);
    console.log("COURNE PASSED IS",course);
    return (
        <View style={{flex:1}}>
            <View style={{ flexDirection: "row", padding: 20 }}>
                <Image
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: "bold", color: "black" }}>{dataLastName}</Text>
                    <Text style={{ fontWeight: "bold", color: "black" }}>{dataEmail}</Text>
                    <Text style={{ fontWeight: "bold", color: "black" }}>{dataPhone}</Text>
                </View>
            </View>
            <Image
                source={require('../../assets/mycourse.png')}
                style={{ backgroundColor: "lightblue", borderRadius: 20, width: 40, height: 40, alignSelf: "center" }} />
            <Text style={{ color: "#A22451", fontWeight: "800", fontSize: 20, alignSelf: "center", margin: 10 }}>COURSE CURRICULUM</Text>
        <TouchableOpacity 
       onPress={() => navigation.navigate('SpecificCurriculum', { course: course, courseId: courseId })}
        style={{width:"80%",backgroundColor:"lightpink",padding:50,alignSelf:"center",borderRadius:20,marginTop:30}}>
            <Text style={{alignSelf:"center",color:"black",fontSize:23}}>{course}</Text>
        </TouchableOpacity>
       
        
        
        <View style={{width:"100%", height:50,backgroundColor:"#A22451",bottom:0,left:0,right:0,position:"absolute"}}/>

        </View>
    )
};
export default CourseCurriculum;