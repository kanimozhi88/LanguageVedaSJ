import React, { useEffect, useRef, useState } from 'react';
import { View, Text,Platform,PermissionsAndroid, StyleSheet, SafeAreaView, ImageBackground, Alert, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
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
// import RNFetchBlob from 'react-native-fetch-blob';



const StudentAssignmentUpload = ({ navigation, route }) => {

  // const [count,SetCount] = useState(0);
  const dataFetchApi = useSelector(state => state.recordId);
  const [final, setFinal] = useState('');
  const [retrievedData, setRetrievedData] = useState('');
  const { testId } = route.params;
  const [erroemsg, setErrorMsg] = useState('');
  const Normaloptions = ['Camera', 'Gallery', 'Document/pdf'];
  const actionSheetRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [images, setImages] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);
  const [uploadApi, setUploadApi] = useState(false);
  const [showSubmit,setShowSubmit] = useState(false);
  const recordId = useSelector(state => state.recordId);

  const scrollViewRef = useRef(null);

  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };


  useEffect(() => {
    StudentAssignUpload();
  }, [])

  useEffect(() => {
    if (final !== '' && final[0]?.status === "Completed") {
      StudentTestRetrieval();
    }
  }, [final])

  const StudentAssignUpload = async () => {
    let data = {};
    data.contactId = recordId;
    data.testId = testId;

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
    });
    let assignmentresult = await response.json()
    console.log("student course Assignment upload", assignmentresult);
    setFinal(assignmentresult.records);

  }

  const StudentTestRetrieval = async () => {
    let data = {};
    data.contactId = recordId;
    data.testId = testId;

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
    });
    let testFileRetrieval = await response.json()
    console.log("student testfile retrieval", testFileRetrieval);
    const jsontestfileRetrievalRes = JSON.parse(testFileRetrieval)
    setRetrievedData(jsontestfileRetrievalRes?.Attachments);
    console.log("retriveddata ", retrievedData);
  }

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

  // const requestStoragePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: 'Storage Permission',
  //         message: 'App needs access to your storage to download files.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // Permission granted
  //       downloadFile();
  //     } else {
  //       // Permission denied
  //       console.log('Storage permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const downloadFile = async () => {
  //   const base64String = retrievedData[0]?.content; // Replace with your base64 string
  //   const fileName = retrievedData[0]?.fileName; // Replace with the desired file name and extension

  //   const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  //   // Convert base64 to binary data
  //   const data = base64String.replace('data:application/pdf;base64,', '');

  //   try {
  //     // Write the file
  //     await RNFS.writeFile(filePath, data, 'base64');

  //     console.log('File downloaded:', filePath);
  //   } catch (err) {
  //     console.log('Error downloading file:', err);
  //   }
  // };
  
  
const requestStoragePermission = async (updatedUrl,type) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Storage Permission',
        message:
          'App needs access to your Storage ' +
          'so you can download files',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
     downloadFiles(updatedUrl,type);
    } else {
      console.log('storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const downloadFiles = (PublicDownloadUrl,type) =>{
  
    const {config,fs} = RNFetchBlob;
    const date = new Date();
    const fileDir = fs.dirs.DownloadDir;
    config({
      fileCache: true,
      addAndroidDownloads:{
        useDownloadManager:true,
        notification:true,
        path:fileDir + "/download_" + Math.floor(date.getDate()+date.getSeconds()/2) ,
        description:'file download'
      }
    })
    .fetch('GET',PublicDownloadUrl,{

    })
    .then(res =>{
      alert("file downloaded successfully")
      console.log("file saved",res.path());
    });
    
};


  const validateUpload = () => {
    // if (selectedValue) {
    onClickFrontDoc()
    //   setErrorMsg(false)
    // } else {
    //   setErrorMsg(true)
    // }
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

  console.log("images is", images);
  // const questionCount = final[0].Questions
  // .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
  // .match(/(\d+)/)[0];
  // const questionsWithoutTags = final[0].Questions.replace(/<\/?[^>]+(>|$)/g, '');

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
            {final[0]?.status !== "Completed" ?
              <MenuOption onSelect={() => {
                const newImages = [...images];
                newImages.splice(index, 1),
                  setImages(newImages)
              }}>
                <Text>Delete</Text>
              </MenuOption> : 
              <MenuOption onSelect={() => {
                if(PublicDownloadUrl !== undefined){
                  const updatedUrl = PublicDownloadUrl.replace("/", "");
                navigation.navigate('WebViewDownload',{uri:updatedUrl})
                // requestStoragePermission(updatedUrl,type)
                }
              }}>
                <Text>Download</Text>
              </MenuOption>}
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
        <Text style={{ color: "#F38216", fontWeight: "600", fontSize: 16, marginLeft: 100, margin: 10 }}>Assignment</Text>
      </View>

      <ScrollView ref={scrollViewRef}>
        {final !== '' && final[0]?.status !== "Completed" ?
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#1B2236", marginHorizontal: 20, marginTop: 30 }}>Instruction To Follow</Text>
            <HTML source={{ html: final[0]?.Instructions }} />
          </View> : <></>}


          {final !== '' && final[0]?.status !== "Completed" ?
          <View>

            <Text style={{ fontSize: 16, fontWeight: "600", color: "#1B2236", marginHorizontal: 25, }}>Assignment</Text>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#1B2236", marginHorizontal: 30, }}>Topic : <Text style={{ fontSize: 14, fontWeight: "400", color: "#979797", marginHorizontal: 30, fontFamily: "Poppins" }}>{final[0]?.assignmentTitle}</Text></Text>
            </View>

            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#1B2236", marginHorizontal: 30, }}>Subject : <Text style={{ fontSize: 14, fontWeight: "400", color: "#979797", marginHorizontal: 30, fontFamily: "Poppins" }}>{final[0]?.courseName}</Text></Text>
            </View>

            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#1B2236", marginHorizontal: 30, }}>Last Date : <Text style={{ fontSize: 14, fontWeight: "400", color: "#979797", marginHorizontal: 30, fontFamily: "Poppins" }}>{final[0]?.endDate}</Text></Text>
            </View>
          </View> : <></>}

        <View style={{ width: "100%", alignSelf: "center" }}>
          {final !== '' && final[0]?.status !== "Completed" ?
            <TruncatedText questions={final[0]?.Questions} />
            : <></>}
        </View>

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

        {final !== '' && final[0]?.status !== "Completed" ?
          <TouchableOpacity
            onPress={() => [validateUpload(),setShowSubmit(false)]}
            style={{ backgroundColor: "#F38216", width: "40%", alignSelf: "center", alignItems: "center", borderRadius: 5, padding: 10, marginTop: 25 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>Upload</Text>
          </TouchableOpacity> : <></>}


        {images.map((item, index) => {
          if (item.name.includes(".pdf")) {
            return (
              <View style={{ marginTop: 20, backgroundColor: "white", width: "90%", elevation: 5, flexDirection: "row", paddingBottom: 5, justifyContent: "space-evenly", alignItems: "center", alignSelf: "center" }}>
                <Image
                  source={require('../../assets/PDF.png')}
                  style={{ width: 16, height: 16, margin: 5 }} />
                <Text style={{ margin: 5 }}>{item.name.length > 25 ? item?.name.substring(0, 25) + "..." : item?.name}</Text>
                <Text style={{ padding: 4, borderColor: "#CDD3D8", borderWidth: 1, color: "#242634", fontSize: 11, fontWeight: "900", margin: 5 }}> {item?.size}</Text>
                <MenuProvider>
                  <View style={{ height: 55, top: 15, }}>
                    <PopupMenuExample base64={item?.base64} type='pdf' index={-1} />
                  </View>
                </MenuProvider>

              </View>
            )
          } else {
            return (
              <View style={{ marginTop: 20, backgroundColor: "white", width: "90%", elevation: 5, flexDirection: "row", paddingBottom: 5, justifyContent: "space-evenly", alignItems: "center", alignSelf: "center" }}>
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

        {images.length > 0 && !showSubmit ?
          <TouchableOpacity
            onPress={() => [callUploadApi() ]}
            style={{ backgroundColor: "#F38216", width: "40%", alignSelf: "center", alignItems: "center", borderRadius: 5, padding: 10, marginTop: 25 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>Submit</Text>
          </TouchableOpacity> : <></>}

        <View
          style={{ width: "85%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop:final[0]?.status === "Completed" ? 20 :70, elevation: 5, padding: 10, }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{}}
              source={require('../../assets/langicon.png')} />

            <Text style={{ color: "black", fontSize: 16, fontWeight: "500", margin: 10 }}>{final[0]?.assignmentTitle}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "black", fontSize: 12, fontWeight: "500" }}>Date :<Text>{final[0]?.endDate}</Text></Text>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ color: "black", fontSize: 12, fontWeight: "500", marginRight: 10 }}>Status :</Text>
              <View
                style={{
                  width: 89, backgroundColor: final[0]?.status === "Vetting In Progress" ?
                    "#FF9533" :
                    final[0]?.status === "Completed" ?
                      "#67CB65" :
                      final[0]?.status === "Redo" ? "#E74444" : final[0]?.status === "Assignment Submitted" ? "#67CB65" : "red", borderRadius: 10,
                }}
              >
                {final[0]?.status === "Vetting In Progress" ?
                  <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}>In-Progress</Text> :
                  final[0]?.status === "Completed" ?
                    <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}>Completed</Text> :
                    final[0]?.status === "Redo" ? <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}> Redo</Text> :
                      final[0]?.status === "Assignment Submitted" ?
                        <Text style={{ fontSize: 14, fontWeight: "400", alignSelf: "center", color: "white" }}>Submitted</Text> : <></>}

              </View>
            </View>
          </View>

        </View>

        <View style={{ flexDirection: "row", marginHorizontal: 50, marginTop: 30 }}>

          <View>
            <Image
              source={require('../../assets/Trackeractive.png')}
              style={{ height: 24, width: 24 }} />
            <View style={{ height: 81, width: 3, backgroundColor: "#D6387F", marginLeft: 10, marginTop: 4 }} />
            <Image
              source={require('../../assets/Trackeractive.png')}
              style={{ height: 24, width: 24, marginTop: 4 }} />
            <View style={{ height: 81, width: 3, backgroundColor: "#D6387F", marginLeft: 10, marginTop: 4 }} />
            {final[0]?.status === "Assignment Submitted" ?
              <View style={{ height: 24, width: 24, backgroundColor: "#F38216", borderRadius: 12, marginTop: 4 }}></View> :
              <Image
                source={require('../../assets/Trackeractive.png')}
                style={{ height: 24, width: 24, marginTop: 4 }} />}
                            {final[0]?.status === "Vetting In Progress" || final[0]?.status === "Redo" || final[0]?.status === "Assignment Submitted" ?
            <View style={{ height: 81, width: 3, backgroundColor: "#F38216", marginLeft: 10, marginTop: 4 }} /> :
            <View style={{ height: 81, width: 3, backgroundColor: "#D6387F", marginLeft: 10, marginTop: 4 }} /> }

            {final[0]?.status === "Vetting In Progress" || final[0]?.status === "Redo" || final[0]?.status === "Assignment Submitted" ?
              <View style={{ height: 24, width: 24, backgroundColor: "#F38216", borderRadius: 12, marginTop: 4 }}></View> :
              <Image
                source={require('../../assets/Trackeractive.png')}
                style={{ height: 24, width: 24, marginTop: 4 }} />}

          </View>

          <View style={{ alignItems: "center", bottom: 12 }}>
            <Text style={{ color: "#F38216", fontSize: 14, fontWeight: "600" }}>{final[0]?.assignmentTitle}</Text>
            <Text style={{ color: "#F38216", fontSize: 14, fontWeight: "600", marginTop: 90 }}>Assignment Submitted</Text>
            <Text style={{ color: "#F38216", fontSize: 14, fontWeight: "600", marginTop: 90 }}>Vetting InProgress</Text>
            {final[0]?.status === "Completed" ?
              <Text style={{ color: "#F38216", fontSize: 14, fontWeight: "600", marginTop: 90 }}> Completed</Text> :
              final[0]?.status === "Vetting In Progress" ?
                <Text style={{ color: "#D9D9D9", fontSize: 14, fontWeight: "600", marginTop: 90 }}> Completed</Text> :
                final[0]?.status === "Redo" ?
                  <Text style={{ color: "#FF0303", fontSize: 14, fontWeight: "600", marginTop: 90 }}> Redo</Text> : <></>}
          </View>
        </View>




        <View style={{ marginHorizontal: 60, marginTop: 60, marginBottom:40  }}>
          <Text style={{ color: "#6F6E6E", fontSize: 16, fontWeight: "400" }}>Feedback</Text>
          <View style={{ backgroundColor: "#C8C6C64A", padding: 15, marginTop: 10,borderRadius:5,width:296}}>
            <Text style={{color:"#000000",fontSize:14,fontWeight:"500"}}>{final[0]?.feedBack}</Text>
          </View>
        </View>


       
        <View style={{marginBottom: 90,}}>
        {Array.isArray(retrievedData) && retrievedData.length > 0 ? (
          retrievedData.map((item, index) => (
            <View key={index} style={{  margin: 10, backgroundColor: "white", width: "90%", elevation: 5, flexDirection: "row", paddingBottom: 5, justifyContent: "space-evenly", alignItems: "center", alignSelf: "center" }}>
              {item.Type === "image" ?
                <Image
                  source={require('../../assets/Image.png')}
                  style={{ width: 16, height: 16, margin: 5 }} /> :
                <Image
                  source={require('../../assets/PDF.png')}
                  style={{ width: 16, height: 16, margin: 5 }} />}

              <Text style={{ margin: 5,width:"50%" }}>{item?.filename.length > 25 ? item?.filename.substring(0, 25) + "..." : item.filename}</Text>
              <Text style={{ padding: 4, borderColor: "#CDD3D8", borderWidth: 1, color: "#242634", fontSize: 11, fontWeight: "900", margin: 5 }}> {item.ContentSize}</Text>
              <MenuProvider>
                <View style={{ height: 55, top: 15 }}>
                  <PopupMenuExample PublicDownloadUrl={item?.PublicDownloadUrl} base64={item?.content} type={item?.Type} index={-1} />
                </View>
              </MenuProvider>
            </View>
          ))
        ) : null}
        </View>
        {/* {Array.isArray(retrievedData) && retrievedData.length > 0 ?
<TouchableOpacity
// onPress={()=> requestStoragePermission()}

        >
          <Text>click me to download</Text>
        </TouchableOpacity> : null} */}

        {final[0]?.status === "Redo" ?
          <TouchableOpacity
          onPress={handleScrollToTop}
            style={{ backgroundColor: "#F38216", width: "45%", borderRadius: 5, alignSelf: "center", alignItems: "center", padding: 10, margin: 50, bottom: 90 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>Redo</Text>
          </TouchableOpacity> : null}
          </ScrollView>


     
    </SafeAreaView>
  )
}
export default StudentAssignmentUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // bottom:7
  },
})