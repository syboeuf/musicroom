import userApi from "../api/user";
import authHeader from "../api/authHeader";
import { Alert } from "react-native";
import React from "react";

const saveUserInfoService = async (datauser, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await userApi.post(`/users/update`, datauser, {
        headers: authHeader(token),
      });
      const { data, code } = response.data;
      if (code === 200) {
        Alert.alert("User information updated with succes !")
        resolve(data);
      } else {
        Alert.alert(data.msg);
      }
    } catch (error) {
      console.log(error, " error");
      reject(error);
    }
  });
};

const saveUserEmailService = async (email, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await userApi.post(
        `/users/updateEmail`,
        { email },
        {
          headers: authHeader(token),
        }
      );
      const { data, code } = response.data;
      if (code === 200) {
        Alert.alert("Email updated with succes !")
        resolve(data);
      } else {
        Alert.alert(data.msg);
      }
    } catch (error) {
      console.log(error, " error");
      reject(error);
    }
  });
};

const saveUserPasswordService = async (password, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await userApi.post(
        `/users/updatePassword`,
        { password },
        {
          headers: authHeader(token),
        }
      );
      const { data, code } = response.data;
      console.log(response.data);
      if (code === 200) {
        Alert.alert("Password updated with succes !")
        resolve(data);
      } else {
        Alert.alert(data.msg);
      }
    } catch (error) {
      console.log(error, " error");
      reject(error);
    }
  });
};

const getUserInfoService = async (token, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await userApi.get(`/users/id/${id}`, {
        headers: authHeader(token),
      });
      const { data, code } = response.data;
      if (code === 200) {
        resolve(data);
      } else {
        Alert.alert(data.msg);
      }
    } catch (error) {
      console.log(error, " error");
      reject(error);
    }
  });
};

const isContributorExistService = async (dataContri, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await userApi.post(`/users/contributor`, dataContri, {
        headers: authHeader(token),
      });
      if (response.data.code === 200) {
        resolve(response.data);
      } else {
        Alert.alert(response.data.data.msg);
      }
    } catch (error) {
      console.log(error, " error");
    }
  });
};

export {
  saveUserInfoService,
  getUserInfoService,
  saveUserPasswordService,
  isContributorExistService,
  saveUserEmailService,
};
