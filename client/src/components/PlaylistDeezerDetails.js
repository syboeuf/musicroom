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
    getDeezerTracksList
} from "../service/playListService";

import io from 'socket.io-client';
import { useIsFocused } from "@react-navigation/native";

const PlaylistDeezerDetailsScreens = (props) => {
    const { state } = useContext(AuthContext);
    const [listDetails, setDetails] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [trackList, setTrackList] = useState([]);
    const [rerender, setRerender] = useState(0);
    const [sound, setSound] = useState(false);
    const [coverImg, setCoverImg] = useState("");
    const { navigation, route } = props;

    useEffect(() => {
        if (rerender !== 0) {
            console.log("Rerendered !")
        }
    }, [rerender]);


    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getAldata();
        }
    }, [isFocused]);

    const getAldata = () => {
        // Check if pplaylist is favorit
        if (route.params?.playListDetails) {
            let data = JSON.parse(route.params.playListDetails);
            setDetails(data);
            setCoverImg(data.album.cover_big);
            let trackListLink = data.album.tracklist;
            getDeezerTracksList(trackListLink, state.deezerToken).then(response => {
                setTrackList(response.data.data);
            })
            setRerender(Math.floor(Math.random() * 9999999999));
        }
    }

    const startPlay = (i) => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        }
        setCurrentSong(i);
        if (trackList[i])
            var sound1 = new Sound(trackList[i].preview, "", (error, sound) => {
                if (error) {
                    alert("error" + error.message);
                    return;
                }
                setIsPlaying(true);
                setSound(sound1);
                sound1.play(() => {
                    sound1.release();
                    if (parseInt(i) + 1 < trackList.length) {
                        setCurrentSong(i + 1);
                        startPlay(i + 1);
                    } else {
                        setCurrentSong(0);
                        startPlay(0);
                    }
                });
            });
    };

    const pause = (i) => {
        if (sound) {
            sound.pause();
        }
        setIsPlaying(false);
    };


    return (
        <ScrollView style={Styles.container}>
            <View>
                <Header
                    backgroundColor="#633689"
                    centerComponent={{ text: listDetails.title, style: { color: "#fff" } }}
                    leftComponent={
                        <BackWard
                            onPress={() => {
                                pause(), navigation.goBack();
                            }}
                            name="md-arrow-back"
                            size={24}
                            color="white"
                        />
                    }
                />

                <Tile
                    imageSrc={{ uri: coverImg}}
                    title={listDetails.title}
                    featured
                // caption={listDetails.desctiption}
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

                {/* List tracks */}
                {trackList && trackList.length > 0 ? (
                    trackList.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{
                                source: { uri: coverImg !== "" ?  coverImg : null},
                            }}
                            title={l.title}
                            // subtitle={l.subtitle}
                            bottomDivider
                            leftIcon={
                                i === currentSong && isPlaying ? (
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
                ) : null}

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
export default PlaylistDeezerDetailsScreens;
