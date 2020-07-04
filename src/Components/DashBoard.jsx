import React from "react";
import CV from './CV.jsx';
import Types from '../utils/Types';
import {makeSentence, makeBulletSentences} from '../utils/SentenceMaker';
import Sentence from './Sentence';
import BulletSentences from './BulletSentences';
import cvJson from './../static/cvJson';

const elementBlackListedKeys = ["reff"]

export default class DashBoard extends React.Component{
    constructor(props){
        super(props);
        cvJson.forEach(jsonObj => {
            jsonObj.reff = React.createRef();
        });
        this.state = {
            elements : cvJson
        }

        this.addElement = this.addElement.bind(this);
        this.updatePayload = this.updatePayload.bind(this);
        this.delete = this.delete.bind(this);
        this.mouseClickedOn = this.mouseClickedOn.bind(this);
        this.exportCV = this.exportCV.bind(this);
    }

    exportCV(){
        console.log(this.state.elements);
        let obj = this.state.elements;
        // let stringified = JSON.stringify(obj);
        let stringified = JSON.stringify(obj, (key, value) => {
            console.log("value" , value, "key", key )
            if(!elementBlackListedKeys.includes(key)){
                return value;
            }
            else {
                return;
            };
            // console.log("value" , value, "key", key )
            // return value;
        });
        console.log(stringified);
        copyTextToClipboard(stringified);
    }

    addElement(type){
        let elements = this.state.elements;
        let id = this.state.elements.length;
        if(type === Types.BULLET_PARA){
            let element = {
                id : id,
                type: Types.BULLET_PARA,
                reff: React.createRef(),
                payload: {
                    x: 10,
                    y : 100, 
                    sentences : "sentence pars", 
                    lineHeigth : 20, 
                    sentenceHeigth : 20, 
                    color : "red", 
                    bulletColor : "black", 
                    fontSize : 20, 
                    fontCat : "LatoWeb", 
                    fontStyle : "bold"
                }
            }
            elements.push(element);
        }
        else if(type === Types.SENTENCE){
            let element = {
                id : id,
                type: Types.SENTENCE,
                reff: React.createRef(),
                payload: {
                    x: 10,
                    y : 200, 
                    sentences : "sentence", 
                    lineHeigth : 20, 
                    color : "red", 
                    fontSize : 20, 
                    fontCat : "LatoWeb", 
                    fontStyle : "bold",
                    isXCentered : false
                }
            }
            elements.push(element);
        }
        this.setState({elements:elements});
    }

    updatePayload(id, payload){
        let elements = this.state.elements;
        let index = elements.findIndex((element => element.id == id));
        elements[index].payload = payload;
        this.setState({
            elements : elements
        });
    }

    delete(id){
        let elements = this.state.elements;
        let index = elements.findIndex((element => element.id == id));
        elements.splice(index, 1);
        this.setState({
            elements : elements
        });
    }

    mouseClickedOn(x,y){
        
        let closerElement = null;
        let minDistance = window.innerWidth * 100;
        this.state.elements.forEach(element => {
            let distance = Math.sqrt(Math.pow(element.payload.x - x, 2) + Math.pow(element.payload.y - y, 2));
            console.log(distance);
            if(distance < minDistance){
                minDistance = distance;
                closerElement = element;
            }
        });
        console.log(x,y,closerElement);
        if(closerElement !== null){
            closerElement.reff.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    render(){
        let elements = [];
        this.state.elements.forEach(element => {
            if(element.type === Types.BULLET_PARA){
                let payload = element.payload;
                elements.push(...makeBulletSentences(payload.x, payload.y, payload.sentences, payload.lineHeigth, payload.sentenceHeigth, payload.color, payload.bulletColor, payload.fontSize, payload.fontCat, payload.fontStyle));
            }
            if(element.type === Types.SENTENCE){
                let payload = element.payload;
                elements.push(...makeSentence(payload.x, payload.y, payload.sentences, payload.lineHeigth, payload.color, payload.fontSize, payload.fontCat, payload.fontStyle, payload.isXCentered));
            }
        });
        let width = window.innerWidth;
        let height = window.innerHeight;
        width = width - 100;
        console.log(width)
        return(
            <div style={{ margin: "20px" }}>

                <div style = {{width : width + "px", height: height/2 + "px", overflowY:"auto", margin: "20px"}}>
                    <CV elements={elements} mouseClickedOn = {this.mouseClickedOn}/>
                </div>
                <div>
                        <button style={{ margin: "20px" }} className="btn btn-primary" onClick = {() => this.addElement(Types.SENTENCE)}>Sentence</button>
                        <button style={{ margin: "20px" }} className="btn btn-primary" onClick = {() => this.addElement(Types.BULLET_PARA)}>Bullet Sentences</button>
                        <button style={{ margin: "20px" }} className="btn btn-primary" onClick = {() => this.exportCV()}>Export as json</button>
                        
                    </div>
                <div style = {{width : width + "px", height: height/2 - 160 + "px", overflowY:"auto"}}>
                    
                    <div>
                        {this.state.elements.reverse().map(element => {
                            // if(element.type === Types.SENTENCE){
                                return (<Sentence key={element.id} reff={element.reff} index={element.id} type = {element.type} payload = {element.payload} updatePayload = {this.updatePayload} delete = {this.delete}/>);
                            // }
                            // else if(element.type === Types.BULLET_PARA){
                            //     return (<BulletSentences key= {element.id} index={element.id} payload = {element.payload} updatePayload = {this.updatePayload}/>);
                            // }
                        })}
                        
                    </div>
                </div>
            </div>
        );
    }
}


function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    alert("Copied to clipboard")
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}