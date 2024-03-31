import axios from 'axios';

const getToken = async () => {
  const clientId = process.env.REACT_APP_API_KEY;
  const clientSecret =  process.env.REACT_APP_API_SECRET;

  const params = new URLSearchParams({
    grant_type: `client_credentials`,
    client_id: clientId,
    client_secret: clientSecret,
  });

  
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const url = `https://accounts.spotify.com/api/token`;

  try {
    const response = await axios.post(url, params.toString(), { headers });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify token:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};
export default getToken;
