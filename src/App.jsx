import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

const App = () => {
  const [language, setLanguage] = useState(""); // Initial value is an empty string

  const handleChange = (event) => {
    setLanguage(event.target.value); // Updates the state with the selected value
  };

  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: language });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  useEffect(() => {
    setTextToCopy(transcript);
  }, [transcript]);

  return (
    <>
      <div className="container">
        <h2>Speech to text</h2>
        <p>
          A React hook that converts speech from the microphone to text and
          makes it available to your React components.
        </p>

        <p>Microphone: {listening ? "on" : "off"}</p>

        <div className="container-1">
          <select
            className="styled-select"
            value={language}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a language...
            </option>
            <option value="en-IN">English</option>
            <option value="ta-IN">Tamil</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>

        <textarea
          name="text"
          className="main-content"
          value={transcript}
          onChange={(e) => setTextToCopy(e.target.value)}
        >
          {transcript}
        </textarea>

        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>

          <button onClick={startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
        </div>
      </div>
    </>
  );
};

export default App;
