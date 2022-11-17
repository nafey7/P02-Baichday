import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Link} from 'react-router-dom';

export default function ActionAreaCard(props) {
  return (
    <Link to={{pathname:'/product'}} state= {{...props}} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea >
          <CardMedia
            component="img"
            height="140"
            image={props.image}
            alt="Item"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
            {props.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <div style={{fontSize: "150%"}}>
                  <b>${props.bid[props.bid.length-1].bidCost}</b>
                  <br/>
                  <b>{props.bid.length} Bids Currently</b>
                  {/* <b>{props.time} hours left</b> */}
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}