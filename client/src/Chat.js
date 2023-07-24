import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    const imageTags = findImageTags(currentMessage);
    const imageArray = extractBase64DataArray(imageTags);
    socket.emit("images", imageArray);
  }, [socket, currentMessage]);

  const handleSendMessage = (message) => {
    // if (message.trim() !== '') {
    //   setCurrentMessage(message);
    // }
    // currentMessage("");

    setCurrentMessage(message);
    // setEditorValue(message);
    // Send the image data to the server to broadcast to other clients
    const imageTags = findImageTags(message);
    const imageArray = extractBase64DataArray(imageTags);
    socket.emit("images", imageArray);

  }
  const findImageTags = (content) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    return doc.querySelectorAll("img");
  };

  // Function to extract base64 image data from an image tag
  const extractBase64DataArray = (imageTags) => {
    const base64Array = [];
    imageTags.forEach((imageTag) => {
      const src = imageTag.getAttribute("src");
      const base64Data = src.split(",")[1]; // Remove data:image/png;base64, part
      base64Array.push(base64Data);
    });
    return base64Array;
  };

  // Listen for image data from the server
  socket.on("images", (imageArray) => {
    const imageTags = imageArray.map(
      (base64Data) =>
        `<img src="data:image/png;base64,${base64Data}" alt="Shared Image" />`
    );
    setCurrentMessage((value) => value + imageTags.join(""));
  });

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
        <div className="green-dot"></div>

      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, key) => {
            return (
              <div key={key}
                className="message"
                id={username === messageContent.author ? "other" : "you"}
              >
                <div>
                  <div className="message-content">
                    {/* <p>{messageContent.message}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: messageContent.message }}></div>

                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <ReactQuill
          modules={modules}
          value={currentMessage}
          placeholder="Hey..."
          onChange={handleSendMessage}

          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}

        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
