window.L = console.log.bind(console)
window._$ = document.getElementById.bind(document)
window._ = require('lodash')

export const makeGUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  // stolen from http://stackoverflow.com/a/2117523
  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
  return v.toString(16);
})

export let GUID = false
try {
  GUID = localStorage['GUID'] || (localStorage['GUID'] = makeGUID())
} catch (e) { }

import THREE from 'three'
window.THREE = THREE
export const ORIGIN = new THREE.Vector3(0,0,0)
export const SQRT3 = Math.sqrt(3)
Object.values = _.values
