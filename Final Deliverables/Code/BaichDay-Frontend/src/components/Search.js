import React, { useState } from 'react';
import {Typography } from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';



export default function Search() {
    const location = useLocation();
    const [results, setResults] = useState(location.state.data.data);
    console.log(results)
    function Status(sold) {
      if (sold === 'true') {
              return 'Sold';
          }
          else {
              return 'In Progress';
          }
      
    };
    let navigate = useNavigate();
    
  return (




    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h3" sx={{marginBottom:"1%"}}>Search Results</Typography>
    

      {results.length > 0 ? ( 

            <div style={{ display: "flex", justifyContent: "center" }}>
                <TableContainer className='m-4' style={{ maxHeight: "100vh", backgroundColor:"white"}}>
                    <Table stickyHeader sx={{ overflowY: 'scroll', backgroundColor: '#3c3d3f' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="left">Product</TableCell>
                                <TableCell style={{backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="center">Name</TableCell>
                                <TableCell style={{ backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="center">Status</TableCell>
                                <TableCell style={{ backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="center">Highest Bid</TableCell>
                                <TableCell style={{ backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="center">Details</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {results.map((d) => (
                                  <TableRow hover key={d.id} sx={{width:'100%'}} onClick={()=>{
                                    if(location.state.admin === true){navigate('/AdminProduct', { state:d})}else{
                                    navigate('/product', { state:d})}}}>
                                      <TableCell align="left" style={{ color: 'white', fontSize: '12px' }}><img style={{height:'50px', width:'50px'}} src={d.image}></img></TableCell>
                                      <TableCell align="center" style={{  fontSize: '12px' }}>{d.name}</TableCell>
                                      <TableCell align="center" style={{ fontSize: '12px' }}>{Status(d.sold)}</TableCell>
                                      <TableCell align="center" style={{fontSize: '12px' }}>${d.bid[d.bid.length-1].bidCost}</TableCell>
                                      <TableCell align="center" style={{fontSize: '12px' }}>{d.createdAt.slice(0, 10)}</TableCell>
                                  </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        ) : (
          <Typography>No results found.</Typography>
        )}
        </div>
  );
}

