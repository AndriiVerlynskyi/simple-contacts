import React from 'react';
import NumbersList from '../components/NumbersList';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

const styles = {
  minWidth: '300px',
  maxWidth:'50vw',
  margin:'15px',
  display: 'flex',
  justifyContent: 'space-between'
}

const SingleContactPage = () => {
  const navigate = useNavigate();
  
  const {id} = useParams();
  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
      <Button onClick={() => navigate('/')}>
        Back
      </Button>
      <Card sx={styles}>
        <NumbersList id={id}/>
      </Card>
    </Box>
  )
}

export default SingleContactPage