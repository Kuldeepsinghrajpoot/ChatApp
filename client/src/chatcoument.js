import "./App.css";
import io from "socket.io-client";
import Login from "./pages/login-v2.svg";

import { useState } from "react";
// import Chat from "./Chat";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="split-container">
          <div className="image-section">
            <img src={Login} alt="Your Image" />
          </div>
          <div className="form-section">
            {/* <h3>Join A Chat</h3> */}
            <h2 className="font">Join A Chat</h2>
            <div className="container">
              <label htmlFor="name">User Name</label>
              <input
                type="text"
                placeholder="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <label htmlFor="name">Room number</label>
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <button className="btn" onClick={joinRoom}>
                Join A Room
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
        // <Chat/>
      )}
    </div>
  );
}

export default App;
