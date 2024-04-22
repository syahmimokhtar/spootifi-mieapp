import React from "react";
import CardAlbum from "../card/card.component";
import ButtonStyle from '../button/button.component';
import { Flex,  Card } from "antd";
import Typography from "../typography/typography.component";

const { Meta } = Card;
const style={color:'white'}

const PlayList = ({ items }) => {
  return (
      <>
          {items  && items.length > 0 && (
            <Typography level={3}>Playlists</Typography>
          )}
          
          <Flex  style={{padding:'40px'}} wrap="wrap" gap="medium" >
          {items && items.length > 0 && (
            items.map((item, i) => (
              <CardAlbum key={i} cover={<img alt="example" src={`${item.images[0].url}`} />}>
                <Meta   title={<span style={style}>{item.name}</span> }  
                description={<span style={style}> By :{item.owner.display_name} <ButtonStyle target='_target' href={`${item.external_urls.spotify}`}>View</ButtonStyle></span>} 
                />
              </CardAlbum>
            ))
          ) }
        </Flex>
      </>

  );
};

export default PlayList;
