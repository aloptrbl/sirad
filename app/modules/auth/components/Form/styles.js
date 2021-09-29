import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },

    wrapper:{

    },

    errorText:{
        color: color.red,
        width: (windowWidth - 45),
        marginTop: 20,
        textAlign: 'center',
        alignSelf: 'center',
        paddingBottom: 30
    },

    containerView:{
        width: windowWidth,
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
        height: normalize(55),
        
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
    },

    forgotText:{
        textAlign:"center",
        color:color.black,
        marginBottom: padding,
        fontSize: fontSize.regular,
    }
});


export default styles;