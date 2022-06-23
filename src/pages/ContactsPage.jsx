import React, {useState, useCallback } from 'react';
import ContactsList from '../components/ContactsList';
import { debounce } from 'lodash';
import AddContact from '../components/AddContact';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const ContactsPage = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [showAddModal, setShowAddModal] = useState(false);

  const handeledFunc = useCallback(
    debounce((e) => setSearch(e.target.value), 500),
  []);
  return (
    <>
      <AddContact open={showAddModal} setOpen={setShowAddModal}/>
      <Box sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
        <Card sx={{minWidth: '70vw', margin:'15px'}}>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              onChange={handeledFunc}
              sx={{width: '140px', margin:'15px'}}
            />
            <IconButton
              onClick={() => setShowAddModal(true)}
              sx={{width:'78px'}}
            >
              <AddIcon/>
            </IconButton>
            <FormControl variant="standard" sx={{margin: '15px', width: '140px'}}>
              <InputLabel id="sort">Sort</InputLabel>
              <Select
                labelId="sort"
                id="sort"
                value={sort}
                label="sort"
                onChange={ e => setSort(e.target.value)}
              >
                <MenuItem value={'asc'}>Alphabetical</MenuItem>
                <MenuItem value={'desc'}>Reversed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <ContactsList search={search} sort={sort}/>
        </Card>
      </Box>
    </>
  )
}

export default ContactsPage;
