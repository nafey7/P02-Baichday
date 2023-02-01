import React from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import DisplayCards from './DisplayCards';
import Box from '@mui/material/Box';


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
      <div>
        <Box sx={{ display: 'flex' }}> 
          <Box sx={{ width:"100%",flexGrow: 1}}><h1>All Products</h1></Box>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <DisplayCards test={dataprops}/>
          <div class="card">
            <button className="btn btn-success btn-lg" >Add to Featured Products</button>
            <button className="btn btn-success mt-3 btn-lg" >Ban Users</button>
            <button className="btn btn-success mt-3 btn-lg" >View Banned Users</button>
          </div>
        </Box>
      </div>
  );
}

export default AdminHome;