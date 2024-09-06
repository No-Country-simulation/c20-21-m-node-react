import React from 'react';
import { Link } from 'react-router-dom';
import './landing.styles.css'

export const LandingPage = ()=> {
  return (
    <div className="landing-page">
      <h1 className='titulo-landing'>BIENVENID@S POPMARKET</h1>
      <Link to="/home">
        <button className="landing-button">ENTER</button>
      </Link>
    </div>
  );
}
