import React, { useEffect, useState } from 'react';
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import MusicPlayer from "../musicplayer/musicplayer.component";
import getToken from '../searchbar/tokenAuth.component'; // Adjust the import path based on your file structure
import ButtonStyle from '../button/button.component';


const ContainerHeight = 400;

const ListResults = ({items}) => {
  
  const [token, setToken] = useState("");
  const [trackUri, setTrackUri] = useState('');

  const data=items.tracks;


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


  const playMusic=(uri)=>
  {
    setTrackUri(uri); 
  }
  

  return (
    <>

        {trackUri && <MusicPlayer accessToken={token} trackUri={trackUri} />}

      <List>
      <VirtualList
          style={{backgroundColor:'#201E1E', padding:'2px'}}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="id"
                data={data}
      >
              {(item) => (
                    <List.Item key={item.id} >
                      <List.Item.Meta
                        avatar={<Avatar shape="square" size={65} style={{  padding:'1px'}} src={`${item.album.images[0].url}`} />}
                        title={<a  style={{color:'#fff'}}>{item.name}</a>}
                        description={<span style={{ color: 'white' }}>{item.album.artists[0].name}</span>}
                      />
                      <div style={{color:'#fff'}}><ButtonStyle onClick={()=>playMusic(item.uri)}>Play</ButtonStyle></div>
                    </List.Item>
        )}

      </VirtualList>


      </List>
    </>


  //   <List>
 

  //   <VirtualList
  //     style={{
  //       backgroundColor:'#5B5B5B', padding:'2px'
  //     }}
  //     data={data}
  //     height={ContainerHeight}
  //     itemHeight={47}
  //     itemKey="email"
  //    // onScroll={onScroll}
  //   >
  //     {(item) => (
  //       <List.Item key={item.email} style={{        color:'#fff'      }}>
  //         <List.Item.Meta
  //           avatar={<Avatar shape="square" size={50} style={{  padding:'1px'}} src={item.picture.large} />}
  //           title={<a  style={{color:'#fff'}} href="https://ant.design">{item.name.last}</a>}
  //           description="song title"
  //         />
          
  //       </List.Item>
  //     )}
  //   </VirtualList>

  // </List>
  )
}

export default ListResults