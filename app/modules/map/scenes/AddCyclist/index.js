import React, { Fragment } from "react";

var {
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
  Dimensions,
  TouchableOpacity,
  Text,
} = require("react-native");
import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
  Callout,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Button, Card } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import { actions as auth, theme } from "../../../map/index";
import { database } from "../../../../config/firebase";
import { windowWidth } from "../../../../styles/theme";
const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const GOOGLE_MAPS_APIKEY = "AIzaSyDI20cL8GK4y7TqB1M806e4rzJ-gHxwoCI";
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const { signOut, toggleJoinEvent } = auth;
class AddCyclist extends React.Component {
  constructor(props) {
    super(props);
    this.trackmap = React.createRef();
    this.state = {
      events: null,
      location: null,
      latitude: null,
      longitude: null,
      errorMessage: null,
      bus: null,
      returnArr: [],
      eventArr: {},
    };
  }

  renderBicycleIcon = (item, size) => {

  };

  componentWillMount() {
    const { navigation } = this.props;
    const event_key = navigation.getParam("event_key", "0");
    const cyclistRef = database.ref("devices");
    //start listening for new data

    cyclistRef.on("value", (snapshot) => {
      var returnArr = [];
      if (snapshot.hasChildren()) {
        snapshot.forEach(function (childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          returnArr.push(item);
        });
        this.setState({
          returnArr: returnArr,
        });
      }
    });

    const eventRef = database.ref("events/" + event_key);
    //start listening for new data
    eventRef.on("value", (snapshot) => {
      let data = snapshot.val() ? snapshot.val() : {};
      let returnArr = { ...data };
      this.setState({
        eventArr: returnArr,
      });
    });
  }

  onSuccess(data) {
    // Alert.alert(JSON.stringify(data));
  }

  onError(error) {
    alert(error.message);
  }

  joinEvent(cyclist_id) {
    const { navigation } = this.props;
    const event_key = navigation.getParam("event_key", "0");
    this.props.toggleJoinEvent(event_key, cyclist_id);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.returnArr}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <View>
                  {item.bicycleIcon != null ? this.renderBicycleIcon(item.bicycleIcon?.value, 100) : null}
                </View>
                <View style={styles.cardbody}>
                  <Text style={styles.deviceID}>{item.deviceID}</Text>
                  <Text style={styles.bicycleName}>{item.bicycleName}</Text>
                  <Text style={styles.riderName}>{item.riderName}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  {this.state.eventArr?.participants != null ? (
                    Object.keys(this.state.eventArr.participants).includes(
                      item.key
                    ) ? (
                        <Button
                    title={"-"}
                    borderRadius={30}
                    buttonStyle={{ paddingHorizontal: 25, paddingVertical: 8, backgroundColor:'red' }}
                    style={{ flex: 1, alignSelf: "center" }}
                    onPress={() => this.joinEvent(item.key)}
                  />
                    ) : (
                        <Button
                    title={"+"}
                    borderRadius={30}
                    buttonStyle={{ paddingHorizontal: 25, paddingVertical: 8 }}
                    style={{ flex: 1, alignSelf: "center" }}
                    onPress={() => this.joinEvent(item.key)}
                  />
                    )
                  ) :  <Button
                    title={"+"}
                    borderRadius={30}
                    buttonStyle={{ paddingHorizontal: 25, paddingVertical: 8 }}
                    style={{ flex: 1, alignSelf: "center" }}
                    onPress={() => this.joinEvent(item.key)}
                  />}

                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  card: {
    flexDirection: "row",
    padding: 15,
  },
  cardbody: {
    flexDirection: "column",
    padding: 15,
  },
  deviceID: {
    fontWeight: "900",
    fontSize: 12,
  },
  riderName: {
    fontSize: 15,
  },
  bicycleName: {
    fontWeight: "600",
    fontSize: 16,
  },
});

export default connect(null, { signOut, toggleJoinEvent })(AddCyclist);
