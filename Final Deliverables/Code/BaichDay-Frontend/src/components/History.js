import React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { reactLocalStorage } from 'reactjs-localstorage';


function History() {
    let userID = reactLocalStorage.get('userID', "", true);
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        axios.post('https://pacific-sands-58031.herokuapp.com/user/viewallbidproducts', {
            userID: userID
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data.message === 'success') {
                    setData(response.data.data);
                }
                else {
                    alert(response.data.message)
                }
            });
    }, [])

    function Status(sold, newOwner) {
        if (sold === 'true') {
            if(userID === newOwner) {
                return 'Success';
            }
            else {
                return 'Failed';
            }
        }
        else {
            return 'In Progress';
        }
    };

    return (
        <div style={{ margin: "0 auto", textAlign: "center" }}>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <TableContainer className='m-4' component={Paper} style={{ maxHeight: "100vh"}}>
                    <Table stickyHeader sx={{ overflowY: 'scroll', backgroundColor: '#3c3d3f' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="left">Order ID</TableCell>
                                <TableCell style={{backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="left">Name</TableCell>
                                <TableCell style={{backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="left">Item</TableCell>
                                <TableCell style={{backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="center">Bid</TableCell>
                                <TableCell style={{ backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell align="left" style={{ color: 'white', fontSize: '12px' }}>{d._id} </TableCell>
                                    <TableCell align="left" style={{ color: 'white', fontSize: '12px' }}>{d.name} </TableCell>
                                    <TableCell align="left" style={{ color: 'white', fontSize: '12px' }}><img style={{height:'40px', width:'40px'}} src={d.image}></img> </TableCell>
                                    <TableCell align="center" style={{ color: 'white', fontSize: '12px' }}>{d.maxBid}</TableCell>
                                    <TableCell align="center" style={{ color: 'white', fontSize: '12px' }}>{Status(d.sold, d.newOwner)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default History;
