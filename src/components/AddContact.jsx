import React, { useState } from 'react';
import { addContant } from '../shared/api/contacts';
import { useQueryClient } from 'react-query';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddContact = ({ open, setOpen }) => {
  const [name, setName] = useState('');
  const {refetchQueries} = useQueryClient();

  const handleAddContact = async () => {
    setOpen(false)
    await addContant({name, phoneNumbers:[]})
    await refetchQueries(['get-contacts'], {active: true})
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add contact
        </Typography>
        <TextField
          id="outlined-basic"
          label="user's name"
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br/>
        <Button onClick={handleAddContact} sx={{margin: '10px', width: '170px'}}>
          Add
        </Button>
      </Box>
    </Modal>
  )
}

export default AddContact;
