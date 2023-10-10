import React , {useEffect,useState}from 'react';
import {FlatList} from 'react-native';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import { getAccessToken } from '../redux/actions';
import BASE_URL from '../apiConfig';


const data = [
  {
    name: 'User 1',
    id: '1',
  },
  {
    name: 'User 2',
    id: '2',
  },
  {
    name: 'User 3',
    id: '3',
  },
  {
    name: 'User 4',
    id: '4',
  },
  {
    name: 'User 5',
    id: '5',
  },
  {
    name: 'User 6',
    id: '6',
  },
  {
    name: 'User 7',
    id: '7',
  },
];
const BottomDrawer = ({isVisible, toggleDrawer}) => {

  useEffect(()=>{
    ParentApi();
  },[])
  const [parentRes,setParentRes] = useState('');
  const recordId = useSelector(state => state.recordId);


  const renderItems = ({item}) => {
    return (
      <TouchableOpacity style={styles.listContainer}>
        <Text style={{fontSize:18,color:"black"}}>{item.studentName}</Text>
      </TouchableOpacity>
    );
  };

  // const renderItems = ({ item }) => {
  //   const [isChecked, setChecked] = useState(false);
  
  //   const handleToggle = () => {
  //     setChecked(!isChecked);
  //   };
  
  //   return (
  //     <TouchableOpacity
  //       style={{ flexDirection: 'row', alignItems: 'center' }}
  //       onPress={handleToggle}
  //     >
  //       <Text style={{ fontSize: 18, color: 'black' }}>{item.studentName}</Text>
  //       <TouchableOpacity
  //         onPress={handleToggle}
  //         style={{
  //           width: 20,
  //           height: 20,
  //           borderRadius: 10,
  //           borderWidth: 2,
  //           borderColor: isChecked ? 'blue' : 'gray',
  //           backgroundColor: isChecked ? 'blue' : 'transparent',
  //         }}
  //       >
  //         {/* You can add an icon or any visual representation for the radio button */}
  //       </TouchableOpacity>
  //     </TouchableOpacity>
  //   );
  // };
 
  const ParentApi = async () => {
    let data = {};
    data.contactId = recordId;

    const body = JSON.stringify(data);
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(
      `${BASE_URL}/services/apexrest/rnparentchildrelationship`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: bearer,
        }),
        body,
      },
    );
    let ParentApi = await response.json();
    console.log('ParentApi ::::::::::::::', ParentApi);
    setParentRes(ParentApi);
   
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1} // Prevents accidental presses
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 90,
              }}>
              <Divider
                style={{
                  width: '30%',
                  alignSelf: 'center',
                  backgroundColor: 'black',
                  marginBottom: 10,
                }}
              />
              <TouchableOpacity onPress={toggleDrawer}>
                <Icon name="close" size={25} color="#707070" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={parentRes?.Relationships}
              renderItem={renderItems}
              // keyExtractor={item => item.id.toString()}
              style={{maxHeight: 200}}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomDrawer;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: 250,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContent: {
    padding: 20,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginHorizontal: 15,
  },
});
