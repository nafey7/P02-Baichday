import React from "react";
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";

export default function Payment() {
  let userID = reactLocalStorage.get('userID', "", true);
  const [amount, setAmount] = React.useState({});
  let navigate = useNavigate();

  function changeAmount(e){
    setAmount(e)
  }
  
  function addBalance(){
    axios.post("https://pacific-sands-58031.herokuapp.com/user/chargewallet", {
      userID: userID,
      amount: amount
    })
    .then(function(response) {
      if(response.data.message === "success"){
        console.log(response.data.data.wallet)
        reactLocalStorage.set('wallet', response.data.data.wallet);
        navigate("/wallet");
      }
      else{
        alert(response.data.message);
      }
    })
  }
  return (
    <MDBContainer
      className="py-5"
      fluid
    >
      <MDBRow className=" d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="5">
          <MDBCard className="rounded-3">
            <MDBCardBody className="p-4">
              <div className="text-center mb-4">
                <h3>Settings</h3>
                <h6>Payment</h6>
                </div>
              <p className="fw-bold mb-4">Add card details:</p>
              <MDBInput
                label="Cardholder's Name"
                id="form3"
                type="text"
                size="lg"
                value="Anna Doe"
              />
              <MDBRow className="my-4">
                <MDBCol size="7">
                  <MDBInput
                    label="Card Number"
                    id="form4"
                    type="text"
                    size="lg"
                    value="1234 5678 1234 5678"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <MDBInput
                    label="Expire"
                    id="form5"
                    type="password"
                    size="lg"
                    placeholder="MM/YYYY"
                  />
                </MDBCol>
                <MDBCol size="2">
                  <MDBInput
                    label="CVV"
                    id="form6"
                    type="password"
                    size="lg"
                    placeholder="CVV"
                  />
                </MDBCol>
                <MDBCol size="2">
                  <MDBInput
                    data-cy="balance-amount"
                    label="Amount"
                    id="form7"
                    size="lg"
                    onChange={(e) => {changeAmount(+e.target.value)}}
                    placeholder="Enter amount in PKR"
                  />
                </MDBCol>
              </MDBRow>
              <MDBBtn color="success" onClick={addBalance} size="lg" block data-cy="confirm-payment-button">
                Confirm Payment
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}