import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import './ChatBubble.css';
import backgroundImage from './chatBackground.jpg';
import userBackground from './usersBackground.jpeg'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';




function ChatList() {

    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [userID, setuserID] = useState('');
    const [list, setList] = useState([]);
    const [data, setData] = React.useState([]);
    const [selectedItemName, setSelectedItemName] = React.useState('');
    const [userClick, setUserClick] = useState(false);
    const [receiverData, setReceiverData] = useState({});

    const messagesEndRef = useRef(null); //new
    const gridRef = useRef(null);

    function scrollToBottom() {
      gridRef.current.scrollTop = gridRef.current.scrollHeight;
    }

    const handleItemClick = (name, firstName, lastName, img) => {
      let fullName = firstName+' '+lastName;
      setReceiverData({name: fullName, image: img});
      setSelectedItemName(name);
      localStorage.setItem('receiverID', name);
      openChat();
    };

    const clickOnUser = (id) => {
      setUserClick(true);
    }

    const openChat = () => {
      axios.post('https://pacific-sands-58031.herokuapp.com/user/chat', {
      userID: localStorage.getItem('userID'),
      receiverID: localStorage.getItem('receiverID')
    })
    .then(function(res) {
        setMessages([]);
      setTimeout(() => {
        scrollToBottom();
      }, 0);
        console.log(res.data.data)
        setList(res.data.data);
    }, list)
    .catch(function(err) {
        console.log(err);
  })
    };
  
    useEffect(() => {
      const newSocket = io('https://pacific-sands-58031.herokuapp.com');
      setSocket(newSocket);
  
      return () => newSocket.close();
    }, []);

    React.useEffect(() => {
      axios.post('https://pacific-sands-58031.herokuapp.com/user/chatlist', {
          userID: localStorage.getItem('userID')
      })
          .then(function (response) {
              console.log('NOW DATA',response.data);
              setTimeout(() => {
                scrollToBottom();
              }, 0);
              if (response.data.message === 'success') {
                  setData(response.data.data);
              }
              else {
                  alert(response.data.message)
              }
          });
  }, [])
  
    useEffect(() => {

        const userIDStorage = localStorage.getItem('userID');
        if (userIDStorage) {
        setuserID(userIDStorage);
        }

      if (socket) {
        socket.emit('userConnected', userID);

        socket.on('chat message', (msg) => {
          setMessages((messages) => [...messages, msg]);
          setTimeout(() => {
            scrollToBottom();
          }, 0);
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
        <Box sx={{ position: 'sticky', top: 120, left: 0, right: 0, bottom: 0, ml: 6, mr: 3}}>
          <Grid container spacing={2}>
          <Grid item xs={4} style={{ padding: '0', height: '500px', overflowY: 'hidden', background: 'black'}}>
          <AppBar position="static" sx={{background: 'black'}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            USERS
          </Typography>
        </Toolbar>
      </AppBar>
          <List sx={{ width: '100%', padding: '0'}}>
          {data.map((user) => (
            <ListItem onClick={() => {handleItemClick(user._id, user.firstName, user.lastName, user.image); clickOnUser(user._id);}} style={{ fontSize: '20px', cursor: 'pointer', border: '0.5px solid grey', borderRight: 'none', borderLeft: 'none', background: '#F6F6F6'}}>
              <ListItemAvatar>
              <Avatar alt={`${user.firstName}`} src={`${user.image}`} />
              </ListItemAvatar>
              <ListItemText primaryTypographyProps={{ fontSize: '1.5rem' }} primary={`${user.firstName} ${user.lastName}`} />
            </ListItem>
                ))}
          </List>
        </Grid>
        {!userClick && (
           <Grid item xs={8} ref={gridRef} style={{ height: '500px', background: 'black', borderLeft: '1px solid grey', padding: '0'}}>
            <img src="./logo.png" alt="Logo" style={{ width: '50%', height: '100%' }} />
            </Grid>
        )}
        {userClick && (
           <Grid item xs={8} ref={gridRef} style={{ height: '500px', overflowY: 'scroll', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', borderLeft: '1px solid grey', padding: '0', position: 'relative'}}>
           <AppBar position="sticky" sx={{ background: 'black', top: 0 }}>
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar alt={`${receiverData.name}`} src={`${receiverData.image}`} />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {receiverData.name}
          </Typography>
        </Toolbar>
      </AppBar>
             <Stack spacing={2}>
               {list.map((msg) => (
                 <div className="chat-bubble" style={{background: msg.senderID === localStorage.getItem('userID') ? '#58811c' : 'grey', textAlign: 'left', borderTopLeftRadius: msg.senderID === localStorage.getItem('userID') ? '20px' : '0', borderTopRightRadius: msg.senderID === localStorage.getItem('userID') ? '0' : '20px', width: 'fit-content', marginLeft: msg.senderID === localStorage.getItem('userID') ? 'auto' : '30px', marginRight: msg.senderID === localStorage.getItem('userID') ? '30px' : 'auto'}}>
                   <div className="chat-bubble-text">{msg.content}</div>
                 </div>
               ))}
                 {messages.map((msg, index) => (
                   <div className="chat-bubble" style={{background: msg.senderID === localStorage.getItem('userID') ? '#58811c' : 'grey', textAlign: 'left', borderTopLeftRadius: msg.senderID === localStorage.getItem('userID') ? '20px' : '0', borderTopRightRadius: msg.senderID === localStorage.getItem('userID') ? '0' : '20px', width: 'fit-content', marginLeft: msg.senderID === localStorage.getItem('userID') ? 'auto' : '30px', marginRight: msg.senderID === localStorage.getItem('userID') ? '30px' : 'auto'}}>
                    <div className="chat-bubble-text">{msg.content}</div>
                 </div>
                 ))}
                 <div ref={messagesEndRef} />
             </Stack>
             <Stack sx={{position: 'sticky', bottom: 0, top: 'auto'}}>
              <form onSubmit={handleSubmit} style={{display: 'flex'}}>
                <input type="text" value={input} onChange={handleInputChange} style={{ width: '100%', height: '35px', fontSize: '18px' }}/>
                <Button type="submit" variant="contained" sx={{background: '#58811c', flexGrow: 1 }}>Send</Button>
              </form>
             </Stack>
           </Grid>
        )}
          
        </Grid>
        </Box>
    );
  };
  

export default ChatList;