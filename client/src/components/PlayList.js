import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView, 
  Text,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Card, ListItem, Button, Header, Icon } from "react-native-elements";
import Add from "react-native-vector-icons/Entypo";
import Eye from "react-native-vector-icons/AntDesign";

// Import services
import { getAllPlayListService } from "../service/playListService";
import { Context as AuthContext } from "../context/AuthContext";

import { useIsFocused } from "@react-navigation/native";

const PlayList = (props) => {
  const { navigation, route } = props;
  const [publicPlayList, setPublicPlayList] = useState([]);
  const [myPlayList, setMyPlayList] = useState([]);
  const [getInvitedPl, setGetInvitedPl] = useState([]);

  const {
    state: { token },
  } = useContext(AuthContext);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused)
    fetchPlaylistes();
  }, [isFocused]);

  const fetchPlaylistes = async () => {
    let allPlayList = await getAllPlayListService(token);

    setMyPlayList(allPlayList.myPlaylist);
    setPublicPlayList(allPlayList.publicList);
    setGetInvitedPl(allPlayList.getInvitedPl);
  };

  useEffect(() => {
    console.log("route.params :", props);
    fetchPlaylistes();
  }, [props]);

  const keyExtractor = (item, index) => index.toString();

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
          bottom: 15,
          color: "white",
          left: 10,
          fontWeight: "200",
          fontSize: 15,
        }}
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          // console.log("dddd")
          navigation.navigate("PlaylistDetails", {
            playListDetails: JSON.stringify(item),
          });
        }}
      >
        <Eye name="eyeo" size={24} color="white" />

        {item.name}
      </Text>
    </Card>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header
          backgroundColor="#633689"
          centerComponent={{ text: "PlayList", style: { color: "#fff" } }}
          rightComponent={
            <Add
              onPress={() =>
                navigation.navigate("PlayListEditor", { editor: true })
              }
              name="add-to-list"
              size={24}
              color="white"
            />
          }
        />

        <View>
          <Text style={styles.playlistTitle}>Public playlist</Text>
        </View>

        <FlatList
          keyExtractor={keyExtractor}
          data={publicPlayList}
          renderItem={renderItem}
          horizontal={true}
        />

        <View>
          <Text style={styles.invPlaylistTitle}>Invited to playlist</Text>
        </View>

        <FlatList
          keyExtractor={keyExtractor}
          data={getInvitedPl}
          renderItem={renderItem}
          horizontal={true}
        />

        <View>
          <Text style={styles.myPlaylistTitle}>My playlist</Text>
        </View>

        <FlatList
          keyExtractor={keyExtractor}
          data={myPlayList}
          renderItem={renderItem}
          horizontal={true}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282830",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  playlistTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  myPlaylistTitle: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  invPlaylistTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default PlayList;
