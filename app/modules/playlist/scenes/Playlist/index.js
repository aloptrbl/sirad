import React from "react";

var {
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  SafeAreaView,
  FlatList,
} = require("react-native");
import { Button } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Audio, Video } from "expo-av";
import styles from "./styles";

import { actions as action } from "../../index";
import Slider from "@react-native-community/slider";
import { windowWidth } from "../../../../styles/theme";

const { getSurah } = action;

const renderSeparator = () => (
  <View
    style={{
      backgroundColor: "rgba(255,255,255,0.5)",
      height: 0.8,
    }}
  />
);

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surah: "",
      isPlaying: false,
      playbackInstance: null,
      currentIndex: 0,
      volume: 1.0,
      isBuffering: false,
      selectedSurah: 1,
      selectedSurahName: null,
      surahMM: "00:00"
    };
    this.onResult = this.onResult.bind(this);
    this.onError = this.onError.bind(this);
  }

  async componentDidMount() {
    this.props.getSurah(this.onResult);
    // try {
    //   await Audio.setAudioModeAsync({
    //     allowsRecordingIOS: false,
    //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //     playsInSilentModeIOS: true,
    //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    //     shouldDuckAndroid: true,
    //     staysActiveInBackground: true,
    //     playThroughEarpieceAndroid: true
    //   })

    //   this.loadAudio()
    // } catch (e) {                           
    //   console.log(e)
    // }
  }

   async getSurahh(no, name) {
     this.setState({
       "selectedSurah": no,
       "selectedSurahName": name,
     })
      const curr_no = String(no).padStart(3, '0');
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true
        })
  
        this.loadSurah(curr_no)
      } catch (e) {
        console.log(e)
      }
  }

  async loadAudio() {
    const {currentIndex, isPlaying, volume, playbackInstance} = this.state
    try {
      const playbackInstance = new Audio.Sound()
      const source = {
        uri: `https://download.quranicaudio.com/quran/abdullaah_3awwaad_al-juhaynee/001.mp3`
      }
  
      const status = {
        shouldPlay: isPlaying,
        volume
      }
  
      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);     
      await playbackInstance.loadAsync(source, status, false);
      this.setState({playbackInstance})
      } catch (e) {
        console.log(e)
      }
  }



  
  async loadSurah(no) {
    const {currentIndex, isPlaying, volume, playbackInstance} = this.state
    this.setState({
      isPlaying: true
    })
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
    }
    try {
      const playbackInstance = new Audio.Sound()
      const source = {
        uri: `https://download.quranicaudio.com/quran/abdullaah_3awwaad_al-juhaynee/${no}.mp3`
      }
  
      const status = {
        shouldPlay: isPlaying,
        volume
      }
  
      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);     
      await playbackInstance.loadAsync(source, status, false);
      this.setState({playbackInstance})
      await playbackInstance.playAsync()
      } catch (e) {
        console.log(e)
      }
  }


  
  onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state
  
      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
        this.setState({
        "surahMM": this.getTime(playbackStatus.durationMillis)
        })
    
      } else {
        // Update your UI for the paused state
      }
  
      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }
  
      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        this.setState({
          isPlaying: false
        })
      }
  
    }
  }

   getTime = (duration)=>{
    var milliseconds = parseInt((duration%1000)/100)
    var seconds = parseInt((duration/1000)%60)
    var minutes = parseInt((duration/(1000*60))%60)
    var hours = parseInt((duration/(1000*60*60))%24);
return hours + ":" + minutes + ":" + seconds;
}

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state
    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

    this.setState({
      isPlaying: !isPlaying
    })
  }

    handlePreviousTrack = async () => {
    let { playbackInstance, selectedSurah } = this.state
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      selectedSurah < selectedSurah.length - 1 ? (selectedSurah -= 1) : (selectedSurah = 0)
      var current_index = selectedSurah != 0 ? 1 : selectedSurah - 1
      
      // this.setState({
      //   selectedSurah: String(no).padStart(3, '0')
      // })
console.log(this.state.selectedSurah);
console.log(String(this.state.selectedSurah).padStart(3, '0'));
      this.loadSurah(String(this.state.selectedSurah).padStart(3, '0'));
    }
  }

  handleNextTrack = async () => {
    let { playbackInstance, selectedSurah } = this.state
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      currentIndex < audioBookPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
      this.setState({
        currentIndex
      })
      this.loadAudio()
    }
  }

  onResult(result) {
    this.setState({
      surah: result,
    });
  }

  onError(result) {}

  renderItem = ({ item }) => (
        <TouchableOpacity onPress={() =>  this.getSurahh(item.number, item.englishName)}>
    <View style={[styles.item,{"backgroundColor": this.state.selectedSurah === item.number ? "rgba(0,0,0,0.14)" : "transparent" }]} >
      <View style={styles.numbercontainer}>
        <Text style={styles.number}>{item.number}</Text>
      </View>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>{item.englishName}</Text>
        <Text style={styles.subtitle}>
          {item.englishNameTranslation} ({item.numberOfAyahs})
        </Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        { this.state.selectedSurah === item.number ?    <Button
              onPress={this.handlePlayPause}
                buttonStyle={{
                  backgroundColor: "#ff0f7b",
                  borderRadius: 20,
                }}
                containerStyle={{paddingRight:15}}
                icon={<Ionicons name={ this.state.isPlaying == false ? "md-play" : "md-pause"} size={10} color="white" />}
              /> : null}
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );



  render() {
    return (
      <ImageBackground
        style={styles.homebg}
        resizeMode="cover"
        source={require("../../../../assets/purplecurelean.jpeg")}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.formContent}>
            <View style={styles.inputContainer}>
              <Feather
                style={[styles.icon, styles.inputIcon]}
                name={"search"}
                size={25}
              />
              <TextInput
                style={styles.inputs}
                ref={"txtSurah"}
                placeholder="Search For Surrah"
                underlineColorAndroid="transparent"
                onChangeText={(name_address) => this.setState({ name_address })}
              />
            </View>
            <FlatList
              ListFooterComponent={renderSeparator}
              ListHeaderComponent={renderSeparator}
              ItemSeparatorComponent={renderSeparator}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.contentContainerList}
              data={this.state.surah}
              key={(item) => item.id}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
            />
            {/* <Text>{JSON.stringify(this.state.surah)}</Text> */}
          </View>

          <View style={styles.player}>
            <View style={styles.recitercontainer}>
              <View style={styles.reciter}>
                <Image
                  style={styles.reciterimage}
                  source={{
                    uri:
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Ahmad_bin_Ali_Al-Ajmi.png/220px-Ahmad_bin_Ali_Al-Ajmi.png",
                  }}
                />
              </View>
              <View style={styles.reciterdetail}>
                <Text style={styles.recitername}>Ahmed Al Ajmi</Text>
                <Text style={styles.surah}>{this.state.selectedSurahName ? this.state.selectedSurahName : null}</Text>
              </View>
            </View>
            <Slider
              style={{
                width: "90%",
                height: 40,
                marginHorizontal: 25,
                alignSelf: "center",
              }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="lightblue"
              maximumTrackTintColor="lightgray"
            />
            <View style={styles.timercontainer}>
              <Text style={styles.timertxt}>00:00:00</Text>
              <Text style={styles.timertxt}>{this.state.surahMM}</Text>
            </View>
            <View style={styles.controlcontainer}>
              <Button
               onPress={this.handlePreviousTrack}
                type="clear"
                icon={
                  <Ionicons name="md-play-skip-back" size={45} color="black" />
                }
              />
              <Button
              onPress={this.handlePlayPause}
                buttonStyle={{
                  backgroundColor: "#ff0f7b",
                  borderRadius: 50,
                  padding: 25,
                }}
                icon={<Ionicons name={ this.state.isPlaying == false ? "md-play" : "md-pause"} size={45} color="white" />}
              />
              <Button
               onPress={this.handleNextTrack}
                type="clear"
                icon={
                  <Ionicons
                    name="md-play-skip-forward"
                    size={45}
                    color="black"
                  />
                }
              />
            </View>
            <View style={styles.controltwocontainer}>
              <Button
                type="clear"
                icon={
                  <Ionicons name="ios-repeat" size={30} color="lightgray" />
                }
              />
              <Button
                type="clear"
                icon={
                  <Ionicons name="ios-shuffle" size={30} color="lightgray" />
                }
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps, { getSurah })(Playlist);
