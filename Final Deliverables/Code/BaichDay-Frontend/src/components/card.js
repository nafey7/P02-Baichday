import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Link} from 'react-router-dom';
import Timer from './Timer'
import axios from 'axios'



export default function ActionAreaCard(props) {
  const [time, setTime] = React.useState(0)
  const [isActive, setActive] = React.useState(false)
  const [test, setTest] = React.useState(0)
  React.useEffect(()=> {

    axios.post('https://pacific-sands-58031.herokuapp.com/product/single/', {productID: props._id})
    .then(function(res) {
        // console.log(res.data.data)
        setTime(res.data.data)
        setActive(true)    
    }, time)
    .catch(function(err) {
        console.log(err);
    })
  },[])

  return (
    <Link to={{pathname:'/product'}} state= {{...props}} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea >
          <CardMedia
            component="img"
            height="140"
            image={props.image[0]}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
            {props.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Box sx={{ fontSize: "120%", display: "flex", justifyContent: "space-between", paddingLeft: '30px', paddingRight: '30px', marginTop: '0px' }}>
                <Box sx={{ width: '30vw', marginRight: 1, borderRight: "1px solid gray", textAlign: "center" }}>
                <p className="h4">Max Bid</p>
                <p className="h4">${props.bid[props.bid.length-1].bidCost}</p>
                </Box> 
                <Box sx={{ width: '30vw', marginRight: 1, borderRight: "1px solid gray", textAlign: "center" }}>
                <p className="h4">Bids</p>
                <p className="h4">{props.bid.length-1}</p>
                </Box>
                <Box sx={{ width: '40vw', textAlign: "center" }}>
                  <div>
                    {isActive ? (
                      <Timer duration={time} type={true}/>
                    ) : (
                      <div>
                      <h5>Timer loading</h5>
                      {()=>{setTest(Math.floor(Math.random() * 1000))}}
                      </div>
                    )}
                  </div>
                </Box>
              </Box>
            </Typography>

          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}