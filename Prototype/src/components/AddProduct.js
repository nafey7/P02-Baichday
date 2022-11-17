import axios from 'axios';
import {useNavigate} from "react-router-dom";
import React from 'react'

function AddProduct() {
    let navigate = useNavigate();
    const [cust, setCust] = React.useState({
        cost: '',
        description:"",
        name: "", 
        image: "",

    })
    
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

    function postProductDetails(){
        axios.post('https://pacific-sands-58031.herokuapp.com/user/addproduct', {
          cost: cust.cost,
          description: cust.description,
          name: cust.name, 
          image: cust.image,
          })
          .then(function (response) {
            alert(response.data.message)
            //console.log(response)
            if(response.data.message==="success"){
            navigate('/')}
            
          })
          .catch(function (error) {
            navigate('/home')
          });
    }
    
    return (
    <div className="Product" style={{height:"100vh",width:"100wh",backgroundColor:"white"}}>
    <div class="container" style={{margin: "50px 150px",backgroundSize:"cover",backgroundColor:"white", position:"relative", width:"100%"}}>
        <div class="row align-items-center">
        <div class="col-2">
            
            
            </div>
            <h1 style={{margin:"70px 0 0 200px"}}>Product description:</h1>
            <form  >
                
            <br></br>
            <div className='container' style={{height:"55vh", width:"60vw",backgroundColor:"#E5E5E5", borderRadius:"15px", margin:"0 0 100px 200px"}}>
            <div className='row' style={{margin:"70px 0 0 70px "}}>
            <div class="col-5">
 
            <input class="form-control" type="text" placeholder="Name" id= "1" name ="1" onChange={(e)=>{changeName(e.target.value)}}  aria-label="name"/>
            <br></br>
            <input class="form-control" type="text" placeholder="Product Description" id= "4" name ="4" onChange={(e)=>{changeDescription(e.target.value)}} aria-label="Product Description"  rows="3"/>            
            <br></br>
            <input class="form-control" type="text" placeholder="url" aria-label="url" id= "5" onChange={(e)=>{changeImage(e.target.value)}} name ="5" />

                 
            </div>
            <div class="col-5" style={{margin:"0px 0 0 40px "}}>
            
            <input class="form-control" type="text" placeholder="cost" aria-label="cost" onChange={(e)=>{changeCost(e.target.value)}} id= "6" name ="6" />
            <br></br>
            
            <button type="button" class="btn" onClick={()=>{postProductDetails()}} style = {{fontSize:"18px",backgroundColor:"#aca738",color:"white",margin: "Auto 0 auto 200px"}}>Add Product</button>
            </div>
            </div>
            </div>
            </form>
        </div>
        
    </div> 
    
    
    </div>
    )
}

export default AddProduct
