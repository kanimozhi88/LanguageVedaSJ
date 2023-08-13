import React, { useEffect, useState ,useRef} from "react";
import { View, Text, TextInput,SafeAreaView, TouchableOpacity, StyleSheet, Image, ScrollView,Alert } from 'react-native';
import { getAccessToken } from '../../redux/actions';
import moment from "moment";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

const SpecificStudentTestDetails = ({ route, navigation }) => {

    const [final, setFinal] = useState('');
    const [remarks,setRemarks] = useState('');
    const { Id, assignmentTitle ,Status} = route.params;
    const actionSheetRef = useRef(null);
    const Normaloptions = ['Camera', 'Gallery', 'Document/pdf'];
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');


    useEffect(() => {
        SpecificStudentTestApi();
        // StudentRemarks();
    }, []);

    const SpecificStudentTestApi = async () => {
        let data = {};
        data.testId = Id;

        const body = JSON.stringify(data)
        const token = await getAccessToken();
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/RNFacultySpecificStudentTestDetails`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        });
        let SpecificStudentTestApi = await response.json()
        console.log(" SpecificStudentTestApi API RES",  SpecificStudentTestApi);
        const finalRes = JSON.parse(SpecificStudentTestApi)
        setFinal(finalRes);
        console.log("final data is", final)
    }

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
            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Name</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
                    {final !== '' ?
                        <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 40 }}>{final?.TestDetails?.ContactName}</Text>
                        : null}
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Batch</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
                    {final !== '' ?
                        <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 40 }}>{final?.TestDetails?.BatchName}</Text>
                        : null}
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Date</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
                    {final !== '' ?
                        <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 40 }}>{moment(final?.TestDetails?.TestDate).format('DD/MM/YYYY')}</Text>
                        : null}
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>File</Text>
                {final !== '' ?
                final?.Attachments.map((item, index) => {
                    if (item.Type.includes("pdf")) {
                        return (
                         
                            <View style={{ width: "100%",flexDirection:"row",backgroundColor: "#F5F7FB",}}>
                            <Image
                                    source={require('../../assets/PDF.png')}
                                    style={{ width: 16, height: 16, margin: 5 }} />
                                <Text style={{ margin: 5,width:"75%" }}>{item?.title}</Text>
                                <MenuProvider>
                                    <View style={{ height: 55, top: 15, }}>
                                        <PopupMenuExample PublicDownloadUrl={item?.PublicDownloadUrl} type='pdf' />
                                    </View>
                                </MenuProvider>

                             </View>
                           
                        )
                    } else {
                        return (
                            <View style={{ width: "100%", flexDirection:"row",backgroundColor: "#F5F7FB",}}>
                                <Image
                                    source={require('../../assets/Image.png')}
                                    style={{ width: 16, height: 16, margin: 5 }} />
                                <Text style={{ margin: 5,width:"75%" }}>{item?.title}</Text>
                                <MenuProvider>
                                    <View style={{ height: 55, top: 15, }}>
                                        <PopupMenuExample PublicDownloadUrl={item?.PublicDownloadUrl} type='image' />
                                    </View>
                                </MenuProvider>

                            </View>
                        )
                    }
                }
                )
                : null}
                {Status === "Completed" || Status === "Submited" ?
                <View 
                style={{ width: "100%", flexDirection:"row",backgroundColor: "#F5F7FB"}}>
                 <TouchableOpacity
                  style={{marginLeft:"30%",marginBottom:"10%",padding:10,borderRadius:5,backgroundColor:"#F38216",width:"35%",alignItems:"center"}}>
                    <Text style={{color:"#FFFFFF",fontSize:18,fontWeight:"600"}}>Download</Text>
                 </TouchableOpacity>
                 </View>
                 : null}
              
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 25,marginBottom:"20%" }}>
                <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Upload</Text>
                <View style={{ width: "100%", backgroundColor: "#F5F7FB", padding: 15, marginTop: 10 }}>
                    
                        <Text style={{ color: "#B2B2B2", fontSize: 16, fontWeight: "400", marginHorizontal: 80 }}>Drag and drop your files</Text>
                        <Text style={{ color: "black", fontSize: 16, fontWeight: "400", marginHorizontal: 40,alignSelf:"center" ,margin:5}}>OR</Text>
                        <TouchableOpacity
                        onPress={()=> validateUpload()}
                       style={{marginLeft:"30%",marginBottom:"10%",padding:10,borderRadius:5,backgroundColor:"#F38216",width:"40%",alignItems:"center"}}>
                    <Text style={{color:"#FFFFFF",fontSize:18,fontWeight:"600"}}>Upload</Text>
                 </TouchableOpacity>
                </View>
            </View>


            <View style={{ marginHorizontal: 25, bottom: "2%" }}>
          <Text style={{ color: "#1C1C1C", fontSize: 18, fontWeight: "500" }}>Remarks</Text>
          <View style={{ width: "100%", backgroundColor: "#F5F7FB", height: 145, marginTop: 10 }}>
            {final !== '' && Status === "Completed" || Status === "Submitted" ?
              <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginHorizontal: 40, textAlign: "justify", }}>{final?.TestDetails?.FeedBack}</Text>
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
<View style={{flexDirection:"row",marginBottom:"40%",marginHorizontal:25,justifyContent:"space-between"}}>
        <TouchableOpacity
                        onPress={()=> StudentRemarks('Redo')}
                       style={{marginBottom:"10%",padding:10,borderRadius:5,backgroundColor:"#FF0000",width:"40%",alignItems:"center"}}>
                    <Text style={{color:"#FFFFFF",fontSize:18,fontWeight:"600"}}>Redo</Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                        onPress={()=> StudentRemarks('Completed')}
                       style={{marginBottom:"10%",padding:10,borderRadius:5,backgroundColor:"#98EECC",width:"40%",alignItems:"center"}}>
                    <Text style={{color:"#FFFFFF",fontSize:18,fontWeight:"600"}}>Completed</Text>
                 </TouchableOpacity>
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
export default SpecificStudentTestDetails;

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