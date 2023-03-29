import Avatar from '@mui/material/Avatar';
import React from 'react'
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';

import Select from 'react-select';
import countryList from 'react-select-country-list';




function CustomerProfile() {
    let userID = reactLocalStorage.get('userID', "", true);

    const options = useMemo(() => countryList().getData(), [])

    const [cust, setCust] = React.useState({})
    const [user, setUser] = React.useState({
        userID: userID
    })
    let navigate = useNavigate();
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
                else {
                    alert(response.data.message)
                }
            }, cust)
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
    function changeEmail(e) {
        let x = cust;
        x.emailAddress = e;
        setCust(x)
        let a = user;
        a.emailAddress = e;
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
    function done() {
        axios.post('https://pacific-sands-58031.herokuapp.com/user/editprofile', user)
            .then(function (res) {
                if (res.data.message === 'success') {
                    console.log(res)
                    window.location.reload(true)
                }
                else {
                    alert(res.data.message)
                }
            })
            .catch(function (err) {
                console.log(err);
            })
        
    }


    return (
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
                    <input className="form-control" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changeFirstName(e.target.value) }} placeholder={cust.firstName} />
                    <br></br>
                    <label for="nameInput" className="form-label" style={{marginBottom: "0px"}}>Last Name</label>
                    <input className="form-control" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changeLastName(e.target.value) }} placeholder={cust.lastName} />
                    <br></br>
                    <label for="nameInput" className="form-label" style={{marginBottom: "0px"}}>Email</label>
                    <input className="form-control" type="text" disabled={true} style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changeEmail(e.target.value) }} placeholder={cust.emailAddress} />
                    <br></br>
                    <label for="passwordInput" className="form-label" style={{marginBottom: "0px"}}>Password</label>
                    <input className="form-control" type="password" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changePassword(e.target.value) }} placeholder={cust.password} />
                    <br></br>
                </div>
                <div className="row" style={{textAlign: "left", fontSize: '15px', fontFamily: "Helvetica", margin: "auto", marginTop: "5%", width: "50%"}}>
                    <label for="contactInput" className="form-label" style={{marginBottom: "0px"}}>Contact</label>
                    <input className="form-control" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changePhoneNumber(e.target.value) }} placeholder={cust.phoneNumber} />
                    <br></br>
                    <label for="addressInput" className="form-label" style={{marginBottom: "0px"}}>House Address</label>
                    <input className="form-control" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changeAddress(e.target.value) }} placeholder={cust.address} />
                    <br></br>
                    <label for="addressInput" className="form-label" style={{marginBottom: "0px"}}>City</label>
                    <input className="form-control" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px'}} onChange={(e) => { changeCity(e.target.value) }} placeholder={cust.city} />
                    <br></br>
                    <label for="addressInput" className="form-label" style={{marginBottom: "0px"}}>Country</label>
                    <div style={{width: '400px'}}>
                        <Select options={options}  placeholder= {cust.country} onChange={(e) => { changeCountry(e) }} />
                    </div>
                    
                    <br></br>
                </div>
            </div>
            <br></br>
            <div style={{ display: "grid", gridTemplateColumns: '50% 1fr', alignItems: "auto"}}>
                <div style={{textAlign: "left", margin: "-4% 0%"}}>
                    <Button variant="contained" size='small'  color="error" style={{margin: "0% 26.5%", fontSize: "9px", fontWeight: "normal"}} /*onClick={()=>{deleteaccount()}}*/>Delete Account</Button>
                </div>
                <div style={{textAlign: "right", margin: "-5% 0% 5%"}}>
                    <Button variant="contained" color="success" size='large' style={{margin: "0% 60%", fontSize: "130%", fontWeight: "bold"}} onClick={done} className="btn btn-success">Apply</Button>
                </div>
                </div>
            <br></br>
        </div>

    )
}

export default CustomerProfile