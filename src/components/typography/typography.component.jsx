import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;

const style={
    color:"white"
}
const TypoStyles = ({children, ...otherProps}) => {
  return (
    <div>
         <Title style={style} {...otherProps}>{children}</Title>
    </div>
  )
}

export default TypoStyles;