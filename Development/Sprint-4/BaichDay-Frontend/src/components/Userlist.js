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
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'


function Userlist() {
    let navigate = useNavigate();
    let userID = reactLocalStorage.get('userID', "", true);
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        axios.post('https://pacific-sands-58031.herokuapp.com/admin/allusers', {
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
    const [ban, setban] = React.useState(0)
    function banuser (id){
        setban(id)
        formik.handleSubmit()
    }

    const formik = useFormik({
        initialValues: {
          userID: userID,
        },
        onSubmit: values => {
          axios.post('https://pacific-sands-58031.herokuapp.com/admin/banuser', {
            userID: ban,
          }
          )
          .then(function (response) {
            console.log(response.data.message)
            if(response.data.message === "success")
            {
                alert('user banned');
                navigate('/Admin');
            }
            
          })
          .catch(function (error) {
            console.log(error);
            alert("Not able to ban user")
          });
        },
      });


    function Status(active) {
        if (active === true) {
            return (<p className='p-2 mt-3' style={{height:'28px', backgroundColor:'Green', borderRadius:'5px'}}>Active</p>);
        }
        else {
            return (<p className='p-2' style={{height:'28px', backgroundColor:'red', borderRadius:'5px'}}>InActive</p>);
        }
    };

    return (
        <div style={{ margin: "0 auto", textAlign: "center" }}>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <TableContainer className='m-4' component={Paper} style={{ maxHeight: "100vh"}}>
                    <Table stickyHeader sx={{ overflowY: 'scroll', backgroundColor: '#3c3d3f' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="left">User</TableCell>
                                <TableCell style={{backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="center">Name</TableCell>
                                <TableCell style={{ backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="center">Status</TableCell>
                                <TableCell style={{ backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="center">Ban</TableCell>
                                <TableCell style={{ backgroundColor: '#1e1e1e', color: 'white', fontSize: '18px', fontWeight: "bold" }} align="center">Profile</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell align="left" style={{ color: 'white', fontSize: '12px' }}><img style={{height:'50px', width:'50px', borderRadius:'50%'}} src={d.image}></img></TableCell>
                                    <TableCell align="center" style={{ color: 'white', fontSize: '12px' }}>{d.firstName} {d.lastName}</TableCell>
                                    <TableCell align="center" style={{ color: 'white', fontSize: '12px' }}>{Status(d.active)}</TableCell>
                                    <TableCell align="center" style={{ color: 'white', fontSize: '12px' }}><button type='submit' onClick={()=>{banuser(d.id)}} className='btn btn-danger' style={{padding:'1.5% 10%',fontSize:'12px'}}>Ban User</button></TableCell>
                                    <TableCell align="center" style={{ color: 'white', fontSize: '12px' }}><button className='btn btn-success mt-1' style={{padding:'1.5% 10%',fontSize:'12px'}}>View Profile</button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Userlist;
