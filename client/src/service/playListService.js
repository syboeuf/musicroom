import React from "react";
import {
    Alert,
} from "react-native";

import userApi from "../api/user";
import authHeader from "../api/authHeader";

const savePlayListService = async (data, token) => {
    try {
        let response = await userApi.post(
            `/playlist/new`,
            data,
            {
                headers: authHeader(token)
            }
        );
        if (response.data.code === 200) {
            Alert.alert("Confirmation", response.data.data.msg)
        } else {
            Alert.alert(response.data.data.msg)
        }
    } catch (error) {
        console.log(error, " error");
    }
}

const getAllPlayListService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userApi.get(`/playlist/getlist`,
                { headers: authHeader(token) });
            if (response.data.code === 200) {
                resolve(response.data.data);
            } else {
                Alert.alert(response.data.data.msg)
            }
        } catch (error) {
            console.log(error, " error");
        }
    })
}

const updateTrackLikeService = async (id, track, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userApi.post(`/playlist/likes`, {
                id,
                track
            },
                { headers: authHeader(token) });
            if (response.data.code === 200) {
                resolve(response.data.data);
            } else {
                Alert.alert(response.data.data.msg)
            }
        } catch (error) {
            console.log(error, " error");
        }
    })
}

const getPlaylistByidService = (id, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userApi.get(`/playlist/id/` + id,
                { headers: authHeader(token) });

            console.log("response :", response.data);
            if (response.data.code === 200) {
                resolve(response.data.data);
            } else {
                Alert.alert(response.data.data.msg)
            }
        } catch (error) {
            console.log(error, " error");
        }
    })
}


const updateTrackListPositionService = (playListId, trackList, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {
                _id: playListId,
                trackList
            };
            let response = await userApi.post(`/playlist/position`, data,
                { headers: authHeader(token) });

            console.log("response :", response.data);
            if (response.data.code === 200) {
                resolve(response.data.data);
            } else {
                Alert.alert(response.data.data.msg)
            }
        } catch (error) {
            console.log(error, " error");
        }
    })
}

const updatePlayListService = async (data, token) => {
    try {
        let response = await userApi.post(
            `/playlist/update`,
            data,
            {
                headers: authHeader(token)
            }
        );
        if (response.data.code === 200) {
            Alert.alert("Confirmation", response.data.data.msg)
        } else {
            Alert.alert(response.data.data.msg)
        }
    } catch (error) {
        console.log(error, " error");
    }
}

const getUserById = async (id, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userApi.get(
                `/users/id/` + id,
                {
                    headers: authHeader(token)
                }
            );
            if (response.data.code === 200) {
                resolve(response.data.data.user)
            } else {
                Alert.alert(response.data.data.msg)
            }
        } catch (error) {
            console.log(error, " error");
        }
    })
}

const getDeezerUserTracks = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userApi.get(
                `https://api.deezer.com/user/me/tracks?access_token=` + token,
            );
                resolve(response)
        } catch (error) {
            console.log(error, " error");
        }
    })
}

const getDeezerTracksList = async (url, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userApi.get(
                url + `?access_token=` + token,
            );
                resolve(response)
        } catch (error) {
            console.log(error, " error");
        }
    })
}


export {
    updateTrackListPositionService,
    getDeezerUserTracks,
    savePlayListService,
    getDeezerTracksList,
    getPlaylistByidService,
    updateTrackLikeService,
    getUserById,
    updatePlayListService,
    getAllPlayListService
}