import React from 'react'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useFormik } from 'formik'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useNavigate, useLocation} from 'react-router-dom';

const style = {
  position: 'absolute',
  align: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
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
  const [prop, setProp] = React.useState(location.state)
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      bidCost: prop.bid[prop.bid.length - 1].bidCost,
    },
    onSubmit: values => {
      console.log(values)
      // alert(JSON.stringify(values, null, 2));
      console.log(prop._id)
      console.log(reactLocalStorage.get('userID', "", true))
      axios.post('https://pacific-sands-58031.herokuapp.com/user/bidonproduct', {
        userID: reactLocalStorage.get('userID', "", true),
        productID: prop._id,
        bidCost: values.bidCost
      }
      )
      .then(function (response) {
        console.log(response)
        if(response.data.message === "success")
        {
          console.log(response.data.token);
          alert(response.data.message);
          navigate('/');
        }
        else
        {
          alert("Incorrect Fields");
        }
        
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect Amount entered")
      });
    },
  });


  return (
    <div style={{width: '100%', height: '100%', display:'flex', maxWidth: '1200px', flexWrap: 'wrap'}}>
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
        <div className="col-sm-3" style={{textAlign: "center", padding: '2cm', margin:"30px 5cm 0cm 15%"}}>
          <div className="card" style={{width: "400px", outline: "3px ridge grey", height:"400px"}}>
            <img className="card-img-top" src={prop.image} alt="Card" style={{height:"400px", width:"400px"}}/>
          </div>
        </div>
        <div className="col-sm-3" style={{textAlign: "center", padding: '2cm', margin:"0 0 0 0"}}>
          <h2 style={{textAlign:"left"}}>{prop.name}</h2>
          <br/>
          <div style={{width: "30rem"}}>
            <div className="card-body" style={{backgroundColor:"white"}}>
              <div className='card-text row' style={{textAlign:"left", height:"180px"}}>
                <h5>Current Bid: ${prop.bid[prop.bid.length-1].bidCost}</h5>
                <h5>Number of Bids: {prop.bid.length}</h5>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
          <Button variant="contained" color="success" onClick={handleOpen}>Bid Now</Button>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default Product