import React from 'react';
// import './styles.css';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
const Message = ({ sender, content, align }) => {
  return (
    <>
    <div className={`message ${align === 'right' ? 'right-align' : 'left-align'}`}>
      <div className="message-content">
        {content}
      </div>
      <div className="message-sender">
        {sender}
      </div>
     
    </div>
   
   </>
  );
};

export default Message;
