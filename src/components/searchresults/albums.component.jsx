import React from "react";
import CardAlbum from "../card/card.component";
import { Flex, Button, Card, Input, Col, Row, Layout } from "antd";
import ButtonStyle from "../button/button.component";
const { Meta } = Card;

const style={
  color:'white'
}

const Albums = ({ items }) => {
  return (
      <>
          <Flex   style={{ padding:'40px'}} wrap="wrap" gap="medium" direction="row">
          {items && items.length > 0 && (
            items.map((item, index) => (
              <>
                <CardAlbum key={index} cover={<img alt="example" src={`${item.images[0].url}`} />}>
                <Meta  title={<span style={style}> {item.name}-{item.release_date.substring(0, 4)}</span>}  
                description={<span><ButtonStyle href={`${item.external_urls.spotify}`} target="_blank" >View</ButtonStyle></span>}
                />
              </CardAlbum>
              </>
            ))
          ) }
        </Flex>
      </>

  );
};

export default Albums;
