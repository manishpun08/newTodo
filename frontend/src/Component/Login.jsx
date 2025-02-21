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
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import $axios from '../lib/axios.instance';
import PersonIcon from '@mui/icons-material/Person';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import { openSuccessSnackbar } from '../store/slices/snackBarSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values) => {
      return await $axios.post('http://localhost:8080/user/login', values);
    },
    onSuccess: (response) => {
      localStorage.setItem('token', response?.data?.token);
      localStorage.setItem('email', response?.data?.user?.email);
      localStorage.setItem('firstName', response?.data?.user?.firstName);
      localStorage.setItem('lastName', response?.data?.user?.lastName);
      navigate('/');
      dispatch(openSuccessSnackbar(response?.data?.message));
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Box
        sx={{
          background: '',
          height: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email().required('Email is required.').trim(),
            password: Yup.string().required('Password is required.').trim(),
          })}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => (
            <form
              style={{
                display: 'flex',
                width: '300px',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                padding: '2rem',
                background: 'white',
              }}
              onSubmit={formik.handleSubmit}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: 'black', fontWeight: 'Bold' }}
              >
                Sign In
              </Typography>

              {/* // user Name or email */}
              <FormControl>
                <TextField
                  required
                  size="small"
                  label="Email"
                  {...formik.getFieldProps('email')}
                ></TextField>
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              {/* // For user password*/}
              <FormControl>
                <TextField
                  required
                  size="small"
                  label="Password"
                  {...formik.getFieldProps('password')}
                ></TextField>
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button type="submit" variant="contained">
                Login
              </Button>
              <Link to="/register">New User? Register</Link>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
