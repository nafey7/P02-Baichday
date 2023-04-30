import React from 'react';
import './Login.css';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import TypeWriterEffect from 'react-typewriter-effect';



function Login() {
  const [Check, setCheck] = React.useState(false);
  const [userType, setType] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  let navigate = useNavigate();

  function handleUser(e) {
    setType(e);
  }

  function handleCheck(e) {
    setCheck(e);
    setAlertMessage('');
    setShowAlert(false);
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      if (userType === 'customer') {
        console.log("Customer Here");
        axios.post('https://pacific-sands-58031.herokuapp.com/user/login', {
          emailAddress: values.email,
          password: values.password
        })
          .then(function (response) {
            if (response.data.message === "success") {
              reactLocalStorage.set('userID', response.data.data._id);
              reactLocalStorage.set('token', response.data.token);
              reactLocalStorage.set('wallet', response.data.data.wallet);
              console.log(response.data.data.wallet);
              navigate('/')
            }

          })
          .catch(function (error) {
            setAlertMessage('Incorrect Email or Password. Please try again.');
            setShowAlert(true);
          });
      }
      else if (userType === 'admin') {
        axios.post('https://pacific-sands-58031.herokuapp.com/admin/login', {
          emailAddress: values.email,
          password: values.password
        })
          .then(function (response) {
            if (response.data.message === "success") {
              console.log('hello')
              reactLocalStorage.set('adminID', response.data.data.adminInfo._id);
              reactLocalStorage.set('token', response.data.data.token);
              navigate('/Admin')
            }

          })
          .catch(function (error) {
            setAlertMessage('Incorrect Email or Password. Please try again.');
            setShowAlert(true);
          });
      }
      else {
        setAlertMessage('Please select between Customer and Admin');
        setShowAlert(true);
      }
    },
  });

  const formikRegister = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      axios.post('https://pacific-sands-58031.herokuapp.com/user/signup', {
        firstName: values.firstName,
        lastName: values.lastName,
        emailAddress: values.email,
        password: values.password
      })
        .then(function (response) {
          console.log(response.data);
          if (response.data.message === "success") {
            reactLocalStorage.set('token', response.data.token);
            navigate('/pinauthentication');
          }
        })
        .catch(function (error) {
          setAlertMessage(error.response.data.data);
          setShowAlert(true);
        });
    },
  });

  return (
    <div style={{ height: 'auto' }}>
      <div className="split left" style={{ backgroundColor: 'black' }}>
        <div className="centered">
          <img style={{ width: "auto", height: "100vh" }} src='logo.png' alt="Avatar woman" />
        </div>
      </div>

      <div className="split right" style={{ backgroundColor: '#eaeaea' }} >

        <TypeWriterEffect
          textStyle={{ fontSize: "40px", fontWeight: "bold", padding: "5rem", marginTop: "0%", textAlign: "center" }}
          startDelay={150}
          cursorColor="black"
          text="Welcome to Baichday!"
          typeSpeed={100}
          eraseSpeed={1}
        />
        <br />

        <div className="centered" style={{ backgroundColor: '#eaeaea' }}>
          {Check ? (
            <form id="signup_form" onSubmit={formikRegister.handleSubmit} style={{ boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)', width: '400px', height: 'auto', overflow: 'hidden', whiteSpace: 'nowrap', padding: '1.3rem', backgroundColor: 'white'}} >
              <h2 style={{ margin: "0 0 30px 0", textAlign: 'center', fontSize: "25px" }}>Sign Up</h2>
              <div className="form-group">
                <input type="text" className="form-control" onChange={formikRegister.handleChange} value={formikRegister.values.firstName} name="firstName" id="firstName" placeholder="First Name" style={{ width: '400', height: '40px', paddingLeft: '8px', fontSize: '13px' }} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" onChange={formikRegister.handleChange} value={formikRegister.values.lastName} name="lastName" id="lastName" placeholder="Last Name" style={{ width: '400', height: '40px', paddingLeft: '8px', fontSize: '13px' }} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" onChange={formikRegister.handleChange} value={formikRegister.values.email} name="email" id="email" placeholder="Email" style={{ width: '400', height: '40px', paddingLeft: '8px', fontSize: '13px' }} required />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" onChange={formikRegister.handleChange} value={formikRegister.values.password} name="password" id="password" placeholder="Password" style={{ width: '400', height: '40px', paddingLeft: '8px', fontSize: '13px' }} required />
              </div>
              <br />
              {showAlert && (
                <div style={{ marginTop: "-10px", marginBottom: "10px" }}>
                  <strong style={{ fontSize: "1.2em", fontWeight: "bold", color: "red" }}>{alertMessage}</strong>
                </div>
              )}

              <button type="submit" id="log" className="btn" style={{ width: "100px", display: "block", margin: '0 auto', textAlign: 'center', backgroundColor: "#58811c", fontSize: "15px", padding: '5px', color: "white" }}>SIGN UP</button>
              <br/>
              
              <p style={{fontSize: '13px'}}>Already have an account? <a href="#" onClick={() => { handleCheck(false) }} style={{ color: '#598419', fontSize: '13px' }}>Sign In</a></p>
            </form>
          ) : (
            <form id="login_form" onSubmit={formik.handleSubmit} style={{ boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)', width: '400px', height: 'auto', overflow: 'hidden', whiteSpace: 'nowrap', padding: '2rem', backgroundColor: 'white' }} >
              <h2 style={{ margin: "0 0 30px 0", textAlign: 'center', fontSize: "25px" }}>Sign In</h2>
              <br />
              <div className="form-group">
                <input type="email" className="form-control" data-cy="email-login" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" style={{ width: '100%', height: '40px', paddingLeft: '8px', fontSize: "15px" }} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" data-cy="password-login" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" style={{ width: '100%', height: '40px', paddingLeft: '8px', fontSize: "15px" }} />
              </div>
              {showAlert && (
                <div style={{ marginTop: "-10px", marginBottom: "10px" }}>
                  <strong style={{ fontSize: "1.2em", fontWeight: "bold", color: "red" }}>{alertMessage}</strong>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-evenly", marginLeft: '-20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px' }}>
                  <input type="radio" data-cy="customer-radio" name="userType" checked={userType === "customer"} style={{ marginRight: '5px', WebkitAppearance: 'none', height: '20px', width: '20px', borderRadius: '50%', border: '2px solid #ccc' }} onChange={(e) => { handleUser(e.target.value) }} value="customer" /> Customer
                </label>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px' }}>
                  <input type="radio" data-cy="admin-radio" name="userType" checked={userType === "admin"} style={{ marginRight: '5px', WebkitAppearance: 'none', height: '20px', width: '20px', borderRadius: '50%', border: '2px solid #ccc' }} onChange={(e) => { handleUser(e.target.value) }} value="admin" /> Admin
                </label>
              </div>
              <br/><br />
              <button type="submit" data-cy="login-button" id="log" className="btn" style={{ width: "100px", display: "block", margin: '0 auto', textAlign: 'center', backgroundColor: "#58811c", fontSize: "15px", padding: '5px', color: "white" }}>SIGN IN</button>
              <br></br>
              <p style={{fontSize: '13px'}}>Don't have an account? <a href="#" style={{ color: '#598419', fontSize: '13px' }} onClick={() => { handleCheck(true) }} >Sign Up</a></p>
              <a href="#" style={{ color: '#598419', fontSize: '13px'}}><p>Forgot password?</p></a>
            </form>)}
        </div>
      </div>
    </div>
  )
}

export default Login