import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

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
  orderBy,
  query,
} from "../../utilis/firebase";

import { Avatar } from "react-native-paper";
import AppColors from "../../utilis/AppColors";
const { width, height } = Dimensions.get("window");
const MessageView = (props) => {
  const [message, setMessage] = useState("");
  const [myAccount, setMyAccount] = useState(props.route.params.myAccount);
  const [receiverAccount, setReceiverAccount] = useState(
    props.route.params.receiverAccount
  );
  const [allMessages, setAllMessages] = useState([]);

  // const loadMyAccount = useCallback(async () => {
  //   // const myAccountRef = collection(db, "accounts");
  //   // const myAccountQuery = query(
  //   //   myAccountRef,
  //   //   where("uuid", "==", auth.currentUser.uid)
  //   // );
  //   // const myAccountQuerySnapshot = await getDocs(myAccountQuery);

  //   // setMyAccount(myAccountQuerySnapshot.docs[0].data());
  //   // console.log("myAccount", myAccount.uuid);
  // }, []);

  const loadMessage = useCallback(async () => {
    const chatroomRef = await getDocs(collection(db, "chatroom"));

    // console.log("myAccount", myAccount.uuid);
    // console.log("RecieverAccount", receiverAccount.uuid);

    const messages = chatroomRef.docs
      .map((x) => x.data())
      .filter((x) => x.senderId == myAccount.uuid)
      .filter((x) => x.receiverId == receiverAccount.uuid)
      .concat(
        chatroomRef.docs
          .map((x) => x.data())
          .filter(
            (x) =>
              x.senderId == receiverAccount.uuid &&
              x.receiverId == myAccount.uuid
          )
      )
      .sort((a, b) => {
        return a.sendedAt - b.sendedAt;
      });

    setAllMessages(messages);
    console.log(
      "messages",
      messages.filter((x) => x.receiverId === myAccount.uuid).length
    );
  }, [receiverAccount]);

  useEffect(() => {
    if (myAccount) {
      loadMessage();
    }
  }, []);

  const scrollViewRef = useRef();
  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleSendMessage = async () => {
    console.log("message", message);
    const newMessage = {
      message: message,
      receiverId: receiverAccount.uuid,
      senderId: myAccount.uuid,
      sendedAt: Date.now(),
    };
    try {
      await addDoc(collection(db, "chatroom"), newMessage);
      console.log("message sent");
      setAllMessages([...allMessages, newMessage]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ScrollView ref={scrollViewRef} onContentSizeChange={scrollToBottom}>
        {allMessages.map((x) =>
          x.receiverId == myAccount?.uuid ? (
            <View
              key={x.sendedAt}
              style={{
                flexDirection: "row",
                // backgroundColor: "blue",
                marginLeft: width * 0.04,
                marginBottom: height * 0.02,
              }}
            >
              <Avatar.Image
                size={55}
                source={
                  receiverAccount?.avatar && { uri: receiverAccount?.avatar }
                }
                style={{
                  marginTop: height * 0.01,
                }}
              />
              <View
                style={{
                  marginTop: height * 0.02,
                  marginLeft: width * 0.06,
                  backgroundColor: "aliceblue",
                  padding: 10,
                  width: width * 0.6,
                  borderRadius: 10,
                }}
              >
                <Text>{x.message}</Text>
                <Text
                  style={{
                    fontSize: 10,
                    justifyContent: "flex-end",
                    alignSelf: "flex-end",
                    color: "gray",
                  }}
                >
                  {new Date(x.sendedAt).getHours()}:{" "}
                  {new Date(x.sendedAt).getMinutes() < 10
                    ? `0${new Date(x.sendedAt).getMinutes()}`
                    : new Date(x.sendedAt).getMinutes()}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row-reverse",
                marginLeft: width * 0.04,
                marginBottom: height * 0.02,
              }}
            >
              <Avatar.Image
                size={55}
                source={myAccount?.avatar && { uri: myAccount?.avatar }}
                style={{
                  marginTop: height * 0.01,
                }}
              />
              <View
                style={{
                  marginTop: height * 0.01,
                  marginRight: width * 0.06,
                  backgroundColor: "white",
                  // borderRadius: 20,
                  padding: 10,
                  // height: height * 0.1,
                  width: width * 0.6,
                  borderRadius: 12,
                }}
              >
                <Text>{x.message}</Text>
                <Text
                  style={{
                    fontSize: 10,
                    justifyContent: "flex-end",
                    alignSelf: "flex-end",
                    color: "gray",
                  }}
                >
                  {new Date(x.sendedAt).getHours()}:{" "}
                  {new Date(x.sendedAt).getMinutes() < 10
                    ? `0${new Date(x.sendedAt).getMinutes()}`
                    : new Date(x.sendedAt).getMinutes()}
                </Text>
              </View>
            </View>
          )
        )}
      </ScrollView>
      <View
        style={{
          backgroundColor: AppColors.pink,
          paddingTop: 10,
          flexDirection: "row",
        }}
      >
        <TextInput
          name="message"
          placeholder="Type a message"
          style={{
            width: width * 0.8,
            marginLeft: width * 0.04,
            padding: 12,
            borderRadius: 10,
            backgroundColor: "white",
            marginBottom: height * 0.01,
          }}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          onPress={() => {
            handleSendMessage(), setMessage("");
          }}
          disabled={!message}
        >
          <Image
            source={require("../../../assets/images/send.png")}
            style={{
              height: width * 0.06,
              width: width * 0.1,
              marginTop: height * 0.02,
              marginLeft: width * 0.02,
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default MessageView;
export const screenOptions = (navData) => {
  return {
    headerTitle: "MessageView",
    headerShown: true,
    headerTitleAlign: "center",
  };
};
