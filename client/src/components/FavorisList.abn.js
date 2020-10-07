import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Card, ListItem, Button, Header, Icon } from 'react-native-elements';
import Add from 'react-native-vector-icons/Entypo';
import Eye from 'react-native-vector-icons/AntDesign';

// Import icons
import BackWard from "react-native-vector-icons/Ionicons";

// Import sevrices
import { getMyFavoritList } from '../service/bookmarkService';
import { getDeezerUserTracks } from '../service/playListService';

// import contexts
import { Context as AuthContext } from "../context/AuthContext";

const FavorisComponent = (props) => {
  const { navigation } = props;
  const [favoritPlayList, setfavoritPlayList] = useState([]);
  const [userDeezerTracks, setUserDeezerTracks] = useState([]);

  const keyExtractor = (item, index) => index.toString();

  const {
    state: { token, deezerToken },
  } = useContext(AuthContext);

  useEffect(() => {
    console.log("deezerToken :===>" , deezerToken);
    if (deezerToken)
      getDeezerUserTracks(deezerToken).then(response => {
        setUserDeezerTracks(response.data.data);
      });

    getMyFavoritList(token).then(data => {
      setfavoritPlayList(data);
    })
  }, []);

  const renderItemDeezer = ({ item, index }) => (
    <Card
      image={{ uri: item.album.cover_medium }}
      //   item.trackList[index].album.cover : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.ytimg.com%2Fvi%2F7pgqf1hQ648%2Fmaxresdefault.jpg&f=1&nofb=1" }}
      // image={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fak9.picdn.net%2Fshutterstock%2Fvideos%2F22562299%2Fthumb%2F1.jpg&f=1&nofb=1" }}
      containerStyle={{ padding: 0, width: 160, height: 153 }}
    >
      <Text style={{
        marginBottom: 10, position: 'absolute', bottom: 15, color: 'white', left: 10, fontWeight: '200',
        fontSize: 15
      }}

        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('PlaylistDeezerDetails', {
            playListDetails: JSON.stringify(item),
          });
        }}>
        <Eye name="eyeo" size={24} color="white" />

        {item.title}
      </Text>
    </Card>
  );

  const renderItem = ({ item, index }) => (
    <Card
      // image={{ uri: item.trackList[index].album.cover
      //   item.trackList[index].album.cover : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.ytimg.com%2Fvi%2F7pgqf1hQ648%2Fmaxresdefault.jpg&f=1&nofb=1" }}
      image={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fak9.picdn.net%2Fshutterstock%2Fvideos%2F22562299%2Fthumb%2F1.jpg&f=1&nofb=1" }}
      containerStyle={{ padding: 0, width: 160, height: 153 }}
    >
      <Text style={{
        marginBottom: 10, position: 'absolute', bottom: 15, color: 'white', left: 10, fontWeight: '200',
        fontSize: 15
      }}

        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('PlaylistDetails', {
            playListDetails: JSON.stringify(item),
          });
        }}>
        <Eye name="eyeo" size={24} color="white" />

        {item.playlistName}
      </Text>
    </Card>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header
          backgroundColor="#633689"
          centerComponent={{ text: "PlayList", style: { color: "#fff" } }}
          leftComponent={
            <BackWard
              onPress={() => navigation.goBack()}
              name="md-arrow-back"
              size={24}
              color="white"
            />
          }
        />

        <View>
          <Text style={styles.playlistTitle}>My favorit playlist</Text>
        </View>

        <FlatList
          keyExtractor={keyExtractor}
          data={favoritPlayList}
          renderItem={renderItem}
          horizontal={true}
        />

        <View>
          <Text style={styles.playlistTitle}>MyDeezer tracks</Text>
        </View>

        {deezerToken ?
          <FlatList
            keyExtractor={keyExtractor}
            data={userDeezerTracks}
            renderItem={renderItemDeezer}
            horizontal={true}
          />
          : null}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#282830",
    height: 500,
  },
});

export default FavorisComponent;
