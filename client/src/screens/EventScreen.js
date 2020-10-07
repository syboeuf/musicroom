import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
} from "react-native";

// Import context
import { Context as AuthContext } from "../context/AuthContext";
import { Card, ListItem, Button, Header, Icon } from "react-native-elements";
import Add from "react-native-vector-icons/Entypo";
import Eye from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";

// impor tservices
import { getAllEventsService } from "../service/eventService";

const EventScreen = ({ navigation }) => {
  const [publicEvents, setPublicEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [invitedEvent, setInvitedEvent] = useState([]);

  const {
    state: { token },
    signout,
  } = useContext(AuthContext);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused)
      getAllEvent();
  }, [isFocused]);

  // Get date
  useEffect(() => {
    getAllEvent();
  }, []);

  const getAllEvent = async () => {
    try {
      const response = await getAllEventsService(token);
      // console.log(response, " event");
      const { myEvent, publicEvent, getInvitedEv } = response;
      setPublicEvents(publicEvent);
      setMyEvents(myEvent);
      setInvitedEvent(getInvitedEv);
    } catch (error) {
      console.log(error, " error EventScreen");
    }
  };

  const renderItem = ({ item, index }) => (
    <Card
      // image={{ uri: item.trackList[index].album.cover
      //   item.trackList[index].album.cover : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.ytimg.com%2Fvi%2F7pgqf1hQ648%2Fmaxresdefault.jpg&f=1&nofb=1" }}
      image={{
        uri:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fak9.picdn.net%2Fshutterstock%2Fvideos%2F22562299%2Fthumb%2F1.jpg&f=1&nofb=1",
      }}
      containerStyle={{ padding: 0, width: 160, height: 153 }}
    >
      <Text
        style={{
          marginBottom: 10,
          position: "absolute",
          bottom: 35,
          color: "white",
          left: 10,
          fontWeight: "200",
          fontSize: 15,
        }}
        onPress={() =>
          navigation.navigate("EventDetails", {
            address: item.address,
            eventDetails: JSON.stringify(item),
          })
        }
      >
        <Eye name="eyeo" size={24} color="white" />

        {item.name}
      </Text>
    </Card>
  );

  return (
    <ScrollView>
      <View style={Styles.container}>
        <Header
          backgroundColor="#633689"
          centerComponent={{ text: "Event", style: { color: "#fff" } }}
          rightComponent={
            <Add
              onPress={() => navigation.navigate("EventEditor")}
              name="add-to-list"
              size={24}
              color="white"
            />
          }
        />
        {/* <ScrollView>
        <View>
          <Card
            style={Styles.cardStyle}
            image={require("../assets/favorit.jpg")}
          >
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="EVENT"
            />
          </Card>
        </View>
      </ScrollView> */}
        <View>
          <Text style={Styles.playlistTitle}>Public Event</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={publicEvents}
          renderItem={renderItem}
          horizontal={true}
        />
        <View>
          <Text style={Styles.playlistTitle}>Invited to Event</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={invitedEvent}
          renderItem={renderItem}
          horizontal={true}
        />
        <View>
          <Text style={Styles.playlistTitle}>My Event</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={myEvents}
          renderItem={renderItem}
          horizontal={true}
        />
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
  playlistTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default EventScreen;
