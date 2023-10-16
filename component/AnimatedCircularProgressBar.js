import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const AnimatedCircularProgressBar = ({
  fill,
  tintColor,
  backgroundColor,
  size,
  width,
  duration,
  max,
  style,
}) => {
  const [currentFill, setCurrentFill] = useState(0);

  useEffect(() => {
    let animationInterval;
    const step = (fill - currentFill) * (duration / 100);

    if (currentFill < fill) {
      animationInterval = setInterval(() => {
        setCurrentFill(prevFill => {
          const newFill = prevFill + step;
          return newFill >= fill ? fill : newFill;
        });
      }, 100);
    }

    return () => clearInterval(animationInterval);
  }, [fill, currentFill, duration]);

  return (
    <AnimatedCircularProgress
      size={size}
      width={width}
      fill={currentFill}
      tintColor={tintColor}
      backgroundColor={backgroundColor}
      rotation={0}
      lineCap="round">
      {fill => <Text style={style}>{`${Math.round(fill)}%`}</Text>}
    </AnimatedCircularProgress>
  );
};

export default AnimatedCircularProgressBar;
