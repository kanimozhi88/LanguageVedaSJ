// import React, { useEffect } from "react";
// import { View,Text,TextInput } from "react-native";
// import { Circle, Svg } from "react-native-svg";
// import { AnimatedCircularProgress } from 'react-native-circular-progress';

// import Animmated, { interpolateColor, makeMutable, useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

// const CircularProgressBar =()=>{

//     const [currentFill, setCurrentFill] = useState(0);
//     const targetFill = 70;
//     const duration = 900; // Animation duration in milliseconds
//     const intervalDuration = 1000; // Interval duration in milliseconds (time between each update)
  
//     useEffect(() => {
//       let animationInterval;
//       const step = (targetFill - currentFill) * (intervalDuration / duration);
  
//       if (currentFill < targetFill) {
//         animationInterval = setInterval(() => {
//           setCurrentFill((prevFill) => {
//             const newFill = prevFill + step;
//             return newFill >= targetFill ? targetFill : newFill;
//           });
//         }, intervalDuration);
//       }
  
//       return () => clearInterval(animationInterval);
//     }, [currentFill, targetFill]);


//     return(
//         <View>
//              <AnimatedCircularProgress
//       style={{ alignSelf: 'center', margin: 4, color: 'orange' }}
//       size={120}
//       width={20}
//       fill={currentFill}
//       rotation={0}
//       lineCap="round"
//       tintColor="yellow"
//       backgroundColor="red"
//     >
//       {(fill) => <Text style={{ fontSize: 18 }}>{`${Math.round(fill)}%`}</Text>}
//     </AnimatedCircularProgress>
//         </View>
//     )
// }
// export default CircularProgressBar;