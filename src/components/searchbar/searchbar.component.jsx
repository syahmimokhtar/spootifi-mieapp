import React, { useEffect, useState } from "react";
import "./searchbar.styles.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Button,  Space } from "antd";
import axios from "axios";
import getToken from "./tokenAuth.component";
// import Login from "../login/login.component";

 //capitalize searched
//  const capitalize = (str) => {
//   var string= str.split(" ");
//   var converted = string.map(
//     (word) => word.charAt(0).toUpperCase() + word.slice(1)
//   );
//   var finalWord = converted.join(" ");
//   return finalWord;
// };

const capitalizeAll=(string)=>
{
  return string.toUpperCase();
}


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



  const fetchAlbums = async (searchKey) => {
    try {

      if(searchKey.trim()===""){return}
      
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      // const trimSearchKey = capitalize(searchKey);
      const trimSearchKey = capitalizeAll(searchKey);

      
      //get albums, playlist , artist,track
      var urlData = `https://api.spotify.com/v1/search?q=${trimSearchKey}&type=show,artist,track,album,playlist&limit=5&sort=popularity`;
      const response = await axios.get(urlData, { headers });
      console.log('searched data', response.data)
      const playlistData = response.data.playlists.items;
      setPlaylists(playlistData);

      //search artist name and get the artist id
      // var element=response.data.artists.items.find(item=>item.name===(`${trimSearchKey}`))
      var element = response.data.artists.items.filter(item => item.name.toUpperCase() === trimSearchKey);
      var cleanResponse=response.data.artists.items.sort((a, b) => b.followers.total - a.followers.total);
      // console.log('clean array', cleanResponse)
      var elementID;

      if(!element){
        console.log('artis tak dapat cari so search lagu')
        var search=response.data.tracks.items.find(item=>item.name===(`${trimSearchKey}`))
        if(search){
          //  elementID=search.artists[0].id;
           elementID=cleanResponse[0].id;
           console.log(search)
        }
        else{
          console.log('couldnt find anything')
          // elementID=response.data.artists.items[0].id;
          elementID=cleanResponse[0].id;
        }
      }

      //artist found
      else if(element){
         console.log('carian artis wujud')
        //  elementID=element.id;
        elementID=cleanResponse[0].id;

      }


    
      // get artist info
      var artistID = elementID;
      const artistResponse = `https://api.spotify.com/v1/artists/${artistID}`;
      const artistData = await axios.get(artistResponse, { headers });
      const artistInfo = artistData.data;
      setArtistInfo(artistInfo);

      //get top tracks of artists
      var urlTrack = `https://api.spotify.com/v1/artists/${artistID}/top-tracks`;
      const responseTrack = await axios.get(urlTrack, { headers });
      var responseTracks = responseTrack.data;
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
              marginRight: "50px",
              padding: "4px",
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
              placeholder="Search artist/song here..."
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

