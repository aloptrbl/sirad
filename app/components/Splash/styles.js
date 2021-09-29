import { StyleSheet } from 'react-native';

import { color, padding, fontSize } from "../../styles/theme"

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f7f7f7"
    },

    wrapper:{
        paddingHorizontal:15,
        paddingBottom: padding * 2,
        justifyContent:"center",
        alignItems:"center"
    },

    image:{
        height: 200,
        width: 200,
        marginBottom: padding,
        resizeMode
    },

    title: {
        fontSize:fontSize.large + 5,
        lineHeight:fontSize.large + 7,
        color: "#4267B2",
        letterSpacing: 1
    },

    activityIndicatorContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 16,
        height: 50
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});


export default styles;