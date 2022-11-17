import React from 'react';
import {Grid} from '@mui/material'
import ActionAreaCard from './card';



const gridContainer = {
    paddingLeft: '30px',
    paddingRight: '30px',
    marginTop: '0px 0px 0px 0px'
}
const cardStyles ={
    margin: '10px 0px 0px 0px'
}

function DisplayCards(props){
    return(
        <div style={{width: '100%', height: '100%', display:'flex', maxWidth: '1200px', flexWrap: 'wrap'}}>
            
            <Grid container spacing="5" sx={gridContainer}>
                {props.test.map(function(object, i){ 
                    return(
                        <Grid item xs="12" sm="6" md="4" sx={cardStyles}>
                            <ActionAreaCard {... object} />;
                        </Grid>
                    ) 
                            
                })}
            </Grid>
        </div>
    )
}



export default DisplayCards;