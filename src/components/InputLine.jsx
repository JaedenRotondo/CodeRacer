import React, { useEffect, useState }  from 'react';

function InputLine ({inputLineValue, handleInputChange, disabled}) {

  return (
      <input type="text" value={disabled ? "Disabled: Please Select Language And Difficulty, Then Press Start To Start Typing" : inputLineValue} onChange = {handleInputChange} disabled={disabled}/>
  );

}

export default InputLine;