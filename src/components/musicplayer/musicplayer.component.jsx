import React, {useState,useEffect, }  from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

const MusicPlayer = ({accessToken, trackUri }) => {

const [play, setPlay] = useState(true)
useEffect(() => setPlay(true), [trackUri])

const playerStyles={
  activeColor: 'green',
  bgColor: '#274F63',
  color: '#fff',
  loaderColor: '#fff',
  sliderColor: '#1cb954',
  sliderHandleColor:'#fff',
  trackArtistColor: '#fff',
  trackNameColor: '#fff',
  height: 100,
  sliderTrackBorderRadius:20, 
  loaderSize: 40,
  sliderHeight: 10,
}

  return (
        <SpotifyPlayer
        syncExternalDevice={false}
        initialVolume ={40}
        layout ='responsive'
        styles={playerStyles}
        token={accessToken}
        hideAttribution ={true}
        showSaveIcon
        callback={state => {
          if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
      />
  )
}

export default MusicPlayer;