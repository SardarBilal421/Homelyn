import react, { useEffect, useCallback, useState, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import Style from "../../utilis/AppStyle";
import Colors from "../../utilis/AppColors";
import {
  auth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  db,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  where,
  query,
  firebase,
} from "../../utilis/firebase";
// import { RNCamera } from 'react-native-camera';
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import Entypo from "react-native-vector-icons/Entypo";
import TemplateItem from "../../components/TemplateItem";
import { setPersistence } from "firebase/auth";
const { height, width } = Dimensions.get("window");
// import { PermissionsAndroid } from 'react-native';
// import { Permissions } from 'expo-permissions';

const CreateNewProject = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("select_project");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [selectedAccountAvatar, setSelectedAccountAvatar] = useState(null);
  const [Width, setWidth] = useState("");
  const [Height, setHeight] = useState("");

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasCameraPermission, sethasCameraPermission] = useState(null);
  const [CapturedImage, setCapturedImage] = useState(null);
  const [Flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      sethasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [templateId, setTemplateId] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [canvasType, setCanvasType] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [allTemplates, setAllTemplates] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [Buttondiabled, setButtondisabled] = useState("true");
  const [showCamera, setshowCamera] = useState(false);
  const [Tasveer, setTasveer] = useState();
  let t;
  //take Picture
  const onTakePicture = async () => {
    // if (cameraRef) {
    try {
      // const data= await cameraRef.current.takePictureAsync();
      // // console.log('---------',data);

      // setCapturedImage(data.uri)
      // console.log('gjgjgjg',CapturedImage)
      // setTasveer({image:data.uri})
      // // setTasveer(true)
      // console.log('tasveer',Tasveer.image);
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      //   if (!result.canceled) {
      t = result.assets[0].uri;
      setTasveer(result.assets[0].uri);
      console.log("Tasveer================================", t);
      console.log(result.assets[0].uri);
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  const getSpaceTemplates = async () => {
    const querySnapshot = await getDocs(collection(db, "spacetemplates"));
    setAllTemplates(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getSpaceTemplates();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedAccountAvatar({ localUri: result.assets[0].uri });
    }
    console.log("result", result);
  };

  const HandleFileUpload = async (source) => {
    let sourceuri = source;
    let newFile = {
      uri: sourceuri,
      type: `test/${sourceuri.split(".")[1]}`,
      name: `test.${sourceuri.split(".")[1]}`,
    };
    const data = new FormData();
    data.append("file", newFile);
    data.append("upload_preset", "unitedUploads");
    data.append("cloud_name", "united-app");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/united-app/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const result = await res.json();
    return result.secure_url;
  };

  const createpost = async () => {
    setIsLoading(true);
    let _avatar = await HandleFileUpload(selectedAccountAvatar.localUri);
    if (postTitle != "" && postContent != "" && selectedAccountAvatar != null) {
      const projectsRef = await addDoc(collection(db, "projects"), {
        associateId: auth.currentUser.uid,
        isPublish: true,
        spaceId: props.route.params.space.id,
        projectName: postTitle,
        projectDescription: "",
        isPrivate: false,
        createdAt: Date.now(),
        canvasBackgroundImage: "",
        templateId: "",
        projectType: "article",
        isSharable: true,
        canvasType: "content",
        viewsCount: [],
        likesCount: [],
        unlikesCount: [],
        commentsCount: [],
        article: {
          articleTitle: postTitle,
          articleContent: postContent,
          articleMainImage: _avatar,
          articleLibrary: [],
        },
      });

      setIsLoading(false);
      setPostTitle("");
      setPostContent("");
      setSelectedAccountAvatar(null);
      props.navigation.navigate("SpacePage", {
        space: props.route.params.space,
      });
    } else {
      setIsLoading(false);
      Alert.alert("Create New Project", "All inputs are mandatories");
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to Camera</Text>;
  }

  return (
    <>
      {showCamera ? (
        <View>
          {/* <Camera
  style={{height:width*0.9,width:width*1}}
type={type}
flashMode={Flash}
ref={cameraRef}
> 
</Camera>
<View style={{width:width*0.9,justifyContent:'center',alignSelf:'center',marginTop:height*0.04}}>
        <TouchableOpacity style={Style.button_pink} 
        onPress={()=>{
            onTakePicture()
            // setshowCamera(false)
        }}>
           <Text style={Style.text}>Take Picture</Text> 
        </TouchableOpacity>
        </View> */}
          {Tasveer && (
            <Image
              source={{ uri: t }}
              resizeMode="contain"
              style={{
                flex: 1,
                // height:height*0.1,
                // width:width*0.1,
              }}
            />
          )}
        </View>
      ) : (
        <View style={Style.container}>
          <Text style={Style.spaces_title}>
            create new <Text style={Style.spaces_title_gray}>project</Text>
          </Text>

          {view == "select_project" ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <TouchableOpacity
                style={styles.select_btn}
                onPress={() => {
                  setView("designroom");
                }}
              >
                <MaterialCommunityIcons
                  name="perspective-less"
                  size={120}
                  color={Colors.gray_1}
                />
                <Text style={styles.btn_text}>Design your room</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.select_btn}
                onPress={() => {
                  setView("sharepost");
                }}
              >
                <MaterialCommunityIcons
                  name="file-edit-outline"
                  size={120}
                  color={Colors.gray_1}
                />
                <Text style={styles.btn_text}>Share your thoughts</Text>
              </TouchableOpacity>
            </View>
          ) : view == "designroom" ? (
            <ScrollView style={{ flex: 1, marginTop: 10 }}>
              <Text style={Style.spaces_titlesub}>
                design your <Text style={Style.spaces_title_graysub}>room</Text>
              </Text>

              <TextInput
                placeholder="Project name"
                style={Style.input}
                value={projectName}
                onChangeText={(text) => setProjectName(text)}
                keyboardType="default"
              />

              <TextInput
                placeholder="Description"
                style={Style.inputfree}
                value={projectDescription}
                onChangeText={(text) => setProjectDescription(text)}
                keyboardType="default"
                multiline={true}
              />

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginTop: 20,
                  paddingRight: 20,
                }}
              >
                <Text style={Style.spaces_titlesub}>
                  design with{" "}
                  <Text style={Style.spaces_title_graysub}>templates</Text>
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "Raleway-Mediumttf",
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              {allTemplates ? (
                <FlatList
                  horizontal={true}
                  data={allTemplates}
                  keyExtractor={(item) => item.id}
                  renderItem={(itemRow) => (
                    <TemplateItem
                      template={itemRow.item}
                      onClick={() => {
                        props.navigation.navigate("SpacePage", {
                          template: itemRow.item,
                        });
                      }}
                    />
                  )}
                />
              ) : (
                <Text>No spces here</Text>
              )}

              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  paddingRight: 20,
                  marginBottom: 20,
                }}
              >
                <Text style={Style.spaces_titlesub}>
                  or upload your{" "}
                  <Text style={Style.spaces_title_graysub}>image</Text>
                </Text>
                <Text
                  style={{
                    fontFamily: "Raleway-Mediumttf",
                    fontSize: 14,
                    marginTop: 4,
                  }}
                >
                  Please note only projects with template images can be public
                </Text>
              </View>

              {!nextStep && (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  {/* <View> */}
                  {/* <Camera
              style={styles.select_Options}
           type={type}
           flashMode={Flash}
           ref={cameraRef}
           > */}
                  <TouchableOpacity
                    style={styles.select_Options}
                    onPress={() => {
                      onTakePicture();
                      setshowCamera(true);
                    }}
                    //   onPress={onTakePicture}
                    //   onPress={() => {
                    //     pickImage();
                    //     setSelectedAccountAvatar(true);
                    //   }}
                  >
                    <View>
                      <Image
                        source={require("../../../assets/images/camera.png")}
                        style={{
                          height: width * 0.2,
                          width: width * 0.4,
                          marginTop: height * 0.02,
                          justifyContent: "center",
                          alignSelf: "center",
                          marginBottom: height * 0.02,
                        }}
                        resizeMode="contain"
                      />

                      <Text style={{ textAlign: "center", color: "grey" }}>
                        Choose From Camera
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* </Camera> */}
                  <TouchableOpacity
                    style={styles.select_Options1}
                    onPress={() => {
                      pickImage();
                      // setSelectedAccountAvatar(true);

                      setIsVisible(true);
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/Gallery.png")}
                      style={{
                        height: width * 0.2,
                        width: width * 0.4,
                        marginTop: height * 0.02,
                        justifyContent: "center",
                        alignSelf: "center",
                        marginBottom: height * 0.02,
                      }}
                      resizeMode="contain"
                    />
                    <Text style={{ textAlign: "center", color: "grey" }}>
                      Choose From Library
                    </Text>
                  </TouchableOpacity>

                  {/* </View> */}
                </View>
              )}

              {!nextStep && isVisible && (
                <View>
                  <Image
                    source={require("../../../assets/images/down-chevron.png")}
                    style={{
                      alignSelf: "center",
                      height: 30,
                      width: "10%",
                      marginTop: 20,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={Style.spaces_titlesub}>SELECT...</Text>
                  <Text
                    style={{
                      fontFamily: "Raleway-Mediumttf",
                      fontSize: 14,
                      marginTop: 4,
                      marginBottom: 20,
                    }}
                  >
                    Please note only projects with template images can be public
                  </Text>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.select_Options}
                      onPress={() => {
                        setNextStep(true);
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/3d-model.png")}
                        style={{
                          height: width * 0.2,
                          width: width * 0.4,
                          marginTop: height * 0.02,
                          justifyContent: "center",
                          alignSelf: "center",
                          marginBottom: height * 0.02,
                        }}
                        resizeMode="contain"
                      />
                      <Text style={{ textAlign: "center", color: "grey" }}>
                        Front
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.select_Options1}
                      onPress={() => {
                        setNextStep(true);
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/pentagon-.png")}
                        style={{
                          height: width * 0.2,
                          width: width * 0.4,
                          marginTop: height * 0.02,
                          justifyContent: "center",
                          alignSelf: "center",
                          marginBottom: height * 0.02,
                        }}
                        resizeMode="contain"
                      />
                      <Text style={{ textAlign: "center", color: "grey" }}>
                        Perspective
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {nextStep && (
                <View>
                  {/* <Image
                source={require("../../../assets/images/down-chevron.png")}
                style={{
                  height: width * 0.1,
                  width: width * 0.4,
                  marginTop: height * 0.02,
                  justifyContent: "center",
                  alignSelf: "center",
                  marginBottom: height * 0.02,
                }}
                resizeMode="contain"
              /> */}
                  <Image
                    source={{ uri: selectedAccountAvatar?.localUri }}
                    style={{
                      height: width * 0.8,
                      width: width * 1,
                      marginTop: height * 0.02,
                      justifyContent: "center",
                      alignSelf: "center",
                      marginBottom: height * 0.03,
                    }}
                  />
                  <TextInput
                    placeholder="Area height (in cm)"
                    style={Style.input}
                    value={Height}
                    onChangeText={(text) => setHeight(text)}
                    keyboardType="numeric"
                  />
                  <TextInput
                    placeholder="Area width (in cm)"
                    style={Style.input}
                    value={Width}
                    onChangeText={(text) => setWidth(text)}
                    keyboardType="numeric"
                  />
                  {/* <View style={{width:'100%', marginTop:60}}>
                <TouchableOpacity style={Style.button_pink} >
                    <Text style={Style.button_text_white}>CREATE</Text>
                </TouchableOpacity>
            </View> */}
                </View>
              )}
              {(Buttondiabled && selectedAccountAvatar) ||
              (Buttondiabled && nextStep) ? (
                <View style={{ width: "100%", marginTop: height * 0.09 }}>
                  <TouchableOpacity style={Style.button_pink}>
                    <Text style={Style.button_text_white}>CREATE</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text></Text>
              )}
            </ScrollView>
          ) : view == "sharepost" ? (
            <ScrollView style={{ flex: 1, marginTop: 10 }}>
              <Text style={Style.spaces_titlesub}>
                share your{" "}
                <Text style={Style.spaces_title_graysub}>thoughts</Text>
              </Text>
              <TextInput
                placeholder="Title"
                style={Style.input}
                value={postTitle}
                onChangeText={(text) => setPostTitle(text)}
                keyboardType="default"
              />

              <TextInput
                placeholder="Content"
                style={Style.inputfree}
                value={postContent}
                onChangeText={(text) => setPostContent(text)}
                keyboardType="default"
                multiline={true}
              />

              <TouchableOpacity
                onPress={pickImage}
                style={{
                  width: "100%",
                  paddingVertical: 12,
                  backgroundColor: Colors.white,
                  borderRadius: 20,
                  alignItems: "center",
                  shadowColor: "black",
                  shadowOpacity: 0.1,
                  fontSize: 16,
                  shadowOffset: { width: 0, height: 3 },
                  shadowRadius: 2,
                  elevation: 5,
                  marginTop: 12,
                }}
              >
                {selectedAccountAvatar ? (
                  <Image
                    source={{ uri: selectedAccountAvatar?.localUri }}
                    style={{ width: 200, height: 200 }}
                    resizeMode="contain"
                  />
                ) : (
                  <Entypo
                    onPress={() => {}}
                    name="images"
                    color={Colors.gray_1}
                    size={28}
                  />
                )}
                <Text style={Style.upload_text}>Choose from library</Text>
              </TouchableOpacity>

              {isLoading ? (
                <ActivityIndicator
                  color={Colors.pink}
                  size="large"
                  style={{ marginVertical: 12 }}
                />
              ) : (
                <TouchableOpacity
                  style={styles.button_pink}
                  onPress={createpost}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontFamily: "BebasNeue-Regularttf",
                      fontWeight: "700",
                      fontSize: 24,
                    }}
                  >
                    publish
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.button_border}
                onPress={() => {
                  setView("select_project");
                }}
              >
                <Text
                  style={{
                    color: "#444",
                    fontFamily: "BebasNeue-Regularttf",
                    fontWeight: "500",
                    fontSize: 24,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <View></View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button_pink: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRadius: 30,
    backgroundColor: "#D8315B",
    marginBottom: 10,
    marginTop: 22,
    alignItems: "center",
  },
  button_border: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 18,
    borderColor: "#444",
    borderRadius: 30,
    backgroundColor: "#ebebeb",
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
  },

  btn_text: {
    fontFamily: "Raleway-Regularttf",
    fontSize: 16,
    marginTop: 12,
  },
  select_btn: {
    width: "60%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  select_Options: {
    width: "48%",
    borderColor: "white-smoke",
    backgroundColor: "white",
    borderRadius: 10,
    height: 150,
    marginRight: 10,
  },
  select_Options1: {
    width: "48%",
    borderColor: "white-smoke",
    backgroundColor: "white",
    borderRadius: 10,
    height: 150,
  },
});
export const screenOptions = (navData) => {
  return {
    headerTitle: "Create New Project",
    headerShown: true,
  };
};

export default CreateNewProject;
