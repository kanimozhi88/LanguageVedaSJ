import React, { useState } from 'react';
import { Text, TouchableOpacity ,ScrollView, View} from 'react-native';
import HTML from 'react-native-render-html';


const TruncatedPassedText = ({ text, maxLength }) => {
  const [expanded, setExpanded] = useState(false);
  const truncatedText = text ? (expanded ? text : text.slice(0, maxLength)) : '';

  const handleSeeMore = () => {
    setExpanded(true);
  };

  return (
    <ScrollView >
    <Text>
      <View style={{}}>
      <HTML source={{ html: truncatedText }} />
      </View>
      {!expanded && text && text.length > maxLength && (
        <Text style={{ color: '#F38216',fontSize:16,fontWeight:"400"}} onPress={handleSeeMore}>... See more</Text>
      )}
    </Text>
    </ScrollView>
  );
};

const TruncatedText = ({ questions }) => {
  const maxLength = 435; // Adjust the maximum length as per your needs

  return (
    <TruncatedPassedText text={questions} maxLength={maxLength} />
  );
};

export default TruncatedText;
