import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chats from './Chats';

function App() {
  const socket = io.connect("http://localhost:3001")

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setshowChat] = useState(false);

  const join_room = () => {
    if (username !=="" && room !=="" ){
      socket.emit("join_room", room);
      setshowChat(true);
    }
  };

  return (
    <div>
      <h1>Messages</h1>
        <div>
          <input placeholder='Message..' value={username} onChange={(e) => {
            setUsername(e.target.value);
          }} 
          />
          <input placeholder='Room number..' value={room} type="number" onChange={(e) => {
            setRoom(e.target.value);
          }} 
          />
          <button onClick={join_room}>SEND</button>
        </div>
      <div>
        <Chats socket={socket} username={username} room={room}/>
      </div>
    </div>
  );
}

export default App;