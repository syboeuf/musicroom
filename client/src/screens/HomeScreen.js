import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

// Import context
import { Context as AuthContext } from "../context/AuthContext";
import { Card, ListItem, Button, Icon, Header } from "react-native-elements";
import Logout from "react-native-vector-icons/AntDesign";

const HomeScreens = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  return (
    <ScrollView style={Styles.container}>
      <View>
        <Header
          backgroundColor="#633689"
          // leftComponent={<MyCustomLeftComponent />}
          centerComponent={{ text: 'Home', style: { color: '#fff' } }}
          rightComponent={
            // name favoris for desactivate
            <Logout
              onPress={() => signout()}
              name={"logout"}
              size={24}
              color="white"
            />
          }
        />

        <Card style={Styles.cardStyle} image={require("../assets/music.jpg")}>
          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="ALBUM / ARTISTS"
            onPress={() => navigation.navigate("AddMusic", { editor: false })}
          />
        </Card>

        <Card style={Styles.cardStyle} image={require("../assets/favorit.jpg")}>
          <Button
            onPress={() => navigation.push("FavorisList")}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="FAVORIS"
          />
        </Card>

        <Card
          style={Styles.cardStyle}
          image={require("../assets/settings.jpg")}
        >
          <Button
            onPress={() => navigation.push("Settings")}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="SETTINGS"
          />
        </Card>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282830",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  logoContainer: {
    color: "white",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: "#fff",
    marginTop: 20,
    fontWeight: "100",
    fontSize: 23,
  },
  myForm: {
    flex: 3,
  },
});

export default HomeScreens;
