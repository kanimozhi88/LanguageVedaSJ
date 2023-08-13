import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ProgressCircle } from 'react-native-progress';

const ProgressBar = ({ totalTime }) => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress > 0) {
          return prevProgress - 0.01; // Adjust this value to control the speed of progress reduction
        }
        return prevProgress;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <View>
      <ProgressCircle
        progress={progress}
        size={100}
        thickness={5}
        showsText
        formatText={() => formatTime(progress * totalTime)}
      />
    </View>
  );
};

export default ProgressBar;