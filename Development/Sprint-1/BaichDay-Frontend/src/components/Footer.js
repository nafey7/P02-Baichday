import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';

export default function Footer() {
    let navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, bottom: 0, height:"11%",width:"100%", position:"sticky"}}>
      <AppBar position="sticky" sx={{bottom: 0, height:"100%"}}>
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            BaichDay
            <br/>
            Where you get the price you deserve
            <br/>
            <button className="btn btn-dark" onClick={() =>{navigate("/AboutUs")}} style={{fontSize:"100%", borderRadius:"10px" ,margin:"0 15px 0 0%"}}>About us</button>
            <button className="btn btn-dark" onClick={() =>{navigate("/ContactUs")}} style={{fontSize:"100%", borderRadius:"10px"}}>Contact us</button>
          </Typography>
          {/* <button>About us</button>
          <button>Contact us</button> */}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}