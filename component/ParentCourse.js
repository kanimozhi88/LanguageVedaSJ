import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const ParentCourse = () => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Language Learning Kannada </Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,Lorem Ipsum is simply dummy text
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Course Details </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 120,
            margin: 10,
            marginHorizontal: 25,
          }}>
          <View>
            <Text>Class on</Text>
          </View>
          <Text>Class Timings</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 120,
            marginHorizontal: 20,
          }}>
          <View>
            <Text>Mon,Wed,Fri</Text>
          </View>
          <View>
            <Text>06:00 pm</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 120,
            margin: 10,
            marginHorizontal: 25,
          }}>
          <View>
            <Text>Start Date</Text>
          </View>
          <Text>End Date</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 120,
            marginHorizontal: 22,
          }}>
          <View>
            <Text>1/04/2023</Text>
          </View>
          <View>
            <Text>31/08/2023</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Class Details </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 120,
            marginHorizontal: 22,
          }}>
          <View>
            <Text>Revision Class</Text>
          </View>
          <View>
            <Text>Backup Class</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 120,
            marginHorizontal: 22,
          }}>
          <View>
            <Text>07</Text>
          </View>
          <View>
            <Text>07</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ParentCourse;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
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
  subtitleContainer: {
    marginBottom: 15,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  scrollViewContainer: {
    flexGrow: 1,
    // This allows the content to grow vertically
  },
  scrollView: {
    maxHeight: 350, // Adjust this value to your desired maximum height
  },
});
