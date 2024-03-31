import React, { useEffect, useState } from "react";
import "./App.css";
import HeaderWeb from "./components/header/header.component";
import FooterWeb from "./components/footer/footer.component";
import SearchBar from "./components/searchbar/searchbar.component";
import SearchResults from "./components/searchresults/searchresults.component";
import ListResults from "./components/searchresults/listresults.component";
import PlayList from "./components/searchresults/playlist.component";
import ArtisResult from "./components/searchresults/artistresult.component";
import Player from "./components/musicplayer/musicplayer.component";
import AboutArtist from "./components/searchresults/aboutartist.component";
import Login from "./components/login/login.component";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Row, Col, Layout, Menu } from "antd";
import ArtistResult from "./components/searchresults/artistresult.component";
const { Sider, Content } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
];

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
              Top Tracks
              <ListResults items={tracks} />
            </Content>
          </Row>
        </Layout>

        <Layout style={{ background: "#151313" }}>
          <Row>
            <Content style={contentStyle}>
              Albums
              <SearchResults items={albums} />
            </Content>
          </Row>

          <Content style={contentStyle}>
            Playlists
            <PlayList items={playlists} />
          </Content>

          <Content style={contentStyle}>
            Related Artists
            <ArtistResult items={relatedArtists} />
          </Content>
        </Layout>




        <FooterWeb />
      </Layout>
    </Layout>
  );
}

export default App;
