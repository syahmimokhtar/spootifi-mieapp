import React, { useEffect, useState } from "react";
import "./searchbar.styles.scss";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col, Space } from "antd";
import axios from "axios";
import getToken from "./tokenAuth.component";
import Login from "../login/login.component";
import LyricsFinder  from "../searchresults/lyricsfinder.component";


const SearchBar = ({
  setAlbums,
  setTracks,
  setPlaylists,
  setRelatedArtists,
  setArtistInfo,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    getToken()
      .then((accessToken) => setAccessToken(accessToken))
      .catch((error) => console.error("Error setting access token:", error));
  }, []);

  const capitalize = (str) => {
    var str = str.split(" ");
    var converted = str.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    var finalWord = converted.join(" ");
    return finalWord;
  };

  const fetchAlbums = async (searchKey) => {
    try {

      if(searchKey.trim()==""){
        return
      }
      
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };

      const trimSearchKey = capitalize(searchKey);
      console.log(trimSearchKey);

      //get albums, playlist , artist,track
      var urlData = `https://api.spotify.com/v1/search?q=${trimSearchKey}&type=show,artist,track,album,playlist&limit=10&market=ES`;
      const response = await axios.get(urlData, { headers });
      //  console.log('searched', response.data)
      const playlistData = response.data.playlists.items;
      setPlaylists(playlistData);

      //search artist name and get the artist id
      // var element=response.data.albums.items[0].name.find(item=>item.name===`${trimSearchKey}`)
      var element=response.data.artists.items.find(item=>item.name===`${trimSearchKey}`)
      var elementID;
      if(element){
        elementID=element.id
      }

      else if(!element){
        var element2=response.data.tracks.items.find(item=>item.name.includes(`${trimSearchKey}`))
        elementID=element2.artists[0].id
      }

      else{
        console.log('could not search')
      }



      var artistID = elementID;
      // get artist info
      const artistResponse = `https://api.spotify.com/v1/artists/${artistID}`;
      const artistData = await axios.get(artistResponse, { headers });
      const artistInfo = artistData.data;
      // console.log(artistInfo)
      setArtistInfo(artistInfo);

      //get top tracks of artists
      var urlTrack = `https://api.spotify.com/v1/artists/${artistID}/top-tracks`;
      const response2 = await axios.get(urlTrack, { headers });
      var responseTracks = response2.data;
      setTracks(responseTracks);

      // get related artists artist info
      const relatedArtistsResponse = `https://api.spotify.com/v1/artists/${artistID}/related-artists`;
      const responseArtists = await axios.get(relatedArtistsResponse, {
        headers,
      });
      setRelatedArtists(responseArtists.data);

      // Check if albums are present in the response
      if (response.data && response.data.albums && response.data.albums.items) {
        setAlbums(response.data.albums.items);
      } else {
        setAlbums([]); // No albums found, set albums state to an empty array
      }
    } catch (error) {
      console.log("Error fetching albums:", error);
    }
  };

  const onReset = () => {
    window.location.reload();
  };

  const handleChange = (event) => {
    let value = event.target.value;
    setSearchValue(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await fetchAlbums(searchValue);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={10} />
      <Form name="search-form" layout="vertical" onSubmit={handleSearch}>
        <Space.Compact
          style={{
            width: "100%",
            margin: "20px",
          }}
        >
          <Input
            style={{
              width: "100%",
              color: "white",
              backgroundColor: "#201E1E",
              border: "none",
            }}
            onChange={handleChange}
            placeholder="Search here..."
          />
          <Button
            size="large"
            type="primary"
            onClick={handleSearch}
            style={{ backgroundColor: "#35B86B" }}
            htmlType="submit"
            icon={<SearchOutlined />}
          ></Button>

          <Button
            size="large"
            type="primary"
            onClick={onReset}
            style={{ backgroundColor: "#35B86B" }}
            htmlType="button"
            icon={<UndoOutlined />}
          ></Button>
          {/* <LyricsFinder />  */}

          <Login/>


        </Space.Compact>
      </Form>
      <Col />
    </Row>
  );
};

export default SearchBar;

