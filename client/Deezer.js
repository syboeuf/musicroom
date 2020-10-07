import axios from "axios";

const deezerAPIUrl = "https://api.deezer.com";

const Deezer = {
  artist: (artistId) => axios.get(`${deezerAPIUrl}/artist/${artistId}`),
  album: (albumId) => axios.get(`${deezerAPIUrl}/album/${albumId}`),
  musicArtistList: (artistId, limit) =>
    axios.get(`${deezerAPIUrl}/artist/${artistId}/top?limit=${limit}`),
  musicAlbumList: (albumId) =>
    axios.get(`${deezerAPIUrl}/album/${albumId}/tracks`),
  searchByArtist: (artist) => axios.get(`${deezerAPIUrl}/search?q=${artist}`),
};

export default Deezer;
