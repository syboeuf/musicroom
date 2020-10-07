import userApi from "../api/user";
import authHeader from "../api/authHeader";
import { Alert } from "react-native";

const getMyPlayList = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await userApi.get("/playlist/mine", {
        headers: authHeader(token),
      });
      const { code, data } = response.data;
      if (code === 200) {
        resolve(data);
      } else {
        Alert.alert(data.msg);
      }
    } catch (error) {
      console.log(error, " error");
    }
  });
};

const saveNewEventService = (eventData, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await userApi.post("/playlist/event/new", eventData, {
        headers: authHeader(token),
      });
      const { code, data } = response.data;
      if (code === 200) {
        Alert.alert(data.msg);
      } else {
        Alert.alert(data.msg);
      }
    } catch (error) {
      console.log(error, " error");
    }
  });
};

const getAllEventsService = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await userApi.get(`/playlist/getevents`, {
        headers: authHeader(token),
      });
      if (response.data.code === 200) {
        resolve(response.data.data);
      } else {
        Alert.alert(response.data.data.msg);
      }
    } catch (error) {
      console.log(error, " error");
    }
  });
};

const updateTrackLikeEventService = async (id, track, token) => {
  return new Promise(async (resolve, reject) => {
      try {
          let response = await userApi.post(`/playlist/event/likes`, {
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

const getEventByIdService = (id, token) => {
  return new Promise( async (resolve, reject) => {
      try {
          let response = await userApi.get(`/playlist/event/id/` + id,
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


const updateTrackListEventPositionService = (playListId, trackList, token) => {
  return new Promise( async (resolve, reject) => {
      try {
          let data = {
              _id: playListId,
              trackList
          };
          let response = await userApi.post(`/playlist/event/position`, data,
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

const updateEventService = async (data, token) => {
  try {
      let response = await userApi.post(
          `/playlist/event/update`,
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

export { 
  getMyPlayList,
  saveNewEventService,
  getAllEventsService,
  updateTrackLikeEventService,
  getEventByIdService,
  updateTrackListEventPositionService,
  updateEventService
};
