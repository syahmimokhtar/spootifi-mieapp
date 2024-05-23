import React from "react";
import CardAlbum from "../card/card.component";
import ButtonStyle from "../button/button.component";
import { Flex, Card } from "antd";
import Typography from "../typography/typography.component";

const { Meta } = Card;
const style = { color: 'white' };

const Artists = ({ items }) => {
  return (
    <>
      {items.length > 0 && (
        <>
          <Typography level={3}>Related Artists</Typography>
          <Flex align='flex-start' justify='center' style={{ margin: '20px', padding: '20px' }} wrap="wrap" gap="large">
            {items.map((artist, index) => (
              <CardAlbum key={index} size={20} cover={<img alt="example" src={`${artist.images[0]?.url}`} style={{ height: '150px', objectFit: 'cover' }} />}>
                <Meta title={<span style={style}>{artist.name}</span>}
                  description={<span><ButtonStyle target='_target' href={`${artist.external_urls.spotify}`}>View</ButtonStyle></span>}
                />
              </CardAlbum>
            ))}
          </Flex>
        </>
      )}
    </>
  );
};

export default Artists;
