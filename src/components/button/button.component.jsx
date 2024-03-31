import React from 'react'
import { Button } from "antd";
import { SpotifyOutlined } from "@ant-design/icons";

const buttonStyle={ backgroundColor: "#35B86B" , color:'#fff' , border:'none'}


const ButtonStyle = ({children, ...otherProps}) => {
  return (
    <Button  type="primary" style={buttonStyle} { ...otherProps}>
        {children}<SpotifyOutlined />
    </Button>
  )
}

export default ButtonStyle;