import React, { useState } from "react";
import InputVerificationCode from "react-input-verification-code";
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';


function PinAuthentication() {
  const [code, setCode] = useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://pacific-sands-58031.herokuapp.com/user/confirmpin', {
      token: localStorage.getItem('token'),
      pin: code
    }).then(function(res) {
      if (res.data.message === "success") {
        reactLocalStorage.set('userID',res.data.data._id);
        reactLocalStorage.set('token',res.data.token);
        reactLocalStorage.set('wallet', res.data.data.wallet);
        navigate('/');
      console.log(res.data.data)
      }
  })
  .catch(function(err) {
      console.log(err);
      setShowAlert(true);
      setAlertMessage('Incorrect PIN entered, please try agains');
})
  };
  
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div style={{ boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)', backgroundColor: "#eaeaea", whiteSpace: 'nowrap', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "50%", height: '400px', padding: '2rem', marginTop: '7%' }}>
        <form onSubmit={handleSubmit}>
          <h1>Authentication Code</h1>
          <p style={{fontSize: '15px'}}>Your security is our top priority.<br />Enter the verification code sent to your email</p>
          <br/>
          <InputVerificationCode
            style={{ margin: "0 auto" }}
            length={6}
            onChange={(code) => setCode(code)}
          />
          <br></br>
          <br></br>

          <Button type="submit" className='mt-5 btn' variant="contained" sx={{background: '#4BB543'}} size="large" style={{ fontSize: '1.5rem', padding: '1rem 2rem' }}>Enter</Button>

          {showAlert && (
              <div className='col' style={{marginTop: "20px", marginBottom: "10px" }}>
                  <strong style={{fontSize: "1.2em", fontWeight: "bold", color: "red" }}>{alertMessage}</strong>
              </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PinAuthentication;


