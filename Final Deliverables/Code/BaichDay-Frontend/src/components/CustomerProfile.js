import Avatar from '@mui/material/Avatar';
import React from 'react'
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';

import Select from 'react-select';
import countryList from 'react-select-country-list';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




function CustomerProfile() {
    let navigate = useNavigate();
    let userID = reactLocalStorage.get('userID', "", true);
    const [open, setOpen] = React.useState(false);

    const options = useMemo(() => countryList().getData(), []);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');

    const [cust, setCust] = React.useState({});
    const [user, setUser] = React.useState({
        userID: userID
    });
    const handleClickOpen = () => {
        setOpen(true);
        console.log('true hogya hai bhai')
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
        axios.post('https://pacific-sands-58031.herokuapp.com/user/viewprofile', {
            userID: userID
        })
            .then(function (response) {
                if (response.data.message === 'success') {
                    let x = cust
                    x = response.data.data
                    x.userID = userID
                    x.password = '********'
                    setCust(x)
                }
            }, cust)
            .catch(function (error) {
                setAlertMessage('Unable to get details. Please try again.');
                setShowAlert(true);
            });
    }, []);

    function changeFirstName(e) {
        let x = cust;
        x.firstName = e;
        setCust(x)
        let a = user;
        a.firstName = e;
        setUser(a)
    }
    function changeLastName(e) {
        let x = cust;
        x.lastName = e;
        setCust(x)
        let a = user;
        a.lastName = e;
        setUser(a)
    }
    function changePassword(e) {
        let x = cust;
        x.password = e;
        setCust(x)
        let a = user;
        a.password = e;
        setUser(a)
    }
    function changePhoneNumber(e) {
        let x = cust;
        x.phoneNumber = e;
        setCust(x)
        let a = user;
        a.phoneNumber = e;
        setUser(a)
    }
    function changeAddress(e) {
        let x = cust;
        x.address = e;
        setCust(x)
        let a = user;
        a.address = e;
        setUser(a)
    }
    function changeCity(e) {
        let x = cust;
        x.city = e;
        setCust(x)
        let a = user;
        a.city = e;
        setUser(a)
    }
    const changeCountry = e => {
        console.log(e.label)
        let x = cust;
        x.country = e.label;
        setCust(x);
        let a = user;
        a.country = e.label;
        setUser(a);
    }
    
    function deleteAccount(){
        axios.post('https://pacific-sands-58031.herokuapp.com/user/deleteaccount', {
            userID: localStorage.getItem('userID')
        })
        .then(function (res) {
            if (localStorage.getItem('receiverID')) {
                localStorage.removeItem('receiverID');
            }
            if (localStorage.getItem('wallet')) {
                localStorage.removeItem('wallet');
            }
            if (localStorage.getItem('adminID')) {
                localStorage.removeItem('adminID');
            }
            if (localStorage.getItem('userID')) {
                localStorage.removeItem('userID');
            }
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            navigate('/login');
            
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    function done() {
        if (Object.keys(user).length > 1){
            axios.post('https://pacific-sands-58031.herokuapp.com/user/editprofile', user)
                .then(function (res) {
                    if (res.data.message === 'success') {
                        console.log(res)
                        window.location.reload(true)
                    }
                })
                .catch(function (error) {
                    setAlertMessage('Unable to edit details. Please try again.');
                    setShowAlert(true);
                });
        }
        else{
            setShowAlert(true);
            setAlertMessage('Please change a field to edit profile');
        }
    }


    return (
        <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ fontSize: 15 }}>
            Are you sure you want to delete your account? You may have on-going auctioned products. Click Delete to confirm 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="success" style={{ borderWidth: 1.99 }} onClick={handleClose}>Cancel</Button>
          <Button id='confirm-button' variant="contained" color="error" onClick={deleteAccount} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        <div className="container" style={{boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)', backgroundColor: "#eaeaea", whiteSpace: 'nowrap', padding: '2rem', width: "70%", marginTop: '2.5%' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '40% 1fr',
                alignItems: 'center',
            }}>
                <Avatar sx={{bgcolor: "grey", margin: "10px 10px", width: 150, height: 150, gridColumn: '1 / 2', fontSize: '50px'}} >{cust.firstName?.substring(0, 1)}{cust.lastName?.substring(0, 1)}</Avatar>
                <h1 style={{ textAlign: "left", color: 'black', fontSize: '50px', fontWeight: "bolder", gridColumn: '2 / 3' }}>My Profile</h1>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: '50% 1fr', alignItems: "auto" }}>
                <div className="row" style={{textAlign: "left", fontSize: '15px', fontFamily: "Helvetica", margin: "auto", marginTop: "5%", width: "50%"}}>
                    <label for="nameInput" className="form-label" style={{marginBottom: "0px"}}>First Name</label>
                    <input className="form-control" data-cy="firstName-input" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changeFirstName(e.target.value) }} placeholder={cust.firstName} />
                    <br></br>
                    <label for="nameInput" className="form-label" style={{marginBottom: "0px"}}>Last Name</label>
                    <input className="form-control" data-cy="lastName-input" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changeLastName(e.target.value) }} placeholder={cust.lastName} />
                    <br></br>
                    <label for="emailInput" className="form-label" style={{marginBottom: "0px"}}>Email</label>
                    <input className="form-control" type="text" disabled={true} style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} placeholder={cust.emailAddress} />
                    <br></br>
                    <label for="passwordInput" className="form-label" style={{marginBottom: "0px"}}>Password</label>
                    <input className="form-control" data-cy="password-input" type="password" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changePassword(e.target.value) }} placeholder={cust.password} />
                    <br></br>
                </div>
                <div className="row" style={{textAlign: "left", fontSize: '15px', fontFamily: "Helvetica", margin: "auto", marginTop: "5%", width: "50%"}}>
                    <label for="contactInput" className="form-label" style={{marginBottom: "0px"}}>Contact</label>
                    <input className="form-control" data-cy="contact-input" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changePhoneNumber(e.target.value) }} placeholder={cust.phoneNumber} />
                    <br></br>
                    <label for="addressInput" className="form-label" style={{marginBottom: "0px"}}>House Address</label>
                    <input className="form-control" data-cy="address-input" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changeAddress(e.target.value) }} placeholder={cust.address} />
                    <br></br>
                    <label for="cityInput" className="form-label" style={{marginBottom: "0px"}}>City</label>
                    <input className="form-control" data-cy="city-input" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changeCity(e.target.value) }} placeholder={cust.city} />
                    <br></br>
                    <label for="countryInput" className="form-label" style={{marginBottom: "0px"}}>Country</label>
                    <div style={{width: '400px'}}>
                        <Select options={options} id='country-select' placeholder= {cust.country} onChange={(e) => { changeCountry(e) }} />
                    </div>
                    
                    <br></br>
                </div>
            </div>
            <br></br>
            <div style={{ display: "grid", gridTemplateColumns: '50% 1fr', alignItems: "auto"}}>
                <div style={{textAlign: "left", margin: "-4% 0%"}}>
                    <Button id='delete-button' variant="contained" size='small'  color="error" style={{margin: "0% 26.5%", fontSize: "10px", fontWeight: "normal"}} onClick={handleClickOpen} >Delete Account</Button>
                </div>
                <div style={{textAlign: "center", margin: "-5% 0% 5%"}}>
                    <Button id='apply-button' variant="contained" size='small' style={{margin: "0% 62%", fontSize: "12px", fontWeight: "normal",backgroundColor:"#58811c",color:"white"}} onClick={done} class="btn">APPLY</Button>
                </div>
            </div>
            {showAlert && (
                <div style={{ marginTop: "-10px", marginBottom: "10px" }}>
                    <strong style={{ fontSize: "1.2em", fontWeight: "bold", color: "red" }}>{alertMessage}</strong>
                </div>
            )}
            <br></br>
        </div>
        </div>


    )
}

export default CustomerProfile