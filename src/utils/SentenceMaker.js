import Types from './Types.jsx';
const lineSplitter = '*l*';
const sentenceSplitter = '*s*';

export function makeSentence(x, y, sentences, lineHeigth, color, fontSize, fontCat, fontStyle){
    let lines = sentences.split(lineSplitter);
    let elements = [];
    let count = 0;
    lines.forEach(element => {
        elements.push({
            type: Types.TEXT,
            payload: {
                color: color,
                fontSize: fontSize,
                fontCat: fontCat,
                fontStyle: fontStyle,
                text: element,
                x:x,
                y:(y+(count*lineHeigth))
            }
        });
        count++;
    });
    return elements;

}

function makeBulletSentence(x, y, sentence, lineHeigth, color, bulletColor, fontSize, fontCat, fontStyle){
    let lines = sentence.split(lineSplitter);
    let elements = [];
    let count = 0;
    lines.forEach(element => {
        if(count == 0){
            elements.push({
              type: Types.BULLET_TEXT,
              payload: {
                  color:color,
                  fontSize:fontSize,
                  fontCat:fontCat,
                  fontStyle:fontStyle,
                  text:element,
                  x:x,
                  y:y,
                  bulletColor:bulletColor
              }
          
            });
        }
        else{
            elements.push({
                type: Types.TEXT,
                payload: {
                    color: color,
                    fontSize: fontSize,
                    fontCat: fontCat,
                    fontStyle: fontStyle,
                    text: element,
                    x:x,
                    y:(y+(count*lineHeigth))
                }
            });
        }
        count++;
    });
    return elements;

}

export function makeBulletSentences(x, y, sentences, lineHeigth, sentenceHeigth, color, bulletColor, fontSize, fontCat, fontStyle){
    let sentenceArr = sentences.split(sentenceSplitter);
    let elements = [];
    let count = 0; 
    let lastY = y;
    sentenceArr.forEach(element => {
        elements.push(...makeBulletSentence(x, lastY + sentenceHeigth, element, lineHeigth, color, bulletColor, fontSize, fontCat, fontStyle));
        // console.log("test" , elements, element)
        lastY = elements[elements.length-1].payload.y;
        count++;
    });

    return elements;
}


// {
//               type: Types.BULLET_TEXT,
//               payload: {
//                   color:"red",
//                   fontSize:40,
//                   fontCat:"LatoWeb",
//                   fontStyle:"bold",
//                   text:"Zodiac",
//                   x:60,
//                   y:100,
//                   bulletColor:"black"
//               }
//           }