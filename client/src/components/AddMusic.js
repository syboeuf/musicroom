import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button } from "react-native-elements";

import Deezer from "../../Deezer";

const buttons = ["Artist", "Albums", "Search"];

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    height: 180,
    backgroundColor: "white",
  },
  searchInput: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
  },
  buttonsContainer: {
    flex: 0.07,
    alignItems: "center",
    paddingTop: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

const limitMusics = 15;
const startIdAlbum = 50000;

const PlayList = ({ navigation, route }) => {
  const { editor } = route.params;
  const [artistList, setArtistList] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [display, setDisplay] = useState(buttons[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListArtist();
    getListAlbum();
  }, []);

  // TODO TO BE CHANGED

  const getListArtist = async () => {
    let i = 0;
    let j = i;
    while (i - j < limitMusics) {
      try {
        const response = await Deezer.artist(i + artistList.length);
        const { data } = response;
        const { error, id } = data;
        if (!error && !artistList.find((element) => element.id === id)) {
          setArtistList((prevState) => [...prevState, data]);
        } else {
          j++;
        }
        i++;
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const getListAlbum = async () => {
    let i = startIdAlbum;
    let j = i;
    while (i - j < limitMusics) {
      try {
        const response = await Deezer.album(i + albums.length);
        const { data } = response;
        const { error, id } = data;
        if (!error && !albums.find((element) => element.id === id)) {
          setAlbums((prevState) => [...prevState, data]);
        } else {
          j++;
        }
        i++;
      } catch (e) {
        console.log(e);
      }
    }
    setLoading(false);
  };

  const displayArtistList = () => (
    <FlatList
      data={artistList}
      renderItem={({ item }) => {
        const { id, picture_medium, name, nb_album } = item;
        return (
          <TouchableOpacity
            style={styles.containerList}
            onPress={() =>
              navigation.navigate("MusicList", {
                list: "artist",
                id,
                image: picture_medium,
                name,
                editor,
              })
            }
          >
            <View
              style={{
                flex: 0.5,
                borderRightWidth: 1,
                borderRightColor: "grey",
              }}
            >
              <Image
                style={{ flex: 1 }}
                resizeMethod="resize"
                source={{ uri: picture_medium }}
              />
            </View>
            <View
              style={{
                flex: 0.5,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View>
                <Text>{`Name: ${name}`}</Text>
                <Text>{`Nb_akbum: ${nb_album}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );

  const displayAlbumList = () => (
    <FlatList
      data={albums}
      renderItem={({ item }) => {
        const { id, cover_medium, rating, fans, release_date, title } = item;
        return (
          <TouchableOpacity
            style={styles.containerList}
            onPress={() =>
              navigation.navigate("MusicList", {
                list: "album",
                id,
                image: cover_medium,
                name: title,
                editor,
              })
            }
          >
            <View
              style={{
                flex: 0.5,
                borderRightWidth: 1,
                borderRightColor: "grey",
              }}
            >
              <Image
                resizeMethod="resize"
                style={{ flex: 1 }}
                source={{ uri: cover_medium }}
              />
            </View>
            <View style={{ flex: 0.5, flexDirection: "column", left: 20 }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
              >{`Title: ${title}`}</Text>
              <Text>{`Rating: ${rating}`}</Text>
              <Text>{`Fans: ${fans}`}</Text>
              <Text>{"Genre"}</Text>
              <Text>{`Date: ${release_date}`}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );

  const getMusics = async () => {
    try {
      const response = await Deezer.searchByArtist(searchValue);
      const { total, data } = response.data;
      if (total > 0) {
        navigation.navigate("MusicList", {
          list: "artist",
          id: data[0].artist.id,
          editor,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displaySearch = () => (
    <View>
      <Text>Search by artist !</Text>
      <TextInput
        style={styles.searchInput}
        onChangeText={(text) => setSearchValue(text)}
        value={searchValue}
      />
      <Button title="Send" color="blue" onPress={() => getMusics()} />
    </View>
  );

  const displayList = (value) => {
    switch (value) {
      case "Artist":
        return displayArtistList();

      case "Albums":
        return displayAlbumList();

      case "Search":
        return displaySearch();

      default:
        return <View />;
    }
  };

  const addMoreArtistOrAlbums = (value) => {
    setLoading(true);
    switch (value) {
      case "Artist":
        getListArtist();
        break;

      case "Albums":
        getListAlbum();
        break;

      default:
        break;
    }
  };

  return (
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#282830" }}
    >
      <View style={styles.buttonsContainer}>
        <FlatList
          data={buttons}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 10 }}>
              <Button onPress={() => setDisplay(item)} title={item} />
            </View>
          )}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{ flex: 0.8 }}>{displayList(display)}</View>
      {display !== "Search" ? (
        <View style={{ flex: 0.1, marginTop: 15, alignItems: "center" }}>
          <Button
            title={`Add more ${display}`}
            onPress={() => (!loading ? addMoreArtistOrAlbums(display) : null)}
            color="blue"
          />
        </View>
      ) : null}
    </View>
  );
};

export default PlayList;
