import Avatar from '@mui/material/Avatar';
import React from 'react'
import {useNavigate} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import { useEffect } from 'react';

function CustomerProfile() {
    let userID = reactLocalStorage.get('userID', "", true);
    const [cust, setCust] = React.useState({})
    const [chan, setChan] = React.useState({
        userID: userID
    })
    let navigate = useNavigate();

    useEffect(() => {
        axios.post('https://pacific-sands-58031.herokuapp.com/user/viewprofile', {
            userID: userID
        })
        .then(function(response) {
            if (response.data.message === 'success'){
                let x = cust
                x = response.data.data
                x.userID = userID
                x.password = '********'
                setCust(x)
            }
            else{
                alert(response.data.message)
            }
        }, cust)
    }, []);

    function changeFirstName(e){
        let x = cust;
        x.firstName = e;
        setCust(x)
        let a = chan;
        a.firstName = e;
        setChan(a)
    }
    function changeLastName(e){
        let x = cust;
        x.lastName = e;
        setCust(x)
        let a = chan;
        a.lastName = e;
        setChan(a)
    }
    function changeEmail(e){
        let x = cust;
        x.emailAddress = e;
        setCust(x)
        let a = chan;
        a.emailAddress = e;
        setChan(a)
    }
    function changePassword(e){
        let x = cust;
        x.password = e;
        setCust(x)
        let a = chan;
        a.password = e;
        setChan(a)
    }
    function changePhoneNumber(e){
        let x = cust;
        x.phoneNumber = e;
        setCust(x)
        let a = chan;
        a.phoneNumber = e;
        setChan(a)
    }
    function changeAddress(e){
        let x = cust;
        x.address = e;
        setCust(x)
        let a = chan;
        a.address = e;
        setChan(a)
    }
    function changeCity(e){
        let x = cust;
        x.city = e;
        setCust(x)
        let a = chan;
        a.city = e;
        setChan(a)
    }
    function changeCountry(e){
        let x = cust;
        x.country = e;
        setCust(x)
        let a = chan;
        a.country = e;
        setChan(a)
    }
    function done(){
        console.log(chan)
        axios.post('https://pacific-sands-58031.herokuapp.com/user/editprofile', chan)
            .then(function(res) {
                if(res.data.message === 'success'){
                    console.log(res)
                }
                else{
                    alert(res.data.message)
                }                      
            })
            .catch(function(err) {
                console.log(err);
        })
        navigate('/')
    }

    return (
        <div className="container" style={{ margin: "50px 150px", height:"50%", backgroundColor:"white", position:"relative", width:"100%"}}>
        <div className="row">
            <h1 style={{color: '#a7ac38', }}>My Profile</h1>
        </div>
        <div className="row" style ={{ margin: "20px"}}>
            <Avatar
                alt="Remy Sharp"
                sx={{ width: 128, height: 128 }}>H</Avatar>

            
        </div>
        
        <div className="row">
            <label for="nameInput" className="form-label">First Name</label>
            <input className="form-control" type="text" onChange={(e)=>{changeFirstName(e.target.value)}} placeholder={cust.firstName}/>
            <br></br>
            <label for="nameInput" className="form-label">Last Name</label>
            <input className="form-control" type="text" onChange={(e)=>{changeLastName(e.target.value)}} placeholder={cust.lastName}/>
            <br></br>
            <label for="nameInput" className="form-label">Email</label>
            <input className="form-control" type="text" onChange={(e)=>{changeEmail(e.target.value)}} placeholder={cust.emailAddress}/>
            <br></br>
            <label for="passwordInput" className="form-label">Password</label>
            <input className="form-control" type="password" onChange={(e)=>{changePassword(e.target.value)}} placeholder={cust.password}/>
            <br></br>
            
            <label for="contactInput" className="form-label">Contact</label>
            <input className="form-control" type="text" onChange={(e)=>{changePhoneNumber(e.target.value)}} placeholder={cust.phoneNumber} />
            <br></br>
            
            <label for="addressInput" className="form-label">House Address</label>
            <input className="form-control" type="text" onChange={(e)=>{changeAddress(e.target.value)}}  placeholder={cust.address}/>
            <br></br>
            
            <br></br>
            
            <label for="addressInput" className="form-label">City</label>
            <input className="form-control" type="text" onChange={(e)=>{changeCity(e.target.value)}}  placeholder={cust.city}/>
            <br></br>

            <br></br>
            
            <label for="addressInput" className="form-label">Country</label>
            <input className="form-control" type="text" onChange={(e)=>{changeCountry(e.target.value)}} placeholder={cust.country}/>
            <br></br>
            <div>
            <br/>
            
            <button type="button"style = {{margin: 'auto', width:"100px"}} onClick={done} className="btn btn-success">Apply</button>
            <br></br>
            </div>
            <br></br>
            <button style = {{margin: 'auto', width:"100px"}}type="button" className="btn btn-danger" /*onClick={()=>{deleteaccount()}}*/>Delete My Account</button>
            <br></br>
            <br></br>
        </div>
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
        </div>   
        
    )
}

export default CustomerProfile