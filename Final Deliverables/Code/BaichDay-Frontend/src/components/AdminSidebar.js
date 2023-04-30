import { Nav } from 'react-bootstrap';
import './AdminHome.css';
import {Link} from 'react-router-dom'
import Typography from '@mui/material/Typography';


export default function Sidebar() {


return ( 
    <div className='col-2 card p-4 text-left' style={{borderRadius:'2%', height:'100vh'}}>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block',  fontSize: '250%'} }}
        >
        Baich Day
        </Typography>
            
        <Nav defaultActiveKey="/admin" className="flex-column">
            <Nav.Link className='navitem' href="/admin">Dashboard</Nav.Link>
            <Nav.Link className='navitem' eventKey="link-1">Users</Nav.Link>
            <Nav.Link className='navitem' eventKey="link-2">Products</Nav.Link>
        </Nav>
    </div>
  );
}