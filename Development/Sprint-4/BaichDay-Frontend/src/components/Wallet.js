import React from "react";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import CurrentBids from "./CurrentBids";
import axios from "axios";

export default function Wallet() {
    const navigate = useNavigate();
    const userID = reactLocalStorage.get('userID');
    const [amount, setAmount] = React.useState(0)

    React.useEffect(() => {
        axios.post('https://pacific-sands-58031.herokuapp.com/user/wallet', {
            userID: userID
        }).then(function (response) {
            if (response.data.message === 'success') {
                setAmount(response.data.data.wallet);
            }
            else{
                alert(response.data.message);
            }
        }, amount)
    }, [])

    return (
        <div className="container" style={{ boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)', backgroundColor: "#eaeaea", width: "70%", height: "auto", padding: "2rem", whiteSpace: 'nowrap', overflow: 'hidden' }}>

            <div className="container" style={{ textAlign: "left" }}>
                <div className="row">
                    <h1 style={{ textAlign: "center", color: 'black', fontSize: '50px', fontWeight: "bolder", marginTop: "2%" }}>My Wallet</h1>
                </div>

                <div className="row" style={{ marginTop: "3%" }}>
                    <div className="col-md-6" style={{ borderRight: "2px outset #eee" }}>
                        <div style={{ marginLeft: "2%" }}>
                            <h3 style={{ fontSize: "2rem" }}>My Balance:</h3>
                            <h2 style={{ fontSize: "5rem", fontWeight: "bolder", color: "#3b3b3b", marginTop: "-3%" }}>${amount}</h2>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div style={{ textAlign: "center" }}>
                            <h4>Active Bids</h4>
                        </div>
                        <div style={{ marginTop: "auto" }}>
                            <CurrentBids />
                        </div>
                    </div>
                </div>

            </div>
            <button className="btn btn-success" onClick={() => { navigate("/payment") }} style={{ fontSize: "1.5rem", fontWeight: "bolder", padding: "1rem 2rem", borderRadius: "0.5rem", width: "auto", align: "center", marginTop: "5%" }}>Add Balance</button>

        </div>
    );
}
