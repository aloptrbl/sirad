import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import {
  Scene,
  Router,
  ActionConst,
  Actions,
  Stack,
  Modal,
  Tabs,
} from "react-native-router-flux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Header, Input, CheckBox } from "react-native-elements";
//Splash Component
import Splash from "../components/Splash/Splash";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
//Authentication Scenes
import Welcome from "../modules/auth/scenes/Auth/Welcome";
import Register from "../modules/auth/scenes/Auth/Register";
import CompleteProfile from "../modules/auth/scenes/Auth/CompleteProfile";
import Login from "../modules/auth/scenes/Auth/Login";
import ForgotPassword from "../modules/auth/scenes/Auth/ForgotPassword";
import Home from "../modules/home/scenes/Home";
import Playlist from "../modules/playlist/scenes/Playlist";
import AlQuran from "../modules/map/scenes/Map";
import Prayers from "../modules/map/scenes/Map";
import Settings from "../modules/map/scenes/Map";
import Qiblah from "../modules/map/scenes/Map";
import Map from "../modules/map/scenes/Map";
import Profile from "../modules/profile/scenes/Profile";
//Import Store, actions
import store from "../redux/store";
import { checkLoginStatus } from "../modules/auth/actions";

import { color, navTitleStyle } from "../styles/theme";

// Simple component to render something in place of icon
const TabIcon = ({ focused, tintColor, title }) => {
  if (title === "Home") {
    const iconName = `ios-home${focused ? "" : ""}`;
    return (
      <Ionicons
        name={iconName}
        size={25}
        style={{ color: focused ? "#4267B2" : "black" }}
      />
    );
  } else if (title === "All Event") {
    const iconName = `location-pin${focused ? "" : ""}`;
    return (
      <SimpleLineIcons
        name={iconName}
        size={25}
        style={{ color: focused ? "#4267B2" : "black" }}
      />
    );
  } else if (title === "Profile") {
    const iconName = `ios-person${focused ? "" : ""}`;
    return (
      <Ionicons
        name={iconName}
        size={25}
        style={{ color: focused ? "#4267B2" : "black" }}
      />
    );
  }
};

const UnAuthTabIcon = ({ focused, tintColor, title }) => {
  if (title === "Playlist") {
    const iconName = `list${focused ? "" : ""}`;
    return (
      <Feather
        name={iconName}
        size={25}
        style={{ color: focused ? "white" : "white" }}
      />
    );
  } else if (title === "AlQuran") {
    const iconName = `book-open${focused ? "" : ""}`;
    return (
      <Feather
        name={iconName}
        size={25}
        style={{ color: focused ? "white" : "white" }}
      />
    );
  } else if (title === "Prayers") {
    const iconName = `ios-person${focused ? "" : ""}`;
    return (
      <Image
      source={require("../assets/mosque.png")}
      style={{ width: 30, height: 30, resizeMode: "contain", tintColor: focused ? "white" : "white" }}
    />
    );
   } else if (title === "Settings") {
    const iconName = `settings${focused ? "" : ""}`;
    return (
      <Feather
        name={iconName}
        size={25}
        style={{ color: focused ? "white" : "white" }}
      />
    );
  }  else if (title === "Qiblah") {
    const iconName = `settings${focused ? "" : ""}`;
    return (
      <Image
      source={require("../assets/kaaba.png")}
      style={{ width: 30, height: 30, resizeMode: "contain", tintColor: "white" }}
    />
    );
  }
};

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isLoggedIn: false,
      exist: false, //indicates if user exist in realtime database
    };
  }

  componentDidMount() {
    let _this = this;
    store.dispatch(
      checkLoginStatus((exist, isLoggedIn) => {
        _this.setState({ isReady: true, exist, isLoggedIn });
      })
    );
  }

//   InboxIcon = () => {
//     return (
//         <View>
//             <Button title={  <MaterialCommunityIcons
//                   name={"plus"}
//                   size={20}
//                   onPress={()=> Actions.AddCyclist()}
//                   style={{ color: "white" }}
//                 />} borderRadius={30} />
//         </View>
//     );
// };

  render() {
    if (!this.state.isReady) return <Splash />;

    return (
      <Router>
        <Scene
          key="root"
          hideNavBar
          navigationBarStyle={{ backgroundColor: "#a29bfe" }}
          titleStyle={navTitleStyle}
          activeBackgroundColor={"rgba(60, 60, 60, 0.5)"}
          backButtonTintColor={color.black}
        >
          <Stack key="Auth" initial={!this.state.isLoggedIn}>
          <Scene
              hideNavBar
              tabBarPosition="bottom"
              key="tabbar"
              showLabel={true}
              activeTintColor={"white"}
              inactiveTintColor={"white"}
              
              animationEnabled={true}
              tabs={true}
              tabBarStyle={{ backgroundColor: "#8c7ae6" }}
            >
              {/* Tab and it's scenes */}
              <Scene key="Playlist" title="Playlist" hideNavBar icon={UnAuthTabIcon}>
                <Stack key="root">
                  <Scene
                    key="Home"
                    hideNavBar
                    component={Playlist}
                    type={ActionConst.REPLACE}
                    title="Home"
                  />
                </Stack>
              </Scene>

              <Scene key="AlQuran" title="AlQuran" icon={UnAuthTabIcon}>
                <Stack key="root">
                  <Scene
                    key="AlQuran"
                    hideNavBar
                    component={AlQuran}
                    type={ActionConst.REPLACE}
                    title="AlQuran"
                  />
                 
                </Stack>
              </Scene>

              <Scene key="Prayers" title="Prayers" icon={UnAuthTabIcon}>
                <Stack key="root">
                  <Scene
                    key="Prayers"
                    hideNavBar
                    component={Prayers}
                    type={ActionConst.REPLACE}
                    title="AlQuran"
                  />
                 
                </Stack>
              </Scene>
              <Scene key="Qiblah" title="Qiblah" icon={UnAuthTabIcon}>
                <Stack key="root">
                  <Scene
                    key="Qiblah"
                    hideNavBar
                    component={Qiblah}
                    type={ActionConst.REPLACE}
                    title="Qiblah"
                  />
                 
                </Stack>
              </Scene>

              <Scene key="Settings" hideNavBar title="Settings" icon={UnAuthTabIcon}>
                <Stack key="root">
                  <Scene
                    key="Settings"
                    hideNavBar
                    component={Settings}
                    type={ActionConst.REPLACE}
                    title="Settings"
                  />
                </Stack>
              </Scene>
            </Scene>
          </Stack>

          <Stack key="Main" initial={this.state.isLoggedIn}>
            <Scene
              hideNavBar
              tabBarPosition="bottom"
              key="tabbar"
              showLabel={false}
              animationEnabled={false}
              tabs={true}
              tabBarStyle={{ backgroundColor: "white" }}
            >
              {/* Tab and it's scenes */}
              <Scene key="Home" title="Home" hideNavBar icon={TabIcon}>
                <Stack key="root">
                  <Scene
                    key="Home"
                    hideNavBar
                    component={Home}
                    type={ActionConst.REPLACE}
                    title="Home"
                  />
                </Stack>
              </Scene>

              <Scene key="Map" title="All Event" icon={TabIcon}>
                <Stack key="root">
                  <Scene
                    key="Map"
                    hideNavBar
                    component={Map}
                    type={ActionConst.REPLACE}
                    title="Map"
                  />
                 
                </Stack>
              </Scene>

              <Scene key="Profile" hideNavBar title="Profile" icon={TabIcon}>
                <Stack key="root">
                  <Scene
                    key="Profile"
                    hideNavBar
                    component={Profile}
                    type={ActionConst.REPLACE}
                    title="Profile"
                  />
                </Stack>
              </Scene>
            </Scene>

          </Stack>
        </Scene>
      </Router>
    );
  }
}
