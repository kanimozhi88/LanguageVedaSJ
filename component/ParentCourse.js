import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ParentCourse = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Language Learning Kannada </Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,Lorem Ipsum is simply dummy text
        </Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Course Details </Text>
      </View>
      <View></View>
    </View>
  );
};

export default ParentCourse;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
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
});
