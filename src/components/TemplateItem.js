import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../utilis/AppColors";
import Moment from "moment";

const TemplateItem = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <View style={styles.image_containmer}>
        <Image
          style={styles.image}
          source={{ uri: props.template.templateSource }}
        />
      </View>
      <View style={styles.info_container}>
        <Text style={styles.title}>{props.template.templateName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Raleway-Regularttf",
  },
  info_container: {
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "flex-start",
    marginTop: 7,
  },
  image: {
    width: 120,
    height: 120,
  },
  image_containmer: {
    width: "100%",
    height: 130,
    borderRadius: 12,
    backgroundColor: Colors.brown_bg,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 150,
    height: 170,
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginRight: 12,
  },
});

export default TemplateItem;
