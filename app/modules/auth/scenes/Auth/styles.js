import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.white
    },

    topContainer:{
        flex:1,
        paddingHorizontal:15,
        paddingBottom: padding * 2,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#f7f7f7",
    },

    image:{
        height: 200,
        width: 200,
        marginBottom: padding,
        resizeMode
    },

    title:{
        fontSize: fontSize.large + 2,
        lineHeight: fontSize.large + 4,
        color:color.black,
        fontWeight: "800",
        letterSpacing: 1
    },

    subText:{
        color: "#4267B2",
        fontSize: fontSize.large,
        lineHeight: fontSize.large + 10,
        marginVertical:padding * 2
    },

    //===============================

    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding * 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    buttonContainer:{
        justifyContent:"center",
        padding: 15

    },

    containerView:{
        width: windowWidth - 40,
        padding: 15
    },

    socialButton:{
        height: normalize(55),
        borderRadius:4,
        marginTop:0,
        marginBottom:0
    },

    button:{
        backgroundColor: "#4267B2",
        height: normalize(55)
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
    },

    bottom:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: padding * 2
    },

    bottomText:{
        fontSize: fontSize.regular,
        marginRight: 5,
        color: "#414141"
    },

    signInText:{
        fontSize: fontSize.regular,
        color: "#4267B2",
    },

    orContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: 40,
        width: windowWidth
    },

    divider:{
        backgroundColor: '#D0D5DA',
        position:"absolute",
        top:19,
        left: 20,
        right: 20
    },

    orText:{
        backgroundColor: color.white,
        fontSize: fontSize.regular,
        color: "#414141",
        paddingHorizontal: padding
    }
});

export default styles;