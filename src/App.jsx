import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import InputLine from './components/InputLine';
import Code from './components/Code';
import Popup from './components/Popup';
import './App.css';

function App() {
  const JavaCode = [`public class HelloWorld { public static void main(String[] args) { System.out.println("Hello World!"); } }`, `public static void main(String[] args) { Scanner reader = new Scanner(System.in); System.out.println("Enter a number: "); int number = reader.nextInt(); System.out.println("You entered: " + number); }`]

  const JavaScriptCode = [`function myFunction() { document.getElementById("frm1").submit(); }`, `function myFunction() { document.getElementById("frm1").reset(); }`]

  const PythonCode = [`print('Hello, world!')`, `print('The sum of {0} and {1} is {2}'.format(num1, num2, sum))`]

  const CPPCode = [`#include <iostream> using namespace std; int main() { cout << "Hello World!"; return 0; }`, `#include <iostream> using namespace std; int main() { cout << "Hello World!"; return 0; } #include <iostream> using namespace std; int main() { cout << "Hello World!"; return 0; }`]

  const SpeedDict = {"Easy": 10, "Medium": 20, "Hard": 50, "Runner": 10};
  
  const [currChar, setCurrChar] = useState("");
  const [typed, setTyped] = useState("");
  const [time, setTime] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [error, setError] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [languageType, setLanguageType] = useState("");
  const [randomString, setRandomString] = useState("");
  const [index, setIndex] = useState(-1);
  const [correct, setCorrect] = useState("empty");
  const [inputLineValue, setInputLineValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [runnerPos, setRunnerPos] = useState(40);
  const [rocketPos, setRocketPos] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState([]);

  useEffect(() => {
    const timeInterval = 100;
    if (index + 1 > randomString.length) {
      newRandomString();
    }
    let myInterval = setInterval(() => {
      if (startTimer) {
        if (rocketPos >= runnerPos) {
          const timeDisplayed = Math.floor(time);
          const wpmDisplayed = Math.ceil(60* typed.length / 5 / time);
          const errorDisplayed = error;
          setPopupContent([timeDisplayed, wpmDisplayed, errorDisplayed]);
          setIsOpen(true);
          reset();
          return;
        }
        setTime(time + 1/timeInterval);
        setRocketPos(rocketPos+SpeedDict[difficulty]/timeInterval);
      }
    }, 1000/timeInterval)
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleInputChange = (e) => {
    setInputLineValue(e.target.value.charAt(e.target.value.length - 1));
    if (correct === "false") {
      if (e.target.value.charAt(e.target.value.length - 1) === randomString[index]) {
        setCorrect("true");
        setRunnerPos(runnerPos+SpeedDict["Runner"]);
      } else {
        if (index < randomString.length) {
          setError(error+1);
        }
      }
    } else {
      if (e.target.value != '') {
        setStartTimer(true);
      }
      setTyped(e.target.value);
      setCurrChar(e.target.value.charAt(e.target.value.length - 1));
      setIndex(index+1);
      if (e.target.value.charAt(e.target.value.length - 1) === randomString[index+1]) {
        setCorrect("true");
        setRunnerPos(runnerPos+SpeedDict["Runner"]);
      } else {
        if (index + 1 < randomString.length) {
          setCorrect("false");
          setError(error+1);
        }
      }
    }
  }

  const handleLanguageTypeClick = (e) => {
    reset();
    setLanguageType(e.target.value);
    switch (e.target.value) {
      case "Java":
        setRandomString(JavaCode[Math.floor(Math.random() * JavaCode.length)]);
        break;
      case "Python":
        setRandomString(PythonCode[Math.floor(Math.random() * PythonCode.length)]);
        break;
      case "JavaScript":
        setRandomString(JavaScriptCode[Math.floor(Math.random() * JavaScriptCode.length)]);
        break;
      case "C++":
        setRandomString(CPPCode[Math.floor(Math.random() * CPPCode.length)]);
        break;
      default:
        setRandomString("");
    }
  }

  const handleDifficultyTypeClick = (e) => {
    setDifficulty(e.target.value);
  }

  const handleStartClick = () => {
    if (languageType && difficulty) {
      setDisabled(false);
    }
  }
  const handleEndClick = () => {
    const timeDisplayed = Math.floor(time);
    const wpmDisplayed = Math.ceil(60* typed.length / 5 / time);
    const errorDisplayed = error;
    setPopupContent([timeDisplayed, wpmDisplayed, errorDisplayed]);
    setIsOpen(true);
    reset();
  }

  const newRandomString = () => {
    setIndex(-1);
    setCorrect("empty");
    switch (languageType) {
      case "Java":
        setRandomString(JavaCode[Math.floor(Math.random() * JavaCode.length)]);
        break;
      case "Python":
        setRandomString(PythonCode[Math.floor(Math.random() * PythonCode.length)]);
        break;
      case "JavaScript":
        setRandomString(JavaScriptCode[Math.floor(Math.random() * JavaScriptCode.length)]);
        break;
      case "C++":
        setRandomString(CPPCode[Math.floor(Math.random() * CPPCode.length)]);
        break;
      default:
        setRandomString("");
    }
  }

  const reset = () => {
    setCurrChar("");
    setTyped("");
    setTime(0);
    setStartTimer(false);
    setError(0);
    setDifficulty("");
    setLanguageType("");
    setRandomString("");
    setIndex(-1);
    setCorrect("empty");
    setInputLineValue("");
    setDisabled(true);
    setRunnerPos(40);
    setRocketPos(0);
  }

  const togglePopup = () => {
    setIsOpen(false);
  }

  return (
    <main>
      <section className="display">

        <div className="section">
          <TopBar />
          <hr />
        </div>

        <div className="section">
          <div className="Languages">
            <div className="JavaScript">
              <button value={"JavaScript"} onClick={e => handleLanguageTypeClick(e)}> JavaScript </button>
            </div>
            <div className="Java">
              <button value={"Java"} onClick={e => handleLanguageTypeClick(e)}> Java </button>
            </div>
            <div className="Python">
              <button value={"Python"} onClick={e => handleLanguageTypeClick(e)}> Python </button>
            </div>
            <div className="C++">
              <button value={"C++"} onClick={e => handleLanguageTypeClick(e)}> C++ </button>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="Difficulty">
            <div className="Easy">
              <button id = "button" value={"Easy"} onClick={e => handleDifficultyTypeClick(e)}> Easy </button>
            </div>
            <div className="Medium">
              <button value={"Medium"} onClick={e => handleDifficultyTypeClick(e)}> Medium </button>
            </div>
            <div className="Hard">
              <button value={"Hard"} onClick={e => handleDifficultyTypeClick(e)}> Hard </button>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="button-section">
            <div className="TopButtons">
              <h2> TIME: {Math.floor(time)} </h2>
            </div>
            <div className="TopButtons">
              <h2> WPM: {Math.ceil(60* typed.length / 5 / time)}</h2>
            </div>
            <div className="TopButtons">
              <h2> ERRORS: {error} </h2>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="code">
            <Code randomString={randomString} currIndex={index} correct={correct}/>
          </div>
        </div>

        <div className="sprintSection">
          <div className="container">
            <div className="runner">
              <img src="../run.png" className="runner" style={{left: runnerPos + 'px'}}/>
            </div>
            <div className="rocket">
              <img src="../rocket.png" className="rocket"style={{left: rocketPos + 'px'}}/>
            </div>
          </div>
          <hr className="Path"></hr>
        </div>

        <div className="section1">
          <InputLine inputLineValue={inputLineValue} handleInputChange={handleInputChange} disabled={disabled}/>
        </div>

        <div className="section">
          {(() => {
              if (!disabled) {
                return (<div className="End" onClick= {handleEndClick}>
                  <button>End</button>
                </div>)
              } else if (!languageType) {
                return (<div className="Warn">
                  <button>Please Select Language</button>
                </div>)
              } else if (!difficulty) {
                return (<div className="Warn">
                  <button>Please Select Difficulty</button>
                </div>)
              } else {
                return (<div className="Stamina" onClick={handleStartClick}>
                  <button>Start</button>
                </div>)
              }
            })()
          }
        </div>

        {isOpen && <Popup timeDisplayed={popupContent[0]}
          wpmDisplayed = {popupContent[1]}
          errorDisplayed = {popupContent[2]}
          handleClose={togglePopup}/>}

      </section>
    </main>
  );
}

export default App;