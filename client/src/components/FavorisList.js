import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  Modal,
} from "react-native";
import { Header } from "react-native-elements";

import Save from "react-native-vector-icons/Entypo";
import BackWard from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const FavorisList = ({ navigation }) => {
  const [trackFavoris, setTrackFavoris] = useState([]);
  const [track, setTrack] = useState("");
  const [modalOptionsVisible, setModalOptionsVisible] = useState(false);

  useEffect(() => {
    // Get favoris !
    const createList = () => {
      const list = [];
      for (let i = 0; i < 30; i++) {
        list.push(i);
      }
      return list;
    };
    setTrackFavoris(createList());
  }, []);

  const saveFavoris = () => {
    console.log(trackFavoris);
  };

  const setAction = (option) => {
    // Depend de ce qu'on aura dans le tracklist
    switch (option) {
      case "Player":
        console.log(track);
        break;
      case "Show artist":
        console.log(track);
        break;
      case "Show album":
        console.log(track);
        break;
      case "Delete":
        setTrackFavoris(trackFavoris.filter((element) => element !== track));
        break;
      default:
        break;
    }
    setModalOptionsVisible(false);
  };

  const showModal = (item) => {
    setTrack(item);
    setModalOptionsVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#633689"
        centerComponent={{ text: "Favoris", style: { color: "#fff" } }}
        leftComponent={
          <BackWard
            onPress={() => navigation.goBack()}
            name="md-arrow-back"
            size={24}
            color="white"
          />
        }
        rightComponent={
          <Save
            onPress={() => saveFavoris()}
            name="save"
            size={24}
            color="white"
          />
        }
      />
      {modalOptionsVisible && (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalOptionsVisible}
            onRequestClose={() => Alert.alert("Modal has been closed !")}
          >
            <View style={styles.modalContainer}>
              {/* set width and height with dimensions */}
              <View style={[styles.textContainer, { width: 300, height: 300 }]}>
                <Text
                  onPress={() => setAction("Player")} // navigation.navigate("Player", { pathUrl: preview });
                  style={styles.textOptions}
                >
                  Play
                </Text>
                <Text
                  onPress={() => setAction("Show artist")} // getMusics(name);
                  style={styles.textOptions}
                >
                  Show artist
                </Text>
                <Text
                  onPress={() => setAction("Show album")}
                  style={styles.textOptions}
                >
                  Show album
                </Text>
                <Text
                  onPress={() => setAction("Delete")}
                  style={styles.textOptions}
                >
                  Delete
                </Text>
                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={() => setModalOptionsVisible(false)}
                >
                  <Text style={{ textAlign: "center" }}>Close options</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          data={trackFavoris}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={[styles.optionsContainer]}>
                <View style={{ flex: 0.8, alignItems: "center" }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      paddingLeft: 20,
                    }}
                  >{`Title: ${item} Rank: ${item}`}</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                  <TouchableOpacity onPress={() => showModal(item)}>
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require("../../resources/ui_options.jpg")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282830",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textOptions: {
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  textContainer: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonModal: {
    marginTop: 10,
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});

export default FavorisList;
