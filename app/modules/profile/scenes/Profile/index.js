import React from 'react';

var {View, StyleSheet, Alert, Text, FlatList, Image, TouchableOpacity} = require('react-native');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import {actions as quote, theme} from "../../../profile/index"

const {getQuotes} = quote;

import {actions as auth} from "../../../auth/index"

const {signOut} = auth;
const image = "https://cdn4.iconfinder.com/data/icons/seo-web-blue-1/100/seo__web_blue_1_25-512.png";
const {color} = theme;

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {}

    }

    componentDidMount() {
        this.props.getQuotes((error) => alert(error.message))
    }

    onSignOut = () => {
        this.props.signOut()
            .then(() => Actions.reset("Auth"))
            .catch((error) => {
                Alert.alert('Oops!', error.message);
            })
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.homebg}>
            <View style={styles.headeritem}>
            <Image
                style={styles.image}
                source={require("../../../../assets/avatar.png")}
              />
              
            </View>
              <Text style={styles.title}>
                {this.props.user !== null && this.props.user?.name !== null
                  ? this.props.user?.name?.toUpperCase()
                  : null}
              </Text>
              <Button
                    borderRadius={4}
                    title={'LOG OUT'}
                    style={styles.bcontainer}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>
            </View>
          </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
   
    }
}

export default connect(mapStateToProps, {signOut, getQuotes})(Profile);