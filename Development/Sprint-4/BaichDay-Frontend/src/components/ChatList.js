import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles(() => ({
  listContainer: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '100vh',
    // width: '60%',
    height: '600px', /* set the height to your desired value */
    // overflow: 'scroll'
  },

}));

export default function ChatList() {
    let navigate = useNavigate();
    const [list, setList] = React.useState([]);
    const [selectedItemName, setSelectedItemName] = React.useState('');
    const classes = useStyles();

    const handleItemClick = (name) => {
        setSelectedItemName(name);
        localStorage.setItem('receiverID', name);
        navigate('/userchat');
      };

    React.useEffect(() => {     
        axios.post('http://localhost:8000/user/chatlist', {
          userID: localStorage.getItem('userID')
        })
        .then(function(res) {
            console.log(res.data.data)
            setList(res.data.data);
        }, list)
        .catch(function(err) {
            console.log(err);
      })
        }, []);


  return (
    <div className={classes.listContainer}>
        <h1>Messages</h1>
        <br />
    <List>
        {list.map((user) => (
        <ListItem sx={{ bgcolor: 'white', fontSize: '10px', padding: '20px' }} button onClick={() => handleItemClick(user._id)}>
            <ListItemAvatar>
            <Avatar alt={`${user.firstName}`} src={`${user.image}`} />
            </ListItemAvatar>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={`${user._id}`} sx={{ fontSize: '10px'}} />
        </ListItem>
        ))}
    </List>
    </div>
  );
}