import * as React from 'react';
import { styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Link} from 'react-router-dom'
import {reactLocalStorage} from 'reactjs-localstorage';
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import { useFormik } from 'formik';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import History from './History';
import { ReactComponent as Logo } from './logo.svg';

export default function AdminNavbar() {
  const [Check, setCheck] = React.useState(false);
  let navigate = useNavigate();
  function logout(){
    reactLocalStorage.remove('username');
    navigate("/login")
  }
  function viewprofile(){
    
  }
  function history(){
    navigate('/History')
  }
  let username
  React.useEffect(() => {
    username = reactLocalStorage.get('username', "", true);
    if(username !== ""){
      setCheck(true);
    }

  }, username)
  
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: values => {
      console.log(values)

      axios.post('https://pacific-sands-58031.herokuapp.com/product/search', {
        name: values.name
      }
      )
      .then(function (response) {
        console.log(response)
        if(response.data.message === "success")
        {
          if(response.data.length===0){
            alert("Item not Found")
          }
          else{
            console.log(response.data)
            navigate('/product',{ state: {
              _id: response.data.data[0]._id,
              name: response.data.data[0].name,
              image: response.data.data[0].image,
              bid: response.data.data[0].bid,
            }})
          }
        }
        else
        {
          alert("Object Not Found");
        }
        
      })
      .catch(function (error) {
        console.log(error);
        alert("Error")
      });
    },
  });
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
   
    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{backgroundColor:"black"}}>
        <Toolbar>

          <Link to={{pathname: "/Admin"}} style={{margin:"0 15px",textDecoration:"none", fontSize:"18px", color: "#a7ac38"}}><Logo style={{width:"200px", height:"70px"}} className="d-inline-block"/></Link>
          <Link to={{pathname: "/userlist"}} style={{backgroundColor:'black',textDecoration:"none",margin:"0 15px",fontSize:"150%", marginLeft:"50px", color:"white"}}>Users</Link>
          <Link to={{pathname: "/productlist"}} style={{backgroundColor:'black',textDecoration:"none",margin:"0 15px",fontSize:"150%", marginLeft:"50px", color:"white"}}>Products</Link>
          
          <FormControl sx={{backgroundColor: 'white', borderRadius:"15px", width: "40%", marginLeft: "45%"}} variant="standard">
          <Input
            type={'text'}
            id="name"
            disableUnderline = "false"
            placeholder="   Search Keyword"
            onChange={formik.handleChange}
            endAdornment={
                <IconButton
                  onClick={formik.handleSubmit}
                >
                <SearchIcon/>
                </IconButton>
            }
            label="search"
          />
        </FormControl>
          <IconButton
            fontSize= "20px"
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <AccountCircle sx={{fontSize: "35px"}} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>Admin Profile</MenuItem>
            <MenuItem>My Notifications</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
            
        </Toolbar>
      </AppBar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Box>
    
  );
}