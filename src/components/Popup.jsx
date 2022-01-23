import React from "react";
import './Popup.css';
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <h1>Game Over</h1>
        <div className="container">
          <h3>{"Time: " + props.timeDisplayed}</h3>
          <h3>{"WPS: " + props.wpmDisplayed}</h3>
          <h3>{"Error: " + props.errorDisplayed}</h3>
        </div>
        <button className="closeButton" onClick={props.handleClose}>close</button>
      </div>
    </div>
  );
};
 
export default Popup;