import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import { useDispatch } from "react-redux";
import { GET_RECORD_TYPE } from "../../redux/actionType";
import { getRecordType } from "../../redux/actions";
import { NativeModules } from 'react-native';
// const { CalendarModule } = NativeModules;
// console.log(CalendarModule);
// CalendarModule.CreateCalendarEvent(res => console.log(res));
// import { } from 'react-native-gesture-handler';



const SelectionScreen = ({ navigation }) => {


  const dispatch = useDispatch();

  return (

    <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
      {/* <View style={{width:550,height:550,borderRadius:300,backgroundColor:"#A22451",position:'absolute',left:-70,top:-610}}>
                <Image
                source= {require('../../assets/icon.png')}
                style={{width:"60%",height:100,right:115,position:"absolute",bottom:40,borderRadius:35}}/>
               
            </View> */}


      <View>
        <TouchableOpacity
          onPress={() => { navigation.navigate('LoginScreen'), dispatch(getRecordType("Student")) }}
          style={styles.textInputStyle}>
          <Text style={styles.textStyle}>STUDENT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigation.navigate('LoginScreen'), dispatch(getRecordType("Faculty")) }}
          style={styles.textInputStyle}>
          <Text style={styles.textStyle}>FACULTY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigation.navigate('LoginScreen'), dispatch(getRecordType("Parent")) }}
          style={styles.textInputStyle}>
          <Text style={styles.textStyle}>PARENT</Text>
        </TouchableOpacity>
      </View>


      <View style={{ width: "100%", height: 50, backgroundColor: "#A22451", bottom: 0, left: 0, right: 0, position: "absolute" }} />

    </View>
  )
};

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: "#E3B8CB",
    width: 250,
    margin: 20,
    borderRadius: 10

  },
  textStyle: {
    alignSelf: "center",
    fontWeight: "800",
    padding: 15,
    fontSize: 19,
    color: "black"
  },
  container: {
    alignSelf: 'center',
    backgroundColor: "white",
    marginTop: 100,
    // width: 200,
    width: Dimensions.get('window').width,
    overflow: 'hidden', // for hide the not important parts from circle
    margin: 10,
    height: 100,
    bottom: 100
  },
  background: { // this shape is a circle 
    borderRadius: Dimensions.get('window').width / 1.8, // border borderRadius same as width and height
    width: Dimensions.get('window').width + 150,

    height: Dimensions.get('window').width + 150,
    marginLeft: -75, // reposition the circle inside parent view
    position: 'absolute',
    bottom: 25, // show the bottom part of circle
    overflow: 'hidden', // hide not important part of image
    backgroundColor: "#A22451"
  },
  bottomContainer: {
    alignSelf: 'center',
    backgroundColor: "white",
    // marginTop: 100,
    // width: 200,
    width: Dimensions.get('window').width,
    overflow: 'hidden', // for hide the not important parts from circle
    height: 100,
    bottom: -5,
    position: 'absolute',

  },
  bottomBackground: {
    borderRadius: Dimensions.get('window').width / 1.8, // border borderRadius same as width and height
    width: Dimensions.get('window').width + 150,

    height: Dimensions.get('window').width + 150,
    marginLeft: -75, // reposition the circle inside parent view

    bottom: -5, // show the bottom part of circle
    overflow: 'hidden', // hide not important part of image
    backgroundColor: "#A22451"
  }
});

export default SelectionScreen;