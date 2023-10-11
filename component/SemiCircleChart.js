import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

const {width} = Dimensions.get('window');
const radius = 100;
const strokeWidth = 20;
const circumference = 2 * Math.PI * radius;

const SemiCircleChart = ({accelerometerValue = 10}) => {
  const angle = (accelerometerValue / 10) * Math.PI; // Assuming accelerometerValue ranges from -10 to 10

  return (
    <View style={styles.container}>
      <Svg
        width={radius * 2}
        height={radius + strokeWidth}
        viewBox={`0 0 ${radius * 2} ${radius + strokeWidth}`}>
        <Circle
          cx={radius}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Path
          d={`M${radius},${radius + strokeWidth / 2} L${radius},${
            radius + strokeWidth / 2
          } L${radius},${
            radius + strokeWidth / 2 - radius
          } A${radius},${radius} 0 ${angle > Math.PI ? 1 : 0} 1 ${
            radius + radius * Math.sin(angle)
          },${radius + strokeWidth / 2 - radius * Math.cos(angle)} Z`}
          fill="#007bff"
        />
      </Svg>
      <Text style={styles.label}>{accelerometerValue.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default SemiCircleChart;
