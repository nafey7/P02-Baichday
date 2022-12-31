import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useLocation, useNavigate} from "react-router-dom";





function AdminHome() {
    const [dataprops,setDataprops] = React.useState([{name: "", image: "img.png", bid: [0]}]);

    let navigate = useNavigate();
    React.useEffect(()=> {
        axios.get('https://pacific-sands-58031.herokuapp.com/product/')
        .then(function(res) {
            console.log(res.data.data)
            setDataprops(res.data.data)          
        }, dataprops)
        .catch(function(err) {
            console.log(err);
      })
    }, [])

    function productScreen(Name){
      let index = dataprops.findIndex( item => Name === item.name );
      navigate("/editproduct", {state: dataprops[index]});
    }

    return (
      <>
    <Link to={{pathname: "/AddProduct"}}>
    <button className="btn" style={{margin:"50px 0 0 79%",width:"200px",fontSize:"20px",color:"white",backgroundColor:"#aca738"}}>Add Featured Product</button>
    </Link>
    

        <h2 style={{margin:"0 0 0 80px",textAlign:"center"}}>All Products</h2>
               <div class="row" style={{margin:"0 0 55px 0cm"}}>
                   {dataprops.map((item)=>{
                     
                       return(
                         
                          <div class="col-3" style={{textAlign: "center", padding: '2cm', margin:"0 0 0 3cm"}}>
                           <div className="card" style={{width: "22rem", outline: "3px ridge grey"}}>
                           <button onClick={()=>{productScreen(item.name)}} ><img className="card-img-top" src={item.pic} alt="Card image cap"/></button>
                           <div className="card-body" style={{backgroundColor:"grey"}}>
                             <p className="card-text"><h4><b>{item.name}</b></h4></p>
                             <h4><b>Rs: {item.sales_price} /-</b></h4>
                           </div>
                         </div>
                         </div>
                       )
                   })}
              </div>
        
      </>
  );
}

export default AdminHome;
