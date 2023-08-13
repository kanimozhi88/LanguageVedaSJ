import React from "react";
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';


const Counter =(props)=>{
    const data = useSelector((state) => state.Counter);
    const dispatch= useDispatch ();
    return(
       <View>
        <Button title="add" onPress={ ()=> dispatch(addition())}/>
        <Text>{data}</Text>
       </View>
    )
}
 export default Counter;