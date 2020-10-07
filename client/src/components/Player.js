import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import Sound from "react-native-sound";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  speaker: {
    width: 150,
    height: 150,
    marginBottom: 15,
    alignSelf: "center",
  },
  prev: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  img: {
    width: 30,
    height: 30,
  },
  text: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 1,
    color: "white",
    fontSize: 12,
  },
  sliderContainer: {
    marginVertical: 15,
    marginHorizontal: 15,
    flexDirection: "row",
  },
  currentTime: {
    color: "white",
    alignSelf: "center",
  },
  slider: {
    flex: 1,
    alignSelf: "center",
    marginHorizontal: Platform.select({ ios: 5 }),
  },
  sliderText: {
    color: "white",
    alignSelf: "center",
  },
});

const imgSpeaker = require("../../resources/ui_speaker.png");
const imgPause = require("../../resources/ui_pause.png");
const imgPlay = require("../../resources/ui_play.png");
const imgPlayJumpLeft = require("../../resources/ui_playjumpleft.png");
const imgPlayJumpRight = require("../../resources/ui_playjumpright.png");

const Player = ({ route, navigation }) => {
  const { pathUrl } = route.params;
  const [play, setPlay] = useState("playing");
  const [playSecond, setPlaySeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const sliderEditing = useRef(null);
  const sound = useRef(null);
  const timeout = useRef(null);

  useEffect(() => {
    startPlay();
    timeout.current = setInterval(() => {
      if (
        sound.current &&
        sound.current.isLoaded() &&
        play === "playing" &&
        !sliderEditing.current
      ) {
        sound.current.getCurrentTime((seconds, isPlaying) => {
          setPlaySeconds(seconds);
        });
      }
    }, 100);
    return () => {
      if (sound.current) {
        sound.current.release();
        sound.current = null;
      }
      if (timeout.current) {
        clearInterval(timeout.current);
      }
    };
  }, []);

  const onSliderEditStart = () => {
    sliderEditing.current = true;
  };

  const onSliderEditEnd = () => {
    sliderEditing.current = false;
  };

  const onSliderEditing = (value) => {
    if (sound.current) {
      sound.current.setCurrentTime(value);
      setPlaySeconds(value);
    }
  };

  const startPlay = async () => {
    if (sound.current) {
      sound.current.play(playComplete());
      setPlay("playing");
    } else {
      const filePath = pathUrl;
      sound.current = new Sound(filePath, "", (error) => {
        if (error) {
          console.log("fail ", error);
          Alert.alert("Notice", "audio file error. (Error code: 1)");
          setPlay("paused");
        } else {
          setPlay("playing");
          setDuration(sound.current.getDuration());
          sound.current.play(playComplete());
        }
      });
    }
  };

  const playComplete = (success) => {
    if (sound.current) {
      if (success) {
        setPlay("paused");
      }
      setPlaySeconds(0);
      sound.current.setCurrentTime(0);
    }
  };

  const pause = () => {
    if (sound.current) {
      sound.current.pause();
    }
    setPlay("paused");
  };

  const jumpSeconds = (seconds) => {
    if (sound.current) {
      sound.current.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + seconds;
        if (nextSecs < 0) {
          nextSecs = 0;
        } else if (nextSecs > duration) {
          nextSecs = duration;
        }
        sound.current.setCurrentTime(nextSecs);
        setPlaySeconds(nextSecs);
      });
    }
  };

  const getAudioTimeString = (seconds) => {
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt((seconds % (60 * 60)) / 60);
    const s = parseInt(seconds % 60);
    return (
      (h < 10 ? "0" + h : h) +
      ":" +
      (m < 10 ? "0" + m : m) +
      ":" +
      (s < 10 ? "0" + s : s)
    );
  };

  return (
    <View style={styles.container}>
      <Image source={imgSpeaker} style={styles.speaker} />
      <View style={styles.prev}>
        <TouchableOpacity
          onPress={() => jumpSeconds(-15)}
          style={{ justifyContent: "center" }}
        >
          <Image source={imgPlayJumpLeft} style={styles.img} />
          <Text style={styles.text}>15</Text>
        </TouchableOpacity>
        {play === "playing" && (
          <TouchableOpacity
            onPress={() => pause()}
            style={{ marginHorizontal: 20 }}
          >
            <Image source={imgPause} style={styles.img} />
          </TouchableOpacity>
        )}
        {play === "paused" && (
          <TouchableOpacity
            onPress={() => startPlay()}
            style={{ marginHorizontal: 20 }}
          >
            <Image source={imgPlay} style={styles.img} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => jumpSeconds(15)}
          style={{ justifyContent: "center" }}
        >
          <Image source={imgPlayJumpRight} style={styles.img} />
          <Text style={styles.text}>15</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.currentTime}>{getAudioTimeString(playSecond)}</Text>
        <Slider
          onTouchStart={onSliderEditStart}
          onTouchEnd={onSliderEditEnd}
          onValueChange={onSliderEditing}
          value={playSecond}
          maximumValue={duration}
          maximumTrackTintColor="gray"
          minimumTrackTintColor="white"
          thumbTintColor="white"
          style={styles.slider}
        />
        <Text style={styles.sliderText}>{getAudioTimeString(duration)}</Text>
      </View>
    </View>
  );
};

export default Player;
