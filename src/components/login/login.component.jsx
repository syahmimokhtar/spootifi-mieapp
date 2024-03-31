import React, { useState, useEffect } from "react";
import ButtonStyle from "../button/button.component";
import axios from "axios";

const clientId = process.env.REACT_APP_API_KEY;

const urlParams = new URLSearchParams(window.location.search);
var url;

if (urlParams.toString().includes("localhost:3000")) {
  url=`http://localhost:3000`
} else {
  url=`https://syahmimokhtar.github.io/spootifi-mieapp`;
}


const misc=`&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${url}&response_type=token${misc}`;

const Login = () => {
  const [token, setToken] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [lyrics, setLyrics] = useState("")


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

    const getProfile = async () => {
      try {
        const headers = {
          Authorization: "Bearer " + token,
        };

        //get albums, playlist , artist,track
        var urlData = `https://api.spotify.com/v1/me`;
        const response = await axios.get(urlData, { headers });
        const profileData = response.data;
        return profileData;
      } catch (error) {
        console.log(error);
      }
    };


    const fetchData = async () => {
      try {
        const data = await getProfile(token);
        setProfileData(data);
      } catch (error) {
        // Handle errors
      }
    };

    fetchData(token);
  }, []);


  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = AUTH_URL;
  };

  return (
    <> 
      {!token ? (
        <ButtonStyle  size="large"type="primary"  htmlType="button" onClick={handleLogin}>Login</ButtonStyle>
      ) : (
        <ButtonStyle  size="large"type="primary"  htmlType="button" onClick={handleLogout}>Logout</ButtonStyle>
        
      )}

    </>

    
  );
};



export default Login;

      {/* <div>{profileData ? profileData.display_name : ""}</div> */}
