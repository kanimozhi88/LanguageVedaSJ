import React, {useState} from 'react';
import {View} from 'react-native';
import {StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import {SvgXml} from 'react-native-svg';
import SemiCircleChart from './SemiCircleChart';
import {TouchableOpacity} from 'react-native-gesture-handler';

const downArrow = `<svg width="35" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 20L11.0048 12.5H23.9952L17.5 20Z" fill="#2E2E4E"/>
</svg>
`;
const upArrow = `<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 6.55671e-07L12.9952 7.5L0.00480872 7.5L6.5 6.55671e-07Z" fill="#2E2E4E"/>
</svg>
`;
const data = [
  {
    id: '1',
    title: 'Ln 1 - Basic Words',
    status: 'Completed',
  },
  {
    id: '2',
    title: 'Ln 1 - Basic Words ',
    status: 'Completed',
  },
  {
    id: '3',
    title: 'Ln 1 - Basic Words',
    status: 'Completed',
  },
  {
    id: '4',
    title: 'Ln 1 - Basic Words',
    status: 'Completed',
  },
  {
    id: '5',
    title: 'Ln 1 - Basic Words',
    status: 'Completed',
  },
  {
    id: '6',
    title: 'Ln 1 - Basic Words',
    status: 'Completed',
  },
  {
    id: '7',
    title: 'Ln 1 - Basic Words',
    status: 'Completed',
  },
  {
    id: '8',
    title: 'Ln 1 - Basic Words',
    status: 'Completed',
  },
  {
    id: '9',
    title: 'Ln 1 - Basic Words',
    status: 'Completed',
  },
];
const ParentAssignment = () => {
  const [openItem, setOpenItem] = useState(false);
  const toggler = () => {
    setOpenItem(!openItem);
    console.log('clicked');
  };
  const renderItems = ({item}) => {
    return (
      <View style={styles.listContainer}>
        <View>
          <Text>{item.title}</Text>
        </View>
        <View
          style={{
            width: 83.17,
            height: 21.5,
            borderRadius: 10.5,
            backgroundColor: '#3AC28C',
          }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: '600',
              lineHeight: 20,
              letterSpacing: -1.1,
              textAlign: 'center',
              color: 'white',
            }}>
            {item.status}
          </Text>
        </View>
        <View>
          <SvgXml
            xml={openItem ? upArrow : downArrow}
            color={' #2E2E4E'}
            width="15"
            height={'10'}
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <ScrollView style={styles.container}>
        {/* <View style={styles.titleContainer}>
          <Text style={styles.title}> Assignment Status</Text>
        </View>
        <SemiCircleChart /> */}

        <View style={styles.titleContainer}>
          <Text style={styles.title}> Assignment</Text>
        </View>

        {/* <FlatList
          data={data}
          renderItem={renderItems}
          style={{maxHeight: 300}}
          keyExtractor={item => item.id.toString()}
        /> */}
        {data.map(item => (
          <>
            <TouchableOpacity onPress={toggler}>
              <View key={item.id} style={styles.listContainer}>
                <View>
                  <Text>{item.title}</Text>
                </View>
                <View
                  style={{
                    width: 83.17,
                    height: 21.5,
                    borderRadius: 10.5,
                    backgroundColor: '#3AC28C',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                      lineHeight: 20,
                      letterSpacing: -1.1,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {item.status}
                  </Text>
                </View>
                <View>
                  <SvgXml
                    xml={openItem ? upArrow : downArrow}
                    color={' #2E2E4E'}
                    width="15"
                    height={'10'}
                  />
                </View>
                {openItem && (
                  <View>
                    <Text>Assignment Name</Text>
                    <Text>Test Date</Text>
                    <Text>Feed Back</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </>
        ))}
      </ScrollView>
    </>
  );
};

export default ParentAssignment;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    flex: 1,
    maxHeight: 350,
  },
  scrollViewContainer: {
    flexGrow: 1,
    // This allows the content to grow vertically
  },
  scrollView: {
    maxHeight: 350, // Adjust this value to your desired maximum height
  },
  titleContainer: {
    marginVertical: 15,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: -0.3,
  },
  listContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 59,
    width: 340,
    backgroundColor: 'white',
    elevation: 4,
    marginVertical: 10,
  },
});
