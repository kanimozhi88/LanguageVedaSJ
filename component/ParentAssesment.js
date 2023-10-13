import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';

import BASE_URL from '../apiConfig';
import {getAccessToken} from '../redux/actions';
import AnimatedCircularProgressBar from './AnimatedCircularProgressBar';

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

const ParentAssesment = ({batchId, contactId}) => {
  const [openItem, setOpenItem] = useState(null);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    parentAssignmentApi();
  }, []);
  const parentAssignmentApi = async () => {
    let data = {};
    data.batchId = batchId;
    data.contactId = contactId;
    const body = JSON.stringify(data);
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(
      `${BASE_URL}/services/apexrest/RNParentAssessmentController`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: bearer,
        }),
        body,
      },
    );
    let result = await response.json();
    console.log('parent assesment ====', result);
    setApiData(result);
  };

  const expandItem = itemId => {
    setOpenItem(itemId);
  };

  const closeItem = () => {
    setOpenItem(null);
  };

  const renderItem = ({item}) => {
    const isOpen = openItem === item.id;

    return (
      <View>
        <TouchableOpacity
          style={styles.listContainer}
          onPress={() => {
            if (isOpen) {
              closeItem();
            } else {
              expandItem(item.id);
            }
          }}>
          {!isOpen && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 90,
                }}>
                <View>
                  <Text>{item.title}</Text>
                </View>
                <View
                  style={{
                    width: 71,
                    height: 20,
                    borderRadius: 9,
                    backgroundColor: '#4AE8C9',
                  }}>
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: '500',
                      lineHeight: 20,
                      letterSpacing: 0,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {item.status}
                  </Text>
                </View>
              </View>
              <View>
                <Text>AssesmentDate: 21/08/2023</Text>
              </View>
            </>
          )}

          {/* Additional content for expanded item */}
          {isOpen && (
            <>
              <View>
                <Text>{item.title}</Text>
              </View>
              <View>
                <Text>{item.status}</Text>
              </View>
              <View>
                <SvgXml
                  xml={isOpen ? upArrow : downArrow}
                  color={' #2E2E4E'}
                  width="15"
                  height={'10'}
                />
              </View>
              <View>
                <Text>Assignment Name</Text>
                <Text>Test Date</Text>
                <Text>Feed Back</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Assesment</Text>
        </View>
        <View
          style={{
            width: 130,
            height: 130,
            borderRadius: 65,
            borderColor: '#999999',
            borderWidth: 1,
            alignSelf: 'center',
          }}>
          <AnimatedCircularProgressBar
            size={127}
            width={20}
            fill={null}
            tintColor="#AFFFCF"
            backgroundColor="#F9F9F9"
            duration={500} // Animation duration
            max={100} // Max progress value
            style={{fontSize: 18, color: 'white'}}
          />
        </View>
        <Text
          style={{
            color: '#000000',
            marginTop: 10,
            alignSelf: 'center',
            fontWeight: '500',
            fontSize: 12,
          }}>
          Status
        </Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Assesment</Text>
        </View>
        {/* <FlatList
          data={data}
          renderItem={renderItem}
          style={{maxHeight: 300}}
          keyExtractor={item => item.id.toString()}
        /> */}
      </ScrollView>
    </>
  );
};

export default ParentAssesment;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    flex: 1,
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
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 120,
    width: 340,
    backgroundColor: '#ffffff',
    elevation: 4,
    marginVertical: 10,
  },
});
