import {Socket} from '../../../../../deps/phoenix/web/static/js/phoenix.js'
var socket = new Socket('/_ws');

socket.connect()

let ch = socket.channel('time:lobby', {})

ch.on("new_msg", payload => {
    console.log('receive', payload)
  })


ch.join()
  .receive('ok', r => { console.log('joined!', r) })
  .receive('error', r => { console.log('joined!', r) })

setTimeout(() => {
  ch.push('new_msg', { body: Math.floor(Math.random()+0.5)})
}, 1000);