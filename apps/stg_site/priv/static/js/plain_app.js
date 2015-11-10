import { Socket } from 'phoenix-js'
import { React } from 'react'
import { ReactDOM } from 'react-dom'
import { createStore } from 'redux'

let L = console.log.bind(console)
let E = console.error.bind(console)
let makeGUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  // stolen from http://stackoverflow.com/a/2117523
  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
  return v.toString(16);
})
let GUID = localStorage['GUID'] || (localStorage['GUID'] = makeGUID())
let socket = new Socket('/_ws')

let s = createStore((current = null, action) => {
  switch (action.type) {
  case 'SET':
    return action.now
  default:
    return current
  }
})

s.subscribe(() => L('store update', s.getState()))

socket.logger = (k, m, p) => { return /heartbeat|phx/.test(m) ? null : L(k, m, p) }
socket.connect()

let ch = socket.channel('time', { id: GUID })

// ch.on('set', m => s.dispatch({ type: 'SET', ...m}))

let t = null;
ch.on('set', m => {
  L('got ',m)
  t = m.now
})

ch.on('msg', L)

ch.join()
  .receive('ok', r => { console.log('joined!', r) })
  .receive('error', r => { console.log('error joining!', r) })

// setInterval(() => {
//   console.log('sending ping')
//   ch.push('new_msg', { body: Math.floor(Math.random()+0.5)})
// }, 1000);
