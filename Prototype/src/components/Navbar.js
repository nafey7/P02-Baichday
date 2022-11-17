import React from 'react'
import {Link} from 'react-router-dom'
import {reactLocalStorage} from 'reactjs-localstorage';
import {useLocation, useNavigate} from "react-router-dom";
import axios from 'axios'
import { useFormik } from 'formik'


function Navbar(props) {
  const [Check, setCheck] = React.useState(false);
  let navigate = useNavigate();
  function logout(){
    reactLocalStorage.remove('username');
    navigate("/login")
  }
  let username
  React.useEffect(() => {
    username = reactLocalStorage.get('username', "", true);
    if(username !== ""){
      setCheck(true);
    }

  }, username)
  
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: values => {
      console.log(values)

      axios.post('https://pacific-sands-58031.herokuapp.com/product/search', {
        name: values.name
      }
      )
      .then(function (response) {
        console.log(response)
        if(response.data.message === "success")
        {
          if(response.data.length===0){
            alert("Item not Found")
          }
          else{
            console.log(response.data)
            navigate('/product',{ state: {
              _id: response.data.data[0]._id,
              name: response.data.data[0].name,
              image: response.data.data[0].image,
              bid: response.data.data[0].bid,
            }})
          }
        }
        else
        {
          alert("Object Not Found");
        }
        
      })
      .catch(function (error) {
        console.log(error);
        alert("Error")
      });
    },
  });


  return (
      <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark" style={{backgroundColor:"black"}}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style= {{backgroundColor:"",margin:"0 40px 0px"}}>
            <ul className="navbar-nav"style= {{backgroundColor:"",margin:"0 225px 0px"}}>
              <li className="nav-item">
                <Link to={{pathname: "/"}} style={{margin:"0 20px", fontSize:"18px", color: "#a7ac38"}}>Home</Link>
              </li>
              {/* <li className="nav-item">
                <Link to={{pathname: "/Sports"}} style={{margin:"0 20px", fontSize:"18px", color: "white"}}>Sports</Link>
              </li>
              <li className="nav-item">
                <Link to={{pathname: "/Fashion"}} style={{margin:"0 20px", fontSize:"18px", color: "white"}}>Fashion</Link>
              </li> */}
              {/* <li className="nav-item">
                <Link to={{pathname: "/Art"}} style={{margin:"0 20px", fontSize:"18px", color: "white"}}>Art</Link>
              </li> */}
              <li className="nav-item" style ={{margin:"0 0px 0 300px"}}>
                <Link to={{pathname: "/AddProduct"}} style={{margin:"0 20px", fontSize:"18px", color: "white"}}>Add Product</Link>
              </li>
            </ul>
            
          </div>
          
          <div className='justify-content-end'>
          <form  id="search" className="d-flex" onSubmit={formik.handleSubmit} style={{display:'inline-flex'}}>
                <input onChange={formik.handleChange} name="name" id="name" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{borderRadius: '15px', margin: "5px 0px 0px 0px"}}/>
                <button className="btn btn-outline-success" type="submit"><i className="material-icons" style={{fontSize:"25px",color:"white"}}>search</i></button>
          </form>
          </div>
          <div>
          <Link to={{pathname: "/cart",}}
            ><button className='btn btn-outline-success' style={{fontSize:"20px"}}><i className="glyphicon glyphicon-shopping-cart" style={{fontSize:"20px",color:"white"}}></i></button></Link>
          <Link to={{pathname: "/login"}} style={{backgroundColor:"",margin:"0 20px", fontSize:"18px"}}>
          <button className='btn btn-primary' style={{fontSize:"10px"}}>Sign In</button></Link>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
