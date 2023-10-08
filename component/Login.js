import React from "react";
import {View,Text,TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";


const Login=()=>{
    const navigation = useNavigation();
    return(
<View>
  <Text>explore tech courses to improve your skills</Text>  
  <TouchableOpacity
  onPress={()=> navigation.navigate('LoginScreen')}
   style={{backgroundColor:"orange",margin:20,borderRadius:5}}>
    <Text style={{padding:10,color:"white",fontWeight:"900",alignSelf:"center",fontSize:18}}>Log In</Text>
  </TouchableOpacity>
</View>
    )
}

export default Login;