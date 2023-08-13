import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image,AsyncStorage,TouchableOpacity } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import Login from "../../component/Login";


const OnboardingScreen = () => {
    const navigation = useNavigation();
    const DotComponent =({selected})=>{
        return(
            <View style={{width:selected ? 40 :10,height:10,borderColor: selected? "red" : "lightgray",borderWidth:1,borderRadius:selected? 15: 5,backgroundColor:selected? "red": "gray",margin:5}}>
                {/* <View style={{width:8,height:8,borderColor: selected? "red" : "#f57c6c",backgroundColor:selected? "red": "#f57c6c"}}></View> */}
            </View>
        )

    };

    return (
        <View style={{flex:1}}>
        <Onboarding
         onSkip ={()=> navigation.replace('LoginScreen')}
         onDone ={()=> navigation.replace('LoginScreen')}
         DotComponent={DotComponent}
         titleStyles={{color:"#e67d15",fontWeight:"bold"}}
        //  showPagination={false}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../assets/girlimage.png')} style={{ height: 400, width: "80%"}} />,
                    // image: () => <Image source={require('../../assets/girlimage.png')} style={{ height: 400, width: "80%" }} />,
                    title: 'Explore New Courses',
                    subtitle: 'Platform that, makes learning easier',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../assets/girlimage.png')} style={{ height: 0, width: 0}} />,
                    title: 'Personalized Learning',
                    subtitle: 'explore tech courses to improve your skills.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../assets/girlimage.png')} style={{ height: 0, width: 0}} />,
                    title: '',
                    // subtitle: <Login/>,
                    subtitle: <Login />,

                },
            ]}
        />
{/* <TouchableOpacity style={{}}>
    <Text>Login</Text>
</TouchableOpacity> */}
</View>  
    )
}
export default OnboardingScreen;