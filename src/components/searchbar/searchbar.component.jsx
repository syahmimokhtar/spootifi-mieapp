import React, { useEffect, useState } from "react";
import "./searchbar.styles.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col, Space } from "antd";
import axios from "axios";
import getToken from "./tokenAuth.component";
// import Login from "../login/login.component";

 //capitalize searched
 const capitalize = (str) => {
  var string= str.split(" ");
  var converted = string.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  var finalWord = converted.join(" ");
  return finalWord;
};


const SearchBar = ({
  setAlbums,
  setTracks,
  setPlaylists,
  setRelatedArtists,
  setArtistInfo,
  setGenre
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    getToken()
      .then((accessToken) => setAccessToken(accessToken))
      .catch((error) => console.error("Error setting access token:", error));
  }, []);




  // useEffect(() => {
  //   const fetchGenres = async () => {
  //     try {


  //       const headers = {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + accessToken,
  //       };
  //         const urlGenre=`https://api.spotify.com/v1/recommendations/available-genre-seeds`;
  //         const responseData = await axios.get(urlGenre, {headers});
  //         const { genres } = responseData.data;
  //         // Update state with the genre data
  //         console.log(genres)
  //         setGenre(genres);
  //     } catch (error) {
  //       console.error('Error fetching genres:', error);
  //     }
  //   };

  //   fetchGenres();
  // });// Empty dependency array means this effect runs only once, on mount



  const fetchAlbums = async (searchKey) => {
    try {

      if(searchKey.trim()===""){
        return
      }
      
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };

      const trimSearchKey = capitalize(searchKey);

      

      //get albums, playlist , artist,track
      var urlData = `https://api.spotify.com/v1/search?q=${trimSearchKey}&type=show,artist,track,album,playlist&limit=10&market=ES&sort=popularity`;
      const response = await axios.get(urlData, { headers });
       console.log('searched', response.data)
      const playlistData = response.data.playlists.items;
      setPlaylists(playlistData);

      //search artist name and get the artist id
      var element=response.data.artists.items.find(item=>item.name===(`${trimSearchKey}`))
      var elementID;

      if(!element){
        console.log('artis tak dapat cari so search lagu')
        var search=response.data.tracks.items.find(item=>item.name===(`${trimSearchKey}`))
        if(search){
           elementID=search.artists[0].id;
           console.log(search)
        }
        else{
          console.log('couldnt find')
          elementID=response.data.artists.items[0].id;
          // return;
        }
      }

      else if(element){
         console.log('carian artis wujud')
         elementID=element.id;
      }


    
      // get artist info
      var artistID = elementID;
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



  const handleChange = (event) => {
    let value = event.target.value;
    setSearchValue(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await fetchAlbums(searchValue);
      setSearchValue("");
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (

    // <Row gutter={[16, 16]} justify="center">
    //     <Col span={24} />
        <Form name="search-form"  onSubmit={handleSearch}>
          <Space.Compact
            style={{
              width: "100%",
              margin: "10px 10px ",
              padding: "20px 14px",
            }}
          >
            <Input
              style={{
                width: "100%",
                color: "white",
                backgroundColor: "#201E1E",
                border: "1px solid white",
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
            > </Button>

            {/* <Button
              size="medium"
              type="primary"
              onClick={onReset}
              style={{ backgroundColor: "#35B86B" }}
              htmlType="button"
              icon={<UndoOutlined />}
            ></Button> */}


          </Space.Compact>
        </Form>
      //   <Col />
      // </Row>
  );
};

export default SearchBar;

