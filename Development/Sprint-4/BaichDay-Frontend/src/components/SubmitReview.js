import React, { useState } from "react";
import InputVerificationCode from "react-input-verification-code";
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';


function PinAuthentication() {
  const [code, setCode] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://pacific-sands-58031.herokuapp.com/user/confirmpin')
    .then(function(res) {
      if (res.data.message === "success") {
        navigate('/');
        console.log(res.data.data)
      }
      else{
        console.log('Error');
      }
    })
    .catch(function(err) {
      console.log(err);
      alert("Wrong PIN");
})
  };
  
  return (
    <div>
      
    </div>
  );
}

export default PinAuthentication;


