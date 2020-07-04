import React from "react";
import Types from "../utils/Types";

const WHITE_SPACE = " ";
const DEFAULT_FONT_SIZE = 15;

let PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


function fillText(color, fontSize, fontCat, fontStyle, text, x, y, context, isXCentered) {
  context.fillStyle = color;
  let font = "";
  if (fontStyle !== null) {
    font += fontStyle + WHITE_SPACE;
  }
  if (fontSize !== null) {
    font += fontSize + "px" + WHITE_SPACE;
  }
  if (fontCat !== null) {
    font += fontCat;
  }
  context.font = font;
  if(isXCentered){
    let textWidth = context.measureText(text).width;
    x = Math.floor((window.innerWidth / 2) - (textWidth / 2));
  }
  context.fillText(text, x, y);
  return context;
}

function fillCircle(centerX, centerY, radius, color, context) {
  context.beginPath();
  centerY+=0.5;
  centerX+=0.5;
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

function addElement(element, context) {
  if (element.type === Types.TEXT) {
    let { color, fontSize, fontCat, fontStyle, text, x, y, isXCentered } = element.payload;
    if(fontSize === null) {
        fontSize = DEFAULT_FONT_SIZE;
    }
    return fillText(color, fontSize, fontCat, fontStyle, text, x, y, context, isXCentered);
  }
  if (element.type === Types.BULLET_TEXT) {
    let { color, fontSize, fontCat, fontStyle, text, x, y, bulletColor } = element.payload;
    if(fontSize === null) {
        fontSize = DEFAULT_FONT_SIZE;
    }
    let centerX = Math.floor(x - (fontSize * 0.6));
    let radius = Math.floor(fontSize * 0.6 / 2);
    let centerY = Math.floor(y - radius);
    fillCircle(centerX, centerY, radius, bulletColor, context);
    return fillText(color, fontSize, fontCat, fontStyle, text, x, y, context, false);


  }
}

class CV extends React.Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.state = {
      width: 800,
      height: 800,
    };
    this.getCursorPosition = this.getCursorPosition.bind(this);
  }

  componentWillReceiveProps(props){
  }

  componentDidUpdate(prevProps, prevState) {
    const canvas = this.canvas.current;
    const context = canvas.getContext("2d");
    // Set display size (css pixels).
    let sizeW = window.innerWidth - 100;
    const sizeH = Math.floor(sizeW * 1.4);
    canvas.style.width = sizeW + "px";
    canvas.style.height = sizeH + "px";

    // Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio; // <--- Change to 1 on retina screens to see blurry canvas.
    canvas.width = sizeW * scale;
    canvas.height = sizeH * scale;

    // Normalize coordinate system to use css pixels.
    context.scale(scale, scale);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
    this.props.elements.forEach(element => {
        addElement(element, context);
    });
  }

  getCursorPosition(canvas, event) {
    
}

  componentDidMount() {
    const canvas = this.canvas.current;

    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      this.props.mouseClickedOn(x,y);
    })

    const context = canvas.getContext("2d");
    // Set display size (css pixels).
    let sizeW = window.innerWidth - 100;
    const sizeH = Math.floor(sizeW * 1.4);
    sizeW = sizeW - 100;
    canvas.style.width = sizeW + "px";
    canvas.style.height = sizeH + "px";

    // Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio; // <--- Change to 1 on retina screens to see blurry canvas.
    canvas.width = sizeW * scale;
    canvas.height = sizeH * scale;

    // Normalize coordinate system to use css pixels.
    context.scale(scale, scale);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
    this.props.elements.forEach(element => {
        addElement(element, context);
    });
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvas}
          width={this.state.width}
          height={this.state.height}
          style={{ border: "1px solid #000000" }}
        />
      </div>
    );
  }
}

export default CV;
