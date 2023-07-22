import React from "react";
import Login from "./pages/login-v2.svg";
import "./App.css";

const ChatFile = () => {
  return (
    <>
      <div className="split-container">
        <div className="image-section">
          <img src={Login} alt="Your Image" />
        </div>
        <div className="form-section">
          <h2 className="font">Welcome! to homeChat</h2>
          <div className="container">
            <label htmlFor="name">User Name</label>
            <input type="text" id="name" placeholder="User Name" />

            <label htmlFor="name">Room number</label>
            <input type="text" id="name" placeholder="Room Number" />
            <button className="btn" type="submit">
              Join
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatFile;
