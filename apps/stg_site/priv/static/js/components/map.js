import React, { Component } from 'react'
import {
  Surface,
  Group,
  Transform,
  Shape,
  Path
} from 'react-art'

function makeHexPath(size, {x: cX, y: cY}) {
  var path = new Path();
  var point = 0;
  var angle = null;
  var x = null;
  var y = null;
  var oneThirdPI = 2 * Math.PI / 6;

  while (point <= 6) {
    angle = oneThirdPI * (point + 0.5);
    x = cX + size * Math.cos(angle);
    y = cY + size * Math.sin(angle);

    path.lineTo(x, y);

    point = point + 1;
  }

  return path;
}

let hexWidth = 40;
let hexPath = makeHexPath(hexWidth, {x: 0, y: 0});

/* TODO: investigate performance of:
1. wrapping every tile in <Group x= y=> for offset
2. calculating x & y for all tiles independently
3. keeping a Transform object in the Tile's state
*/
class Tile extends Component {
  static defaultProps = { x: 0, y: 0}
  handleClick() {
    L('props not available here, need state')
  }
  render() {
    return (
      <Shape
        d={hexPath}
        fill='#ff0000'
        stroke='#000'
        strokeWidth='1'
        transform={(new Transform).translate(
          hexWidth * 2 * this.props.x * (Math.sqrt(3) * 0.5) + (this.props.y & 1 ? hexWidth * Math.sqrt(3) * 0.5: 0),
          hexWidth * 2 * this.props.y * 0.75)
        }
        onClick={this.handleClick}/>
    )
  }
}

// stateless components can be defined as functions
class Map extends Component {
  constructor(props) { super(props);
    this.state = { x: 0, y: 0 }
    this.boundMouseDownHandler = this.handleMouseDown.bind(this)
    this.boundMouseUpHandler = this.handleMouseUp.bind(this)
  }
  componentDidMount() {
      document.addEventListener('mousemove', this.handleMouseMove, false);
  }
  componentWillUnmount() {
      document.removeEventListener('mousemove', this.handleMouseMove, false);
  }
  handleMouseDown(e) {
    L('mouse down')
    this.setState({
      dragging: true,
      coords: {
        x: e.pageX,
        y: e.pageY
      }
    })
  }
  handleMouseUp(e) {
    L('mouse up')
    this.setState({ dragging: false });
  }
  // handleMouseMove(e) {
  //   if (!this.dragging) return;
  //     e.preventDefault();
  //   //Get mouse change differential
  //   var xDiff = this.coords.x - e.pageX,
  //       yDiff = this.coords.y - e.pageY;
  //   //Update to our new coordinates
  //       this.coords.x = e.pageX;
  //       this.coords.y = e.pageY;
  //   //Adjust our x,y based upon the x/y diff from before
  //   var x = this.state.x - xDiff,
  //       y = this.state.y - yDiff;
  //   //Re-render
  //   this.setState(this.state);
  // }


  render() {
    // debugger;
      let t =  _(5)
       .range()
       .map((x) => _(5).times(() => x).zip(_.range(5)).value())
       .flatten()
       .map((coords) => { let c = {x: coords[0], y: coords[1]}; return <Tile {...c} />; })
       .value()

    return (
      <div
          onMouseDown={this.boundMouseDownHandler}
          onMouseUp={this.boundMouseUpHandler}
          onClick={this.handleClick}
        >
        <h1>herro: {this.state.dragging ? 't' : 'f'}</h1>
        <Surface
            width={500}
            height={500}
            style={{border: '1px solid red'}}>
          <Group x={this.state.x} y={this.state.y}>{t}</Group>
        </Surface>
      </div>
    )
  }
}

export default Map;

