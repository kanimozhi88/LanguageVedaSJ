import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Platform, PermissionsAndroid, StyleSheet, SafeAreaView, ImageBackground, Alert, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { getAccessToken } from "../../redux/actions";
import { useSelector } from 'react-redux';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { RadioButton } from 'react-native-paper';
import BASE_URL from '../../apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import RNFetchBlob from 'react-native-fetch-blob';



const StudentTakeAssessment = ({ navigation, route }) => {

  // const [count,SetCount] = useState(0);
  const dataFetchApi = useSelector(state => state.recordId);
  const [final, setFinal] = useState('');
  const testId = route.params;
  console.log(">>>>>>>>>>>>>>>>", testId)
  const [retrievedData, setRetrievedData] = useState('');
  const [erroemsg, setErrorMsg] = useState('');
  const Normaloptions = ['Camera', 'Gallery', 'Document/pdf'];
  const actionSheetRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [images, setImages] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);
  const [uploadApi, setUploadApi] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const recordId = useSelector(state => state.recordId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitShow, setSubmitShow] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedOptionState, setSelectedOptionState] = useState(null);
  const [submitBtn, setSubmitBtn] = useState(true);
  const { title } = route.params;
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState([]);






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

  const saveSubmitBtnToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('SubmitBtn', "false");
      console.log("setetedd******************")
    } catch (error) {
      console.error('Error saving toggle switch value: ', error);
    }
  };
  // const final = [
  //   {
  //     "UserAnswer": null,
  //     "Type": "MCQ",
  //     "TestId": "a0U1e000003JltREAS",
  //     "ScoreObtained": 0,
  //     "QuesId": "a171e000006ZPvSAAW",
  //     "Que": " 2*2",
  //     "Option4": "4",
  //     "Option3": "3",
  //     "Option2": "2",
  //     "Option1": "1",
  //     "Name": "1",
  //     "Marks": 2,
  //     "CorrectAnswer": "Choice 1"
  //   },
  //   {
  //     "UserAnswer": null,
  //     "Type": "MCQ",
  //     "TestId": "a0U1e000003JltREAS",
  //     "ScoreObtained": 0,
  //     "QuesId": "a171e000006ZPvUAAW",
  //     "Que": "34-30",
  //     "Option4": "5",
  //     "Option3": "4",
  //     "Option2": "2",
  //     "Option1": "1",
  //     "Name": "2",
  //     "Marks": 2,
  //     "CorrectAnswer": "Choice 1"
  //   },
  //   {
  //     "UserAnswer": null,
  //     "Type": "Essay Question",
  //     "TestId": "a0U1e000003JltREAS",
  //     "ScoreObtained": 0,
  //     "QuesId": "a171e000006ZPvWAAW",
  //     "Que": "333333333333",
  //     "Option4": null,
  //     "Option3": null,
  //     "Option2": null,
  //     "Option1": null,
  //     "Name": "3",
  //     "Marks": 4,
  //     "CorrectAnswer": null
  //   }
  // ]


  const StudenttakeAsessmentApi = async () => {
    console.log("*********", typeof testId)
    let data = {};
    data.testId = testId?.testId;

    const body = JSON.stringify(data);
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`${BASE_URL}/services/apexrest/RNStudentAssessmentQuestions`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let Assessmentres = await response.json()
    console.log("student take Assessment ", Assessmentres);
    setFinal(Assessmentres?.questions);

  }
  const [selectedOption, setSelectedOption] = useState(Array(final.length).fill(null));
  const [selectedAns, setSelectedAns] = useState(Array(final.length).fill(null));
  const [uploadedImages, setUploadedImages] = useState(Array(final.length).fill([]));
  console.log(">>>>>>>>>>", selectedOption)

  const StudentQuesAnsUpdate = async () => {
    const valueMap = {
      Option1: "Choice 1",
      Option2: "Choice 2",
      Option3: "Choice 3",  // Added mapping for Option3
      Option4: "Choice 4"   // Added mapping for Option4
  };
  const updatedAnswersWithChoices = selectedAnswers.map(answer => ({
    ...answer,
    newUserAnswer: valueMap[answer.newUserAnswer] || answer.newUserAnswer
}));

console.log(updatedAnswersWithChoices);

   

    let data = {};
    data.questionUpdates = updatedAnswersWithChoices;

    const body = JSON.stringify(data);
    console.log("PARAMS BODY::::::::", body)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`${BASE_URL}/services/apexrest/RNStudentQuesAnswerUpdate`, {
      method: 'PATCH',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": bearer
      }),
      body,
    });
    let StudentQuesAnsUpdate = await response.json()
    console.log("StudentQuesAnsUpdate ", StudentQuesAnsUpdate);
    //  Alert.alert("Success");  

    if (images?.length > 0) {
      callUploadApi();

    } else {
      Alert.alert(
        'Assessment Test Uploaded Successfully ',
        'OK',
        [{ text: 'OK', onPress: () => [setSubmitBtn(false), navigation.navigate('StudentCourseAssessment', { val: "false", passedTitle: title })] }
        ],
        { cancelable: false }
      );
    }
  }


  const uploadImageApi = async (fileName, base64, imageType, questId) => {
    console.log("upload api inside", fileName, imageType, recordId);
    let data = {};
    data.fileName = fileName;
    data.fileData = base64;
    data.Type = imageType;
    data.QuesId = questId;

    const body = JSON.stringify(data)
    const token = await getAccessToken();
    const bearer = 'Bearer ' + token;
    const response = await fetch(`${BASE_URL}/services/apexrest/RNStudentAssessmentAttachmentService`, {
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
        'Assessment Test Uploaded Successfully',
        'OK',
        [{ text: 'OK', onPress: () => { [setImages([]), setSubmitBtn(false), navigation.navigate('StudentCourseAssessment', { val: "false", passedTitle: title })] } }
        ],
        { cancelable: false }
      );
    }
  }

  const callUploadApi = () => {
    for (let i = 0; i < images.length; i++) {
      uploadImageApi(images[i]?.name, images[i]?.base64, images[i]?.type, images[i]?.QuesId);

    }
  }
  const onSubmitClick = (quesid) => {
    StudentQuesAnsUpdate();
    // callUploadApi();
  }
  console.log("curenntindex>>>>>>>>>", currentIndex);
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
        const itemAtIndex1 = final[currentIndex];

        obj.push({
          name: response?.assets[0]?.fileName,
          base64: SelectedImage,
          url: CompleteURL,
          type: 'image',
          QuesId: itemAtIndex1?.QuesId,
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
        const itemAtIndex1 = final[currentIndex];
        obj["QuesId"] = itemAtIndex1?.QuesId;

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
  console.log("images is>>>>>", images);

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
        const itemAtIndex1 = final[currentIndex];
        obj["QuesId"] = itemAtIndex1?.QuesId;

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

  const handleFileUpload = (fileName, base64, imageType, questionIndex) => {
    // Create a copy of the uploaded images state
    const updatedUploadedImages = [...uploadedImages];

    // Check if there are uploaded images for the current question
    if (!updatedUploadedImages[questionIndex]) {
      updatedUploadedImages[questionIndex] = [];
    }

    // Add the uploaded image to the current question
    updatedUploadedImages[questionIndex].push({
      fileName,
      base64,
      imageType,
    });

    // Update the state with the modified uploaded images
    setUploadedImages(updatedUploadedImages);
  };
  const mcqarray = [];

  const QuestionScreen = ({ questionData, onNextPress, onPrevPress, selectedOption, uploadedImages, handleFileUpload }) => {
    const filteredImages = images.filter(item => item.QuesId === questionData?.QuesId);



    const handleOptionSelect = (questionId, value) => {
      console.log("selected Values*******", questionId,  value)

      // const Val = value === "Choice 1" ? "Option1" : value === "Choice 2" ? "Option2" : value === "Choice 3" ? "Option3" : value === "Choice 4" ? "Option4" : null;
      const choice = value === "Option1" ? "Choice 1" : value === "Option2" ? "Choice 2" : value === "Option3" ? "Choice 3" : value === "Option4" ? "Choice 4" : null;

      // console.log("VAL US::::::::::::::::",Val)
      setSelectedOptionState(value); // Update the selected option
      const questionIndex = selectedAnswers.findIndex(item => item.questionId === questionId);
      console.log("QUESTIONINDEX::::::::::::::::", questionIndex)

      if (questionIndex !== -1) {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex].newUserAnswer = value;
        setSelectedAnswers(updatedAnswers);
      } else {
        setSelectedAnswers(prevSelectedAnswers => [
          ...prevSelectedAnswers,
          {
            questionId: questionId, newUserAnswer: value
          }
        ]);
      }
    };
    console.log("selectedOptions*****************:", selectedAnswers);


    return (
      <View style={[styles.container, { margin: 10, }]}>

        <Text style={{ color: "#232423", fontSize: 16, fontWeight: "600", marginTop: 20, marginHorizontal: 20 }}>Question{currentIndex + 1}/{final?.length}</Text>
        <Text style={{ color: "#232423", fontSize: 15, fontWeight: "400", marginTop: 20, marginHorizontal: 20 }}>{questionData?.Que}</Text>
        {(currentIndex + 1) == final?.length ? setSubmitShow(true) : null}
        {/* Render options for MCQ or textarea for Essay Question */}
        {questionData?.Type === 'MCQ' ?
          <>
            <Text style={{ color: '#232423', fontSize: 16, fontWeight: '600', marginTop: 20, marginHorizontal: 20 }}>Choose Answer</Text>
            <RadioButton.Group onValueChange={(value) => {


              const choice = value === "Option1" ? "Choice 1" : value === "Option2" ? "Choice 2" : value === "Option3" ? "Choice 3" : value === "Option4" ? "Choice 4" : null;
              console.log("RADIOBUTTON VALUE", choice)

              handleOptionSelect(questionData?.QuesId, value)
            }}
              value={selectedAnswers.find(item => item.questionId === questionData?.QuesId)?.newUserAnswer || null}>
              {Object.keys(questionData).map((key) => {
                if (key.startsWith('Option') && questionData[key]) {
                  const optionNumber = key.replace('Option', '');
                  return (
                    <View key={key} style={{ marginHorizontal: 15, flexDirection: 'row' }}>
                      <RadioButton value={key} />
                      <Text style={{ alignSelf: 'center', color: "#232423" }}>{questionData[key]}</Text>
                    </View>
                  );
                }
                return null;
              })}
            </RadioButton.Group>
          </>
          :
          <View style={{ width: "65%", padding: 10, borderWidth: 1, borderStyle: "dashed", borderColor: "#999999", alignSelf: "center", marginTop: 30, borderRadius: 20 }}>
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
            <Text style={{ alignSelf: "center", marginTop: "20%", color: "#232423" }}>Upload Your files</Text>
            <TouchableOpacity
              onPress={() => validateUpload(questionData?.QuesId)}
              style={{ alignSelf: "center", marginTop: "5%", backgroundColor: "#F38216", padding: 10, borderRadius: 5, width: "40%" }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700", alignSelf: "center" }}>Upload</Text>
            </TouchableOpacity>
          </View>

        }


        <View style={{ flexDirection: "row", width: "90%", justifyContent: "space-around", marginTop: "15%" }}>
          <TouchableOpacity
            style={{ backgroundColor: currentIndex === 0 ? "#999999" : "#F38216", width: "30%", padding: 10, borderRadius: 5 }}
            onPress={handlePrevPress} disabled={currentIndex === 0} >
            <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700", alignSelf: "center" }}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={(currentIndex + 1) === final?.length}
            style={{ backgroundColor: (currentIndex + 1) === final?.length ? "#999999" : "#F38216", width: "30%", padding: 10, borderRadius: 5 }}
            onPress={handleNextPress}>
            <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700", alignSelf: "center" }}>Next</Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView style={{flex:1}}> */}
        {filteredImages.map((item, index) => {
          if (item.name.includes(".pdf")) {
            return (
              <View style={{ marginTop: 10, marginBottom: 30, backgroundColor: "white", width: "90%", elevation: 5, flexDirection: "row", paddingBottom: 5, justifyContent: "space-evenly", alignItems: "center", alignSelf: "center" }}>
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
              <View style={{ marginTop: 10, backgroundColor: "white", width: "90%", elevation: 5, flexDirection: "row", paddingBottom: 5, justifyContent: "space-evenly", alignItems: "center", alignSelf: "center" }}>
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
        {/* </ScrollView> */}
      </View>
    );
  };
  console.log("uploaded>>>>>>>>>>>>>", uploadedImages)
  const handleNextPress = () => {
    // if(selectedOptionState == null || selectedAnswers?.questId === '')
    // {
    //   Alert.alert("Please select the Option")
    // }else{
    if (currentIndex < final?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Handle end of questions
    }
    // }

  };

  const handlePrevPress = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  const handleOptionSelect = (option, questId) => {
    // const selectedKey = options.find((option) => option.label === selectedValue)?.key;
    // console.log('Selected Key:', selectedKey);
    // console.log('Selected Value:', selectedValue);
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
    console.log("PublicDownloadUrl is", PublicDownloadUrl);


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
          <MenuOptions style={{ borderWidth: 1, borderColor: "#999999", borderRadius: 5 }} >
            <MenuOption onSelect={() =>
              // {
              //    if(PublicDownloadUrl !== undefined){
              //     const updatedUrl = PublicDownloadUrl.replace("/", "");
              //   navigation.navigate('WebViewDownload',{uri:updatedUrl})
              //   // requestStoragePermission(updatedUrl,type)
              //   }
              // }}

              navigation.navigate('DocumentScreen', { base64: base64, type: type })}
            >
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
        {final !== '' ?
          <QuestionScreen questionData={final[currentIndex]} onNextPress={handleNextPress} onPrevPress={handlePrevPress} selectedOption={selectedAns[currentIndex]} handleFileUpload={handleFileUpload} />
          : null}


        {submitShow ?
          <TouchableOpacity
            disabled={!submitBtn}
            onPress={() => [onSubmitClick(final[currentIndex]?.QuesId), saveSubmitBtnToAsyncStorage()]}
            style={{ backgroundColor: !submitBtn ? "gray" : "#F38216", width: "30%", padding: 10, borderRadius: 5, alignSelf: "center", marginBottom: "40%" }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700", alignSelf: "center" }}>Submit</Text>
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