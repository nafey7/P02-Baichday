import React from 'react';
import './Login.css';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";



function Login() {
  const [Check, setCheck] = React.useState(false);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      axios.post('https://pacific-sands-58031.herokuapp.com/user/login', {
        emailAddress: values.email,
        password: values.password
      })
      .then(function (response) {
        console.log(response)
        if(response.data.message === "success")
        {
          reactLocalStorage.set('userID',response.data.data._id);
          reactLocalStorage.set('token',response.data.token);
          console.log(response.data.token);
          alert(response.data.message);
          navigate('/')
        }
        else
        {
          alert("Incorrect Fields");
        }
        
      })
      .catch(function (error) {
        console.log(error);
        navigate('/');
      });
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
        if (response.data.message === "success") {
        navigate("/verify")
        alert(response.data.message)
        navigate('/login');
      }
      else{
        alert(response.data.message)
      }
      })
      .catch(function (error) {
        console.log(error);
        alert(error)
      });
    },
  });

  return (
    <div style={{ height: '195%' }}>
      <div className="split left">
        <div className="centered">
          <img style ={{width:"110vh",height:"100vh"}} src='https://www.rcrwireless.com/wp-content/uploads/2021/11/95542665_s.jpg' alt="Avatar woman"/>
        </div>
      </div>

      <div className="split right">
        <div className="centered">
          {Check?(
          <form id = "signup_form" onSubmit={formikRegister.handleSubmit} style={{width: '400px', height: '100%', margin: '20px 0 0 0px', padding: '20px', background: 'white'}} >
            <h2 style={{margin:"0 0 30px 0", textAlign:'left'}}>Sign Up</h2>
            <div className="form-group">
              <input type="text" className="form-control" onChange={formikRegister.handleChange} value={formikRegister.values.firstName} name="firstName" id="firstName" placeholder="First Name" style={{width: '400', height: '40px', paddingLeft: '8px', backgroundColor:""}}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" onChange={formikRegister.handleChange} value={formikRegister.values.lastName} name="lastName" id="lastName" placeholder="Last Name" style={{width: '400', height: '40px', paddingLeft: '8px', backgroundColor:""}}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" onChange={formikRegister.handleChange} value={formikRegister.values.email} name="email" id="email" placeholder="Email" style={{width: '400', height: '40px', paddingLeft: '8px', backgroundColor:""}}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" onChange={formikRegister.handleChange} value={formikRegister.values.password} name="password" id="password" placeholder="Password" style={{width: '400', height: '40px', paddingLeft: '8px', backgroundColor:""}}/>
            </div>

            <button type="submit" id="log" className="btn" style={{color:"white",backgroundColor:"#a7ac38", width:"100px", display: "block", margin: '30px auto', textAlign: 'center'}}>SIGN UP</button>
            <p>Already have an account? <a href="#" onClick={()=>{setCheck(false)}} style={{color: '#a7ac38'}}>Sign In</a></p>
          </form>
          ):(
          <form id = "login_form" onSubmit={formik.handleSubmit} style={{width: '400px', height: '500px', overflow: 'hidden', margin: '200px 0 0px 0px', padding: '20px', background: 'white'}} >
            <h2 style={{margin:"0 0 30px 0",textAlign:'left'}}>Sign In</h2>
            <div className="form-group">
                <input type="text" className="form-control" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" style={{width: '400', height: '40px', paddingLeft: '8px', backgroundColor:""}}/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" style={{width: '400', height: '40px', paddingLeft: '8px', backgroundColor:"white"}}/>
            </div>
            <a href="#" style={{color: '#a7ac38',textAlign:'right'}}><p>Forgot password?</p></a>
            <br></br>
            <button type="submit" id="log" className="btn" style={{width:"100px",display: "block", margin: '0 auto', textAlign: 'center',backgroundColor:"#a7ac38"}}>SIGN IN</button>
            <br></br>
            <p>Don't have an account? <a href="#" style={{color: '#a7ac38'}} onClick={()=>{setCheck(true)}} >Sign Up</a></p>
          </form>)}    
        </div>
      </div>
    </div>
  )
}

export default Login