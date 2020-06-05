import React from "react";
import CV from './CV.jsx';
import Types from '../utils/Types';
import {makeSentence, makeBulletSentences} from '../utils/SentenceMaker';
import Sentence from './Sentence';
import BulletSentences from './BulletSentences';

export default class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            elements : [
            //     {
            //     id : 0,
            //     type: Types.BULLET_PARA,
            //     payload: {
            //         x: 100,
            //         y : 100, 
            //         sentencePara : "sentence pars", 
            //         lineHeigth : 20, 
            //         sentenceHeigth : 20, 
            //         color : "red", 
            //         bulletColor : "black", 
            //         fontSize : 20, 
            //         fontCat : "LatoWeb", 
            //         fontStyle : "bold"
            //     }
            // }
            ]
        }

        this.addElement = this.addElement.bind(this);
        this.updatePayload = this.updatePayload.bind(this);
    }

    addElement(type){
        let elements = this.state.elements;
        let id = this.state.elements.length;
        if(type === Types.BULLET_PARA){
            let element = {
                id : id,
                type: Types.BULLET_PARA,
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
        console.log(elements);
        this.setState({elements:elements});
    }

    updatePayload(id, payload){
        let elements = this.state.elements;
        let index = elements.findIndex((element => element.id == id));
        console.log(index, elements,id,payload);
        elements[index].payload = payload;
        this.setState({
            elements : elements
        });
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
        return(
            <div>
                <div style = {{width : window.innerWidth + "px", height: window.innerHeight/2 + "px", overflowY:"auto"}}>
                    <CV elements={elements}/>
                </div>
                <div style = {{width : window.innerWidth + "px", height: window.innerHeight/2 + "px", overflowY:"auto"}}>
                    <div>
                        <button style={{ margin: "20px" }} className="btn btn-primary" onClick = {() => this.addElement(Types.SENTENCE)}>Sentence</button>
                        <button style={{ margin: "20px" }} className="btn btn-primary" onClick = {() => this.addElement(Types.BULLET_PARA)}>Bullet Sentences</button>
                    </div>
                    <div>
                        {this.state.elements.map(element => {
                            // if(element.type === Types.SENTENCE){
                                return (<Sentence key={element.id} index={element.id} type = {element.type} payload = {element.payload} updatePayload = {this.updatePayload}/>);
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
