import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import ContactsPage from './pages/ContactsPage';
import SingleContactPage from './pages/SingleContactPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ContactsPage/>}/>
          <Route path='/userdetails/:id' element={<SingleContactPage/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
