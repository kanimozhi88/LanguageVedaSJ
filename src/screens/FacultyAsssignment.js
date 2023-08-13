import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const FacultyAssignment=({navigation})=>{
   
   

    return(
        <View style={{flex:1}}>
            <Text style={{justifyContent:"center",margin:30,alignSelf:"center",color:"#A22451",fontWeight:"900",fontSize:23}}>ASSIGNMENT</Text>
       
       <TouchableOpacity
    //    onPress={()=> navigation.navigate('ViewAssign')}
    
    onPress={()=> navigation.navigate('CourseBatchSelection',{course:'',level:''})}
       style={{backgroundColor:"lightgray",width:"75%",borderRadius:20,alignItems:"center",alignSelf:"center",margin:50}}>
        <Text style={{padding:20,color:"#A22451",fontWeight:"bold",fontSize:20}}>VIEW ASSIGNMENT</Text>
       </TouchableOpacity>

       {/* <TouchableOpacity
       onPress={()=>(navigation.navigate('ScheduleAssign'))}
       style={{backgroundColor:"lightgray",width:"75%",borderRadius:20,alignItems:"center",alignSelf:"center",margin:50}}>
        <Text style={{padding:20,color:"#A22451",fontWeight:"bold",fontSize:20}}>SCHEDULE ASSIGNMENT</Text>
       </TouchableOpacity> */}

       <View style={{width:"100%", height:50,backgroundColor:"#A22451",bottom:0,left:0,right:0,position:"absolute"}}/>

        </View>
    )
}
export default FacultyAssignment;