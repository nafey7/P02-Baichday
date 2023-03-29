import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


function UserChat() {

    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [userID, setuserID] = useState('');
    const [list, setList] = useState([]);

    const messagesEndRef = useRef(null); //new

    const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" }) // new
    }
  
    useEffect(() => {
      const newSocket = io('https://pacific-sands-58031.herokuapp.com');
      setSocket(newSocket);
  
      return () => newSocket.close();
    }, []);

    useEffect(() => {     
    axios.post('https://pacific-sands-58031.herokuapp.com/user/chat', {
      userID: localStorage.getItem('userID'),
      receiverID: localStorage.getItem('receiverID')
    })
    .then(function(res) {
        console.log(res.data.data)
        setList(res.data.data);
    }, list)
    .catch(function(err) {
        console.log(err);
  })
    }, []);
  
    useEffect(() => {

        const userIDStorage = localStorage.getItem('userID');
        if (userIDStorage) {
        setuserID(userIDStorage);
        }

      if (socket) {
        socket.emit('userConnected', userID);

        socket.on('chat message', (msg) => {
          setMessages((messages) => [...messages, msg]);
          scrollToBottom(); //new
        });
      }
    }, [socket]);
  
    const handleInputChange = (e) => {
      setInput(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (input) {
        let msgToSend = {senderID: localStorage.getItem('userID'), receiverID: localStorage.getItem('receiverID'), content: input}
        socket.emit('chat message', msgToSend, localStorage.getItem('userID'), localStorage.getItem('receiverID'));
        setInput('');
      }
    };

  
    return (
        <Box>
          <h1>Chat</h1>
          <br />
          <Grid style={{ height: '400px', overflowY: 'scroll', background: 'black' }}>
            <ul style={{fontSize: '20px', paddingRight: '25px', listStyleType: "none", height: 'auto'}}>
              {list.map((msg) => (
                <li style={{background: 'green', borderRadius: '15px', padding: '10px', margin: '10px', textAlign: msg.senderID === localStorage.getItem('userID') ? 'right' : 'left' }}>{msg.content}</li>
              ))}
                {messages.map((msg, index) => (
                  <li style={{background: 'green', borderRadius: '15px', padding: '10px', margin: '10px', textAlign: msg.senderID === localStorage.getItem('userID') ? 'right' : 'left' }}>{msg.content}</li>
                ))}
                <div ref={messagesEndRef} />
            </ul>
            
          </Grid>
        <form onSubmit={handleSubmit} style={{display: 'flex', background: 'black'}}>
          <input type="text" value={input} onChange={handleInputChange} style={{ width: '100%', height: '35px', fontSize: '18px' }}/>
          <Button type="submit" variant="contained" sx={{background: 'green', flexGrow: 1 }}>Send</Button>
        </form>
        
        </Box>
    );
  };
  

export default UserChat;