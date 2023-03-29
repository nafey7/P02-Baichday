import React, { useState } from "react";
import InputVerificationCode from "react-input-verification-code";
import axios from "axios";
import Button from '@mui/material/Button';

function Test() {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/verify-code", { code })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
          <br />
          <Button type="submit" variant="contained" sx={{background: 'green'}}>Enter</Button>
        </form>
      </div>
    </div>
  );
}

export default Test;
