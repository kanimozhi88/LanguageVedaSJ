import React from 'react';
import {ScrollView, Text, useWindowDimensions} from 'react-native';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import ParentAssignment from '../../component/ParentAssignment';
import ParentAssesment from '../../component/ParentAssesment';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ParentCourse from '../../component/ParentCourse';
import ParentCourseTile from '../../component/ParentCourseTile';

const ParentCourseBatch = ({navigation, route}) => {
  const {contactId, CourseName} = route.params;
  const batchId = 'a0D1e000002nExXEAU';
  console.log('passed Ids are --->', batchId, contactId, CourseName);
  const FirstRoute = () => (
    <ParentCourse batchId={batchId} contactId={contactId} CourseName={CourseName}/>
  );

  const SecondRoute = () => (
    <ParentAssignment batchId={batchId} contactId={contactId} />
  );

  const ThirdRoute = () => (
    <ParentAssesment batchId={batchId} contactId={contactId} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Course', color: '#F38216'},
    {key: 'second', title: 'Assignment', color: '#F38216'},
    {key: 'third', title: 'Assesment', color: '#F38216'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyl}
      style={{backgroundColor: 'white'}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: focused ? route.color : '#979797',
            fontSize: 16,
            fontWeight: '500',
          }}>
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            marginLeft: 20,
            elevation: 3,
            borderRadius: 10,
          }}>
          <Image
            source={require('../../assets/orangebackarrow.jpg')}
            style={{width: 40, height: 40, alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
      <ParentCourseTile
        batchId={batchId}
        contactId={contactId}
        CourseName={CourseName}
      />
      <View style={{marginTop: 5, flex: 1}}>
        <TabView
          renderLabel={{color: 'red'}}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
};

export default ParentCourseBatch;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  courseTile: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 340,
    height: 212,
    margin: 10,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    marginHorizontal: 25,
  },
  image: {
    width: 340,
    height: 146,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleContainer: {
    margin: 5,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 15,
    letterSpacing: -0.3,
    color: '#474646',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 7,
  },
  desItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
});
