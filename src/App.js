import React, { useState , useEffect} from "react";
import "./App.css";
import HeaderWeb from "./components/header/header.component";
import FooterWeb from "./components/footer/footer.component";
import SearchBar from "./components/searchbar/searchbar.component";
import Albums from "./components/searchresults/albums.component";
import ArtistListTracks from "./components/searchresults/tracks.component";
import PlayList from "./components/searchresults/playlist.component";
import AboutArtist from "./components/searchresults/aboutartist.component";
import Login from "./components/login/login.component";
import Artists from "./components/searchresults/artist.component";
import Genre from "./components/searchresults/genre.component";

import getToken from "./components/searchbar/tokenAuth.component";
import axios from "axios";

import { Flex, Row,Col,  Layout } from "antd";

const {  Content } = Layout;
const layoutStyle = {
  width:"96%",
  maxWidth: "100%",
  minHeight: "100vh",
  margin:'auto',
};
const contentStyle = {
  margin: "10px",
  padding: "5px",
  backgroundColor: "#151313",
  color: "white",
  textAlign: "center",
  fontSize: "20px",
  maxWidth: "100%",
};


const capitalizeAll=(string)=>
  {
    return string.toUpperCase();
  }
  
  


function App() {

  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    getToken()
      .then((accessToken) => setAccessToken(accessToken))
      .catch((error) => console.error("Error setting access token:", error));
  }, [])



  // const handleGenres=async()=>
  //   {   
  //     try{
  //       const headers = {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + accessToken,
  //       };

  //       const urlData = `https://api.spotify.com/v1/recommendations/available-genre-seeds`;
  //       const response = await axios.get(urlData, { headers });
  //       console.log('searched genre', response.data.genres);
  //       setGenre(response.data.genres)

  //     }catch(error)
  //     {
  //       console.log('error', error)
  //     }

  //   }

  //   useEffect(()=>
  //     { 
  //       handleGenres();
  //     },[])



  const fetchAlbums = async (searchKey) => {
    try {
      if (searchKey.trim() === "") { return }

      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      const trimSearchKey = capitalizeAll(searchKey);

      const urlData = `https://api.spotify.com/v1/search?q=${trimSearchKey}&type=show,artist,track,album,playlist&limit=5&sort=popularity`;
      const response = await axios.get(urlData, { headers });
      console.log('searched data', response.data);
      setPlaylists(response.data.playlists.items);

      const cleanResponse = response.data.artists.items.sort((a, b) => b.popularity - a.popularity);
      const elementID = cleanResponse[0].id;

      const artistResponse = `https://api.spotify.com/v1/artists/${elementID}`;
      const artistData = await axios.get(artistResponse, { headers });
      setArtistInfo(artistData.data);

      const urlTrack = `https://api.spotify.com/v1/artists/${elementID}/top-tracks`;
      const responseTrack = await axios.get(urlTrack, { headers });
      setTracks(responseTrack.data.tracks);
      console.log(responseTrack.data.tracks)

      const relatedArtistsResponse = `https://api.spotify.com/v1/artists/${elementID}/related-artists`;
      const responseArtists = await axios.get(relatedArtistsResponse, { headers });
      setRelatedArtists(responseArtists.data.artists);

      if (response.data && response.data.albums && response.data.albums.items) {
        setAlbums(response.data.albums.items);
      } else {
        setAlbums([]);
      }
    } catch (error) {
      console.log("Error fetching albums:", error);
    }
  };
   

  return (

    


    <Layout style={layoutStyle}>
      <Layout>
        
        <HeaderWeb >
        <Flex justify="center" align="center">
          <SearchBar
            onSearch={fetchAlbums}
          />
         <Login /> 
          
        </Flex>


      </HeaderWeb >
        
      
        <Layout style={{ maxWidth: "100%", background: "#151313", padding: "10px" }}>
            <Row>
              <Genre items={genre} />
              <Col span={32}>
                  <Content style={contentStyle}>
                  <AboutArtist items={artistInfo} />
                </Content>
              </Col>
             
              <Content style={contentStyle}>
                <ArtistListTracks items={tracks} />
              </Content>
            </Row>

        </Layout>

        <Layout style={{ background: "#151313" }}>
          <Row>
            <Content style={contentStyle}>
              <Albums items={albums} />
            </Content>
          </Row>

          <Content style={contentStyle}>
            
            <PlayList items={playlists} />
          </Content>

          <Content style={contentStyle}>
            <Artists items={relatedArtists} />
          </Content>
        </Layout>




        <FooterWeb />
      </Layout>
    </Layout>
  );
}

export default App;
