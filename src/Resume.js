import React from 'react';
import Resume_Teresi from './assets/Resume_Teresi.png'
import DownloadLink from "react-download-link";
const Resume = (props) => {
        return (
      <div justifyContent='center'>   
        <img src={Resume_Teresi} style={{
    display:'block',
    margin: '0 auto',
    flex: 1,
    width: '60%',
    height: '100%',
    resizeMode: 'contain',
    display:'contain',
}} alt="Resume" />
      </div>)
}

export default Resume;
