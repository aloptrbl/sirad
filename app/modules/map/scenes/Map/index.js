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
const { signOut, getQuotes } = auth;
class Map extends React.Component {
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
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      locationResult: null,
      location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
    };
  }

  mapMarkers = () => {
    return this.state.returnArr.map((report) => (
      <Marker
        key={report.key}
        coordinate={{
          latitude: report?.from_coordinate?.latitude,
          longitude: report?.from_coordinate?.longitude,
        }}
      >
       
                <Callout tooltip  onPress={() => this.props.navigation.navigate('Event', {
            event_key: report.key,
          })}>
          <View style={styles.calloutcontainer}>
          <Text style={styles.calloutname}>{report?.name}</Text>
          <Text style={styles.calloutdescription}>{report?.description}</Text>
          <Button
        title={"Start"}
        borderRadius={30}
        style={{paddingVertical: 15}}
        containerStyle={styles.containerView}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
          </View>
        </Callout>
      </Marker>
    ));
  };

  mapMarkers2 = () => {
    return this.state.returnArr.map((report) => (
      <Marker
        key={report.key}
        coordinate={{
          latitude: report?.to_coordinate?.latitude,
          longitude: report?.to_coordinate?.longitude,
        }}
      >
        <MapView.Callout onPress={() => this.props.navigation.navigate('Event',{
            event_key: report.key,
          })}>
          <TouchableOpacity  style={styles.calloutcontainer}>
          <Text style={styles.calloutname}>{report?.name}</Text>
          <Text style={styles.calloutdescription}>{report?.description}</Text>
          <Button
        title={"Start"}
        borderRadius={30}
        style={{paddingVertical: 15}}
        containerStyle={styles.containerView}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
          </TouchableOpacity>
        </MapView.Callout>
      </Marker>
    ));
  };

  mapViewDirection = () => {
    return this.state.returnArr.map((report) => (
      <MapViewDirections
      key={report.key}
        origin={{
          latitude: report?.from_coordinate?.latitude,
          longitude: report?.from_coordinate?.longitude,
        }}
        destination={{
          latitude: report?.to_coordinate?.latitude,
          longitude: report?.to_coordinate?.longitude,
        }}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
      />
    ));
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!",
      });
    } else {
      this._getLocationAsync();
    }

    const eventRef = database.ref("events");
    //start listening for new data
    var returnArr = [];
    while (returnArr.length) {
      returnArr.pop();
    }
    eventRef.on("value", (snapshot) => {
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
  }

  onSuccess(data) {
    // Alert.alert(JSON.stringify(data));
  }

  onError(error) {
    alert(error.message);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    _handleMapRegionChange = (location) => {
      this.setState({ location });
    };

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    //   try {
    //     this.socket.send(JSON.stringify(location.coords)); //send data to the server
    // } catch (error) {
    //     console.log(error) // catch error
    // }
    this.trackmap?.current?.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      },
      1500
    );
    // setTimeout(this._getLocationAsync, 5000);
  };

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
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={this.state.region}
          ref={this.trackmap}
        >
          {this.mapMarkers()}
          {this.state.returnArr != null || undefined || ""
            ? this.mapMarkers2()
            : null}
          {this.mapViewDirection()}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  calloutcontainer: {
    flexDirection:'column', backgroundColor:'white',flex: 1, width: 250, borderRadius: 30,
    padding: 25
  },
  calloutname: {
    fontWeight: 'bold',
    fontSize: 16
  }, 
  calloutdescription: {
    fontSize: 12
  },
  content: {},
  contains: {
    position: "absolute",
  },
  activityIndicator: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  float: {
    position: "absolute",
    bottom: 0,
  },
  image: {
    width: screen.width - 50,
    height: 150,
  },
  card: {},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
});

export default connect(null, { signOut, getQuotes })(Map);
