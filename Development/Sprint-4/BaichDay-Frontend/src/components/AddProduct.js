import axios from 'axios';
import {useNavigate} from "react-router-dom";
import React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import Select from 'react-select';
import Box from '@mui/material/Box';

function AddProduct() {
    let navigate = useNavigate();
    const categoryOptions = [
        { value: 'option1', label: 'Collectibles' },
        { value: 'option2', label: 'Sporting' },
        { value: 'option3', label: 'Electronics' },
        { value: 'option4', label: 'Fashion' },
        { value: 'option5', label: 'Toy' },
        { value: 'option6', label: 'Music' },
        { value: 'option7', label: 'Cars' },
        { value: 'option8', label: 'Other' },
    ];
    const userID = reactLocalStorage.get('userID');
    const [cust, setCust] = React.useState({})
    
    function changeCost(e){
        let product = cust;
        product.cost= e;
        setCust(product)
    }
    function changeDescription(e){
        let product = cust;
        product.description = e;
        setCust(product)
    }
    function changeName(e){
        let product = cust;
        product.name = e;
        setCust(product)
    }
    function changeImage(e){
        let product = cust;
        product.image = e;
        setCust(product)
    }
    function changeDuration(e){
        let product = cust;
        product.duration = e;
        setCust(product)
    }
    function changeCategory(e){
        let product = cust;
        product.category = e.label;
        setCust(product)
    }

    function postProductDetails(){
        console.log(cust)
        axios.post('https://pacific-sands-58031.herokuapp.com/user/addproduct', {
          userID: userID,
          cost: cust.cost,
          description: cust.description,
          name: cust.name, 
          image: cust.image,
          duration: cust.duration,
          category: cust.category
          })
          .then(function (response) {
            //console.log(response)
            if(response.data.message==="success"){
            navigate('/')}
            
          })
          .catch(function (error) {
            alert("Unsuccessful attempt")
          });
    }
    
    return (
        // <Box sx={{ display: 'flex' }}>
        //     <div style={{display: "flex", justifyContent: 'center'}}>
        //     <h1 style={{margin:"70px 0 0 200px"}}>Product description:</h1>
        //     </div>
            
            
        // </Box>
        <div className="container" style={{boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)', backgroundColor: "#eaeaea", whiteSpace: 'nowrap', width: "70%", height: "100%", padding: '2rem', marginTop: '3%'}}>
            <h1 style={{ textAlign: "center", color: 'black', fontSize: '50px', fontWeight: "bolder" }}>Product Details</h1>
            <div style={{ display: "grid", gridTemplateColumns: '50% 1fr', alignItems: "auto" }}>
                <div className="row" style={{textAlign: "left", fontSize: '16px', fontFamily: "Helvetica", margin: "auto", marginTop: "5%", width: "50%"}}>
                    <label for="nameInput" className="form-label" style={{marginBottom: "0px"}}>Product Name</label>
                    <input className="form-control" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px', fontSize: '13px'}} onChange={(e)=>{changeName(e.target.value)}} placeholder="Name" required />
                    <br></br>
                    <label for="nameInput" className="form-label" style={{marginBottom: "0px"}}>Product Description</label>
                    <input className="form-control" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px', fontSize: '13px'}} onChange={(e)=>{changeDescription(e.target.value)}} placeholder="Product Description" required />
                    <br></br>
                    <label for="nameInput" className="form-label" style={{marginBottom: "0px"}}>Product Image</label>
                    <input id="5" type="file" onChange={(e)=>{ 
                        var file = e.target.files[0]
                        var FR = new FileReader();
                        var baseString;
                        FR.onloadend = function () {
                            baseString = FR.result;
                            console.log(baseString); 
                            changeImage(baseString)
                        };
                        FR.readAsDataURL(file);
                    }} required/>
                </div>
                <div className="row" style={{textAlign: "left", fontSize: '16px', fontFamily: "Helvetica", margin: "auto", marginTop: "5%", width: "50%"}}>
                    <label for="contactInput" className="form-label" style={{marginBottom: "0px"}}>Reserve Amount</label>
                    <input className="form-control" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px', fontSize: '13px'}} onChange={(e)=>{changeCost(e.target.value)}} placeholder="Reserve Amount" required/>
                    <br></br>
                    <label for="addressInput" className="form-label" style={{marginBottom: "0px"}}>Duration</label>
                    <input className="form-control" type="text" style={{marginBottom: "10px", marginLeft: "7px", height: '40px', fontSize: '13px'}} onChange={(e)=>{changeDuration(e.target.value)}} placeholder="Duration in Hours" required />
                    <br></br>
                    <label for="addressInput" className="form-label" style={{marginBottom: "0px"}}>Category</label>
                    <div style={{width: '400px'}}>
                        <Select options={categoryOptions}  placeholder="Category" onChange={(e) => {changeCategory(e)}} />
                    </div>
                </div>
            </div>
            <div style={{textAlign: "right", margin: "2% 12% 3%"}}>
                <button type="button" class="btn" onClick={()=>{postProductDetails()}} style = {{fontSize:"18px",backgroundColor:"#008000",color:"white",margin: "Auto 0 auto 200px"}}>Add Product</button>
            </div>
            {/* <div class="row align-items-center">
            <div class="col-2">
                
                
                </div>
                <form  >
                    
                <br></br>
                <div className='container' style={{height:"55vh", width:"60vw",backgroundColor:"#E5E5E5", borderRadius:"15px", margin:"0 0 100px 200px"}}>
                    <div className='row' style={{margin:"70px 0 0 70px "}}>
                        <div class="col-5">
            
                            <input class="form-control" type="text" placeholder="Name" id= "1" name ="1" onChange={(e)=>{changeName(e.target.value)}}  aria-label="name"/>
                            <br></br>
                            <input class="form-control" type="text" placeholder="Product Description" id= "4" name ="4" onChange={(e)=>{changeDescription(e.target.value)}} aria-label="Product Description"  rows="3"/>            
                            <br></br>
                            <input class="form-control" type="number" placeholder="Duration in hours" id= "4" name ="4" min="1" max="10" onChange={(e)=>{changeDuration(e.target.value)}} aria-label="Duration"  rows="3"/>            
                            <br></br>
                            <input id="5" type="file" onChange={(e)=>{ 
                                var file = e.target.files[0]
                                var FR = new FileReader();
                                var baseString;
                                FR.onloadend = function () {
                                    baseString = FR.result;
                                    console.log(baseString); 
                                    changeImage(baseString)
                                };
                                FR.readAsDataURL(file);
                            }}/>
                                
                            </div>
                            <div class="col-5" style={{margin:"0px 0 0 40px "}}>
                            <input class="form-control" type="text" placeholder="Reserve Amount" aria-label="cost" onChange={(e)=>{changeCost(e.target.value)}} id= "6" name ="6" />
                            <br></br>
                        
                        <button type="button" class="btn" onClick={()=>{postProductDetails()}} style = {{fontSize:"18px",backgroundColor:"#aca738",color:"white",margin: "Auto 0 auto 200px"}}>Add Product</button>
                        </div>
                    </div>
                </div>
                </form>
            </div> */}
        
    </div> 
    )
}

export default AddProduct
