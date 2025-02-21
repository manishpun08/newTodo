import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import $axios from '../lib/axios.instance';
import Details from './Details';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from '../store/slices/snackBarSlice';

const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // For Add Task
  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ['add-task'],
    mutationFn: async (values) => {
      return await $axios.post('/add', values);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries('todo-list');
      dispatch(openSuccessSnackbar(response?.data?.message));
      // console.log(response?.data?.message)
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
      // console.log(error)
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  const email = localStorage.getItem('email');

  return (
    <>
      <Grid container>
        <Grid
          item
          lg={6}
          md={6}
          xs={12}
          sx={{ padding: '2rem', background: '' }}
        >
          <Formik
            enableReinitialize
            initialValues={{
              task: '',
              description: '',
            }}
            validationSchema={Yup.object({
              task: Yup.string().required('Task is required'),
              description: Yup.string().required('Description is required'),
            })}
            onSubmit={(values) => {
              mutate(values);
            }}
          >
            {(formik) => (
              <form
                style={{
                  width: '300px',
                  background: '#000000',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  padding: '1.5rem',
                  margin: 'auto',
                  borderRadius: '20px',
                }}
                onSubmit={formik.handleSubmit}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#307cff',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    background: '#04182dfe',
                    padding: '10px',
                  }}
                >
                  Add Your Task Here
                </Typography>
                <FormControl>
                  <TextField
                    sx={{
                      [`& fieldset`]: {
                        borderColor: 'white',
                        borderRadius: '20px',
                      },
                    }}
                    inputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'grey' } }}
                    required
                    size="small"
                    label="Task"
                    {...formik.getFieldProps('task')}
                  />
                  {formik.touched.task && formik.errors.task ? (
                    <FormHelperText error>{formik.errors.task}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    sx={{
                      [`& fieldset`]: {
                        borderColor: 'white',
                        borderRadius: '20px',
                      },
                    }}
                    id="outlined-multiline-static"
                    multiline
                    rows={7}
                    defaultValue="Type your description"
                    InputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'grey' } }}
                    required
                    size="small"
                    label="Description"
                    {...formik.getFieldProps('description')}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <FormHelperText error>
                      {formik.errors.description}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: '20px' }}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          xs={12}
          sx={{ padding: '2rem', background: '' }}
        >
          {email && <Details />}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
