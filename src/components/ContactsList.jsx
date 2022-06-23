import React, { useState } from 'react';
import ContactCard from './ContactCard';
import { useInfiniteQuery } from 'react-query';
import { getContacts } from '../shared/api/contacts';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';


const ContactsList = ({ sort, search }) => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const quantity = 5;
  
  const {
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery(
    ['get-contacts', sort, search],
    ({ pageParam: page = 1}) => getContacts({
      page,
      quantity,
      sort,
      search
    }),{
      onSuccess: response => {
        setUsers([].concat(...response.pages.map(page => page.data.users)))
        setTotalCount(Math.ceil(response.pages[0].data.length / quantity))
      },
      getNextPageParam: (_ , allPages) => {
        if (totalCount > allPages.length) {
          return allPages.length + 1
        }
      },
      keepPreviousData: true
    }
  )
  const handleLoadMore = async () => {
    await fetchNextPage()
  }
  return (
    <>
      <List sx={{textAlign:'center'}}>
        {
          isLoading ? <div>Loading...</div> :
          isError ? <div>Error occured</div> :
          !!users.length ? (
            users.map( (contact, index) => (
              <ListItem key={contact.id}>
                <ContactCard contact={contact} sort={sort} search={search}/>
                {
                  index < users.length -2 &&
                  <Divider/>
                }
              </ListItem>
            ))
          ) : <div>Can't find users</div>
        }
      </List>
      {
        hasNextPage &&
          <Box sx={{display:'flex', justifyContent:'center'}}>
            <Button onClick={handleLoadMore}>
              Load more
            </Button>
          </Box>
      }
    </>
  )
}

export default ContactsList;
