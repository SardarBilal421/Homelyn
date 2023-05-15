import { StyleSheet } from "react-native";
import Colors from "./AppColors";

export default StyleSheet.create({



  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },

  container: {
    backgroundColor: Colors.background,
    padding: 20,
    flex: 1,
  },

  
  profile_container: {
    paddingBottom: 20,
    borderBottomColor: Colors.line,
    borderBottomWidth: 0.6,
    flexDirection: "row",
  },
  avatar_container: {
    width: "20%",
  },
  profile_name: {
    width: "80%",
  },
  displayName: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.pink,
    fontSize: 20,
    marginTop: 5,
  },
  avatar_text: {
    fontFamily: "Raleway-Regularttf",
    fontSize: 13,
  },
  menu_blue_btn_text: {
    fontFamily: "Raleway-Mediumttf",
    fontSize: 15,
  },
  main_title_container: {
    paddingVertical: 10,
  },
  sub_title_container: {
    paddingVertical: 2,
  },
  sub_title_container_community: {
    paddingVertical: 2,
    marginTop: 12,
  },
  main_title: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.gray,
    fontSize: 26,
    marginTop: 5,
  },
  name_title: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.pink,
    fontSize: 23,
    lineHeight: 23,
    marginTop: 10,
  },
  name_level: {
    fontFamily: "Raleway-Mediumttf",
    color: Colors.gray,
    fontSize: 13,
    lineHeight: 13,
    marginTop: 0,
  },
  sub_main_title: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.pink,
    fontSize: 20,
    marginTop: 5,
  },
  menu_blue_btn: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.light_blue,
    flexDirection: "row",
    marginTop: 8,
  },
  menu_white_btn: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: "row",
    marginTop: 8,
  },

  button_pink: {
    width: "100%",
    fontSize: 18,
    borderRadius: 30,
    paddingVertical:16,
    backgroundColor: "#D8315B",
    marginBottom: 10,
    alignItems: "center",
  },

  button_pink_text: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.white,
    fontSize: 24,
  },


  button_pink_line: {
    width: "100%",
    fontSize: 18,
    borderRadius: 30,
    backgroundColor: Colors.background,
    borderColor:Colors.pink,
    borderWidth:2,
    marginBottom: 10,
    alignItems: "center",
  },
  button_pink_line_text: {
    fontFamily: "BebasNeue-Regularttf",
    marginVertical: 12,
    color: Colors.pink,
    fontSize: 24,
  },


  social_title: {
    fontFamily: "BebasNeue-Regularttf",
    fontSize: 22,
    letterSpacing: -0.5,
    marginBottom:10,
    marginTop:30,
    color: Colors.pink,
  },



  avatar_container_sub: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
  },

  avatar_container_sub_edit: {
    height: 230,
    backgroundColor: Colors.white,
    width: "100%",
    paddingTop: 20,
    alignItems: "center",
  },

  container_nopadding: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  summery_container: {
    backgroundColor: Colors.background,
    paddingTop: 4,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  summery_row: { flexDirection: "row", justifyContent: "space-between" },
  row_item: {
    height: 60,
    borderLeftWidth: 0.4,
    marginTop: 16,
    borderLeftColor: Colors.pink,
    width: "30%",
    paddingLeft: 10,
  },
  item_desc: {
    fontFamily: "Raleway-Regularttf",
    fontSize: 12,
  },
  upload_text: {
    fontFamily: "Raleway-Regularttf",
    fontSize: 11,
    marginTop: 6,
  },
  item_title: {
    fontFamily: "BebasNeue-Regularttf",
    fontSize: 30,
    letterSpacing: -1,
    color: Colors.gray,
  },

  input: {
    width: "100%",
    backgroundColor: Colors.white,
    marginTop: 12,
    borderRadius: 10,
    padding: 20,
    fontFamily: "Raleway-Regularttf",
    shadowColor: "black",
    shadowOpacity: 0.1,
    fontSize: 16,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },

  image_container:{
    width: "100%",
    backgroundColor: Colors.white,
    marginBottom: 12,
    borderRadius: 30,
    padding: 20,
    alignItems:'center',
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },





  business_logo_container:{
    width: "100%",
    backgroundColor: Colors.white,
    marginVertical: 12,
    borderRadius: 30,
    padding: 20,
    alignItems:'center',
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },





  inputfree: {
    width: "100%",
    backgroundColor: Colors.white,
    marginTop: 12,
    borderRadius: 10,
    height: 150,
    padding: 20,
    fontFamily: "Raleway-Regularttf",
    shadowColor: "black",
    shadowOpacity: 0.1,
    fontSize: 16,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },





  inputfreesmall: {
    width: "100%",
    backgroundColor: Colors.white,
    marginBottom: 12,
    borderRadius: 15,
    height: 140,
    padding: 20,
    fontFamily: "Raleway-Regularttf",
    shadowColor: "black",
    shadowOpacity: 0.1,
    fontSize: 14,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },





  category_row: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection:'row',
    borderBottomColor: Colors.gray_1,
    borderBottomWidth: 0.2,
  },



  input: {
    width: "100%",
    backgroundColor: Colors.white,
    marginTop: 12,
    borderRadius: 10,
    padding: 20,
    fontFamily: "Raleway-Regularttf",
    shadowColor: "black",
    shadowOpacity: 0.1,
    fontSize: 16,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },


  input_btn: {
    width: "100%",
    backgroundColor: Colors.white,
    marginTop: 12,
    borderRadius: 10,
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },

  check_container: {
    width: "100%",
    backgroundColor: Colors.white,
    marginVertical: 12,
    borderRadius: 30,
    padding: 20,
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },


  switchText: {
    fontFamily: "Raleway-Lightttf",
    fontSize: 16,
    color: Colors.gray,
    marginTop: 6
  },




  input_view: {
    width: "100%",
    backgroundColor: Colors.white,
    marginBottom: 12,
    borderRadius: 30,
    flexDirection: "row",
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },

  inputTextPlace: {
    fontFamily: "Raleway-Regularttf",
    fontSize: 16,
    color: Colors.gray_1,
  },
  selectListText: {
    fontFamily: "Raleway-Lightttf",
    fontSize: 15,
    color: Colors.gray, marginTop:6, marginLeft:10
  },







  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.black
  },
  modalView: {
    width: "90%",
    height:'70%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.light_blue,
    fontFamily: "BebasNeue-Regularttf",
    paddingHorizontal:30
  },
  textStyle: {
    color: Colors.gray,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 26,
    textAlign: "center",
    fontSize:30,
    fontFamily: "BebasNeue-Regularttf",
    color:Colors.pink
  },



  level_container:{
      width:'100%',
      flexDirection:'row',
      paddingVertical:5,
      marginBottom:0
  },
  level_icon_container:{
      width:60, height:60, marginRight:12
  },
  level_name:{
    fontFamily: "Raleway-Boldttf",
    fontSize:16, marginTop:10
  },
  level_name_points:{
    fontFamily: "Raleway-Regularttf",
    fontSize:14
  },



  container_main: {
    backgroundColor: Colors.background,
    flex: 1,
  },

  overview_header: {
    height: "10%",
    backgroundColor: Colors.white,
  },
  overview_create: {
    height: "60%",
    backgroundColor: Colors.light_blue,
  },
  overview_inspired: {
    height: "30%",
    backgroundColor: Colors.gray,
  },



  container: {
    backgroundColor: Colors.background,
    padding: 20,
    flex: 1,
  },
  spaces_title: {
    fontFamily: "BebasNeue-Regularttf",
    fontSize: 30,
    letterSpacing: -0.5,
    color: Colors.pink,
  },
  spaces_title_gray: {
    fontFamily: "BebasNeue-Regularttf",
    fontSize: 30,
    letterSpacing: -0.5,
    color: Colors.gray,
  },



  spaces_titlesub: {
    fontFamily: "BebasNeue-Regularttf",
    fontSize: 22,
    letterSpacing: -0.5,
    color: Colors.pink, flex:1
  },
  spaces_title_graysub: {
    fontFamily: "BebasNeue-Regularttf",
    fontSize: 22,
    letterSpacing: -0.5,
    color: Colors.gray,
  },



  spaces_container: {
    width: "100%",
    marginBottom: 20, marginTop:10
  },
  circle_pink_btn: {
    width: 35,
    height: 35,
    backgroundColor: Colors.pink,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
  },
  modalView: {
    width: "90%",
    height: "70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.light_blue,
    fontFamily: "BebasNeue-Regularttf",
    paddingHorizontal: 30,
  },
  textStyle: {
    color: Colors.gray,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 26,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.pink,
  },
  category_row: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    borderBottomColor: Colors.gray_1,
    borderBottomWidth: 0.2,
  },


  switchText: {
    fontFamily: "Raleway-Lightttf",
    fontSize: 16,
    color: Colors.gray,
    marginTop: 6,
  },


  button_text_white: {
    fontSize: 28,
    color: Colors.white,
    fontFamily: "BebasNeue-Regularttf",
  },

  input_view: {
    width: "100%",
    backgroundColor: Colors.white,
    marginBottom: 12,
    borderRadius: 30,
    flexDirection: "row",
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
    elevation: 5,
  },

  inputTextPlace: {
    fontFamily: "Raleway-Regularttf",
    fontSize: 16,
    color: Colors.gray_1,
  },
  selectListText: {
    fontFamily: "Raleway-Lightttf",
    fontSize: 15,
    color: Colors.gray,
    marginTop: 6,
    marginLeft: 10,
  },
});
