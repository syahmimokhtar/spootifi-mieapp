import React from 'react'
import './header.styles.scss'; // Import CSS for styling
import { Layout } from 'antd';
const { Header} = Layout;

const headerStyle = {
  textAlign: 'center',
  width:'100%',
  maxWidth:'100%',
  color: '#fff',
  height: '100px',
  paddingInline:40,
  lineHeight: '100px',
  backgroundColor: '#201E1E',
  padding:1,
  background: "#151313"
};

const HeaderWeb = ({children, ...otherProps}) => {
  return (
  
    <Header style={headerStyle} {...otherProps}>
      {children}
    </Header>
  )
}

export default HeaderWeb;