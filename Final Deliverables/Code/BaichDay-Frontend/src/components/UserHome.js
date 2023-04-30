import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import DisplayCards from './DisplayCards';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";


function UserHome(props) {
    const [dataprops, setDataprops] = React.useState([{ name: "", image: "img.png", bid: [0] }]);
    const [dataCheck, setDataCheck] = React.useState(false);
    let navigate = useNavigate();
    let rand = Math.floor(Math.random() * 1000);
    React.useEffect(()=> {
        if(props.title ==="Featured Products"){
          axios.get('https://pacific-sands-58031.herokuapp.com/product/')
          .then(function(res) {
              console.log("in featured products");
              console.log(res.data.data);
              setDataprops(res.data.data);
              setDataCheck(true);          
          }, dataprops)
          .catch(function(err) {
              console.log(err);
        })
        }else{
          console.log("in categories");
          axios.post('https://pacific-sands-58031.herokuapp.com/product/category', {category: props.title})
          .then(function(res) {
            console.log(res.data.data)
              setDataprops(res.data.data);
              setDataCheck(true);          
          }, dataprops)
          .catch(function(err) {
              console.log(err);
        })
        }
  
    },[])

    return(
        <div>
            
            <div>
                <h2 style={{ textAlign: 'left', marginLeft:"60px" }}>{props.title}</h2>
            </div>

            <Box sx={{ display: 'flex', overflowY: 'auto' }}>
                
                {dataCheck ? (
                    <DisplayCards test={dataprops}/>

                ):(
                    <div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                    </div>
                )} 
                <div style={{backgroundSize: 'cover', width: '17%', height: '70%', position: 'fixed', top: '18%', right: '0px', }}>
                    <img style={{maxWidth: '100%', maxHeight: '100%', paddingRight: '5%'}} src="221.jpg" alt="advert" />
                </div> 
                
            </Box>
            <br />
            <br />
        </div>

    )
}


export default UserHome;