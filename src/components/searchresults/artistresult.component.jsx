import React from "react";
import CardAlbum from "../card/card.component";
import ButtonStyle from "../button/button.component";
import "./result.styles.scss";
import { Flex, Button, Card, Input, Col, Row, Layout, Avatar } from "antd";
const { Meta } = Card;

const style={
  color:'white'
}

const ArtistResult = ({ items }) => {

   var artistData=items.artists;

  return (

    <Flex style={{padding:'40px'}} wrap="wrap" gap="medium">
    {artistData && artistData.length > 0 ? (
      artistData.map((artist, index) => (
        <CardAlbum key={index} size={20} cover={<img alt="example" src={`${artist.images[0].url}`}  style={{height: '150px', objectFit: 'cover' }} />}>
            <Meta    title={<span style={style}>{artist.name} </span>} 

              description={<span><ButtonStyle target='_target' href={`${artist.external_urls.spotify}`}>View</ButtonStyle></span>}
            />
        </CardAlbum>

      ))
    ) : (
      <div>No artists found</div>
    )}
  </Flex>
  );
};

export default ArtistResult;
