import React,{useState} from 'react';
import Message from './Message';
import './App.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ChatApp = () => {
  const messages = [
    { id: 1, sender: 'Alice', content: 'Hi there!', align: 'left' }, // sent message
    { id: 2, sender: 'Bob', content: 'Hello, how are you?', align: 'right' },
    { id: 1, sender: 'Alice', content: 'Hi there!', align: 'left' }, // sent message
    { id: 2, sender: 'Bob', content: 'Hello, how are you?', align: 'left' } // received message
    // Add more messages here
  ];
 
    const [richText, setRichText] = useState('');
   
  
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    };
  
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet',
      'link', 'image',
    ];
    const handleInputChange = (event) => {
        setRichText(event.target.value);
      }
  return (
    <>
    <div className="app">
      <div className="chat-container">
        <div className='Online'> Kuldeep singh Rajpoot Online </div>
        {messages.map((message) => (
          <Message
            key={message.id}
            sender={message.sender}
            content={message.content}
            align={message.align}
          />
        ))}
     <div className='message-input-container'>
     <ReactQuill
        theme="snow"
        value={richText}
        onChange={handleInputChange}
        modules={modules}
        formats={formats}
        style={{ height: '150px',color:"black",background:"white" }} // Custom height
        placeholder="Enter your text here"
      />
      <button>Send</button>
     </div>
      </div>
    </div>
    </>
  );
};

export default ChatApp;
