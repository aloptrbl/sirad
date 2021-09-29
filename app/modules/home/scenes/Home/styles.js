import { StyleSheet } from 'react-native';
import { windowHeight } from '../../../../styles/theme';
import { theme } from "../../index"
const { padding, color, fontSize,  windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1
    },

    title: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    },

    homebg: {
        backgroundColor: "#454fac",
        height: windowHeight / 3,
        paddingTop: 70,
        paddingLeft: 15
    },

    date: {
        color: "white",
        fontSize: 13,
        fontWeight: "400",
        paddingTop: 25
    },

    image:{
        height: 60,
        width: 60,
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
        justifyContent: 'space-between',
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
        borderColor: 'rgba(0,0,0,0.51)',
        borderWidth: 1
    },

    cards: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: windowWidth - 15,
        backgroundColor: "white",
        marginTop: 15,
        alignSelf: 'center',
        borderRadius: 18,
        padding: 25,
        borderColor: 'rgba(0,0,0,0.51)',
        borderWidth: 1
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
    }
});

export default styles;