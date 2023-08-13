import React, { useEffect, useState, useRef } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  useWindowDimensions
} from 'react-native';
import StudentCourseSelect from '../../component/StudentCourseSelect';
import StudentCourseCurriculum from '../../component/StudentCourseCurriculum';
import StudentCourseAssignment from '../../component/StudentCourseAssignment';
import FacultyBatchSelect from '../../component/FacultyBatchSelect';
import FacultyAssessment from '../../component/FacultyAssignment';
import FacultyAssignment from '../../component/FacultyAssignment';

const FacultyCourseBatch = ({ route, navigation }) => {

  const { batchId, courseName } = route.params;
  console.log("passed batchid", batchId, courseName)

  const FirstRoute = () => (
    // <StudentCourseSelect batchId={batchId} courseName={courseName} />
    <FacultyBatchSelect batchId={batchId} courseName={courseName}/>
    // <View style={{ flex: 1, backgroundColor: 'blue' }} />

  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'red' }} />
  );

  const ThirdRoute = () => (
    // <View style={{ flex: 1, backgroundColor: '#4caf50' }} />
<FacultyAssignment batchid={batchId}/>

  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Course', color: '#F38216' },
    { key: 'second', title: 'Assessment', color: '#F38216' },
    { key: 'third', title: 'Assignment', color: '#F38216' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyl}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: focused ? route.color : '#979797', fontSize: 16, fontWeight: "500" }}>
          {route.title}
        </Text>
      )}
    />
  );

  return (

    <SafeAreaView style={styles.container}>
<View style={{flexDirection:"row"}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backarrowView}>
        <Image
          source={require('../../assets/orangebackarrow.jpg')}
          style={styles.backarrowImg} />
          
      </TouchableOpacity>
      <Text style={{color:"#1B2236",fontSize:16,fontWeight:"500",marginLeft:"5%",alignSelf:"center",marginTop:10}}>{courseName}</Text>
      </View>
      <View style={{ marginTop: 5, flex: 1 }}>
        <TabView
          renderLabel={{ color: "red" }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>

    </SafeAreaView>
  )
}
export default FacultyCourseBatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  backarrowView:{ width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10, marginTop: 10 },
  backarrowImg:{ width: 40, height: 40, alignSelf: "center", borderRadius: 10 },
  indicatorStyl:{ backgroundColor: '#D6387F', width: 45, marginLeft: 45 },
})