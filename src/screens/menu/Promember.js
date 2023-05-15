import react, { useEffect, useCallback, useState } from "react";
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  Image,
} from "react-native";
import Style from '../../utilis/AppStyle';
import Colors from '../../utilis/AppColors';
import Entypo from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
const initialLayout = { width: Dimensions.get("window").width };
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    auth, onAuthStateChanged,signOut,signInWithEmailAndPassword,createUserWithEmailAndPassword,
    db,collection,addDoc,updateDoc,doc,getDocs,deleteDoc,where,query,firebase
} from '../../utilis/firebase';



const Promember = (props) => {

  const [account, setAccount] = useState(null);

  const getAccountData = useCallback(async () => {
      const accountsRef = collection(db, "accounts");
      const q = query(accountsRef, where("uuid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      setAccount(
          querySnapshot.docs[0].data()
      );
    },[account])

  useEffect(() => {
      getAccountData();
    }, []);



    
  const [tabColor1, setTabColor1] = useState("#1E1B18");
  const [tabColor2, setTabColor2] = useState("#C9C2BB");
  const [tabColor3, setTabColor3] = useState("#C9C2BB");
  const [texttabColor1, settextTabColor1] = useState("#ffffff");
  const [texttabColor2, settextTabColor2] = useState("#444444");
  const [texttabColor3, settextTabColor3] = useState("#444444");


  const [step, setStep] = useState("company");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [businesscategories, setBusinesscategories] = useState([]);
  const [spaceArea, setSpaceArea] = useState("Select category from list");
  const [spaceAreaId, setSpaceAreaId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccountAvatar, setSelectedAccountAvatar] = useState(null);
  const [tempImage, setTempImage] = useState(
    "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/seating_area_nklfyl.png"
  );

  const getCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "businesscategories"));
    setBusinesscategories(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  useEffect(() => {
    getCategories();
  }, []);

  const selectCategoryAction = (categoryName, categoryId) => {
    setSpaceArea(categoryName);
    setSpaceAreaId(categoryId);
    setModalVisible(!modalVisible);
}


  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  const [companyEmail, setcompanyEmail] = useState("");
  const [companyWebsite, setcompanyWebsite] = useState("");
  const [companyAddress, setcompanyAddress] = useState("");
  const [companyCity, setcompanyCity] = useState("");
  const [companyCountry, setcompanyCountry] = useState("");
  const [companyZip, setcompanyZip] = useState("");
  const [companyPhone, setcompanyPhone] = useState("");
  const [facebook, setfacebook] = useState("");
  const [instagram, setinstagram] = useState("");
  const [linkedin, setlinkedin] = useState("");

  const [servicesProvided, setservicesProvided] = useState("");
  const [areasServed, setareasServed] = useState("");
  const [mincost, setmincost] = useState("");
  const [maxcost, setmaxcost] = useState("");
  const [certification, setcertification] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedAccountAvatar({localUri: result.assets[0].uri});
    }
  };





  const becomePro = async() => {
    setIsLoading(true);
    if(companyName != '' && servicesProvided != '' && companyEmail != '' && companyAddress != '' && companyCity != ''){
      let _avatar = tempImage;
      if (selectedAccountAvatar !== null) {
        _avatar = await HandleFileUpload(selectedAccountAvatar.localUri);
      }

      try {
        const becomeproRef = await addDoc(collection(db, "promembers"), {
          associateId: auth.currentUser.uid,
          companyName:companyName,
          companyId:companyId,
          bcategory: spaceAreaId,
          companyDescription: companyDescription,
          companyLogo: _avatar,
          servicesProvided:servicesProvided,
          areasServed:areasServed,
          certification:certification,
          companyEmail:companyEmail,
          companyWebsite:companyWebsite,
          companyAddress:companyAddress,
          companyCity:companyCity,
          companyCountry:companyCountry,
          companyZip:companyZip,
          companyPhone:companyPhone,
          facebook: facebook,
          instagram: instagram,
          linkedin: linkedin
      });

      setIsLoading(false);
      props.navigation.navigate('Profile', {account: account});

      } catch (error) {
        setIsLoading(false);
        setErrorMsg(error.message);
      }

    } else {
      setIsLoading(false);
      setErrorMsg('Please check that you have filled in all the mandatory fields');
    }
  }






  const goto_company = async () => {

    setTabColor1("#1E1B18");
    setTabColor2("#C9C2BB");
    setTabColor3("#C9C2BB");

    settextTabColor1("#ffffff");
    settextTabColor2("#444444");
    settextTabColor3("#444444");
    setStep("company");
  };

  const goto_services = async () => {
    setTabColor1("#C9C2BB");
    setTabColor2("#1E1B18");
    setTabColor3("#C9C2BB");

    settextTabColor1("#444444");
    settextTabColor2("#ffffff");
    settextTabColor3("#444444");
    setStep("services");
  };

  const goto_contact = async () => {
      setTabColor1("#C9C2BB");
      setTabColor2("#C9C2BB");
      setTabColor3("#1E1B18");

      settextTabColor1("#444444");
      settextTabColor2("#444444");
      settextTabColor3("#ffffff");

      setStep("contact");
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

  useEffect(() => {
    if (errorMsg) {
      Alert.alert("Become Pro Member", errorMsg);
    }
  }, [errorMsg]);




  return (
    <View>
      <View style={{height: "10%",flexDirection: "row",justifyContent: "space-between",}}>
        <TouchableOpacity onPress={goto_company} style={{width: "33.3%",alignItems: "center",justifyContent: "center",backgroundColor: tabColor1,}}>
          <Text style={{color: texttabColor1,fontFamily: "Raleway-Mediumttf",fontSize: 14,}}>Company</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goto_services} style={{width: "33.3%",alignItems: "center",justifyContent: "center",backgroundColor: tabColor2,}}>
          <Text style={{color: texttabColor2,fontFamily: "Raleway-Mediumttf",fontSize: 14,}}>Services</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goto_contact} style={{width: "33.3%",alignItems: "center",justifyContent: "center",backgroundColor: tabColor3,}}>
          <Text style={{color: texttabColor3,fontFamily: "Raleway-Mediumttf",fontSize: 14,}}>Contact</Text>
        </TouchableOpacity>
      </View>


      <View style={{ height: "90%" }}>
        {step === "company" ? (
          <ScrollView>
            <KeyboardAvoidingView style={Style.container}>

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);}}>
              <View style={Style.centeredView}>
                <View style={Style.modalView}>

                  {
                      businesscategories ? (
                          <FlatList
                              style={{width:'100%'}}
                              data={businesscategories}
                              keyExtractor={item => item.id}
                              renderItem={itemRow => 
                              <TouchableOpacity onPress={() => {selectCategoryAction(itemRow.item.categoryName,itemRow.item.id)}} style={Style.category_row}>
                                  <Image style={{width:30, height:30}} source={{uri:itemRow.item.categoryIcon}} />
                                  <Text style={Style.selectListText}>{itemRow.item.categoryName}</Text>
                              </TouchableOpacity>}
                      />) 
                      : (<View></View>)
                  }

                </View>
              </View>
            </Modal>


              <TextInput
                style={Style.input}
                keyboardType="default"
                placeholder="Company name *"
                value={companyName}
                onChangeText={(text) => setCompanyName(text)}
              />

              <TouchableOpacity style={Style.input_btn} onPress={() => {setModalVisible(!modalVisible);}}>
                <Text style={Style.inputTextPlace}>{spaceArea}</Text>
              </TouchableOpacity>

              <TextInput
                style={Style.input}
                keyboardType="default"
                placeholder="Company Tax Number"
                value={companyId}
                onChangeText={(text) => setCompanyId(text)}
              />

              <TextInput
                style={Style.inputfree}
                keyboardType="default"
                multiline={true}
                placeholder="Company bio"
                value={companyDescription}
                onChangeText={(text) => {
                  setCompanyDescription(text);
                }}
              />

              <TouchableOpacity style={Style.business_logo_container} onPress={pickImage}>
                {
                  selectedAccountAvatar ? (
                    <Image source={{uri:selectedAccountAvatar.localUri}} style={{width:100,height:100}} />
                  ) : (
                    <Image source={{uri:tempImage}} style={{width:100,height:100}} />
                  )
                }
                <Text style={{fontFamily: "Raleway-Regularttf",marginTop:12}}>Upload your pro logo (square 300x300)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={Style.button_pink} onPress={goto_services}>
                <Text style={Style.button_pink_text}>NEXT</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
          </ScrollView>


        ) : step === "services" ? (
          <ScrollView>
            <KeyboardAvoidingView style={Style.container}>
              <TextInput
                style={Style.inputfreesmall}
                keyboardType="default"
                multiline={true}
                placeholder="Services Provided *"
                value={servicesProvided}
                onChangeText={(text) => {
                  setservicesProvided(text);
                }}
              />

              <TextInput
                style={Style.inputfreesmall}
                keyboardType="default"
                multiline={true}
                placeholder="Areas Served"
                value={areasServed}
                onChangeText={(text) => {
                  setareasServed(text);
                }}
              />

              <TextInput
                style={Style.inputfreesmall}
                keyboardType="default"
                multiline={true}
                placeholder="Certifications and Awards"
                value={certification}
                onChangeText={(text) => {
                  setcertification(text);
                }}
              />

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "48%" }}>
                  <TouchableOpacity
                    style={Style.button_pink_line}
                    onPress={goto_company}
                  >
                    <Text style={Style.button_pink_line_text}>BACK</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "48%" }}>
                  <TouchableOpacity
                    style={Style.button_pink}
                    onPress={goto_contact}
                  >
                    <Text style={Style.button_pink_text}>NEXT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        ) : step === "contact" ? (
          <ScrollView>
            <KeyboardAvoidingView style={Style.container}>
              <TextInput
                style={Style.input}
                keyboardType="default"
                placeholder="Company email *"
                value={companyEmail}
                onChangeText={(text) => {
                  setcompanyEmail(text);
                }}
              />

              <TextInput
                style={Style.input}
                keyboardType="default"
                placeholder="Company website"
                value={companyWebsite}
                onChangeText={(text) => {
                  setcompanyWebsite(text);
                }}
              />

              <TextInput
                style={Style.input}
                keyboardType="default"
                placeholder="Address *"
                value={companyAddress}
                onChangeText={(text) => {
                  setcompanyAddress(text);
                }}
              />

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "48%" }}>
                  <TextInput
                    style={Style.input}
                    keyboardType="default"
                    placeholder="City *"
                    value={companyCity}
                    onChangeText={(text) => {
                      setcompanyCity(text);
                    }}
                  />
                </View>
                <View style={{ width: "48%" }}>
                  <TextInput
                    style={Style.input}
                    keyboardType="default"
                    placeholder="Country *"
                    value={companyCountry}
                    onChangeText={(text) => {
                      setcompanyCountry(text);
                    }}
                  />
                </View>
              </View>

              <TextInput
                style={Style.input}
                keyboardType="default"
                placeholder="Zip code"
                value={companyZip}
                onChangeText={(text) => {
                  setcompanyZip(text);
                }}
              />

              <TextInput
                style={Style.input}
                keyboardType="default"
                placeholder="Company phone *"
                value={companyPhone}
                onChangeText={(text) => {
                  setcompanyPhone(text);
                }}
              />

              <Text style={Style.social_title}>SOCIAL</Text>


              <View style={{flexDirection:'row', width:'100%', marginBottom:10}}>
                <View style={{width:'10%'}}>
                  <MaterialCommunityIcons name='facebook' style={{marginTop:24}} color={Colors.pink} size={30} />
                </View>
                <View style={{width:'90%'}}>
                  <TextInput
                    style={Style.input}
                    keyboardType="default"
                    placeholder="Facebook"
                    value={facebook}
                    onChangeText={(text) => {
                      setfacebook(text);
                    }}
                  />
                </View>
              </View>




              <View style={{flexDirection:'row', width:'100%', marginBottom:10}}>
                <View style={{width:'10%'}}>
                  <MaterialCommunityIcons name='instagram' style={{marginTop:24}} color={Colors.pink} size={30} />
                </View>
                <View style={{width:'90%'}}>
                  <TextInput
                    style={Style.input}
                    keyboardType="default"
                    placeholder="Instagram"
                    value={instagram}
                    onChangeText={(text) => {
                      setinstagram(text);
                    }}
                  />
                </View>
              </View>




              <View style={{flexDirection:'row', width:'100%', marginBottom:10}}>
                <View style={{width:'10%'}}>
                  <MaterialCommunityIcons name='linkedin' style={{marginTop:24}} color={Colors.pink} size={30} />
                </View>
                <View style={{width:'90%'}}>
                  <TextInput
                    style={Style.input}
                    keyboardType="default"
                    placeholder="LinkedIn"
                    value={linkedin}
                    onChangeText={(text) => {
                      setlinkedin(text);
                    }}
                  />
                </View>
              </View>


              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "48%" }}>
                  <TouchableOpacity
                    style={Style.button_pink_line}
                    onPress={goto_services}
                  >
                    <Text style={Style.button_pink_line_text}>BACK</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "48%" }}>
                  <TouchableOpacity
                    style={Style.button_pink}
                    onPress={becomePro}>
                    <Text style={Style.button_pink_text}>FINISH</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        ) : (<View></View>)
      }
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Become Pro Member",
    headerShown: true,
  };
};

export default Promember;
