import React from 'react';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";


function History() {
    const dummydata = [
        {item: "Phone", bid: 3200, status: "Success"},
        {item: "Car", bid: 7000, status: "Failed"},
        {item: "Bike", bid: 4100, status: "In Progress"},
    ];

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div className='centered'>
                <h2 style={{margin:"0 0 30px 0", textAlign:'left'}}>Your History</h2>
                <h2 style={{margin:"0 0 15px 0", textAlign:'left'}}>Item    Bid    Status</h2>
                {dummydata.map((data) => (
                    <h2 style={{margin:"0 0 15px 0", textAlign:'left'}}>{data.item}   {data.bid}   {data.status}</h2>
                ))}
            </div>
        </div>
    );
};


export default History;