import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Colors from "../utilis/AppColors";
import { Avatar } from "react-native-paper";
import moment from "moment";
import { doc, db, updateDoc, arrayUnion } from "./../../src/utilis/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Post = (props) => {
  const pro = props;
  // console.log("pro", props.nav);
  const projectType = props.post.projectType;
  let blogContent = "";
  if (projectType == "article") {
    blogContent = props.post.article.articleContent;
    if (blogContent.length > 70) {
      blogContent = blogContent.substring(0, 70) + "  ...Read More";
    }
  }

  const likeNotLike = () => {
    const likeUnlike =
      pro.post.likesCount.filter((x) => x.associateId == props.myAccount)
        .length > 0
        ? true
        : false;
    return likeUnlike;
  };

  const [isPostLike, setIsPostLike] = useState(likeNotLike());

  const [postLikes, setPostLikes] = useState(props.post.likesCount.length);

  const handleLike = async () => {
    const likes = postLikes + 1;
    setIsPostLike(!isPostLike);
    setPostLikes(likes);

    try {
      const projectRef = doc(db, "projects", pro.post.id);
      const _newlike = {
        associateId: pro.myAccount,
        createdAt: Date.now(),
      };
      await updateDoc(projectRef, {
        likesCount: arrayUnion(_newlike),
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleUnlike = async () => {
    const likes = postLikes - 1;
    setIsPostLike(!isPostLike);
    setPostLikes(likes);
    try {
      const projectRef = doc(db, "projects", pro.post.id);
      const updatedArray = pro.post.likesCount.filter(
        (x) => x.associateId != pro.myAccount
      );
      await updateDoc(projectRef, {
        likesCount: updatedArray,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

 

  const postClick = () => {
    props.nav.navigate("PostInfo", {
      post: props.post,
      myAccount: props.myAccount,
      isPostLike: isPostLike,
      setIsPostLike: setIsPostLike,
      postLikes: postLikes,
      setPostLikes: setPostLikes,
    });
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.publisher_container}
        onPress={props.profileClick}
      >
        {props.post.account.avatar != "" ? (
          <Avatar.Image source={{ uri: props.post.account.avatar }} size={40} />
        ) : (
          <Avatar.Image
            source={require("../../assets/images/avatar.png")}
            size={40}
          />
        )}
        <View style={{ marginLeft: 10, marginTop: 6 }}>
          <Text style={styles.publisher_name}>
            {props.post.account.firstName} {props.post.account.lastName}
          </Text>
          <Text style={styles.publisher_date}>
            {moment(props.post.createdAt).format("MMM/DD/YYYY, hh:mm")}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={postClick}>
        <View style={styles.imageContainer}>
          {projectType == "article" ? (
            <Image
              style={{ resizeMode: "cover", width: "100%", height: 300 }}
              source={{ uri: props.post.article.articleMainImage }}
            />
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.footer}>
          {projectType == "article" ? (
            <View>
              <Text style={styles.articleTitle}>
                {props.post.article.articleTitle}
              </Text>
              <Text style={styles.articleContent}>{blogContent}</Text>
              <View
                style={{ width: "100%", flexDirection: "row", marginTop: 7 }}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color={Colors.pink}
                />
                <Text style={styles.socialCounter}>
                  {props.post.commentsCount.length}
                </Text>
                {isPostLike ? (
                  <MaterialIcons
                    onPress={handleUnlike}
                    name="favorite"
                    size={20}
                    color={Colors.pink}
                  />
                ) : (
                  <MaterialIcons
                    onPress={handleLike}
                    name="favorite-border"
                    size={20}
                    color={Colors.pink}
                  />
                )}

                <Text style={styles.socialCounter}>{postLikes}</Text>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  socialCounter: {
    fontFamily: "Raleway-Lightttf",
    fontSize: 15,
    marginHorizontal: 6,
    marginTop: 1,
  },
  articleContent: {
    fontFamily: "Raleway-Lightttf",
    fontSize: 13,
    marginVertical: 5,
  },
  articleTitle: {
    fontFamily: "Raleway-Boldttf",
    fontSize: 15,
  },
  publisher_date: {
    fontFamily: "Raleway-Lightttf",
    fontSize: 11,
  },
  publisher_name: {
    fontFamily: "Raleway-Mediumttf",
    fontSize: 13,
  },
  footer: {
    width: "100%",
    backgroundColor: Colors.white,
    padding: 16,
  },
  publisher_container: {
    width: "100%",
    backgroundColor: Colors.white,
    padding: 10,
    flexDirection: "row",
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  row: {
    width: "100%",
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
    padding: 5,
  },
});

export default Post;
