import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from 'react-query';
import { deleteContact } from '../shared/api/contacts';
import { useNavigate } from 'react-router-dom';

const ContactCard = ({ contact, sort, search }) => {
  const navigate = useNavigate();

  const { refetchQueries } = useQueryClient();
  const handleMutate = useMutation(
    deleteContact,{
      onSuccess: 
        () => refetchQueries(['get-contacts', sort, search], {active: true}),
    }
  )
  
  const handleShowUserDetails = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      navigate(`/userdetails/${contact.id}`)
    }
  };
  const handleDelete = () => {
    handleMutate.mutate(contact.id)
  }
  return (
    <Card sx={{width:'65vw'}} onClick={handleShowUserDetails}>
      <CardContent sx={{display:'flex', justifyContent:'space-between'}}>
        <Typography variant='h5'>
          {contact.name}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
        >
          DELETE
        </Button>
      </CardContent>
    </Card>
  )
}

export default ContactCard;
