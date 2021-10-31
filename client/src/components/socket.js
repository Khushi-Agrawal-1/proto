import io from 'socket.io-client';

const URL = "http://localhost:5000"

let socket = undefined

const SocketConnection = {}

SocketConnection.connect = () => {
  socket = io(URL)
  initialize(socket)
  return socket
}

const initialize = (socket) => {
  socket.on('connect', () => {
    console.log('Client - Socket connected')
    
  })

  socket.on('welcome', (data) => {
    console.info(data.message)
  })
}


export default SocketConnection