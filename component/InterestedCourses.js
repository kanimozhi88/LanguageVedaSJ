import React , {useEffect,useState}from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import { getAccessToken } from '../redux/actions';
import BASE_URL from '../apiConfig';

const note = `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.80198 0C8.00792 0 8.16634 0.168 8.16634 0.368V2.944C8.16634 4.408 9.36238 5.608 10.8119 5.616C11.4139 5.616 11.8891 5.624 12.2535 5.624L12.3884 5.62341C12.6319 5.62156 12.9597 5.616 13.2436 5.616C13.4416 5.616 13.6 5.776 13.6 5.976V12.408C13.6 14.392 12.0079 16 10.0436 16H3.73861C1.67921 16 0 14.312 0 12.232V3.608C0 1.624 1.6 0 3.57228 0H7.80198ZM8.6495 10.32H4.34059C4.01584 10.32 3.74653 10.584 3.74653 10.912C3.74653 11.24 4.01584 11.512 4.34059 11.512H8.6495C8.97426 11.512 9.24356 11.24 9.24356 10.912C9.24356 10.584 8.97426 10.32 8.6495 10.32ZM7.01782 6.32H4.34059C4.01584 6.32 3.74653 6.592 3.74653 6.92C3.74653 7.248 4.01584 7.512 4.34059 7.512H7.01782C7.34257 7.512 7.61188 7.248 7.61188 6.92C7.61188 6.592 7.34257 6.32 7.01782 6.32ZM9.32055 0.7248C9.32055 0.38 9.73481 0.2088 9.97164 0.4576C10.8279 1.3568 12.3241 2.9288 13.1606 3.8072C13.3918 4.0496 13.2223 4.452 12.8889 4.4528C12.2378 4.4552 11.4703 4.4528 10.9182 4.4472C10.0421 4.4472 9.32055 3.7184 9.32055 2.8336V0.7248Z" fill="#B9B9B9" fill-opacity="0.54"/>
</svg>
`;
const clock = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00065 1.33337C11.6873 1.33337 14.6673 4.32004 14.6673 8.00004C14.6673 11.6867 11.6873 14.6667 8.00065 14.6667C4.32065 14.6667 1.33398 11.6867 1.33398 8.00004C1.33398 4.32004 4.32065 1.33337 8.00065 1.33337ZM7.76732 4.62004C7.49398 4.62004 7.26732 4.84004 7.26732 5.12004V8.48671C7.26732 8.66004 7.36065 8.82004 7.51398 8.91337L10.1273 10.4734C10.2073 10.52 10.294 10.5467 10.3873 10.5467C10.554 10.5467 10.7207 10.46 10.814 10.3C10.954 10.0667 10.8807 9.76004 10.6407 9.61337L8.26732 8.20004V5.12004C8.26732 4.84004 8.04065 4.62004 7.76732 4.62004Z" fill="#B9B9B9" fill-opacity="0.54"/>
</svg>
`;
const star = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1418 8.27292C10.9605 8.4486 10.8772 8.70266 10.9185 8.95183L11.5407 12.3954C11.5932 12.6872 11.47 12.9826 11.2257 13.1513C10.9864 13.3263 10.6679 13.3473 10.4069 13.2073L7.30696 11.5905C7.19917 11.5331 7.07949 11.5023 6.957 11.4988H6.76733C6.70154 11.5086 6.63715 11.5296 6.57835 11.5618L3.47776 13.1863C3.32448 13.2633 3.1509 13.2906 2.98082 13.2633C2.56648 13.1849 2.29001 12.7901 2.3579 12.3737L2.98082 8.93013C3.02212 8.67887 2.93883 8.4234 2.75755 8.24492L0.230183 5.79524C0.0188106 5.59017 -0.0546798 5.28221 0.0419076 5.00435C0.135695 4.72718 0.375064 4.52491 0.664126 4.47941L4.14267 3.97478C4.40724 3.94748 4.63961 3.78651 4.75859 3.54854L6.29139 0.405947C6.32779 0.335956 6.37468 0.271565 6.43137 0.216972L6.49436 0.167978C6.52726 0.131583 6.56506 0.101487 6.60705 0.0769899L6.68334 0.0489936L6.80232 0H7.09699C7.36015 0.0272964 7.59182 0.184776 7.7129 0.419945L9.266 3.54854C9.37799 3.77741 9.59566 3.93629 9.84693 3.97478L13.3255 4.47941C13.6194 4.52141 13.8651 4.72438 13.9624 5.00435C14.0541 5.28501 13.975 5.59297 13.7594 5.79524L11.1418 8.27292Z" fill="#F38216"/>
</svg>
`;
const imageUrl =
  'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1';

const InterestedCourses = () => {
  const [parentRes,setParentRes] = useState([]);
  const recordId = useSelector(state => state.recordId);
  const data = [{"TotalLessonPlans":5,"Recommended":true,"id":"a0E1e000002qzjREAQ","DurationInMonths":8,"CourseName":"Hindi","courseImage":"<a href=\"<p><img src=\"https://c8.alamy.com/comp/MWXG4B/letter-a-alphabet-symbol-english-letter-english-alphabet-from-yellow-golden-on-a-white-background-with-clipping-path-MWXG4B.jpg\" alt=\"English letter hi-res stock photography and images - Alamy\"></img></p>\" target=\"_blank\"><img src=\"<p><img src=\"https://c8.alamy.com/comp/MWXG4B/letter-a-alphabet-symbol-english-letter-english-alphabet-from-yellow-golden-on-a-white-background-with-clipping-path-MWXG4B.jpg\" alt=\"English letter hi-res stock photography and images - Alamy\"></img></p>\" alt=\"Hindi\"></a>"},{"TotalLessonPlans":0,"Recommended":true,"id":"a0E1e000002St65EAC","DurationInMonths":10,"CourseName":"Kannada","courseImage":"<a href=\"<p><img src=\"https://languageveda--developer.sandbox.file.force.com/servlet/rtaImage?eid=a0E1e000002St65&amp;feoid=00N1e00000Y7v7Y&amp;refid=0EM1e0000005rzX\" alt=\"01.png\"></img></p>\" target=\"_blank\"><img src=\"<p><img src=\"https://languageveda--developer.sandbox.file.force.com/servlet/rtaImage?eid=a0E1e000002St65&amp;feoid=00N1e00000Y7v7Y&amp;refid=0EM1e0000005rzX\" alt=\"01.png\"></img></p>\" alt=\"Kannada\"></a>"},{"TotalLessonPlans":0,"Recommended":true,"id":"a0E1e000002T3opEAC","DurationInMonths":null,"CourseName":"Marathi","courseImage":"<a href=\"<p><img src=\"https://languageveda--developer.sandbox.file.force.com/servlet/rtaImage?eid=a0E1e000002T3op&amp;feoid=00N1e00000Y7v7Y&amp;refid=0EM1e0000005s0p\" alt=\"14.png\"></img></p>\" target=\"_blank\"><img src=\"<p><img src=\"https://languageveda--developer.sandbox.file.force.com/servlet/rtaImage?eid=a0E1e000002T3op&amp;feoid=00N1e00000Y7v7Y&amp;refid=0EM1e0000005s0p\" alt=\"14.png\"></img></p>\" alt=\"Marathi\"></a>"},{"TotalLessonPlans":0,"Recommended":true,"id":"a0E1e000002r5O7EAI","DurationInMonths":10,"CourseName":"Hindi","courseImage":null}]

  
  useEffect(()=>{
    ParentrecommenedCoursesApi();
  },[])

  

  const ParentrecommenedCoursesApi = async () => {
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(
      `${BASE_URL}/services/apexrest/RNParentRecommendedCourse`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: bearer,
        }),
      },
    );
    let ParentRecApi = await response.json();
    console.log('ParentApi recommanded ::::::::::::::',  ParentRecApi);
    setParentRes(JSON.parse(ParentRecApi));
   
  };

  const renderItem = ({item}) => {
    return (
     
      <TouchableOpacity 
      // onPress={()=> navig}
      style={styles.tile}>
        <View style={styles.tileView}>
          <View>
            <Image
              source={require('../assets/interested.png')}
              style={styles.tileImage}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight:"500",
                  // letterSpacing: -0.3,
                  color:"#000000",
                  marginTop:10
                }}>
                {item?.CourseName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  marginLeft:10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                }}>
                <SvgXml
                  xml={clock}
                  width="13.33"
                  height="13.33"
                  color="#00000000"
                />
                <Text style={{color:"black",fontSize:12,fontWeight:"500"}}>{item?.DurationInMonths} months</Text>
              </View>
              <View
                style={{
                  marginLeft:40,
                  flexDirection: 'row',
                  // alignItems: 'center',
                  gap: 7,
                }}>
                <SvgXml
                  xml={note}
                  width="13.33"
                  height="13.33"
                  color="#00000000"
                />
                <Text style={{color:"black",fontSize:12,fontWeight:"500"}}> {item?.TotalLessonPlans} lessons</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 8,
                top:10
              }}>
              <SvgXml xml={star} width="14" height="14" color="#F38216" />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '500',
                  color: '#F38216',
                }}>
                4.4
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
     
    );
  };

  return (
    <View style={{flex:1}}>
      <FlatList
        data={parentRes}
        renderItem={renderItem}
        // keyExtractor={item => item.id.toString()}
        style={{maxHeight: 200}}
      />
    </View>
  );
};

export default InterestedCourses;
const styles = StyleSheet.create({
  tile: {
    flex: 1,
    width: '100%',
    marginBottom: 15,
    height: 120,
    borderRadius: 4,
    elevation: 1.5,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center',
    // alignItems: 'center',

  },
  tileView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: 20,
  },
  tileImage: {
    width: 106,
    height: 93,
    borderRadius: 4,
    marginLeft:12,
    marginTop:10,
  },
});
