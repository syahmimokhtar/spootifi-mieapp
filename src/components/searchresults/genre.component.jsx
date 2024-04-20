import React from "react";
import CardAlbum from "../card/card.component";
import ButtonStyle from "../button/button.component";
import { Flex, Card, } from "antd";
const { Meta } = Card;
const style={
  color:'white'
}


const Genre = ({items}) => {

  var genre=items;
  
  return (
    <>
    <Flex style={{padding:'40px'}} wrap="wrap" gap="medium">
      {genre && genre.length > 0 &&(
      genre.map((genre, index) => (
        <CardAlbum key={index} size={20} cover={<img alt="example" src={``}  style={{height: '150px', objectFit: 'cover' }} />}>
                <Meta    title={<span style={style}>{genre}</span>} 
                  description={<span><ButtonStyle target='_target' href={``}>View</ButtonStyle></span>}
                />
            </CardAlbum>
        ))
    )}
      </Flex>

 
    </>
  )
}

export default Genre;