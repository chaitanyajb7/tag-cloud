import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import strings from '../../../localization/label';

import {
    makeStyles,
  } from '@material-ui/core/styles';
import './TagCloudView.css';

const getRandomColor = () =>{
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    background:{
      backgroundColor:"black",
    },
    margin: {
        margin: theme.spacing(1),
    },
}));
  
const TagCloudView= ({dataMap,reset,min,max}) => {
    const classes = useStyles();
    const fontMin = 13;
    const fontMax = 57;
    return(
      <>
        <Paper className={classes.background} elevation={3} variant="outlined" >
          <div className={"cloud"}>
              {
                    Object.keys(dataMap).map((item, i) => {
                    const size =  dataMap[item] === min ? fontMin : ( dataMap[item] / max) * (fontMax - fontMin) + fontMin;
                    return <div key={i} style={{'fontSize': `${size}px`,color:getRandomColor()}}> {item}</div>
                    })
              }
          </div>
        </Paper>
        <Button className={classes.margin} letiant="contained" color="secondary" onClick={reset} >
          {strings.reset}
        </Button>
      </>);
  }

export default TagCloudView;