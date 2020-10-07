import React, { useState, useContext, useEffect } from "react";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import { Context as AuthContext } from "../context/AuthContext";
import {
  saveUserInfoService,
  getUserInfoService,
  saveUserPasswordService,
  saveUserEmailService,
} from "../service/userService";
import {
  View,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
} from "react-native";


const Settings = () => {
  const [user, setUser] = useState({});
  const [displayDeezerBtn, setDisplayDeezerBtn] = useState(true);
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [mood, setMood] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [musicPreferences, setMusicPreferences] = useState("");
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
  const {
    state: { token, deezerToken }, state, oauth2deezer, logoutDeezer
  } = useContext(AuthContext);

  // Handle deezer oauth2
  const handleOpenURLDeezer = ({ url }) => {
    if (url.indexOf("&userId=") === -1) {
      let deezerToken = url.substring(url.indexOf("?deezerToken=") + 13, url.length);
      setDisplayDeezerBtn(false)
      oauth2deezer(state, deezerToken);  
    }
  }


  const fetchUserInfo = async () => {
    try {
      const tokeninfo = JSON.parse(await AsyncStorage.getItem("userInfo"));
      const response = await getUserInfoService(token, tokeninfo.userId);
      const {
        age,
        city,
        status,
        email,
        firstname,
        lastname,
        musicStyle,
      } = response.user;
      setAge(age);
      setCity(city);
      setMood(status);
      setEmail(email);
      setLastName(lastname);
      setFirstName(firstname);
      setMusicPreferences(musicStyle);
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserInfo = async () => {
    let data = {
      status: mood,
      city,
      age,
      musicStyle: musicPreferences,
      firstname,
      lastname,
    };
    if (
      !mood ||
      !city ||
      !age ||
      !musicPreferences ||
      !firstname ||
      !lastname
    ) {
      Alert.alert("Incomplete data");
      return;
    }
    saveUserInfoService(data, token);
  };

  const saveUserEmail = async () => {
    if (!email.trim()) {
      Alert.alert("Email field can't be empty");
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email");
      return;
    }
    saveUserEmailService(email, token);
  };

  const saveUserPassword = async () => {
    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert("Password field can't be empty");
      return;
    }
    if (!passwordRegex.test(password) || !passwordRegex.test(confirmPassword)) {
      Alert.alert("Invalid password");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password must be the same");
      return;
    }
    saveUserPasswordService(password, token);
  };


  useEffect(() => {
    Linking.addEventListener('url', handleOpenURLDeezer);
    if (deezerToken === null) 
      setDisplayDeezerBtn(true);

    fetchUserInfo();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.rows}>
          <IconEntypo name="user" color="white" size={35} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Age"
            keyboardType="decimal-pad"
            value={age ? age.toString() : ""}
            onChangeText={(value) => setAge(value)}
          />
        </View>
        <View style={styles.rows}>
          <IconMaterial name="place" color="white" size={35} />
          <TextInput
            style={styles.inputStyle}
            placeholder="City"
            value={city}
            onChangeText={(value) => setCity(value)}
          />
        </View>
        <View style={styles.rows}>
          <IconMaterial name="mood" color="white" size={35} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Mood"
            value={mood}
            onChangeText={(value) => setMood(value)}
          />
        </View>
        <View style={styles.rows}>
          <IconEntypo name="music" color="white" size={35} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Favorite music style"
            value={musicPreferences}
            onChangeText={(value) => setMusicPreferences(value)}
          />
        </View>
        <View style={styles.rows}>
          <IconMaterial name="text-fields" color="white" size={35} />
          <TextInput
            style={styles.inputStyle}
            placeholder="First name"
            value={firstname}
            onChangeText={(value) => setFirstName(value)}
          />
        </View>
        <View style={styles.rows}>
          <IconMaterial name="text-fields" color="white" size={35} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Last Name"
            value={lastname}
            onChangeText={(value) => setLastName(value)}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => saveUserInfo()}
        >
          <Text style={styles.buttonText}>Update Information</Text>
        </TouchableOpacity>
        <View style={styles.rows}>
          <IconEntypo name="email" color="white" size={35} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => saveUserEmail()}
        >
          <Text style={styles.buttonText}>Update Email</Text>
        </TouchableOpacity>
        <View style={styles.rows}>
          <IconMaterial name="text-fields" color="white" size={35} />
          <TextInput
            style={styles.inputStyle}
            placeholder="New password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <View style={styles.rows}>
          <IconMaterial name="text-fields" color="white" size={35} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </View>
        <TouchableOpacity
          style={styles.lastbuttonContainer}
          onPress={() => saveUserPassword()}
        >
          <Text style={styles.buttonText}>Change password</Text>
        </TouchableOpacity>

        {displayDeezerBtn ? 
          <TouchableOpacity
            style={styles.lastbuttonContainer1}
            onPress={() => Linking.openURL('http://ec2-3-15-228-137.us-east-2.compute.amazonaws.com/auth/deezer')}
            >             
            <Text style={styles.buttonText}>
              
              Connect2YourDeezerAccount
              
              </Text>
          </TouchableOpacity>
      : 
          <TouchableOpacity
            style={styles.lastbuttonContainer1}
            onPress={() => { setDisplayDeezerBtn(true), logoutDeezer()}}
            >             
            <Text style={styles.buttonText}>
              
              Logout2YourDeezerAccount
              
              </Text>
          </TouchableOpacity>

      }
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282830",
    flexDirection: "column",
    alignItems: "center",
  },
  rows: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: "white",
    marginTop: 30,
    alignItems: "center",
    width: 300,
    height: 40,
  },
  inputStyle: {
    flex: 1,
    backgroundColor: "rgba(255,255,255, 0.8)",
  },
  buttonContainer: {
    backgroundColor: "#27ae60",
    paddingVertical: 10,
    marginTop: 30,
    width: 300,
    height: 40,
    textAlign: "center",
    alignItems: "center",
  },
  lastbuttonContainer: {
    backgroundColor: "#27ae60",
    paddingVertical: 10,
    marginTop: 30,
    width: 300,
    height: 40,
    textAlign: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  lastbuttonContainer1: {
    backgroundColor: "gray",
    paddingVertical: 10,
    marginTop: 30,
    width: 300,
    height: 40,
    textAlign: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Settings;
