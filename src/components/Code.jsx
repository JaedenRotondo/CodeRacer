import React, {useState, useEffect, currIndex, correct } from 'react';
import './Code.css';

const Code = ({randomString, currIndex, correct}) => {

  const itemStyle0 = {}

  const itemStyle1 = {
    color: 'green',
  }
  
  const itemStyle2 = {
    color: 'red',
  }

  return (<div className="codeLine">{randomString.split("").map((item, index) => {
    return item == " " ? <h1 key={index} className={`item${index}`} style={(index < currIndex) ? itemStyle1 : (index > currIndex) ? itemStyle0 : correct=="true" ? itemStyle1: itemStyle2}>&nbsp;</h1> :
    <h1 key={index} className={`item${index}`} style={(index < currIndex) ? itemStyle1 : (index > currIndex) ? itemStyle0 : correct=="true" ? itemStyle1: itemStyle2}>{item}</h1>
  })}</div>)
};

export default Code;