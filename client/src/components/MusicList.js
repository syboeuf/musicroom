import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import Deezer from "../../Deezer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  buttonAddMusic: {
    width: 80,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  text: {
    textAlign: "center",
  },
  buttonsContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
  },
});

const limitMusic = 15;

const MusicList = ({ route, navigation }) => {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { list, id, image, name, editor } = route.params;

  useEffect(() => {
    getMusicList();
  }, []);

  const getMusicList = async () => {
    setLoading(true);
    try {
      let response;
      if (list === "artist") {
        response = await Deezer.musicArtistList(
          id,
          limitMusic + musicList.length
        );
      } else {
        response = await Deezer.musicAlbumList(id);
      }
      const { data, error } = response.data;
      if (!error) {
        data.forEach((music) => {
          if (!musicList.find((element) => element.id === music.id)) {
            setMusicList((prevState) => [...prevState, music]);
          }
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      <View style={{ alignItems: "center" }}>
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
          >{`${list}: ${name}`}</Text>
        </View>
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 180 }}
          resizeMethod="resize"
        />
      </View>
      <View style={{ flex: 0.8, marginTop: 10 }}>
        <FlatList
          data={musicList}
          renderItem={({ item }) => {
            const { title, rank, preview } = item;
            console.log(item);
            return (
              <View style={[styles.container]}>
                <View style={{ flex: 0.5 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      paddingLeft: 20,
                    }}
                  >{`Title: ${title} Rank: ${rank}`}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Player", { pathUrl: preview })
                    }
                    style={styles.buttonAddMusic}
                  >
                    <Text style={styles.text}>Play music</Text>
                  </TouchableOpacity>
                  {editor && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PlayListEditor", { music: item })
                      }
                      style={styles.buttonAddMusic}
                    >
                      <Text style={styles.text}>Add music</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {list === "artist" ? (
        <View style={{ flex: 0.1, alignItems: "center", top: 10 }}>
          <Button
            title="Load more music !"
            onPress={() => (!loading ? getMusicList() : null)}
            color="blue"
          />
        </View>
      ) : null}
    </View>
  );
};

export default MusicList;
