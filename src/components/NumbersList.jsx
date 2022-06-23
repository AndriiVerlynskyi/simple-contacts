import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getUserById } from '../shared/api/contacts';
import { updateUser } from '../shared/api/contacts';
import AddNumber from './AddNumber';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const NumbersList = ({ id }) => {
  const [user, setUser] = useState({
    name: '',
    id: '',
    phoneNumbers: []
  });
  const [showAddNumber, setShowAddNumber] = useState(false);

  const addNumber = (number) => {
    user.phoneNumbers.push(`+${number}`)
  }

  const {
    isLoading,
    isError,
    data,
    refetch
  } = useQuery('get-single-user',
  () => getUserById(id), {
    onSuccess: data => setUser(data),
    select: response => response.data,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const handleDeleteNum = async (e) => {
    const phoneNumbers = data.phoneNumbers.filter( number => {
      return number !== e.target.name
    })
    setUser({...user, phoneNumbers})
  }
  const handleSave = async () => {
    await updateUser(user)
    await refetch();
  }
  return (
    <>
      <AddNumber
        open={showAddNumber}
        setOpen={setShowAddNumber}
        addNumber={addNumber}
      />
      <List sx={{width: '100%'}}>
        <Button onClick={handleSave} sx={{width: '100%'}}>
          Save
        </Button>
        {user.name ? (
          <Typography variant='h4' sx={{margin: '25px'}}>{user.name}</Typography>
        ) : null
        }
        <Box sx={{display:'flex', justifyContent:'center'}}>
          <IconButton
            onClick={() => setShowAddNumber(true)}
            sx={{width:'50px', height:'50px'}}
          >
            <AddIcon/>
          </IconButton>
        </Box>
        {
          isLoading ? <div>Loading...</div> :
          isError ? <div>Error while getting data</div> :
          user.phoneNumbers.length ? 
          user.phoneNumbers.map( number => {
            return (
                <ListItem
                  key={number}
                  sx={{display:'flex', justifyContent:'space-between'}}
                >
                  {number}
                  <Button
                    name={number}
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteNum}
                  >
                    DELETE
                  </Button>
                </ListItem>
            )
          }) : <div>No phonse numbers are found</div>
        }
      </List>
    </>
  )
}

export default NumbersList;
