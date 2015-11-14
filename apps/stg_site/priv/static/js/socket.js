import { Socket } from 'phoenix-js'

const socket = new Socket('/_ws')

socket.logger = (k, m, p) => {
  if (/heartbeat|phx/.test(m))
    return;
  else
    L(k, m, p)
}
socket.connect()

export default socket