import React from "react";
import CardAlbum from "../card/card.component";
import { Flex} from "antd";
import ButtonStyle from "../button/button.component";
import Typography from "../typography/typography.component";

const style={
  color:'white'
}

const Albums = ({ items }) => {
  return (

    <>
    {items  && items.length > 0 && (
      <Typography level={3}>Albums</Typography>
    )}
      <Flex style={{ padding: '40px' }} wrap="wrap" gap="medium" direction="row">
        {items && items.length > 0 && (
          items.map((item, index) => (
            <CardAlbum key={index} cover={<img alt="example" src={`${item.images[0].url}`} />}>
              <div>
                <span style={style}>{item.name}-{item.release_date.substring(0, 4)}</span>
                <span><ButtonStyle href={`${item.external_urls.spotify}`} target="_blank">View</ButtonStyle></span>
              </div>
            </CardAlbum>
          ))
        )}
      </Flex>
    </>

  );
};


export default Albums;
