import React, { useEffect, useState ,useRef} from "react";
import { View, Text, TextInput,SafeAreaView, TouchableOpacity, StyleSheet, Image, ScrollView,Alert } from 'react-native';
import { getAccessToken } from '../../redux/actions';
import moment from "moment";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { RadioButton } from 'react-native-paper';

const FacultyStudentDetails = ({ route, navigation }) => {

    const [final, setFinal] = useState('');
    const [remarks,setRemarks] = useState('');
    const { testId, assignmentTitle ,Status, Name, batchName, TestDate} = route.params;
    const actionSheetRef = useRef(null);
    const Normaloptions = ['Camera', 'Gallery', 'Document/pdf'];
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    


    useEffect(() => {
        FctlyStudentDtls();
        // StudentRemarks();
    }, []);

    const FctlyStudentDtls = async () => {
        let data = {};
        data.testId = testId;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyAssessmentEvaluation`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let FctlyStudentDtls = await response.json()
        console.log(" FctlyStudentDtls API RES", FctlyStudentDtls);
        const finalRes = JSON.parse(FctlyStudentDtls)
        setFinal(finalRes?.Questions);
        // console.log("final data is", final)
    }

  //   const final = [
  //     {
  //       "Attachments":[
  //         {
  //         "PublicDownloadUrl":"/https://languageveda--developer.sandbox.my.salesforce.com/sfc/p/1e0000000QwD/a/1e0000004Xzi/yrET.e7ngLbjOzs5gzR1.yAqFguGrGfxCtf1Adc7tRI",
  //         "ContentSize":"5.27 KB",
  //         "ContentDocumentId":"0691e000001TKOPAA4",
  //         "createdDate":"2023-09-15T11:15:59.000",
  //         "Type":null,
  //         "versionNumber":"1",
  //         "filename":"co image",
  //         "title":"co image"
  //         }
  //         ],
  //         "courseName": "Old Kannada - T",
  //         "TotalMarks": 30,
  //         "assignmentTitle": "Assessment2",
  //         "studentName": "fghj fghjkty",
  //         "batchName": "OLDK - Mrng batch 11",
  //         "testDate": null,
  //         "QuestionType": "MCQ",
  //         "AssessmentId": "a0U1e0000039H13EAE",
  //         "TotalMarksAchieved": 0,
  //         "Marks": 34,
  //         "UserAnswer": 12,
  //         "CorrectAnswer": 2,
  //         "Option4": "2",
  //         "Option3": "1",
  //         "Option2": "22",
  //         "Option1": "12",
  //         "QuestionText": "wew",
  //         "QuestionName": "2",
  //         "QuestionId": "a171e000006ZFrrAAG"
  //     },
  //     {
  //         "Attachments": [],
  //         "courseName": "Old Kannada - T",
  //         "TotalMarks": 50,
  //         "assignmentTitle": "Assessment2",
  //         "studentName": "fghj fghjkty",
  //         "batchName": "OLDK - Mrng batch 11",
  //         "testDate": null,
  //         "QuestionType": "Essay Question",
  //         "AssessmentId": "a0U1e0000039H13EAE",
  //         "TotalMarksAchieved": 0,
  //         "Marks": 10,
  //         "UserAnswer": null,
  //         "CorrectAnswer": null,
  //         "Option4": null,
  //         "Option3": null,
  //         "Option2": null,
  //         "Option1": null,
  //         "QuestionText": "Essay",
  //         "QuestionName": "2",
  //         "QuestionId": "a171e000006ZFrtAAG"
  //     }
  // ]



    const StudentRemarks = async (type) => {
        let data = {};
        data.testId = Id;
        data.status = type;
        data.feedBack = description;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyupdateStudentTestStatus`, {
            method: 'PATCH',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let StudentRemarks = await response.json()
        console.log(" StudentRemarks API RES",  StudentRemarks);        
          Alert.alert(
            'Uploaded Successfully',
            'OK',
            [{text: 'OK',onPress: () => {setDescription('')}}
            ],
            { cancelable: false }
          );
        
    }


    const validateUpload = () => {
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
            callUploadApi();
            // uploadImageApi(response?.assets[0]?.fileName, response?.assets[0]?.base64, 'image', selectedTestRecordId)
          }
        });
      };

      console.log("imagesuploaded>>>>",images);


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
            callUploadApi();
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
            callUploadApi()
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

      const callUploadApi = () => {
        for (let i = 0; i < images.length; i++) {
          uploadImageApi(images[i]?.name, images[i]?.base64, images[i].type);
    
        }
      }

      const uploadImageApi = async (fileName, base64, imageType) => {
        // console.log("upload api inside", fileName, imageType, recordId);
        let data = {};
        data.fileName = fileName;
        data.fileData = base64;
        data.Type = imageType;
        data.testId = Id;
    
        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultyAnswerPaperAttachment`, {
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


    const PopupMenuExample = ({ PublicDownloadUrl, type}) => {

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
                        <MenuOption onSelect={() => {
                                if (PublicDownloadUrl !== undefined) {
                                    const updatedUrl = PublicDownloadUrl.replace("/", "");
                                    navigation.navigate('WebViewDownload', { uri: updatedUrl })
                                    // requestStoragePermission(updatedUrl,type)
                                }
                            }}>
                                <Text>View</Text>
                        </MenuOption>
                            <MenuOption onSelect={() => {
                                if (PublicDownloadUrl !== undefined) {
                                    const updatedUrl = PublicDownloadUrl.replace("/", "");
                                    navigation.navigate('WebViewDownload', { uri: updatedUrl })
                                    // requestStoragePermission(updatedUrl,type)
                                }
                            }}>
                                <Text>Download</Text>
                            </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    const handlePrevPress = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };
      const handleNextPress = () => {
        if (currentIndex < final?.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          // Handle end of questions
        }
      };

    const QuestionScreen = ({ questionData, onNextPress , onPrevPress, selectedOption,  uploadedImages, handleFileUpload}) => {
        const filteredImages = images.filter(item => item.QuesId === questionData?.QuesId);
       
       console.log("qiuestionDATA>>>>>>>>",questionData?.CorrectAnswer);
       const crtAns = questionData?.CorrectAnswer;//2
       const userAns = questionData?.UserAnswer;//12


        return (
          <View style={[{margin:10,flex:1}]}>
            
            <Text style={{color:"#696F79", fontSize:16,fontWeight:"600",marginTop:20,marginHorizontal:20}}>Question{currentIndex+1}/{final?.length}</Text>
            <Text style={{color:"#696F79", fontSize:15,fontWeight:"400",marginTop:20,marginHorizontal:20}}>{questionData?.QuestionText}</Text>
           {/* {(currentIndex+1) == final?.length ? setSubmitShow(true) : null} */}
            {/* Render options for MCQ or textarea for Essay Question */}
            {questionData?.QuestionType === 'MCQ' ? 
              <>
              <Text style={{color:"#696F79", fontSize:16,fontWeight:"600",marginTop:20,marginHorizontal:20}}>Choose Answer</Text>
              <RadioButton.Group  value={selectedOption}>
                <View style={{marginHorizontal:15,flexDirection:"row",marginTop:5}}>
                {/* <RadioButton value={(crtAn == questionData?.Option1) || (userAns === questionData?.Option1)}/> */}
                 <View style={{alignSelf:"center",width:18,height:18,borderRadius:9,borderColor: (crtAns == userAns) ? "green" : (questionData?.Option1 == crtAns) ? "green" : (questionData?.Option1 == userAns) ? "red" : "black",borderWidth:1}}>
                  <View style={{margin:2,width:12,height:12,alignSelf:"center",borderRadius:6,backgroundColor: (crtAns == userAns) ? "green" : (questionData?.Option1 == crtAns) ? "green" : (questionData?.Option1 == userAns) ? "red" : "black",}}/>
                 </View>
                  <Text style={{marginLeft:5,alignSelf:"center",color: (crtAns == userAns) ? "green" : (questionData?.Option1 == crtAns) ? "green" : (questionData?.Option1 == userAns) ? "red" : null}}>{questionData?.Option1}</Text> 
                </View>

                <View style={{marginHorizontal:15,flexDirection:"row",marginTop:5}}>
                {/* <RadioButton value={questionData?.Option2} /> */}
                <View style={{alignSelf:"center",width:18,height:18,borderRadius:9,borderColor: (crtAns == userAns) ? "green" : (questionData?.Option2 == crtAns) ? "green" : (questionData?.Option2 == userAns) ? "red" : "black",borderWidth:1}}>
                  <View style={{margin:2,width:12,height:12,alignSelf:"center",borderRadius:6,backgroundColor: (crtAns == userAns) ? "green" : (questionData?.Option2 == crtAns) ? "green" : (questionData?.Option2 == userAns) ? "red" : null,}}/>
                 </View>
                 <Text style={{marginLeft:5,alignSelf:"center",color: (crtAns == userAns) ? "green" : (questionData?.Option2 == crtAns) ? "green" : (questionData?.Option2 == userAns) ? "red" : null}}>{questionData?.Option2}</Text> 
                </View>

                <View style={{marginHorizontal:15,flexDirection:"row",marginTop:5,}}>
                {/* <RadioButton value={questionData?.Option2} /> */}
                <View style={{alignSelf:"center",width:18,height:18,borderRadius:9,borderColor: (crtAns == userAns) ? "green" : (questionData?.Option3 == crtAns) ? "green" : (questionData?.Option3 == userAns) ? "red" : "black",borderWidth:1}}>
                  <View style={{margin:2,width:12,height:12,alignSelf:"center",borderRadius:6,backgroundColor: (crtAns == userAns) ? "green" : (questionData?.Option3 == crtAns) ? "green" : (questionData?.Option3 == userAns) ? "red" : null,}}/>
                 </View>
                 <Text style={{marginLeft:5,alignSelf:"center",color: (crtAns == userAns) ? "green" : (questionData?.Option3 == crtAns) ? "green" : (questionData?.Option3 == userAns) ? "red" : null}}>{questionData?.Option3}</Text> 
                </View>

                <View style={{marginHorizontal:15,flexDirection:"row",marginTop:5}}>
                {/* <RadioButton value={questionData?.Option2} /> */}
                <View style={{alignSelf:"center",width:18,height:18,borderRadius:9,borderColor: (crtAns == userAns) ? "green" : (questionData?.Option4 == crtAns) ? "green" : (questionData?.Option4 == userAns) ? "red" : "black",borderWidth:1}}>
                  <View style={{margin:2,width:12,height:12,alignSelf:"center",borderRadius:6,backgroundColor: (crtAns == userAns) ? "green" : (questionData?.Option4 == crtAns) ? "green" : (questionData?.Option4 == userAns) ? "red" : null,}}/>
                 </View>
                 <Text style={{marginLeft:5,alignSelf:"center",color: (crtAns == userAns) ? "green" : (questionData?.Option4 == crtAns) ? "green" : (questionData?.Option4 == userAns) ? "red" : null}}>{questionData?.Option4}</Text> 
                </View>

              </RadioButton.Group>
            </>
            : 
          null
    
            }
    
    
            <View style={{flexDirection:"row",width:"90%",marginTop:"15%",marginLeft:"65%"}}>
              <TouchableOpacity
              // style={{backgroundColor: currentIndex === 0 ? "gray":"#F38216",}}
              onPress={handlePrevPress} disabled={currentIndex === 0} >
                <Text style={{color:currentIndex === 0 ? "#7E7E7E":"#000000",fontSize:14,fontWeight:"400",alignSelf:"center"}}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              disabled={(currentIndex + 1) === final?.length}
              onPress={handleNextPress}>
                <Text style={{marginLeft:20,color:(currentIndex + 1) === final?.length? "#7E7E7E": "#000000",fontSize:14,fontWeight:"400",alignSelf:"center"}}>Next</Text>
              </TouchableOpacity>
            </View>
        
          </View>
        );
      };


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backarrowView}>
                    <Image
                        source={require('../../assets/orangebackarrow.jpg')}
                        style={styles.backarrowImg} />

                </TouchableOpacity>
                <Text style={{ color: "#1B2236", fontSize: 16, fontWeight: "500", marginLeft: "5%", alignSelf: "center", marginTop: 10 }}>{assignmentTitle}</Text>
            </View>

  <ScrollView>

  <Text style={{ color: "#130F26", fontSize: 16, fontWeight: "400", marginHorizontal: 25,marginTop:20 }}>{assignmentTitle}</Text>

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Name</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
                        <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 0 }}>{Name}</Text>
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Batch</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
                        <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 0 }}>{batchName}</Text>
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Date</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
                        <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 0 }}>{moment(TestDate).format('DD/MM/YYYY')}</Text>
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Assessment</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
<QuestionScreen questionData={final[currentIndex]}/>
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Total Score</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
                        <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", alignSelf:"center"}}>{final[currentIndex]?.TotalMarks}</Text>
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>File</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
                
                {final[currentIndex]?.Attachments ? (
          final[currentIndex]?.Attachments.map((item, index) => (
            <View key={index} style={{  margin: 10, backgroundColor: "#F5F7FB", width: "100%", elevation: 5, flexDirection: "row", paddingBottom: 5, justifyContent: "space-evenly", alignItems: "center", alignSelf: "center" }}>
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
        ) : 
        <View>
          <Text>
           No Files uploaded
          </Text>
          </View>
        }
                
                
                </View>
            </View>

           
            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Score</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
                        <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", alignSelf:"center"}}>{final[currentIndex]?.Marks}</Text>
                </View>
            </View>


            <View style={{ marginHorizontal: 25,marginTop:5 }}>
          <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Remarks</Text>
          <View style={{ width: "100%", backgroundColor: "#F5F7FB", height: 145, marginTop: 10 }}>
            {final !== '' && Status === "Completed" ?
              <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginHorizontal: 40, textAlign: "justify", }}>{final?.FeedBack}</Text>
              :
              <TextInput
                placeholder='Type Message'
                placeholderTextColor={"#C8C6C6"}
                onChangeText={text => setDescription(text)}
                value={description}
                style={{ width: 290, height: 175, borderColor: "#F38216", textAlign: "center", textAlignVertical: "top" }} />
            
           }
          </View>
        </View>
<View style={{alignItems:"center",marginBottom:"30%",marginHorizontal:25,marginTop:20}}>
        {/* <TouchableOpacity
                        onPress={()=> StudentRemarks('Redo')}
                       style={{marginBottom:"10%",padding:10,borderRadius:5,backgroundColor:"#FF0000",width:"40%",alignItems:"center"}}>
                    <Text style={{color:"#FFFFFF",fontSize:18,fontWeight:"600"}}>Redo</Text>
                 </TouchableOpacity> */}
                 {final !== '' && Status === "Completed" ?
                 <TouchableOpacity
                       style={{marginBottom:"10%",padding:10,borderRadius:5,backgroundColor:"#98EECC",width:"40%",alignItems:"center"}}>
                    <Text style={{color:"#FFFFFF",fontSize:18,fontWeight:"600"}}>Completed</Text>
                 </TouchableOpacity>
                 : null}
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

            </ScrollView>
          

        </SafeAreaView>
    )
}
export default FacultyStudentDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    txtStyle: { color: "black", fontSize: 16, fontWeight: "500", margin: 10 },
    backarrowView: { width: 40, height: 40, marginLeft: 20, elevation: 3, borderRadius: 10, marginTop: 10 },
    backarrowImg: { width: 40, height: 40, alignSelf: "center", borderRadius: 10 },
    indicatorStyl: { backgroundColor: '#D6387F', width: 45, marginLeft: 45 },
})