import React from "react";
import { Card} from "antd";
import "./card.styles.scss";

const cardStyle = {
  textAlign: 'center',
  width: 200,
  margin:10, 
  padding:'5px',
  overflow:'visible',
  backgroundColor:'#302E2E',
  border:'none',
  color:'#fff',
};



const CardAlbum = ({ children, ...otherProps }) => {
  return (
        <Card style={cardStyle}
          hoverable
          {...otherProps}
          className="custom-card"
        >
          {children}
        </Card>
  );
};

export default CardAlbum;
