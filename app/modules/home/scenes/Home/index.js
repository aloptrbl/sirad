import React from "react";

var { View, StyleSheet, Alert, Image, Text, TouchableHighlight, TouchableOpacity } = require("react-native");
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import styles from "./styles";

import { actions as auth, theme } from "../../../auth/index";

const { signOut } = auth;

const { color } = theme;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      date:
        new Date().toLocaleString("default", { month: "long" }) +
        " " +
        new Date().getDate() +
        " " +
        new Date().getFullYear(),
    };
  }

  componentDidMount() {
    this.state.date = "sss";
  }

  onSignOut = () => {
    this.props
      .signOut()
      .then(() => Actions.reset("Auth"))
      .catch((error) => {
        Alert.alert("Oops!", error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
  
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps, { signOut })(Home);
