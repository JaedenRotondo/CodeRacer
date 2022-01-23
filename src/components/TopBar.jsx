import React from 'react';
import './TopBar.css';

function TopBar () {

  return (
    <section className="navBar">
      <div className="logoName">
        <div>Code&nbsp;Runner</div>
        <div><img src="../run.png" className = "logo"></img></div>
      </div>
      <div className="nav-links">
        <a href="google.com">Home</a>
      </div>
      <div className="nav-links">
        <a href="google.com">Game</a>
      </div>
      <div className="nav-links">
        <a href="google.com">Achievements</a>
      </div>
      <div className="nav-links">
        <a href="google.com">Contact&nbsp;Us</a>
      </div>
    </section>
  );
  
}

export default TopBar;