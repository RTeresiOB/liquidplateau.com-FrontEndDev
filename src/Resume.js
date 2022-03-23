import React from 'react';
import Resume_Teresi from './assets/Teresi_Resume_Mar_2022.png'
import DownloadLink from "react-download-link";
const Resume = (props) => {
        return (
      <div style={{justifyContent:'center', display:'block'}}> 
      <p style={{fontFamily:'Avenir', textAlign:'center', marginBottom:0, marginTop:15, padding:0}}> Download .pdf <a  href="https://drive.google.com/file/d/157ggMhfWXV1VynfFstE69_7Varh1fAia/view">here.</a></p>
        
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
