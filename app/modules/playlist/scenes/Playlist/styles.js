import { StyleSheet } from "react-native";
import { theme } from "../../index";
const {
  padding,
  color,
  fontSize,
  windowWidth,
  windowHeight,
  normalize,
} = theme;

const resizeMode = "contain";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  homebg: {
    width: "100%",
    height: "100%",
    flex: 1,
  },

  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderBottomWidth: 1,
    height: 55,
    flexDirection: "row",
    alignItems: "center",

    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  player: {
    backgroundColor: "white",
    flex: 1,
    width: windowWidth - 30,
    alignSelf: "center",
    height: "100%",
    marginHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 35,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  formContent: {
    flexDirection: "column",
    marginTop: 30,
    backgroundColor: "rgba(255,255,255,0.5)",
    height: windowHeight / 2,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  contentContainerList: {
    flexGrow: 1,
    paddingBottom: 5,
  },
  titlecontainer: {
    flex: 1,
    flexDirection: "column",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  numbercontainer: {
    justifyContent: "center",
    backgroundColor: "#ff0f7b",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 15,
  },
  number: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    color: "white",
    fontWeight: "400",
    fontSize: 12,
  },
  name: {
    color: "white",
    fontWeight: "900",
  },
  reciter: {
      alignItems:'center',
      justifyContent:'center',
      width: 70,
      height: 70,
      backgroundColor:'white',
      borderRadius:70,
      top: -20,
      left: 15
  },
  reciterimage: {
    width: 60,
    height: 60,
    borderRadius:50,
  },
  recitercontainer: {
      flexDirection: 'row',
  },
  reciterdetail: {
      flex:1,
      top: 10,
      left: 30
  },
  recitername: {
      fontWeight: 'bold'
  },
  surah: {
      fontWeight: '700',
      fontSize: 13,
      paddingTop: 4,
      color: 'purple'
  },
  controlcontainer: {
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'center'
  },
  controltwocontainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginHorizontal: 35,
    marginTop: -40
},
  timercontainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
      marginHorizontal: 25
  },
  timertxt: {
      fontSize: 12,
      fontWeight: '400',
      color:'lightgray'
  }
});

export default styles;
