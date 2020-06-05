import React from "react";
import { SketchPicker } from 'react-color';
import Popover from "@material-ui/core/Popover";

const DIRECTION = {
    UP : "UP",
    DOWN : "DOWN",
    RIGHT : "RIGHT",
    LEFT : "LEFT"
}

export default class Sentence extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            color: '#fff',
            anchorEl: null,
            stepSize: 1
        };
        this.handleStepClick = this.handleStepClick.bind(this);
        this.handleStepSizeChange = this.handleStepSizeChange.bind(this);
        this.handleSentenceChange = this.handleSentenceChange.bind(this);
    }

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex },() => {
            let payload = this.props.payload;
            payload.color = color.hex;
            this.props.updatePayload(this.props.index, payload);
        });
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClick = (e) => {
        this.setState({ anchorEl: e.currentTarget});
    };

    handleStepSizeChange(e){
        this.setState({
            stepSize : e.target.value
        })
    }

    handleSentenceChange(e){
        let payload = this.props.payload;
        payload.sentences = e.target.value;
        this.props.updatePayload(this.props.index, payload);
    }

    handleStepClick(direction){
        let payload = this.props.payload;
        if(direction === DIRECTION.UP){
            payload.y = payload.y - +this.state.stepSize;
        }
        else if(direction === DIRECTION.DOWN){
            payload.y = payload.y + +this.state.stepSize;
        }
        else if(direction === DIRECTION.RIGHT){
            payload.x = payload.x + +this.state.stepSize;
        }
        else if(direction === DIRECTION.LEFT){
            payload.x = payload.x - +this.state.stepSize;
        }   
        this.props.updatePayload(this.props.index, payload)
    }

    render(){
        return(
            <div>
                <button style={{ margin: "20px" }} className="btn btn-primary"  onClick={e => this.handleClick(e)}>Pick Color</button>
                <Popover 
                    id="PopOver1"
                    open={this.state.anchorEl !== null}
                    onClose={this.handlePopoverClose}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    >
                    <SketchPicker
                        color={ this.state.color }
                        onChangeComplete={ this.handleChangeComplete }
                    />
                </Popover>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Sentence</span>
                    </div>
                    <textarea class="form-control" onChange={this.handleSentenceChange}>{this.props.payload.sentences}</textarea>
                </div>
                <br/>
                <div>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Step size</span>
                        </div>
                        <input type="text"  aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={this.handleStepSizeChange} value={this.state.stepSize}/>
                    </div>
                    <button style={{ margin: "20px" }} className="btn btn-primary" onClick={() => {this.handleStepClick(DIRECTION.UP)}}>UP</button>
                    <button style={{ margin: "20px" }} className="btn btn-primary" onClick={() => {this.handleStepClick(DIRECTION.LEFT)}}>LEFT</button>
                    <button style={{ margin: "20px" }} className="btn btn-primary" onClick={() => {this.handleStepClick(DIRECTION.RIGHT)}}>RIGHT</button>
                    <button style={{ margin: "20px" }} className="btn btn-primary" onClick={() => {this.handleStepClick(DIRECTION.DOWN)}}>DOWN</button>

                </div>
            </div>
        );
    }
}