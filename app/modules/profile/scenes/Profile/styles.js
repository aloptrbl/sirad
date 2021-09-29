import { StyleSheet } from 'react-native';
import { theme } from "../../index"
import { windowHeight } from '../../../../styles/theme';
const { padding, color, fontSize,  windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1
    },

    title: {
        paddingTop: 15,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: "600",
    color: "white",
    },

    homebg: {
        backgroundColor: "#454fac",
        height: windowHeight / 3,
        paddingTop: 70,
    },

    date: {
        color: "white",
        fontSize: 13,
        fontWeight: "400",
        paddingTop: 25
    },

    image:{
        height: 100,
        width: 100,
        resizeMode,
    },

    trophyimage: {
        height: 25,
        width: 25
    },

    miniicon: {
    padding: 15,
    backgroundColor: "#454fac",
    color: 'white', 
    alignSelf: 'flex-end',
    borderRadius: 50
    },

    headeritem: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 15
    },

    backgroundcardimage: {
        height: windowWidth / 4,
        width: "100%",
        resizeMode: "contain",
    },

    clickable: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: windowWidth - 15,
        backgroundColor: "white",
        marginTop: -45,
        alignSelf: 'center',
        borderRadius: 18,
    },

    card: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: windowWidth - 15,
        backgroundColor: "white",
        marginTop: -45,
        alignSelf: 'center',
        borderRadius: 18,
        padding: 25,
    },

    cardchild: {
        flex: 1,
    },

    cardtitle: {
        fontSize: 18,
        fontWeight: "600"
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },


    bcontainer: {
    paddingHorizontal: 35,
    backgroundColor: "#454fac",
    paddingVertical: 15
    }
});

export default styles;