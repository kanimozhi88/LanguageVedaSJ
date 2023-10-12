import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {getAccessToken} from '../redux/actions';
import BASE_URL from '../apiConfig';
import {TextInput} from 'react-native';
import AnimatedCircularProgressBar from './AnimatedCircularProgressBar';

const downArrow = `<svg width="35" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 20L11.0048 12.5H23.9952L17.5 20Z" fill="#2E2E4E"/>
</svg>
`;
const upArrow = `<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 6.55671e-07L12.9952 7.5L0.00480872 7.5L6.5 6.55671e-07Z" fill="#2E2E4E"/>
</svg>
`;
const assignmentData = [
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
const ParentAssignment = ({batchId, contactId}) => {
  const [openItem, setOpenItem] = useState(false);
  const [data, setData] = useState(null);

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
      `${BASE_URL}/services/apexrest/testassignmentController/`,
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
    console.log('parent assignment ====', result);
    setData(result);
  };
  const toggler = () => {
    setOpenItem(!openItem);
    console.log('clicked');
  };
  return (
    <>
      <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}> Assignment Status</Text>
        </View>
        <View
            style={{
              width: 130,
              height: 130,
              borderRadius: 65,
              borderColor: '#999999',
              borderWidth: 1,
              alignSelf:"center"
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
          <Text style={styles.title}> Assignment</Text>
        </View>
        {assignmentData.map(item => (
          <>
            <TouchableOpacity onPress={toggler}>
              <View style={styles.listContainer}>
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 15,
                  }}>
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
                      width="35"
                      height={'20'}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    marginHorizontal: 15,
                    marginVertical: 10,
                    gap: 10,
                  }}>
                  <Text style={styles.subtitle}>Assignment Name</Text>
                  <TextInput style={styles.readonlyInput} editable={false} />
                  <Text style={styles.subtitle}>Test Date</Text>
                  <TextInput style={styles.readonlyInput} editable={false} />
                  <Text style={styles.subtitle}>Feed Back</Text>
                  <TextInput
                    style={styles.readonlyInputFeedback}
                    editable={false}
                  />
                </View>
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
    flexDirection: 'column',
    flexGrow: 1,

    height: 379,
    width: 340,
    backgroundColor: 'white',
    elevation: 4,
    marginVertical: 10,
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  readonlyInput: {
    width: 197,
    height: 38,
    borderRadius: 4,
    backgroundColor: '#F5F7FB',
  },
  readonlyInputFeedback: {
    borderRadius: 4,
    backgroundColor: '#F5F7FB',
    width: 305,
    height: 96,
  },
});
