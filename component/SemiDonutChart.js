import React from 'react';
import { View, StyleSheet } from 'react-native';
import { G, Circle, Rect, Svg, Path } from 'react-native-svg';

const SemiDonutChart = () => {
  const radius = 50; // Adjust the radius as needed
  const strokeWidth = 10; // Adjust the stroke width as needed
  const centerX = radius + strokeWidth;
  const centerY = radius + strokeWidth;
  const angleInRadians = (Math.PI / 180) * 180; // 180 degrees in radians

  const arcPath = `
    M ${centerX},${centerY}
    L ${centerX},${centerY - radius}
    A ${radius},${radius} 0 0 1 ${centerX + radius * Math.cos(angleInRadians)},${centerY - radius * Math.sin(angleInRadians)}
    L ${centerX},${centerY}
  `;

  return (
    <View style={styles.chartContainer}>
      <Svg width={radius * 2 + strokeWidth * 2} height={radius + strokeWidth}>
        <G rotation="-90" origin={`${centerX},${centerY}`}>
          <Circle cx={centerX} cy={centerY} r={radius} fill="lightgray" />
          <Path d={arcPath} stroke="blue" strokeWidth={strokeWidth} fill="transparent" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
  },
});

export default SemiDonutChart;
