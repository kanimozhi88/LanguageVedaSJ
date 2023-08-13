import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getAssignmentApiResult } from '../../redux/actions';
import * as ImagePicker from 'react-native-image-picker';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Dropdown } from "react-native-element-dropdown";
import moment from 'moment';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
  Vibration,
  ImageBackground,
} from 'react-native';

const Assignment = ({ navigation }) => {

  useEffect(() => {
    AssignmentApiCall();

  }, [])

  const dispatch = useDispatch();
  const assignmentApiResult = useSelector(state => state.AssignmentApiResult)

  const Normaloptions = ['Camera', 'Gallery', 'Document/pdf'];
  const [final, setFinal] = useState([]);
  const [attachmentsData, setAttachmentsData] = useState({});
  const [images, setImages] = useState([]);
  const actionSheetRef = useRef(null);
  const [courseClicked, setCourseClicked] = useState("");
  const [isLoading, setIsLoading] = useState('');
  const [erroemsg, setErrorMsg] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const recordId = useSelector(state => state.recordId);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [selectedTestRecordId, setSelectedTestRecordId] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [batchName, setBatchName] = useState('');

  console.log("record id needed is", recordId);
  console.log("courname, batc, assignment clicked", courseClicked, assignmentTitle, batchName);

  const deleteApiImage = async (filename, ContentDocumentId, index) => {
    console.log("FILENAME OF IMAGE::", filename, recordId, ContentDocumentId);
    let data = {};
    data.contactId = recordId;
    data.fileName = filename;
    // data.TestName = courseClicked;
    data.contentDocumentId = ContentDocumentId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    console.log("token is", token);
    const bearer = 'Bearer ' + token;
    const response = await fetch('https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/Testfiledeletion', {
      method: 'DELETE',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    })
    let deleteResult = await response.json()
    let finalDeleteResult = JSON.parse(deleteResult);
    console.log("DELETE RESPONSE STATUS result:::", deleteResult);
    if (index !== -1) {
      const newImages = [...images];
      newImages.splice(index, 1),
        setImages(newImages)
    }
    if (finalDeleteResult.Status === 'Success') {
      Alert.alert("Selected Image deleted successfully")
      getAttachmentsAPI(courseClicked, assignmentTitle, batchName)
      setAttachmentsData(attachmentsData.filter(a => a.filename !== id))
      console.log("inside DELETE success API")
    } else {
      Alert.alert("Failed to delete")
    }
  }

  const launchGallery = () => {
    const options = {
      noData: true,
      includeBase64: true,
      mediaType: 'photo',
      quality: 0.2,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.assets) {
        let SelectedImage = response.assets[0].base64;
        let BaseURL = 'data:image/png;base64,';
        let CompleteURL = BaseURL + SelectedImage;
        let obj = {};

        obj["name"] = response?.assets[0]?.fileName;
        obj["base64"] = SelectedImage;
        obj["url"] = CompleteURL;
        const newImages = [...images, obj];
        setImages(newImages);
        uploadImageApi(response?.assets[0]?.fileName, response?.assets[0]?.base64, 'image', selectedTestRecordId)
      }
    })
  };

  const launchCamera = async () => {

    const options = {
      noData: true,
      includeBase64: true,
      mediaType: 'photo',
      quality: 0.2,
    };

    ImagePicker.launchCamera(options, response => {
      if (response.assets) {
        let SelectedImage = response.assets[0].base64;
        let BaseURL = 'data:image/png;base64,';
        let CompleteURL = BaseURL + SelectedImage;
        let obj = {};
        obj["name"] = response?.assets[0]?.fileName;
        obj["base64"] = SelectedImage;
        obj["url"] = CompleteURL;
        const newImages = [...images, obj];
        setImages(newImages);
        uploadImageApi(response?.assets[0]?.fileName, response?.assets[0]?.base64, 'image', selectedTestRecordId)
      }
    });
  };

  const onPressCameraOrGallery = indexVal => {
    if (indexVal == 1) {
      launchGallery(indexVal);
    } else if (indexVal == 0) {
      launchCamera(indexVal);
    } else {
      PickDocument();
    }
  };

  const onClickFrontDoc = () => {
    actionSheetRef.current?.show();
  };

  const uploadImageApi = async (fileName, base64, imageType, testId) => {
    console.log("upload api inside", fileName, imageType, testId, recordId);
    let data = {};
    data.contactId = recordId;
    // data.contactId = "0031e00000LYW28AAH";
    data.fileName = fileName;
    // data.fileName = "istockphoto-1158907706-124x1024.jpg";
    // data.TestName = selectedValue;
    data.fileData = base64;
    data.Type = imageType;
    data.testId = testId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/Testfileupload/`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    })
    let uploadApiResponse = await response.json()
    console.log("UPLOAD API RESPONSE IS:::", uploadApiResponse);
    const jsonUploadApiRes = JSON.parse(uploadApiResponse)
    // if(jsonUploadApiRes.Status === 'Success'){
    //   Alert.alert("Uploaded Successfully")
    // }
  }

  const AssignmentApiCall = async () => {
    let data = {};
    data.Type = "Contact";
    data.contactid = recordId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNTestDetails/`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    })
    let assignmentresult = await response.json()
    let Finalassignmentresult = assignmentresult?.tests;
    setFinal(Finalassignmentresult);
    // setCategory(Finalassignmentresult?.tests.courseName)
    console.log("assignmet api result", Finalassignmentresult);
    dispatch(getAssignmentApiResult(assignmentresult?.tests));
  }

  const setValues = (item) => {
    setCourseClicked(item.courseName), setAssignmentTitle(item.assignmentTitle), setBatchName(item.batchName)
  }

  const renderItem = ({ item, index }) => {
    const TestDate = item.testDate;
    const dateObject = new Date(TestDate);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    
     
    }).split('/').join('-');
    const isView = index === expandedIndex;
    console.log("coursename,recordid,assigntitle,batchname", item.courseName, item.testRecordId, item.assignmentTitle, item.batchName)
    return (

      <View style={{ backgroundColor: "lightgray", borderRadius: 20, marginTop: 20, width: "95%", alignSelf: "center" }}>
        <TouchableOpacity
          onPress={() => {
            [setExpandedIndex(isView ? -1 : index),

            getAttachmentsAPI(item.courseName, item.assignmentTitle, item.batchName),
            setValues(item), setIsLoading(true)
            ]
          }}>
          <Text style={{ color: "#a8329e", margin: 10, fontWeight: "bold" }}> <Text>{index + 1}</Text> {item.assignmentTitle}</Text>

          {isView ?
            <View style={{ margin: 10 }} >
              <Text style={styles.innerText}>{item.testType}</Text>
              <Text style={styles.innerText}>{item.courseName}</Text>
              <Text style={styles.innerText}>{formattedDate}</Text>
            </View>
            : <></>}
        </TouchableOpacity>
      </View>


    )
  }

  const getAttachmentsAPI = async (courseName, assignmentTitle, batchName) => {
    console.log("coursename,assignment,batcname", courseName, assignmentTitle, batchName)
    let data = {};
    data.contactId = recordId;
    // data.courseName = "Malayalam";
    data.courseName = courseName;
    // data.contactId = testId;
    // data.assignmentTitle = "Malayalam alphabets";
    data.assignmentTitle = assignmentTitle;
    // data.batchName = "MorningBatch Malayalam";
    data.batchName = batchName;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/StudentTestfileRetrieval/`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    })
    let getAttachmentsAPI = await response.json();
    const jsonAttachementRes = JSON.parse(getAttachmentsAPI);
    console.log(" attachments JSON ATTCH RES", jsonAttachementRes);
    setAttachmentsData(jsonAttachementRes)
    setIsLoading(false)
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const validateUpload = () => {
    if (selectedValue) {
      onClickFrontDoc()
      setErrorMsg(false)
    } else {
      setErrorMsg(true)
    }
  }
  const PickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      const newImages = [...images];
      for (let i = 0; i < result.length; i++) {
        let obj = {};
        const pdfPath = result[i].uri;
        const base64 = await convertFileToBase64(pdfPath);
        obj["name"] = result[i].name;
        obj["base64"] = base64;
        newImages.push(obj);
        uploadImageApi(result[i].name, base64, 'pdf', selectedTestRecordId);

      }
      setImages(newImages);
    } catch (err) {
      console.log(err)
    }
  }

  const convertFileToBase64 = async (pdfPath) => {
    const response = await RNFetchBlob.fs.readFile(pdfPath, 'base64');
    return response;
  }
  

  const handleSelection = (value) => {
    setSelectedValue(value);
    const selectedItem = final.find(item => item.courseName === value);
    if (selectedItem) {
      setSelectedTestRecordId(selectedItem.testRecordId);
    } else {
      setSelectedTestRecordId('');
    }
  }
  const onSelect = (item) => {
    console.log("item is ", item);
    setSelectedValue(item.courseName);
    setSelectedTestRecordId(item.testRecordId);

  }
  console.log("selected testrecordId, coursename", selectedTestRecordId, selectedValue);
  const renderRow = (item) => {
    console.log("inside item value", item);
    return(
    <View>
      <Text>{`${item.assignmentTitle} ${moment(item.testDate).format('MMMM Do YYYY')}`}</Text>
    </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ height: "50%" }}>
        <FlatList
          data={final}
          renderItem={renderItem}
        />
      </View>

      <ScrollView
        style={{ backgroundColor: "lightgrey" }}>
        {/* <View style={{
          width: "95%", margin: 10,
          backgroundColor: "gray", borderColor: "blue", borderRadius: 5,
          flexDirection: "row", justifyContent: "space-around"
        }}
        > */}

        {/* <Text style={{ alignSelf: "center", color: "black" }}>Select Language</Text> */}
        {/* <Picker
            style={{ width: "60%", alignSelf: "center" }}
            selectedValue={selectedValue}
            // onValueChange={(course, itemIndex) => setSelectedValue(course)}
            onValueChange={handleSelection}
          >
            <Picker.Item label='Select Language' value={null} />
            {final.map((option, index) => (
              <Picker.Item key={option.courseName} label={`${option.courseName} - ${formatDate(option.testDate)}`} value={option.courseName} />
            ))}
          </Picker> */}

        <Dropdown
          style={{
            width: 180,
            height: 40,
            //   justifyContent:'flex-start',
            //   alignSelf:'flex-end',
            //   alignItems:'flex-end',
            borderRadius: 3,
            borderColor: "black",
            alignSelf: "center",
            borderWidth: 1,
          }}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{ color: "#6C757D" }}
          iconStyle={{ width: 30, height: 30 }}
          data={final}
         labelField ="assignmentTitle"
          valueField="assignmentTitle"
          placeholder={'Select Assignment'}
          onChange={(data) => {
            onSelect(data)
          }}
          selectedStyle={styles.selectedStyle}
        />
        
        {erroemsg && !selectedValue ? <View>
          <Text style={{ color: "red", marginLeft: 20 }}>Please select a Assignment Title to upload</Text>
        </View>
          :
          <></>}

        <View>
          {isLoading ? <View>
            <ActivityIndicator size={'large'} color="#0000ff" />
          </View> :
            <View>
            </View>}
          <ScrollView
            horizontal={true}>
            {attachmentsData.Attachments?.map((item, index) => {
              const pdfFilename = `${item.filename}`;
              return (
                <View style={{ padding: 10 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DocumentScreen', { base64: item.content, type: item.Type })}
                  >
                    {item.Type == 'pdf' ? <View style={{ backgroundColor: "white", width: 100, height: 100, alignSelf: "center" }}>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => deleteApiImage(item.filename, item.ContentDocumentId, -1)}>
                        <Image
                          source={require('../../assets/cross.png')}
                          style={{ width: 15, height: 15, marginLeft: 85 }} />
                      </TouchableOpacity>
                      <Text style={{ fontWeight: "600", textAlignVertical: "center", textAlign: "center", justifyContent: "center", height: 75 }}>{pdfFilename}</Text>
                    </View> :
                      <View style={{ backgroundColor: "white", width: 100, height: 100, alignSelf: "center", }}>
                        <TouchableOpacity
                          style={{}}
                          onPress={() => deleteApiImage(item.filename, item.ContentDocumentId, -1)}>
                          <Image
                            source={require('../../assets/cross.png')}
                            style={{ width: 15, height: 15, marginLeft: 85 }} />
                        </TouchableOpacity>

                        {/* <Image
                          source={{ uri: `data:image/png;base64,` + item.content }}
                          style={{ width: 100, height: 85 }}
                        /> */}
                        <ImageBackground
                        source={{ uri: `data:image/png;base64,` + item.content }}
                        style={{ width: 100, height: 85 }}>
                        <Text style={{alignSelf:"center",color:"black" }}>{pdfFilename}</Text>

                        </ImageBackground>

 
                      </View>
                     
                     
                    }
                  </TouchableOpacity>


                </View>
              )
            })}
          </ScrollView>

          <View
            style={{}}>
            <ScrollView horizontal={true}>
              {console.log("IMAGES RES", images)}
              {images.map((item, index) => {
                if (item.name.includes(".pdf")) {
                  return (
                    <View>
                       <TouchableOpacity
                          style={{}}
                          onPress={() => deleteApiImage(item.name, item.ContentDocumentId, index)}>
                          <Image
                            source={require('../../assets/cross.png')}
                            style={{ width: 15, height: 15, marginLeft: 85 }} />
                        </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('DocumentScreen', { base64: item.base64, type: 'pdf' })}
                      >
                        <Text style={{ width: 100, height: 100, textAlign: "center", textAlignVertical: "center", backgroundColor: "white" }} > {item.name}</Text>
                        {/* <Button title='delete' onPress={() => deleteApiImage(item.name)} /> */}
                      </TouchableOpacity>

                      {/* <TouchableOpacity
                        style={{ backgroundColor: "lightblue" }}
                        onPress={() => deleteApiImage(item.name, item.ContentDocumentId, index)}>
                        <Text style={{ fontWeight: "bold", textAlign: "center", textAlignVertical: "center", padding: 5, color: "black", fontSize: 16 }}>DELETE</Text>
                      </TouchableOpacity> */}
                    </View>
                  )
                } else {
                  return (
                    <View>
                       <TouchableOpacity
                          style={{}}
                          onPress={() => deleteApiImage(item.name, item.ContentDocumentId, index)}>
                          <Image
                            source={require('../../assets/cross.png')}
                            style={{ width: 15, height: 15, marginLeft: 85 }} />
                        </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('DocumentScreen', { base64: item.base64, type: 'image' })}
                      >
                        {/* <Image key={index} source={{
                          uri: item.url,
                        }}
                          style={{ width: 100, height: 100 }} /> */}
                          <ImageBackground
                          key={index} source={{
                            uri: item.url,
                          }}
                            style={{ width: 100, height: 100 }}
                          >
                          <Text style={{ textAlign: "center", textAlignVertical: "center" }} > {item.name}</Text>
                          </ImageBackground>

                      </TouchableOpacity>
                    
                    </View>
                  )
                }
              }
              )}

            </ScrollView>
          </View>

        </View>
        <ActionSheet
          ref={actionSheetRef}
          title={
            <Text style={{ color: '#000', fontSize: 18 }}>
              Which one do you like?
            </Text>
          }
          options={Normaloptions}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={index => {
            onPressCameraOrGallery(index);
          }}
          styles={{
            backgroundColor: 'grey',
            borderColor: 'red',
            borderWidth: 2,
          }}
        />

        <TouchableOpacity
          onPress={() => validateUpload()}
          style={{
            alignSelf: "center",
            backgroundColor: "green",
            borderRadius: 20, width: "35%", marginTop: 10
          }}>
          <Text style={{ alignSelf: "center", color: "white", fontWeight: "bold", textAlignVertical: "center", textAlign: "center", padding: 15, fontSize: 16 }}>UPLOAD</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  contentStyle: {
    marginTop: 10,
    backgroundColor: "#ffe0b2",
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,

    borderWidth: 2, borderColor: "red",
  },
  titleStyle: {
    color: "red",
    fontSize: 15
  },
  innerText: {
    color: "black",

  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  dropdown: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    bottom: 20,
    backgroundColor: "red",
    borderRadius: 3,
    borderColor: "black",
    borderWidth: 2,

  },
  placeholderStyle: {
    fontSize: 14,
    textAlign: "center",

    // marginTop:15,
    color: "black",

  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
    // marginTop:15,
    color: "black",

  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "red",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 3,
    borderColor: "orange",
    borderWidth: 2
  },
});

export default Assignment;