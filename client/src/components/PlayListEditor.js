import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
} from "react-native";

import CheckBox from "@react-native-community/checkbox";
import Save from "react-native-vector-icons/Entypo";
import Delete from "react-native-vector-icons/AntDesign";

import BackWard from "react-native-vector-icons/Ionicons";

// Import services
import {
  savePlayListService,
  updatePlayListService,
} from "../service/playListService";
import { isContributorExistService } from "../service/userService";

// Import context
import { Context as playlistReducer } from "../context/PlayListContext";
import { Context as AuthContext } from "../context/AuthContext";

import { Card, ListItem, Header, Icon } from "react-native-elements";

import Deezer from "../../Deezer";
import { TextInput } from "react-native-gesture-handler";

// TODO Hide invite collaborators if isPrivate = false
// TODO Add for validation to ensure that data is not empty
// TODO FOR SYLVAIN

const PlayListEditor = ({ navigation, route }) => {
  const { editor } = route.params;
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [modalOptionsVisible, setModalOptionsVisible] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isVote, setIsVote] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [titlePlayList, setTitlePlayList] = useState("");
  const [description, setDescription] = useState("");
  const [modalContributorVisible, setModalContributorVisible] = useState(false);
  const [contributor, setContributor] = useState("");
  const [contributors, setContributors] = useState([]);
  const [canVote, setCanVote] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [rerender, setRerender] = useState(0);
  const [playListId, setPlayListId] = useState("");

  const {
    state: { trackList },
    storeTrack,
    deleteTrack,
    deleteAllTrack,
  } = useContext(playlistReducer);

  const {
    state: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    return () => deleteAllTrack();
  }, []);

  useEffect(() => {
    if (route.params?.music) {
      storeTrack(route.params?.music);
    }
  }, [route.params?.music]);

  useEffect(() => {
    if (route.params?.playListDetails) {
      let data = JSON.parse(route.params.playListDetails);
      setPlayListId(data._id);
      setTitlePlayList(data.name);
      setDescription(data.desctiption);
      setIsPrivate(!data.public);
      setIsEditable(data.isEditable);
      setIsVote(data.isVote);
      setContributors(data.contributors);
      if (data.trackList.length > 0) {
        data.trackList.map((list) => {
          storeTrack(list);
        });
      }
    }
  }, [route.params?.playListDetails]);

  const savePlayList = async (trackList) => {
    if (
      titlePlayList.trim === "" ||
      description.trim() === "" ||
      trackList.length === 0
    ) {
      Alert.alert("All fields are not filled !");
    } else if (!isVote && !isPrivate && !isEditable) {
      Alert.alert("Please select a collabration mode vote/editable !");
    } else {
      let data = {
        id: playListId,
        titlePlayList,
        description,
        trackList,
        contributors,
        isPrivate,
        isVote,
        isEditable,
      };

      if (playListId !== "") {
        updatePlayListService(data, token);
      } else savePlayListService(data, token);
    }
  };

  const addContributor = async () => {
    let data = {
      contributor,
      canVote,
      canEdit,
    };

    let repsonse = await isContributorExistService(data, token);
    if (repsonse.code === 200) {
      // Check if user exist
      data.id = repsonse.data.contributorId;
      contributor.trim() !== "" && setContributors([...contributors, data]);
      setContributor("");
      setModalContributorVisible(false);
    }
  };

  const getMusics = async (name) => {
    try {
      const response = await Deezer.searchByArtist(name);
      const { total, data } = response.data;
      if (total > 0) {
        navigation.navigate("MusicList", {
          list: "artist",
          id: data[0].artist.id,
          image: data[0].artist.picture_medium,
          name: data[0].artist.name,
          editor,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (title, preview, name) => {
    setTitle(title);
    setPreview(preview);
    setName(name);
    setModalOptionsVisible(true);
  };

  useEffect(() => {
    console.log(contributors);
  }, [contributors]);

  useEffect(() => {
    if (rerender !== 0) {
      setContributors(contributors);
    }
  }, [rerender]);

  const removeContributor = (item) => {
    let data = contributors;
    let newData = contributors;

    if (data && data.length > 0) {
      data.map((contrb, i) => {
        if (contrb.contributor === item.contributor) newData.splice(i, 1);
      });
    }

    setContributors(newData);
    setRerender(Math.floor(Math.random() * 999999));
  };

  return (
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
        rightComponent={
          // <View style={styles.rightIcons}>
          <Save
            onPress={() => savePlayList(trackList)}
            name="save"
            size={24}
            color="white"
          />

          //   <Delete
          //     name="delete"
          //     size={24}
          //     color="white" />

          // </View>
        }
      />

      {modalOptionsVisible ? (
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
                  onPress={() => {
                    setModalOptionsVisible(false);
                    navigation.navigate("Player", { pathUrl: preview });
                  }}
                  style={styles.textOptions}
                >
                  Play
                </Text>
                <Text
                  onPress={() => {
                    setModalOptionsVisible(false);
                    getMusics(name);
                  }}
                  style={styles.textOptions}
                >
                  Show artist
                </Text>
                <Text
                  onPress={() => setModalOptionsVisible(false)}
                  style={styles.textOptions}
                >
                  Show album
                </Text>
                <Text
                  onPress={() => {
                    setModalOptionsVisible(false);
                    deleteTrack(title);
                  }}
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
      ) : null}
      {modalContributorVisible ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalContributorVisible}
            onRequestClose={() => Alert.alert("Modal has been closed !")}
          >
            <View style={styles.modalContainer}>
              <View style={[styles.textContainer, { width: 300, height: 300 }]}>
                {/* set width and height with dimensions */}
                <TextInput
                  onChangeText={(text) => setContributor(text)}
                  value={contributor}
                  style={styles.textInput}
                />

                <View
                  atyle={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    height: 100,
                  }}
                >
                  {isVote ? (
                    <View
                      style={{
                        // flex: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckBox
                        style={styles.checkBoxStyle}
                        // disabled={false}
                        onChange={() => {
                          !canVote ? setCanEdit(false) : null,
                            setCanVote(!canVote);
                        }}
                        value={canVote}
                      />
                      <Text style={{ color: "black", flex: 0.6 }}>
                        Can vote !
                      </Text>
                    </View>
                  ) : null}

                  {isEditable ? (
                    <View
                      style={{
                        // flex: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckBox
                        style={styles.checkBoxStyle}
                        // disabled={false}
                        value={canEdit}
                        onChange={() => {
                          !canEdit ? setCanVote(false) : null,
                            setCanEdit(!canEdit);
                        }}
                      />
                      <Text style={{ color: "black", flex: 0.6 }}>
                        Can edit !
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View style={{ marginTop: 10 }}>
                  <Button
                    title="Add contributor"
                    onPress={() => addContributor()}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Button
                    title="Close"
                    onPress={() => setModalContributorVisible(false)}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          onChangeText={(text) => setTitlePlayList(text)}
          value={titlePlayList}
          style={styles.textInput}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Description</Text>
        <TextInput
          onChangeText={(text) => setDescription(text)}
          value={description}
          style={styles.textInput}
        />
      </View>
      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckBox
            style={styles.checkBoxStyle}
            // disabled={false}
            value={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
          />
          <Text style={{ color: "white", flex: 0.6 }}>Set private !</Text>
        </View>

        {/* {isPrivate ? (
          <View style={{ marginTop: 15, flex: 0.5, alignSelf: "center" }}>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => setModalContributorVisible(true)}
            >
              <Text style={styles.buttonText}>
                Invite user to contribute in my playlist
              </Text>
            </TouchableOpacity>
          </View>
        ) : null} */}

        {/* {!isPrivate ? (
          <View style={{ marginTop: 15, flex: 1, alignSelf: "center" }}>
           
          </View>
        ) : null} */}
      </View>

      <View
        atyle={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          height: 100,
        }}
      >
        <View
          style={{
            // flex: 0.5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckBox
            style={styles.checkBoxStyle}
            // disabled={false}
            onChange={() => {
              !isVote ? setIsEditable(false) : null, setIsVote(!isVote);
            }}
            value={isVote}
          />
          <Text style={{ color: "white", flex: 0.6 }}>Set vote !</Text>
        </View>
        <View
          style={{
            // flex: 0.5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckBox
            style={styles.checkBoxStyle}
            // disabled={false}
            value={isEditable}
            onChange={() => {
              !isEditable ? setIsVote(false) : null, setIsEditable(!isEditable);
            }}
          />
          <Text style={{ color: "white", flex: 0.6 }}>Set editable !</Text>
        </View>
      </View>

      {/* Contributors list */}
      {isPrivate ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            marginTop: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <View
            style={{ marginTop: 10, alignItems: "center", marginBottom: 10 }}
          >
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => setModalContributorVisible(true)}
            >
              <Text style={styles.buttonText}>Add group</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={contributors}
            renderItem={({ item }) => {
              const { contributor } = item;
              return (
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
                      >{`User: ${contributor}`}</Text>
                    </View>
                    <View style={{ flex: 0.2, alignItems: "center" }}>
                      <Delete
                        onPress={() => removeContributor(item)}
                        name="delete"
                        size={24}
                        color="black"
                      />
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : null}

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginTop: 15,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
      >
        <View style={{ marginTop: 10, alignItems: "center", marginBottom: 10 }}>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => navigation.navigate("AddMusic", { editor: true })}
          >
            <Text style={styles.buttonText}>Add music</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={trackList}
          renderItem={({ item }) => {
            const {
              rank,
              title,
              preview,
              artist: { name },
            } = item;
            return (
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
                    >{`Title: ${title} Rank: ${rank}`}</Text>
                  </View>
                  <View style={{ flex: 0.2, alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => showModal(title, preview, name)}
                    >
                      <Image
                        style={{ width: 25, height: 25 }}
                        source={require("../../resources/ui_options.jpg")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282830",
    flex: 1,
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
  textInput: {
    flex: 0.75,
    height: 80,
    backgroundColor: "white",
    borderWidth: 10,
    padding: 20,
    color: "black",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    marginLeft: 10,
    flex: 0.2,
    color: "white",
  },
  rightIcons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 13,
  },
  buttonAdd: {
    elevation: 8,
    backgroundColor: "#841584",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 150,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  checkBoxStyle: {
    flex: 0.2,
  },
});

export default PlayListEditor;
