import React, { useState, useEffect } from "react";
import ButtonStyle from "../button/button.component";
import {  Avatar, Flex, Row, Col } from 'antd';
import axios from "axios";


const clientId = process.env.REACT_APP_API_KEY;
var urlHost;
const currentUrl = window.location.href;
const url = new URL(currentUrl);
const host = url.host;

// Check if the host contains "localhost"
if (host.includes("localhost:3000")) {
  urlHost = `http://localhost:3000`;
} else {
  urlHost = `https://syahmimokhtar.github.io/spootifi-mieapp`;
}

const misc = `&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${urlHost}&response_type=token${misc}`;

const Login = () => {
  const [token, setToken] = useState("");
  const [profileData, setProfileData] = useState(null);


  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);


  }, []);



    //get profile data
  useEffect(()=>
  {
    const getProfile = async () => {
      try {

        if(token){
          console.log('login success...')
          const headers = {
            "Content-Type":"application/json",
            Authorization: "Bearer " + token,
          };
  
          var urlProfile = `https://api.spotify.com/v1/me`;
          const response = await axios.get(urlProfile, { headers });
          const profileData = response.data;
          setProfileData(profileData)
          console.log('profile', profileData);
  
        }
   
      } 
      
      catch (error) {
        console.log('error' , error);
      }
    };

    getProfile();
    
  },[token])

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = AUTH_URL;
  };

  return (
    <>


    <Row justify="flex-start" >
     
    <Col  xs={24} xl={8}>    
      {!token ? (
       
        
        <ButtonStyle size="large" type="primary"htmlType="button" onClick={handleLogin}
        >Login</ButtonStyle>) : 
        
        (
          <ButtonStyle
          size="large"
          type="primary"
          htmlType="button"
          onClick={handleLogout}
          >
          Logout
        </ButtonStyle>
       )}
      </Col>

    </Row>

      
    {profileData && (
      <Row>
        <Col>
          <Avatar size={40} src={profileData.images[0].url} />
        </Col>
        <Col>
          <p style={{ margin: 0 }}>Hello, {profileData.display_name}</p>
        </Col>

      </Row>


    // <div style={{ backgroundColor:'black', margin: "10px", padding:'5px', display: "flex", alignItems: "flex-end" }}>
    //     <p style={{ margin: 0 }}>Hello, {profileData.display_name}</p>
    // </div>
  )}


    </>

  );
};

export default Login;

