import React from 'react';
import DashBoard from './Components/DashBoard';
import {makeSentence, makeBulletSentence, makeBulletSentences} from './utils/SentenceMaker';


function App() {
  // elements.push(...makeSentence(150, 20, "Sentence\nSecond sentence", 10, "red", 10, "LatoWeb", "bold"));
  
  // elements.push(...makeBulletSentences(150, 150, "Sentence*s*Second sentence with new line*s*Second sentence", 10, 20, "red", "black", 10, "LatoWeb", "bold"));
  
  return (
    <div>
      <DashBoard/>
    </div>
  );
}

export default App;
// (x, y, sentence, lineHeigth, color, fontSize, fontCat, fontStyle)