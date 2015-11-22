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
        fill='#ccc'
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
  static coords = {
    x: null,
    y: null,
    dragging: false
  }
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, dragging: false }
    this.boundTouchMove = this.handleTouchMove.bind(this)
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  handleTouchDown(e) {
    L('Touch down', e.pageX, e.pageY)
    document.addEventListener('touchmove', this.boundTouchMove, false);
    document.addEventListener('mousemove', this.boundTouchMove, false);

    window.theTouchDown = e
    Map.coords = {
      dragging: true,
      x: ('touches' in e) ? e.touches[0].pageX : e.pageX,
      y: ('touches' in e) ? e.touches[0].pageY : e.pageY,
    }
  }
  handleTouchUp(e) {
    L('Touch up')
    document.removeEventListener('touchmove', this.boundTouchMove, false);
    document.removeEventListener('mousemove', this.boundTouchMove, false);
    Map.coords.dragging = false
  }
  handleTouchMove(e) {
    if (!Map.coords.dragging) return;
    e.preventDefault();
    //Get Touch change differential
    var xDiff = Map.coords.x - e.pageX
    var yDiff = Map.coords.y - e.pageY
    //Update to our new coordinates
    if ('pageX' in e) {
      L('pageX!')
      Map.coords.x = e.pageX;
      Map.coords.y = e.pageY;
    } else if ('touches' in e) {
      L('touches!')
      Map.coords.x = e.touches[0].pageX
      Map.coords.y = e.touches[0].pageY
    }
    window.theE = e
    //Adjust our x,y based upon the x/y diff from before
    // console.clear();
    L('move', Map.coords.dragging, this.state.x, this.state.y, xDiff, yDiff);
    this.setState({ ...this.state, x: this.state.x - xDiff, y: this.state.y - yDiff });
  }


  render() {
      let t =  _(5)
       .range()
       .map((x) => _(5).times(() => x).zip(_.range(5)).value())
       .flatten()
       .map((coords) => { let c = {x: coords[0], y: coords[1]}; return <Tile {...c} />; })
       .value()

          // onTouchMove={this.handleTouchMove}
          // onClick={this.handleClick.bind(this)}

    return (
      <div
          onTouchStart={this.handleTouchDown.bind(this)}
          onMouseDown={this.handleTouchDown.bind(this)}
          onTouchEnd={this.handleTouchUp.bind(this)}
          onMouseUp={this.handleTouchUp.bind(this)}
        >
        <h1>herro: {this.state.dragging ? 't' : 'f'}</h1>
        <Surface
            width={250}
            height={500}
            style={{border: '1px solid red'}}>
          <Group x={this.state.x} y={this.state.y}>{t}</Group>
        </Surface>
      </div>
    )
  }
}

export default Map;

