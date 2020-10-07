import userApi from "../api/user";
import authHeader from "../api/authHeader";
import { Alert } from "react-native";

const getMyBookmarck = (playlistId, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userApi.post("/bookmark/mybookmarkbyplaylist", { playlistId }, {
                headers: authHeader(token),
            });
            const { code, data } = response.data;
            resolve(code);
        } catch (error) {
            console.log(error, " error");
        }
    });
};

const getMyFavoritList = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userApi.get("/bookmark/mybookmark", {
                headers: authHeader(token),
            });
            const { code, data } = response.data;
            if (code === 200)
                resolve(data.bookmarkArray);
            else {
                Alert.alert("Error", "Sorry, an error occured")
            }
        } catch (error) {
            console.log(error, " error");
        }
    });
};

const addFavoritService = (favData, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userApi.post("/bookmark/new", favData, {
                headers: authHeader(token),
            });
            const { code, data } = response.data;
            resolve(code);
        } catch (error) {
            console.log(error, " error");
        }
    });
}


const rmFavoritService = (favData, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userApi.post("/bookmark/delete", favData, {
                headers: authHeader(token),
            });
            const { code, data } = response.data;
            resolve(code);
        } catch (error) {
            console.log(error, " error");
        }
    });
}

export {
    getMyBookmarck,
    rmFavoritService,
    getMyFavoritList,
    addFavoritService
};
