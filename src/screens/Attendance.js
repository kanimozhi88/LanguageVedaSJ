import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
    SafeAreaView,
  SectionList,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';

const DATA = [
  {
    title: 'Tamil',
    data: ['Level1', 'Level2', 'Level3'],
  },
  {
    title: 'Telugu',
    data: ['Level1', 'Level2', 'Level3'],
  },
  {
    title: 'Kanada',
    data: ['Level1', 'Level2', 'Level3'],
  },
  
];

const Attendance = () => (
  <SafeAreaView style={styles.container}>

    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <ScrollView style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </ScrollView>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />

<View style={styles.floatingContainer}>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Shop for Easter</Text>
        <Image
        style={{height:40,width:40,margin:5}}
        source={{uri:'https://kojdev.saudiblocks.com/media/floatingbutton/default/w3kr4m2fi3111.jpg'}}/>
      </TouchableOpacity>
    </View>

  </SafeAreaView>
);

const styles = StyleSheet.create({
  floatingContainercontainer: {
    // position: 'absolute',
    // bottom: 90,
    // top:90
    // right: 20,
  },
  button: {
    flexDirection:"row",
    position: 'absolute',
    bottom: 550,
    left: 140,
    backgroundColor: '#99b596',
    borderRadius: 5,
    width: 200,
    // height: 60,
    // padding:10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    // margin:5
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default Attendance;