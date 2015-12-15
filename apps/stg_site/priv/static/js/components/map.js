import React, { Component } from 'react'
import MouseInput from '../MouseInput'
import React3 from 'react-three-renderer'
import THREE from 'three'
import { ORIGIN, SQRT3 } from '../util'


class TTile extends Component {
  static defaultProps = { x: 0, y: 0, height: 0.5 }

  constructor(props) {
    super(props)
    this.boundMouseDown = this._onMouseDown.bind(this)
  }

  _onMouseDown(e, intersection) {
    e.preventDefault();
    L('tile mouse down')
  }

  componentDidMount() {
    this.props.meshes.push(this.refs.mesh)
  }

  render() {
    return <mesh
        ref='mesh'
        onMouseDown={() => console.log(this.props.x, this.props.y)}
        position={new THREE.Vector3(
            this.props.x * SQRT3 + (this.props.y & 1 ? SQRT3/2 : 0) ,
            0,
            this.props.y * 1.5
          )}>
        <cylinderGeometry
          radiusTop={0.9}
          radiusBottom={0.9}
          height={0.5}
          radialSegments={6}/>
        <meshPhongMaterial
          color={0xff0000}
          side={THREE.DoubleSide}/>
      </mesh>
  }
}


/* TODO: investigate performance of:
  1. wrapping every tile in <Group x= y=> for offset
  2. calculating x & y for all tiles independently
  3. keeping a Transform object in the Tile's state
*/

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

let debugAxis = ((axisLength) => {
  let lineFromOriginTo = (v, color = 0xffffff) => {
    return <line>
      <geometry vertices={[ORIGIN, v]} />
      <lineBasicMaterial color={color} linewidth={1} />
    </line>
  }

  return [
    lineFromOriginTo(new THREE.Vector3(axisLength,0,0), 0xff0000),
    lineFromOriginTo(new THREE.Vector3(0,axisLength,0), 0x00ff00),
    lineFromOriginTo(new THREE.Vector3(0,0,axisLength), 0x0000ff),
  ]
})(2)

let t = null

class TMap extends Component {
  static coords = {
    x: null,
    y: null,
    scale: 1,
    dragging: false,
  }

  static meshes = []

  // stolen from https://github.com/toxicFork/react-three-renderer-example
  constructor(props, context) {
    super(props, context);

    this.boundTouchMove = this.handleTouchMove.bind(this)
    this.boundTouchStart = this.handleTouchStart.bind(this)
    this.boundTouchEnd = this.handleTouchEnd.bind(this)
    this.boundAnimate =  this.onAnimate.bind(this)

    this.state = {
      cameraPosition: new THREE.Vector3(0, 5, 0),
      cameraRotation: new THREE.Quaternion(0, -0.75, -0.75, 0),
      mouseInput: null,
      camera: null,
    };

    let testGridSize = 20;
    t =  _(testGridSize)
     .range()
     .map((x) => _(testGridSize).times(() => x).zip(_.range(testGridSize)).value())
     .flatten()
     .map((coords) => <TTile key={`x${coords[0]}y${coords[1]}`} x={coords[0]} y={coords[1]} k={`x${coords[0]}y${coords[1]}`} meshes={TMap.meshes} />)
     .value()
  }

  componentDidMount() {
    debugger;
    this.refs.container.addEventListener('touchstart', this.boundTouchStart, false)
    this.refs.container.addEventListener('mousedown', this.boundTouchStart, false)
  }

  handleTouchStart(e) {
    L('Touch down', e.pageX, e.pageY)
    this.refs.container.addEventListener('touchmove', this.boundTouchMove, false);
    this.refs.container.addEventListener('mousemove', this.boundTouchMove, false);
    document.addEventListener('touchend', this.boundTouchEnd, false);
    document.addEventListener('mouseup', this.boundTouchEnd, false);

    window.theTouchStart = e
    TMap.coords = {
      dragging: true,
      x: ('touches' in e) ? e.touches[0].pageX : e.pageX,
      y: ('touches' in e) ? e.touches[0].pageY : e.pageY,
    }
  }

  handleTouchEnd(e) {
    L('Touch up')
    this.refs.container.removeEventListener('touchmove', this.boundTouchMove, false);
    this.refs.container.removeEventListener('mousemove', this.boundTouchMove, false);
    TMap.coords.dragging = false
  }

  handleTouchMove(e) {
    if (!TMap.coords.dragging) return;
    e.preventDefault();
    //Get Touch change differential
    var xDiff = TMap.coords.x - e.pageX
    var yDiff = TMap.coords.y - e.pageY
    //Update to our new coordinates
    if ('pageX' in e) {
      TMap.coords.x = e.pageX;
      TMap.coords.y = e.pageY;
    } else if ('touches' in e && e.touches.length === 1) {
      TMap.coords.x = e.touches[0].pageX
      TMap.coords.y = e.touches[0].pageY
    }
    //Adjust our x,y based upon the x/y diff from before
    // console.clear();

    var newCameraPosition = this.state.cameraPosition.clone()
    newCameraPosition.x = +((this.state.cameraPosition.x - xDiff * 0.05).toFixed(2))
    newCameraPosition.z = +((this.state.cameraPosition.z - yDiff * 0.05).toFixed(2))
    this.setState({
      cameraPosition: newCameraPosition
    })
    L('move', TMap.coords.dragging, this.state.cameraPosition.x, this.state.cameraPosition.z, xDiff, yDiff);
  }

  onAnimate(e) {
    const {
      mouseInput,
      camera,
      } = this.refs;

    if (!mouseInput.isReady()) {
      const {
        scene,
        container,
        } = this.refs;

      mouseInput.ready(scene, container, camera);
      mouseInput.restrictIntersections(TMap.meshes);
      mouseInput.setActive(false);
    }

    if (this.state.mouseInput !== mouseInput)
      this.setState({ mouseInput })

    if (this.state.camera !== camera)
      this.setState({ camera })
  }

  render() {
    const width = window.innerWidth
    const aspect = 2
    const height = width / aspect

    return (
      <div ref='container'>
        <h1>THREE: { JSON.stringify(this.state.cameraRotation) }</h1>
        <React3
              mainCamera="camera"
              width={width}
              height={height}
              clearColor={0xffffff}
              onAnimate={this.boundAnimate}
              >
          <module
            ref="mouseInput"
            descriptor={MouseInput}/>
          <scene
              ref='scene'
              >
            <perspectiveCamera
              ref='camera'
              name='camera'
              fov={75}
              aspect={aspect}
              near={0.1}
              far={1000}
              position={this.state.cameraPosition}
              quaternion={this.state.cameraRotation}/>
            <pointLight intensity={1} distance={0} position={new THREE.Vector3( 0, 20, 0 )}/>
            {debugAxis}
            {t}
          </scene>
        </React3>
      </div>
    )
  }
}

              // lookAt={ORIGIN}

export default TMap