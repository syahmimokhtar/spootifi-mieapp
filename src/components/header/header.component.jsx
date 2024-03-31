import React from 'react'
import TypoStyles from "../typography/typography.component";
import './header.styles.scss'; // Import CSS for styling
import { Layout } from 'antd';
const { Header} = Layout;

const headerStyle = {
  textAlign: 'center',
  width:'100%',
  color: '#fff',
  height: '100px',
  paddingInline: 48,
  lineHeight: '100px',
  backgroundColor: '#201E1E',
};

const HeaderWeb = ({children, ...otherProps}) => {
  return (
    // <header className="header">
    //     <div className="title">
    //       <TypoStyles level={2}>Songs Searcher</TypoStyles>
    //     </div>
    // </header>

    <Header style={headerStyle} {...otherProps}>
      {children}
    </Header>
  )
}

export default HeaderWeb;