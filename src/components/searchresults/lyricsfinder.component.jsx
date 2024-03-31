import React from 'react'
import lyricsFinder from "@jeve/lyrics-finder";


const LyricsFinder = () => {
 
    const Songx=()=>{
        lyricsFinder.LyricsFinder("tanpa rasa bersalah").then((data) => {
            console.log(data);
          });
          
    }

  return (
    <>{Songx()}</>
  )
}

export default LyricsFinder;