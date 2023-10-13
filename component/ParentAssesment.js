import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';

import BASE_URL from '../apiConfig';
import {getAccessToken} from '../redux/actions';
import PieChart from 'react-native-pie-chart';

const downArrow = `<svg width="35" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 20L11.0048 12.5H23.9952L17.5 20Z" fill="#2E2E4E"/>
</svg>
`;
const upArrow = `<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 6.55671e-07L12.9952 7.5L0.00480872 7.5L6.5 6.55671e-07Z" fill="#2E2E4E"/>
</svg>
`;

const ParentAssesment = ({batchId, contactId}) => {
  const [openItem, setOpenItem] = useState(null);
  const [final, setFinal] = useState('');
  const [seriesArr, setSeriesArr] = useState({
    completed: 1,
    InProgress: 1,
    YetToStart: 1,
  });

  useEffect(() => {
    parentAssessmentApi();
  }, []);
  const parentAssessmentApi = async () => {
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
    setFinal(result?.records);
  };
  const statusOrder = [
    'Assignment Submitted',
    'Vetting In Progress',
    'Redo',
    'Completed',
  ];
  if (final !== '') {
    const sortedData = final.sort((a, b) => {
      const statusA = statusOrder.indexOf(a.status);
      const statusB = statusOrder.indexOf(b.status);
      return statusA - statusB;
    });
    console.log('sorted data is', sortedData);
  }
  const getPieChartStatus = () => {
    let completedCount = 0;
    let redoCount = 0;
    let vettingInProgressCount = 0;
    let assignmentSubmittedCount = 0;
    let yetToStartCount = 0; // Initialize a count for "Yet To Start"

    if (final !== '' && final.length > 0) {
      final.forEach(record => {
        switch (record.status) {
          case 'Completed':
            completedCount++;
            break;
          case 'Redo':
            redoCount++;
            break;
          case 'Vetting In Progress':
            vettingInProgressCount++;
            break;
          case 'Assignment Submitted':
            assignmentSubmittedCount++;
            break;
          case 'Yet_To_Submit':
            yetToStartCount++; // Increment the count for "Yet To Start"
            break;
          default:
            break;
        }
      });
    }

    setSeriesArr({
      completed: completedCount,
      submitted: assignmentSubmittedCount,
      InProgress: vettingInProgressCount,
      Redo: redoCount,
      YetToStart: yetToStartCount, // Set the count for "Yet To Start"
    });
  };
  const widthAndHeight = 145;
  const series = [
    seriesArr.completed,
    seriesArr.InProgress,
    seriesArr.YetToStart,
  ];
  const sliceColor = ['#04BFDA', '#FB67CA', '#FFA84A'];
  console.log('LENGTH IS::::::::', final?.length);

  const AssessmentItem = ({assessment, type}) => {
    const [showMessage, setShowMessage] = useState(false);

    const toggleMessage = () => {
      console.log('inside');
      setShowMessage(!showMessage);
    };
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 10,
          elevation: 5,
        }}>
        <TouchableOpacity
          onPress={toggleMessage}
          style={{
            backgroundColor: '#00000',
            borderRadius: 1,
            padding: 10,
            marginBottom: 10,
            justifyContent: 'space-evenly',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                width: '40%',
                color: '#130F26',
                fontWeight: '400',
                fontSize: 16,
                fontFamily: 'Poppins',
              }}>
              Ln 1- {assessment?.courseName}
            </Text>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#3AC28C',
                flexGrow: 0.5,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  lineHeight: 20,
                  letterSpacing: -1.1,
                  textAlign: 'center',
                  color: 'white',
                  padding: 5,
                }}>
                {assessment?.status}
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
          {showMessage && (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginHorizontal: 15,
                marginVertical: 10,
                gap: 10,
              }}>
              <Text style={styles.subtitle}>Assignment Name</Text>
              {/* <View style={styles.readonlyInput}> */}
              <Text style={styles.readonlyInput}>
                {' '}
                {assessment?.assignmentTitle}
              </Text>
              {/* <View/> */}

              <Text style={styles.subtitle}>Test Date</Text>
              <Text style={styles.readonlyInput}>{assignment?.testDate}</Text>
              <Text style={styles.subtitle}>Feed Back</Text>
              <Text style={styles.readonlyInputFeedback}>
                {' '}
                {assessment?.feedBack ? assessment?.feedBack : 'Not available'}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {final?.length > 0 ? (
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}> Assessment Status</Text>
            </View>

            <View style={{alignSelf: 'center'}}>
              {seriesArr.completed !== 0 || seriesArr.InProgress !== 0 ? (
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                  coverRadius={0.55}
                />
              ) : (
                <></>
              )}
            </View>
            {/* <View
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
          </View> */}

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
              <Text style={styles.title}> Assessment</Text>
            </View>

            <View style={{marginBottom: 60}}>
              {final !== ''
                ? final.map((item, index) => (
                    <AssessmentItem key={index} assessment={item} />
                  ))
                : null}
            </View>

            {/* {assignmentData.map(item => (
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
        ))} */}
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Loading...
            </Text>
          </View>
        )}
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
    color: '#474646',
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
    color: '#474646',
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
