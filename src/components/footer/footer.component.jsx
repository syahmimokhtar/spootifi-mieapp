import React  from "react";
import './footer.styles.scss'
import TypoStyles from "../typography/typography.component";
import { Layout } from 'antd';
const { Footer} = Layout;

const footerStyle = {textAlign: 'center',color: '#fff',backgroundColor: '#151313',padding:'5px' };

const FooterWeb=({children, ...otherProps})=>
{
    return (
   
    <Footer style={footerStyle}>
      <TypoStyles style={{textAlign:'center', color:'white'}} level={3} >&copy; Syahmi Mokhtar 2024.All rights reserved.</TypoStyles>
    </Footer>

    )
}

export default FooterWeb;

