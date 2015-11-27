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
  handleClick() {}
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

class Map extends Component {
  static coords = {
    x: null,
    y: null,
    scale: 1,
    dragging: false
  }
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, scale: 1 }
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
      Map.coords.x = e.pageX;
      Map.coords.y = e.pageY;
    } else if ('touches' in e && e.touches.length === 1) {
      Map.coords.x = e.touches[0].pageX
      Map.coords.y = e.touches[0].pageY
    }
    window.theE = e
    //Adjust our x,y based upon the x/y diff from before
    // console.clear();
    // L('move', Map.coords.dragging, this.state.x, this.state.y, xDiff, yDiff);
    this.setState({ x: this.state.x - xDiff, y: this.state.y - yDiff }); // setState merges
  }
  handleWheel(e) {
    const newScale = this.state.scale * (e.deltaY <= 0 ? 1.1 : 0.9)
    L(`scaling with ${e.deltaY} from ${this.state.scale} to ${newScale}`)
    this.setState({ scale: newScale });
  }
  render() {
    L('r'); let testGridSize = 20
    let t =  _(testGridSize)
     .range()
     .map((x) => _(testGridSize).times(() => x).zip(_.range(testGridSize)).value())
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
          onWheel={this.handleWheel.bind(this)}
        >
        <h1>herro: {Map.coords.dragging ? 't' : 'f'}</h1>
        <Surface
            width={250}
            height={500}
            style={{border: '1px solid red'}}>
          <Group x={this.state.x} y={this.state.y} scale={this.state.scale}>{t}</Group>
        </Surface>
      </div>
    )
  }
}

import React3 from 'react-three-renderer'
import THREE from 'three'

class TMap extends Component {
  // stolen from https://github.com/toxicFork/react-three-renderer-example
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 2, 5);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.01,
          this.state.cubeRotation.y + 0.01,
          0
        ),
      });
    };
  }

  render() {
    const width = 500;
    const height = 500;

    return (
      <div>
        <h1>THREE</h1>
        <React3
              mainCamera="camera"
              width={width}
              height={height}
              onAnimate={this._onAnimate}
              >
          <scene>
            <perspectiveCamera
              name="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={1000}

              position={this.cameraPosition}/>
            <pointLight hex={0xffffff} intensity={1} distance={0} position={new THREE.Vector3( 0, 20, 0 )}/>
            <pointLight hex={0xffffff} intensity={1} distance={0} position={new THREE.Vector3( 10, 20, 10 )}/>
            <pointLight hex={0xffffff} intensity={1} distance={0} position={new THREE.Vector3( -10, -20, -10 )}/>
            <mesh
              rotation={this.state.cubeRotation}>
              <cylinderGeometry
                radiusTop={1}
                radiusBottom={1}
                height={0.5}
                dynamic={true}
                radialSegments={6}/>
              <meshPhongMaterial
                color={0x00ff00}
              />
            </mesh>
          </scene>
        </React3>
      </div>
    )
  }
}

export class MapContainer extends Component {
  render() {
    return (
      <TMap/>
    )
  }
}

