import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ModalSelectList } from "react-native-modal-select-list";

// Import context
import { Context as AuthContext } from "../context/AuthContext";
import { Card, Tile, ListItem, Button, Header } from "react-native-elements";
import FavOff from "react-native-vector-icons/MaterialIcons";
import BackWard from "react-native-vector-icons/Ionicons";
import Edit from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Sound, { setCategory } from "react-native-sound";

// Import servces
import {
  updateTrackListPositionService,
  updateTrackLikeService,
  getPlaylistByidService,
  getUserById,
} from "../service/playListService";

import {
  getMyBookmarck,
  addFavoritService,
  rmFavoritService,
} from "../service/bookmarkService";

import io from 'socket.io-client';
import { useIsFocused } from "@react-navigation/native";

const PlaylistDetailsScreens = (props) => {
  const { state } = useContext(AuthContext);
  const [listDetails, setDetails] = useState({});
  const [trackList, setTrackList] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [rerender, setRerender] = useState(0);
  const [userPerms, setUserPerms] = useState({});
  const [sound, setSound] = useState(false);
  const { navigation, route } = props;
  const [isFavorit, setIsFavorit] = useState(false);
  const [willEdit, setWillEdit] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  // const [socket, setSocket] = useState(io("http://192.168.42.120:3000"));
  const [socket, setSocket] = useState(io("http://ec2-3-15-228-137.us-east-2.compute.amazonaws.com"));
  const [userId, setUserId] = useState("");


  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      socket.connect(true);
    }
  }, [isFocused]);

  const handlSongsList = (list) => {
    let data = [];
    if (list && list.length > 0) {
      list.map((l, i) => {
        data.push({
          preview: l.preview,
          position: i,
          likes: l.likes,
          selected: false,
          label: (i + 1).toString(),
          value: i.toString(),
          isPlayingOn: false,
        });
      });
    }
    setSongsList(data);
  };

  const handlLikeList = (list) => {
    let data = list.sort(
      (a, b) => parseInt(a.likes.length) < parseInt(b.likes.length)
    );
    let dataNew = [];
    if (data && data.length > 0) {
      data.map((l, i) => {
        dataNew.push({
          preview: l.preview,
          position: i,
          likes: l.likes,
          selected: false,
          label: (i + 1).toString(),
          value: i.toString(),
          isPlayingOn: l.isPlayingOn ? true : false,
        });
      });
    }
    setTrackList(data);
    setSongsList(dataNew);
  };

  const checkIfFovorit = async (id) => {
    let code = await getMyBookmarck(id, state.token);
    if (code == 200) setIsFavorit(true);
    else setIsFavorit(false);
  };

  useEffect(() => {
    // Check if pplaylist is favorit
    if (route.params?.playListDetails) {
      let dataIn = JSON.parse(route.params.playListDetails);
      let id;
      if (dataIn.playlistId === undefined) id = dataIn._id;
      else id = dataIn.playlistId;
      getPlaylistByidService(id, state.token).then((data) => {
        if (data.playList) {
          setDetails(data.playList);
          checkIfFovorit(data.playList._id);
          setTrackList(data.playList.trackList.sort((a) => a.position));

          socket.emit('join', data.playList._id);
          if (data.playList.public === false) {
            AsyncStorage.getItem("userInfo").then((user) => {
              let userInfo = JSON.parse(user);
              setUserId(userInfo.userId);
              if (userInfo.userId === data.playList.creator) setWillEdit(true);
              let perms = {};
              if (data.playList.contributors) {
                let dt = data.playList.contributors;
                dt.map((collab) => {
                  if (collab.id === userInfo.userId) perms = collab;
                });
              }
              setUserPerms(perms);
            });
          } else {
            AsyncStorage.getItem("userInfo").then((user) => {
              let userInfo = JSON.parse(user);
              setUserId(userInfo.userId);
              if (userInfo.userId === data.playList.creator) setWillEdit(true);
            })
          }

          if (data.playList.isEditable) handlSongsList(data.playList.trackList);
          else {
            handlLikeList(data.playList.trackList);
          }
        }

        // Get User information
        AsyncStorage.getItem("userInfo").then((user) => {
          let userInfo = JSON.parse(user);
          getUserById(userInfo.userId, state.token).then(data => {
            let users = [];
            users.push(data)
            socket.emit("newContributor", { room: id, user: data });
            setListUsers(users);
          })
        })
      });
    }
  }, [route.params.playListDetails]);

  useEffect(() => {
    socket.on("newContributorJoined", (newUsers) => {
      setListUsers(newUsers);
    })

    socket.on("newChangePosition", (dataPosition) => {
      setTrackList(dataPosition.arrangedTrack);
      setDetails(dataPosition.newListTr);
      handlSongsList(dataPosition.arrangedTrack);
      setRerender(Math.floor(Math.random() * 9999999999));
    })

    socket.on("newAddLikes", (trackListIn) => {
      handlLikeList(trackListIn);
    })

  }, [])

  useEffect(() => {
    if (rerender !== 0) {
      setTrackList(trackList);
    }
  }, [rerender]);

  const startPlay = (i) => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
      trackList.map(tr => { 
        tr.isPlayingOn = false;
      })
      setTrackList(trackList);
      setRerender(Math.floor(Math.random() * 9999999999));
    }
    setCurrentSong(i);
    if (songsList[i])
      var sound1 = new Sound(songsList[i].preview, "", (error, sound) => {
        if (error) {
          alert("error" + error.message);
          return;
        }
        setIsPlaying(true);
        setSound(sound1);
        if (trackList[i]) {
          trackList[i].isPlayingOn = true;
          setTrackList(trackList);
          setRerender(Math.floor(Math.random() * 9999999999));
        }

        sound1.play(() => {
          sound1.release();

          let pos = 0;
          trackList.map((tr, index) => { 
            if (tr.isPlayingOn === true) pos = index;
            tr.isPlayingOn = false;
          })

          if (parseInt(pos) + 1 < songsList.length) {
            setCurrentSong(pos + 1);
            trackList[pos].isPlayingOn = false;
            trackList[pos + 1].isPlayingOn = true;
            setTrackList(trackList);
            setIsPlaying(false);
            startPlay(pos + 1);
            setRerender(Math.floor(Math.random() * 9999999999));
          } else {
            trackList.map(tr => { 
              tr.isPlayingOn = false;
            })
            trackList[0].isPlayingOn = true;
            setTrackList(trackList);
            setCurrentSong(0);
            setIsPlaying(false);
            startPlay(0);
            setRerender(Math.floor(Math.random() * 9999999999));
          }
        });
      });
  };

  const pause = (i) => {
    if (sound) {
      sound.pause();
    }

    if (trackList[i]) {
      trackList[i].isPlayingOn = false;
      setTrackList(trackList);
      setRerender(Math.floor(Math.random() * 9999999999));
    }

    setIsPlaying(false);
  };

  const handleLikePress = async (id, track) => {
    let user = JSON.parse(await AsyncStorage.getItem("userInfo"));
    if (track.likes.indexOf(user.userId) === -1) {
      trackList[id].likes.push(user.userId);
    } else {
      trackList[id].likes.splice(trackList[id].likes.indexOf(user.userId), 1);
    }
    handlLikeList(trackList);
    // await setTrackList(trackList);
    let dataLike = {
      room: listDetails._id,
      trackList,
    };

    socket.emit("addLikes", dataLike);
    await updateTrackLikeService(listDetails._id, track, state.token);
    setRerender(Math.floor(Math.random() * 999999999));
  };

  let modalRef;

  const openModal = () => modalRef.show();

  const saveModalRef = (ref) => (modalRef = ref);

  const onSelectedOption = async (newPos) => {
    let data = songsList;
    // Get old position
    let oldPos = data.filter((l) => l.selected)[0].position;
    if (parseInt(oldPos) !== parseInt(newPos)) {
      let arrangedTrack = array_move(trackList, oldPos, newPos);
      setTrackList(arrangedTrack);
      let newListTr = listDetails;
      newListTr.trackList = arrangedTrack;
      setDetails(newListTr);
      handlSongsList(arrangedTrack);

      let dataPos = {
        room: listDetails._id,
        newListTr,
        arrangedTrack
      };

      socket.emit("changePosition", dataPos);

      await updateTrackListPositionService(
        newListTr._id,
        arrangedTrack,
        state.token
      );
      // Force renderer
      setRerender(Math.floor(Math.random() * 9999999999));
    }
  };

  const array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };

  const handleEditPosPress = (pos, track) => {
    let data = songsList;
    for (let i = 0; i < data.length; i++) {
      if (i === parseInt(pos)) {
        data[i].label = (data[i].position + 1).toString() + " current position";
        data[i].selected = true;
      } else {
        data[i].label = (data[i].position + 1).toString();
        data[i].selected = false;
      }
    }
    setSongsList(data.sort((a) => a.position));
    openModal();
  };

  const handlFavorit = async () => {
    let data = {
      playlistId: listDetails._id,
      playlistName: listDetails.name,
    };
    if (isFavorit) {
      await rmFavoritService(data, state.token);
      setIsFavorit(false);
    } else {
      await addFavoritService(data, state.token);
      setIsFavorit(true);
    }
  };

  const handlRditPlayList = async () => {
    navigation.navigate("PlayListEditor", {
      playListDetails: JSON.stringify(listDetails),
    });
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      key={item._id}
      leftAvatar={{
        source: {
          uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Favatars-21%2F512%2Favatar-circle-human-male-5-512.png&f=1&nofb=1",
        },
      }}
      title={item.username}
    />
  );

  const contributorLeft = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("userInfo"));
    let data = {
      room: listDetails._id,
      id: user.userId,
    };

    socket.emit("contributorLeft", data);
  }

  return (
    <ScrollView style={Styles.container}>
      <ModalSelectList
        ref={saveModalRef}
        placeholder={"Text something..."}
        closeButtonText={"Close"}
        options={songsList}
        onSelectedOption={onSelectedOption}
        disableTextSearch={false}
      />
      <View>
        <Header
          backgroundColor="#633689"
          centerComponent={{ text: listDetails.name, style: { color: "#fff" } }}
          leftComponent={
            <BackWard
              onPress={() => {
                pause(), contributorLeft(), navigation.goBack();
              }}
              name="md-arrow-back"
              size={24}
              color="white"
            />
          }
          rightComponent={
            // name favoris for desactivate
            <FavOff
              onPress={() => handlFavorit()}
              name={!isFavorit ? "favorite-border" : "favorite"}
              size={24}
              color="white"
            />
          }
        />
        {willEdit ? (
          <Edit
            name="edit"
            size={24}
            style={{ position: "absolute", zIndex: 1, right: 45, top: 40 }}
            color="white"
            onPress={() => handlRditPlayList()}
          />
        ) : null}
        <Tile
          imageSrc={require("../assets/music.jpg")}
          title={listDetails.name}
          featured
          caption={listDetails.desctiption}
        />
        <Button
          onPress={() =>
            !isPlaying ? startPlay(currentSong) : pause(currentSong)
          }
          icon={
            <Icon
              name={!isPlaying ? "play" : "pause"}
              size={25}
              color="white"
            />
          }
          iconLeft
          title="  Start playlist"
        />


        {/* List users */}
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={listUsers}
          renderItem={renderItem}
          horizontal={true}
        />


        {listDetails.public == true && listDetails.trackList && trackList ? (
          trackList.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{
                source: { uri: l.album ? l.album.cover_big : null },
              }}
              title={l.title}
              // subtitle={l.subtitle}
              bottomDivider
              rightTitle={listDetails.isVote ? l.likes.length.toString() : null}
              rightIcon={
                listDetails.isVote ? (
                  <SimpleLineIcons
                    onPress={() => handleLikePress(i, l)}
                    name="like"
                    size={25}
                    color="blue"
                  />
                ) : listDetails.isEditable ? (
                  <SimpleLineIcons
                    onPress={() => handleEditPosPress(i, l)}
                    name="cursor-move"
                    size={25}
                    color="blue"
                  />
                ) : null
              }
              leftIcon={
                l.isPlayingOn && isPlaying ? (
                  <SimpleLineIcons
                    name="control-pause"
                    size={25}
                    color="blue"
                    onPress={() => pause(i)}
                  />
                ) : (
                    <SimpleLineIcons
                      name="control-play"
                      size={24}
                      color="blue"
                      onPress={() => startPlay(i)}
                    />
                  )
              }
            />
          ))
        ) : listDetails.public == false &&
          listDetails.trackList &&
          trackList ? (
              trackList.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{
                    source: { uri: l.album ? l.album.cover_big : null },
                  }}
                  title={l.title}
                  // subtitle={l.subtitle}
                  bottomDivider
                  rightTitle={
                    listDetails.isVote && userPerms.canVote
                      ? l.likes.length.toString()
                      : listDetails.isVote && listDetails.creator === userId
                        ? l.likes.length.toString()
                        : null
                  }
                  rightIcon={
                    (listDetails.isVote && userPerms.canVote)
                      || (listDetails.creator === userId && listDetails.isVote) ? (
                        <SimpleLineIcons
                          onPress={() => handleLikePress(i, l)}
                          name="like"
                          size={25}
                          color="blue"
                        />
                      ) : (listDetails.isEditable && userPerms.canEdit) ||
                        (listDetails.creator === userId && listDetails.isEditable) ? (
                          <SimpleLineIcons
                            onPress={() => handleEditPosPress(i, l)}
                            name="cursor-move"
                            size={25}
                            color="blue"
                          />
                        ) : null
                  }
                  leftIcon={
                    l.isPlayingOn && isPlaying ? (
                      <SimpleLineIcons
                        name="control-pause"
                        size={25}
                        color="blue"
                        onPress={() => pause(i)}
                      />
                    ) : (
                        <SimpleLineIcons
                          name="control-play"
                          size={24}
                          color="blue"
                          onPress={() => startPlay(i)}
                        />
                      )
                  }
                />
              ))
            ) : (
              <Text>Empty list</Text>
            )}
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
  checkBoxStyle: {
    flex: 0.2,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    // elevation: 2,
  },
});
export default PlaylistDetailsScreens;
