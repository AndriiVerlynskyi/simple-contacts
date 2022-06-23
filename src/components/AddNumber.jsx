import React from 'react';
import { Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NumberSchema = Yup.object().shape({
  number: Yup.string()
    .min(10, 'Has to be a valid number')
    .max(10)
    .required('Fill the value')
})

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

const AddNumber = ({ open, setOpen, addNumber }) => {
  const handleSubmit = (values) => {
    setOpen(false)
    addNumber(values.number)
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
          Add number
        </Typography>
        <Formik
          initialValues={{
            number: ''
          }}
          validationSchema={NumberSchema}
          onSubmit={handleSubmit}
        >
           {({ values, handleChange }) => (
            <Form>
              <TextField
                id="number"
                name="number"
                label="number"
                variant="outlined"
                onChange={handleChange}
                value={values.number}
              />
              <ErrorMessage name="number" />
              <br/>
              <Button
                sx={{margin: '10px', width: '170px'}}
                type='submit'
              >
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  )
}

export default AddNumber;
