import React from 'react'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useFormik } from 'formik'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useNavigate, useLocation} from 'react-router-dom';
import Timer from './Timer'

const style = {
  position: 'absolute',
  align: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Product() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [bid, setBid] = React.useState()
  const location = useLocation();
  const [prop, setProp] = React.useState(location.state);
  const [time, setTime] = React.useState(0);
  const [isActive, setActive] = React.useState(false);
  const userID = reactLocalStorage.get('userID');

  let navigate = useNavigate();
  
  React.useEffect(()=> {

    axios.post('https://pacific-sands-58031.herokuapp.com/product/single/', {productID: prop._id})
    .then(function(res) {
        // console.log(res.data.data)
        setTime(res.data.data)
        setActive(true)    
    }, time)
    .catch(function(err) {
        console.log(err);
    })
  },[])

  const formik = useFormik({
    initialValues: {
      bidCost: prop.bid[prop.bid.length - 1].bidCost,
    },
    onSubmit: values => {
      let amount = parseInt(values.bidCost);
      console.log("Amount:", amount, "type", typeof(amount));
      // alert(JSON.stringify(values, null, 2));
      axios.post('https://pacific-sands-58031.herokuapp.com/user/bidonproduct', {
        userID: userID,
        productID: prop._id,
        bidCost: amount
      }
      )
      .then(function (response) {
        console.log(response.data);
        if(response.data.message === "success")
        {
          navigate('/');
        }
        
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect Amount entered")
      });
    },
  });


  return (
    <div className="container" style={{boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)', backgroundColor: "#eaeaea", whiteSpace: 'nowrap', width: "100%", padding: '2rem', marginTop: '5%' }}>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form id = "signup_form" onSubmit={formik.handleSubmit} style={{align: 'center'}}>
            <h2 style={{margin:"0 0 30px 0", textAlign:'left'}}>Place Bid</h2>
            <div className="form-group">
              <input type="text" className="form-control" onChange={formik.handleChange} name="bidCost" id="bidCost" placeholder={prop.bid[prop.bid.length - 1].bidCost} style={{width: '100px', height: '40px'}}/>
            </div>

            <button type="submit" id="log" className="btn" style={{color:"white",backgroundColor:"#a7ac38", width:"100px", display: "block", margin: '30px auto', textAlign: 'center'}}>BID</button>
          </form>
          
        </Box>
      </Modal>
      <div className='row'>
        <div className="col-5" style={{padding:'2% 10%'}}>
          <div className="card" style={{marginLeft: '-20%'}}>
            <img className="card-img-top" src={prop.image[0]} alt="Card" style={{height:"100%", width:"100%", minHeight: '40vh',  minWidth: "60vh", border: '10px solid #afafaf', borderRadius: '0'}}/>
          </div>
        </div>
        <div className="col-7" style={{padding:'0 5%',textAlign:"left"}}>
          <br/>
          <div style={{width: "100vh"}}>
            <div className="card-body">
              <div className='card-text row'>
                <h1 className='bold' style={{fontSize:"50px", textAlign:"left"}}>{prop.name}</h1>  
                <h3><b>Number of Bids:</b> {prop.bid.length - 1}</h3>
                <div style={{ width: 'auto', height: '100%', textAlign: "justify", whiteSpace: "normal", wordWrap: "break-word", maxWidth: '90vh'}}>
                <p className='mt-4 h1'><strong>Description :</strong> <span className='h2'>{prop.description}</span></p>
                </div>
                <p className='mt-4 h1'><b>Current Bid :</b> <b className='text-danger '>${prop.bid[prop.bid.length-1].bidCost}</b></p>
                <div>
                  {isActive && (
                    <Timer duration={time}/>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            {prop.userID === userID ? (
              <></>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: '50% 1fr', columnGap:"50px"}}>
                <input type="text" className="form-control" onChange={formik.handleChange} name="bidCost" id="bidCost" placeholder="Enter Bid" style={{marginTop:"30px", marginLeft:"-3px", height: '40px', width: '60%', fontSize: '15px'}}/>
                <button className='mt-5 btn' style={{fontSize:"20px", background: '#4BB543', color:"white", width:"150px", height:"40px", float: "right"}}variant="contained" onClick={formik.handleSubmit}><b>Bid Now</b></button>
              </div>
            )}
          </div>
          </div>
      </div>
     
    </div>
  )
}

export default Product