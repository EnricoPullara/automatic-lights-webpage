import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Switch,
  FormControlLabel
} from "@mui/material";
import { styled } from '@mui/material/styles';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BedtimeOffIcon from '@mui/icons-material/BedtimeOff';
import axios from "axios";
import { SERVER_DOMAIN, SERVER_TOKEN } from "../config";
import React from "react";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { yellow } from "@mui/material/colors";

const FormControlLabelStyled = styled(FormControlLabel)({
  marginLeft:"auto",
});
async function getLightStatus(id, board) {
  let light = {
    status: 0,
    autotimer: 0
  }
  await getData()
  .then(res => {
    res.forEach(element => {
      if (element.id === id && element.board === board) {
        light = element;
        return false;
      }
    });
  })

  return light;
}

async function getData() {
  try {
     let res = await axios({
          url: SERVER_DOMAIN + 'getLights.php?auth=' + SERVER_TOKEN,
          method: 'get',
          timeout: 8000,
          headers: {
              'Content-Type': 'application/json',
          }
      });  
      return res.data;
  }
  catch (err) {
      console.error(err);
  }
}


const DomCard = ({component, type}) => {
  var [lightStatus, setLightStatus] = React.useState(true);
  React.useEffect(() => {
    getLightStatus(3, 'arduino1').then(result => {setLightStatus(result)});
  }, []);
  const [checked, setChecked] = React.useState(lightStatus.status);

  async function handleButton(type) {
    if (type === 'status') {
      console.log('checked',checked);
      if (checked === (lightStatus.status === 1)) {
        return;
      }
    }
    setChecked(!checked);
    let res = await axios({
      url: SERVER_DOMAIN + 'switchLight.php?auth=' + SERVER_TOKEN + '&id=3&board=arduino1&type=' + type,
      method: 'get',
      timeout: 8000,
    });  
    console.log(type, res.data);
    getLightStatus(3, 'arduino1').then(result => {setLightStatus(result)});
  }
  return (
    <Card sx={{ margin: 1 }} style={{backgroundColor: "#d0e8ff"}}>
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {component.name}
          
          <LightbulbIcon sx={lightStatus.status && { color: yellow[500] }}/>
        </Typography>        
      </CardContent>
      
      <CardActions disableSpacing>
        <Typography color="text.secondary">
          Auto
        </Typography>
        <IconButton onClick={async () => {await handleButton('autotimer')}}>
          {lightStatus.autotimer ? <BedtimeIcon /> : <BedtimeOffIcon /> }
        </IconButton>
        {
          !lightStatus.autotimer &&
            <FormControlLabelStyled
              control={
                <Switch 
                  checked = {lightStatus.status === 1} 
                  onChange = {async () => {await handleButton('status')}}
                />
              }
              labelPlacement="start"
              labelColor="text.secondary"
              label={<Typography color="text.secondary">Stato</Typography>}
            />
        }
      </CardActions>
    </Card>
  );
};

export default DomCard;

