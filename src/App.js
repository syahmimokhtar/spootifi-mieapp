import React, { useEffect, useState } from "react";
import "./App.css";
import HeaderWeb from "./components/header/header.component";
import FooterWeb from "./components/footer/footer.component";
import SearchBar from "./components/searchbar/searchbar.component";
import Albums from "./components/searchresults/albums.component";
import ArtistListTracks from "./components/searchresults/tracks.component";
import PlayList from "./components/searchresults/playlist.component";
import AboutArtist from "./components/searchresults/aboutartist.component";

import { Row, Col, Layout, Menu } from "antd";
import Artists from "./components/searchresults/artist.component";
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

function App() {
  const [collapsed, setCollapsed] = useState("collapsed");
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);

  return (


    <Layout style={layoutStyle}>
      <Layout>
        <HeaderWeb >
          <SearchBar
            setArtistInfo={setArtistInfo}
            setAlbums={setAlbums}
            setTracks={setTracks}
            setPlaylists={setPlaylists}
            setRelatedArtists={setRelatedArtists}
          />
        </HeaderWeb>

        <Layout style={{ maxWidth: "100%", background: "#151313", padding: "10px" }}>
          <Row>
            <Content style={contentStyle}>
              <AboutArtist items={artistInfo} />
            </Content>
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
