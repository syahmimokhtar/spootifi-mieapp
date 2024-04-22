import React, { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import VirtualList from "rc-virtual-list";
import MusicPlayer from "../musicplayer/musicplayer.component";
import ButtonStyle from "../button/button.component";
import Typography from "../typography/typography.component";

const ContainerHeight = 400;
const ArtistListTracks = ({ items }) => {
  const [token, setToken] = useState("");
  const [trackUri, setTrackUri] = useState("");
  const [disabled, setDisabled] = useState(false);


  
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  
  useEffect(() => {
    setDisabled(token === null || token === "");
  }, [token]);
  

  const playMusic = (uri) => {
    setTrackUri(uri);
  };

  return (
    <>
      {trackUri && <MusicPlayer accessToken={token} trackUri={trackUri} />}
       
       
      {items.tracks  && (
        <List>
          <VirtualList
            style={{ backgroundColor: "#201E1E", padding: "2px" }}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="id"
            data={items.tracks}
          >
            {(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={65}
                      style={{ padding: "1px" }}
                      src={`${item.album.images[0].url}`}
                    />
                  }
                  title={<a style={{ color: "#fff" }}>{item.name}</a>}
                  description={
                    <span style={{ color: "white" }}>
                      {item.album.artists[0].name}
                    </span>
                  }
                />
      
             
                <div style={{ color: "#fff" }}>
                  <ButtonStyle  disabled={disabled} onClick={() => playMusic(item.uri)}>
                    Play
                  </ButtonStyle>
                </div>


              </List.Item>
            )}
          </VirtualList>
          <Typography style={ {fontStyle:'italic', color:'white'} } level={5}>*In order to play the music, you need to login with  a premium spotify account</Typography>
        </List>
      ) }
    </>
  );
};

export default ArtistListTracks;
