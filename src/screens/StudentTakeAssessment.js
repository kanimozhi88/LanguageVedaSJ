import React, { useEffect, useRef, useState } from 'react';
import { View, Text,Button, Platform,PermissionsAndroid, StyleSheet, SafeAreaView, ImageBackground, Alert, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { getAccessToken } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import HTMLRender from 'react-native-render-html';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import TruncatedText from '../../component/TruncatedText';
import RNFS, { downloadFile } from 'react-native-fs';
import WebView from 'react-native-webview';
import { RadioButton } from 'react-native-paper';

// import RNFetchBlob from 'react-native-fetch-blob';



const StudentTakeAssessment = ({ navigation, route }) => {

  // const [count,SetCount] = useState(0);
  const dataFetchApi = useSelector(state => state.recordId);
  const [final, setFinal] = useState('');
  const testId = route.params;
  console.log(">>>>>>>>>>>>>>>>",testId)
  const [retrievedData, setRetrievedData] = useState('');
  const [erroemsg, setErrorMsg] = useState('');
  const Normaloptions = ['Camera', 'Gallery', 'Document/pdf'];
  const actionSheetRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [images, setImages] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);
  const [uploadApi, setUploadApi] = useState(false);
  const [showSubmit,setShowSubmit] = useState(false);
  const recordId = useSelector(state => state.recordId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitShow,setSubmitShow] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([]);


//  const [selectedOption, setSelectedOption] = useState(null);




  const scrollViewRef = useRef(null);

  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };


  useEffect(() => {
    StudenttakeAsessmentApi();
  }, [])

 

  const StudenttakeAsessmentApi = async () => {
    console.log("*********",typeof testId)
    let data = {};
    data.testId = testId?.testId;

    const body = JSON.stringify(data);
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNStudentAssessmentQuestions`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let Assessmentres = await response.json()
    console.log("student take Assessment ",Assessmentres );
    setFinal(Assessmentres?.questions);
    
  }
  const [selectedOption, setSelectedOption] = useState(Array(final.length).fill(null));
  const [selectedAns, setSelectedAns] = useState(Array(final.length).fill(null));


console.log("selectedvalu",selectedOption)

const uploadImageApi = async (fileName, base64, imageType) => {
  console.log("upload api inside", fileName, imageType, recordId);
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
  if (jsonUploadApiRes.Status === 'Success') {
    // Alert.alert("Uploaded Successfully")
    Alert.alert(
      'Uploaded Successfully',
      'OK',
      [{text: 'OK',onPress: () => {[setShowSubmit(true), setImages([])]}}
      ],
      { cancelable: false }
    );
  }
}

const callUploadApi = () => {
  for (let i = 0; i < images.length; i++) {
    uploadImageApi(images[i]?.name, images[i]?.base64, images[i].type);

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
      let obj = [];
      
      obj.push({
        name: response?.assets[0]?.fileName,
        base64: SelectedImage,
        url: CompleteURL,
        type: 'image',
      });

      // Get file size
      let fileSize = response.assets[0].fileSize; // in bytes

      let sizeInKB = fileSize / 1024;
      let sizeInMB = sizeInKB / 1024;
      let sizeInGB = sizeInMB / 1024;

      let sizeString = "";

      if (sizeInGB >= 1) {
        sizeString = sizeInGB.toFixed(2) + " GB";
      } else if (sizeInMB >= 1) {
        sizeString = sizeInMB.toFixed(2) + " MB";
      } else {
        sizeString = sizeInKB.toFixed(2) + " KB";
      }

      obj[0].size = sizeString;

      const newImages = [...images, ...obj];
      setImages(newImages);
      // uploadImageApi(response?.assets[0]?.fileName, response?.assets[0]?.base64, 'image', selectedTestRecordId)
    }
  });
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
      obj["type"] = 'image';

      // Get file size
      let fileSize = response.assets[0].fileSize; // in bytes

      let sizeInKB = fileSize / 1024;
      let sizeInMB = sizeInKB / 1024;
      let sizeInGB = sizeInMB / 1024;

      let sizeString = "";

      if (sizeInGB >= 1) {
        sizeString = sizeInGB.toFixed(2) + " GB";
      } else if (sizeInMB >= 1) {
        sizeString = sizeInMB.toFixed(2) + " MB";
      } else {
        sizeString = sizeInKB.toFixed(2) + " KB";
      }

      obj["size"] = sizeString;

      const newImages = [...images, obj];
      setImages(newImages);
      // uploadImageApi(response?.assets[0]?.fileName, response?.assets[0]?.base64, 'image', selectedTestRecordId)
    }
  });
};


const PickDocument = async () => {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
      allowMultiSelection: true,
    });
    console.log("pdf filesize is", result);
    const newImages = [...images];

    for (let i = 0; i < result.length; i++) {
      let obj = {};
      const pdfPath = result[i].uri;
      const base64 = await convertFileToBase64(pdfPath);

      let fileSize = result[i].size; // in bytes

      let sizeInKB = fileSize / 1024;
      let sizeInMB = sizeInKB / 1024;
      let sizeInGB = sizeInMB / 1024;

      let sizeString = "";

      if (sizeInGB >= 1) {
        sizeString = sizeInGB.toFixed(2) + " GB";
      } else if (sizeInMB >= 1) {
        sizeString = sizeInMB.toFixed(2) + " MB";
      } else {
        sizeString = sizeInKB.toFixed(2) + " KB";
      }

      obj["size"] = sizeString;
      obj["name"] = result[i].name;
      obj["base64"] = base64;
      obj["type"] = 'pdf';

      newImages.push(obj);
      // uploadImageApi(result[i].name, base64, 'pdf', selectedTestRecordId);

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

const validateUpload = () => {
  console.log("clicwdmmlemflmldlklsjfjadndvioh")
  onClickFrontDoc()

}

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

  const QuestionScreen = ({ questionData, onNextPress , onPrevPress, selectedOption}) => {

   
    return (
      <View style={[styles.container,{margin:10}]}>
        <Text style={{color:"#696F79", fontSize:16,fontWeight:"600",marginTop:20,marginHorizontal:20}}>Question{currentIndex+1}/{final?.length}</Text>
        <Text style={{color:"#696F79", fontSize:15,fontWeight:"400",marginTop:20,marginHorizontal:20}}>{questionData?.Que}</Text>
       {(currentIndex+1) == final?.length ? setSubmitShow(true) : null}
        {/* Render options for MCQ or textarea for Essay Question */}
        {questionData?.Type === 'MCQ' ? 
          <>
          <Text style={{color:"#696F79", fontSize:16,fontWeight:"600",marginTop:20,marginHorizontal:20}}>Choose Answer</Text>
          <RadioButton.Group onValueChange={(value) => handleOptionSelect(value, questionData?.QuesId)} value={selectedOption}>
            <View style={{marginHorizontal:15,flexDirection:"row"}}>
            <RadioButton value={questionData?.Option1} />
              <Text style={{alignSelf:"center"}}>{questionData?.Option1}</Text> 
            </View>
            <View style={{marginHorizontal:15,flexDirection:"row"}}>
            <RadioButton value={questionData?.Option2} />
              <Text style={{alignSelf:"center"}}>{questionData?.Option2}</Text>  
            </View>
            <View style={{marginHorizontal:15,flexDirection:"row"}}>
            <RadioButton value={questionData?.Option3} />
              <Text style={{alignSelf:"center"}}>{questionData?.Option3}</Text>
            </View>
            <View style={{marginHorizontal:15,flexDirection:"row"}}>
            <RadioButton value={questionData?.Option4} />
              <Text style={{alignSelf:"center"}}>{questionData?.Option4}</Text>
            </View>
          </RadioButton.Group>
        </>
        : 
        <View style={{width:"65%",height:"40%",borderWidth:1,borderStyle: "dashed", borderColor:"gray",alignSelf:"center",marginTop:30,borderRadius:20}}>
          <ActionSheet
          ref={actionSheetRef}
          title={
            <Text style={{ color: 'black', fontSize: 18 }}>
              Which one do you like it...?
            </Text>
          }
          options={Normaloptions}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={index => {
            onPressCameraOrGallery(index);
          }}
          styles={{
            backgroundColor: 'orange',
            borderColor: 'red',
            borderWidth: 2,
          }}
        />
          <Text style={{alignSelf:"center",marginTop:"20%"}}>Upload Your files</Text>
          <TouchableOpacity
          onPress={()=> validateUpload()}
           style={{alignSelf:"center",marginTop:"5%",backgroundColor:"#F38216",padding:10,borderRadius:5,width:"40%"}}
           >
            <Text style={{color:"#FFFFFF",fontSize:15,fontWeight:"700",alignSelf:"center"}}>Upload</Text>
          </TouchableOpacity>
        </View>
        }


        <View style={{flexDirection:"row",width:"90%",justifyContent:"space-around",marginTop:"15%"}}>
          <TouchableOpacity
          style={{backgroundColor: currentIndex === 0 ? "gray":"#F38216",width:"30%",padding:10,borderRadius:5}}
          onPress={handlePrevPress} disabled={currentIndex === 0} >
            <Text style={{color:"#FFFFFF",fontSize:15,fontWeight:"700",alignSelf:"center"}}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={{backgroundColor:"#F38216",width:"30%",padding:10,borderRadius:5}}
          onPress={handleNextPress}>
            <Text style={{color:"#FFFFFF",fontSize:15,fontWeight:"700",alignSelf:"center"}}>Next</Text>
          </TouchableOpacity>
        </View>
               {/* <Button title="Previous" onPress={handlePrevPress} disabled={currentIndex === 0} />
        <Button title="Next" onPress={handleNextPress} /> */}
      </View>
    );
  };

  const handleNextPress = () => {
    if (currentIndex < final?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Handle end of questions
    }
  };

  const handlePrevPress = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  

  const handleOptionSelect = (option, questId) => {
    const updatedOptions = [...selectedOption];
    const updatedAnsOptions = [...selectedOption];
    const existingOptionIndex = updatedOptions.findIndex((item) => item.questionId === questId);
    
    if (existingOptionIndex !== -1) {
      // If the questionId already exists, update the "newuser" value for that question
      updatedOptions[existingOptionIndex].newUserAnswer = option;
    } else {
      // If the questionId doesn't exist, create a new object for that question
      updatedOptions.push({ questionId: questId, newUserAnswer: option });
    }
    updatedAnsOptions[currentIndex] = option;
    setSelectedOption(updatedOptions);
    setSelectedAns(updatedAnsOptions);
  };

  const PopupMenuExample = ({ PublicDownloadUrl, base64, type, index }) => {
    console.log("PublicDownloadUrl is",PublicDownloadUrl);
    
    
    // }
    // console.log("PublicDownloadUrl is",updatedUrl);

    return (
      <View style={{ flex: 1 }}>
        <Menu >
          <MenuTrigger >
            <Image
              source={require('../../assets/dots.png')}
              style={{ alignSelf: "center" }}
            />
          </MenuTrigger>
          <MenuOptions style={{ borderWidth: 1, borderColor: "lightgray", borderRadius: 5 }} >
            <MenuOption onSelect={() => navigation.navigate('DocumentScreen', { base64: base64, type: type })}>
              <Text>Preview</Text>
            </MenuOption>
            <MenuOption onSelect={() => {
                const newImages = [...images];
                newImages.splice(index, 1),
                  setImages(newImages)
              }}>
              <Text>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10 }}>
          <Image
            source={require('../../assets/orangebackarrow.jpg')}
            style={{ width: 40, height: 40, alignSelf: "center" }} />
        </TouchableOpacity>
        <Text style={{ color: "#F38216", fontWeight: "600", fontSize: 16, marginLeft: 100, margin: 10 }}>Assessment</Text>
      </View>

  <ScrollView >
    
      <QuestionScreen questionData={final[currentIndex]} onNextPress={handleNextPress} onPrevPress={handlePrevPress} selectedOption={selectedAns[currentIndex]}  />

      {images.map((item, index) => {
          if (item.name.includes(".pdf")) {
            return (
              <View style={{marginTop:10, marginBottom:30, backgroundColor: "white", width: "90%", elevation: 5, flexDirection: "row", paddingBottom: 5, justifyContent: "space-evenly", alignItems: "center", alignSelf: "center" }}>
                <Image
                  source={require('../../assets/PDF.png')}
                  style={{ width: 16, height: 16, margin: 5 }} />
                <Text style={{ margin: 5 }}>{item.name.length > 25 ? item?.name.substring(0, 25) + "..." : item?.name}</Text>
                <Text style={{ padding: 4, borderColor: "#CDD3D8", borderWidth: 1, color: "#242634", fontSize: 11, fontWeight: "900", margin: 5 }}> {item?.size}</Text>
                <MenuProvider>
                  <View style={{ height: 75, top: 15, }}>
                    <PopupMenuExample base64={item?.base64} type='pdf' index={-1} />
                  </View>
                </MenuProvider>

              </View>
            )
          } else {
            return (
              <View style={{ marginTop:10,backgroundColor: "white", width: "90%", elevation: 5, flexDirection: "row", paddingBottom: 5, justifyContent: "space-evenly", alignItems: "center", alignSelf: "center" }}>
                <Image
                  source={require('../../assets/Image.png')}
                  style={{ width: 16, height: 16, margin: 5 }} />
                <Text style={{ margin: 5 }}>{item.name.length > 25 ? item?.name.substring(0, 25) + "..." : item?.name}</Text>
                <Text style={{ padding: 4, borderColor: "#CDD3D8", borderWidth: 1, color: "#242634", fontSize: 11, fontWeight: "900", margin: 5 }}> {item?.size}</Text>
                <MenuProvider>
                  <View style={{ height: 55, top: 15, }}>
                    <PopupMenuExample base64={item?.base64} type='image' index={-1} />
                  </View>
                </MenuProvider>

              </View>
            )
          }
        }
        )}

        {submitShow ?
          <TouchableOpacity
          style={{backgroundColor:"#F38216",width:"30%",padding:10,borderRadius:5,marginTop:20,alignSelf:"center"}}
          >
            <Text style={{color:"#FFFFFF",fontSize:15,fontWeight:"700",alignSelf:"center"}}>Submit</Text>
          </TouchableOpacity>
        : null}
     </ScrollView>
    </SafeAreaView>
  )
}
export default StudentTakeAssessment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // bottom:7
  },
})