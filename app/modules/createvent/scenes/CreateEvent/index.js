import React, {useState, useEffect} from "react";
var {
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} = require("react-native");
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import * as Permissions from 'expo-permissions';
import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
} from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Header, Input, CheckBox } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import styles from "./styles";
import { actions as auth, theme } from "../../index";
const {createEvent} = auth;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDI20cL8GK4y7TqB1M806e4rzJ-gHxwoCI';
const { color } = theme;
const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 4.2780193910079065;
const LONGITUDE = 102.07392313823713;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


function CreateEvent(props) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fromLocation, setfromLocation] = useState("");
  const [toLocation, settoLocation] = useState("");
  const trackmap = React.useRef(null);

  const onSubmit = () => {
    const from_location = {};
    from_location["latitude"] = props.from_location[0]?.coordinate?.latitude;
    from_location["longitude"] = props.from_location[0]?.coordinate?.longitude;

    const to_location = {};
    to_location["latitude"] = props.to_location[0]?.coordinate?.latitude;
    to_location["longitude"] = props.to_location[0]?.coordinate?.longitude;
  props.createEvent(eventName, eventDescription, from_location, to_location)
  .then(({}) => {
    Alert.alert("You have successfully create new track.");
    Actions.pop();
})
.catch()
  }

  useEffect(() => {
    _getLocationAsync();
    const didBlurSubscription = props.navigation.addListener(
      'didFocus',() => {
        console.log("willfocus");
        // const from_latitude = props.from_location[0]?.coordinate?.latitude;
        // const from_longitude = props.from_location[0]?.coordinate?.longitude;
        // const to_latitude = props.to_location[0]?.coordinate?.latitude;
        // const to_longitude = props.to_location[0]?.coordinate?.longitude;

if(trackmap != null)
{
        trackmap?.current?.animateToRegion({
          latitude: props.from_location[0]?.coordinate?.latitude,
          longitude: props.from_location[0]?.coordinate?.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        
        }, 1500);
      }
      
    
       }
    );

    return () => didBlurSubscription
  },[])

  const animateMap = () => {

  }


  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert("Permission to access location was denied");
    }
    else
    {
   
    }

    let location = await Location.getCurrentPositionAsync({});
  
    setLocation(location);
    setTimeout(_getLocationAsync, 5000);
    }


  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 25,
        height: "100%",
      }}
    >
      <Text style={styles.title}>Track Detail</Text>
      <View>
      <TouchableOpacity onPress={() =>  props.navigation.navigate('LocationPicker')}>
        <Text style={styles.label}>Location</Text>
        <View style={styles.trackcontainer}>
          <View style={styles.track}>
            <Text style={styles.label}>From</Text>
            <Input
            value={props.from_location[0]?.coordinate != null ? props.from_location[0]?.coordinate?.latitude.toString() + "," + props.from_location[0]?.coordinate?.longitude.toString() : ""}
              autoCapitalize="none"
              onChangeText={(text) =>setfromLocation(text)}
              clearButtonMode="while-editing"
              underlineColorAndroid={"#fff"}
              disabled={true}
              autoFocus={false}
              inputStyle={styles.inputContainer}
            />
          </View>
          <View style={styles.track}>
            <Text style={styles.label}>To</Text>
            <Input
            value={props.from_location[0]?.coordinate != null ? props.to_location[0]?.coordinate?.latitude.toString() + "," + props.to_location[0]?.coordinate?.longitude.toString() : ""}
              autoCapitalize="none"
              onChangeText={(text) =>settoLocation(text)}
              clearButtonMode="while-editing"
              underlineColorAndroid={"#fff"}
              disabled={true}
              autoFocus={false}
              inputStyle={styles.inputContainer}
            />
          </View>
          <View></View>
        </View>
        </TouchableOpacity>
        <View style={styles.inputxContainer}>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          onChangeText={(text) =>setEventName(text)}
          underlineColorAndroid={"#fff"}
          label={"Event Name"}
          autoFocus={false}
          
          inputStyle={styles.inputContainer}
        /></View>
<View style={styles.inputxContainer}>
<Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          onChangeText={(text) =>setEventDescription(text)}
          underlineColorAndroid={"#fff"}
          label={"Event Description"}
          autoFocus={false}
          inputStyle={styles.inputContainer}
        />
        </View>

      </View>
      <View>
        
      </View>
      <Button
        title={"Create"}
        onPress={()=> onSubmit()}
        borderRadius={30}
        containerStyle={styles.containerView}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );

  const sheetRef = React.useRef(null);


  return (
    <View style={styles.container}>
      <View style={styles.homebg}>
        <MapView
        ref={trackmap}
          style={styles.map}
          maxZoomLevel={20}
          showsUserLocation={true}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
        { props.from_location[0]?.coordinate != null ?
    <MapViewDirections
    origin={props.from_location[0]?.coordinate}
    destination={props.to_location[0]?.coordinate}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor="hotpink"
  /> : null
        }
        {
            props.from_location[0]?.coordinate != null ?
            <Marker
              key={"from"}
              coordinate={props.from_location[0]?.coordinate}
            >
            </Marker>
            
          : null
          }
          {
            props.to_location[0]?.coordinate != null ?
            <Marker
              key={"to"}
              coordinate={props.to_location[0]?.coordinate}
            >
            </Marker>
            : null
          }
        </MapView>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["80%", "60%", "60%"]}
        initialSnap={1}
        borderRadius={35}
        renderContent={renderContent}
      />
    </View>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.authReducer.user,
    from_location: state.locationpickerReducer.from_location,
    to_location: state.locationpickerReducer.to_location,
  };
}

export default connect(mapStateToProps, {createEvent})(CreateEvent);
