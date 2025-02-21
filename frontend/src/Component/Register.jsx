import { Formik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from 'react-query';
import $axios from '../lib/axios.instance';

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (values) => {
      return await $axios.post('/user/register', values);
    },
    onSuccess: (response) => {
      navigate('/login');
    },
  });

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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .required('First name is required.')
              .trim()
              .max(25, 'First name must be at max 25 characters.'),
            lastName: Yup.string()
              .required('Last name is required.')
              .trim()
              .max(25, 'Last name must be at max 55 characters.'),
            email: Yup.string()
              .email('Must be valid email.')
              .required('Email is required.')
              .trim()
              .lowercase()
              .max(55, 'Email must be at max 55 characters.'),
            password: Yup.string()
              .required('Password is required.')
              .trim()
              .min(4, 'Password must be at least 4 characters.')
              .max(20, 'Password must be at max 20 characters.'),
            gender: Yup.string()
              .required('Gender is required.')
              .trim()
              .oneOf(['male', 'female', 'other']),
          })}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => (
            <form
              style={{
                width: '325px',
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '2rem',
              }}
              onSubmit={formik.handleSubmit}
            >
              <Typography
                variant="h6"
                sx={{ color: 'black', fontWeight: 'bold' }}
              >
                Sign Up
              </Typography>

              {/* For First Name */}
              <FormControl>
                <TextField
                  required
                  size="small"
                  label="First Name"
                  {...formik.getFieldProps('firstName')}
                ></TextField>
                {formik.touched.firstName && formik.errors.firstName ? (
                  <FormHelperText error>
                    {formik.errors.firstName}
                  </FormHelperText>
                ) : null}
              </FormControl>
              {/* For Last Name */}
              <FormControl>
                <TextField
                  required
                  size="small"
                  label="Last Name"
                  {...formik.getFieldProps('lastName')}
                ></TextField>
                {formik.touched.lastName && formik.errors.lastName ? (
                  <FormHelperText error>
                    {formik.errors.lastName}
                  </FormHelperText>
                ) : null}
              </FormControl>
              {/* For Email */}
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
              {/* For Password */}
              <FormControl size="small" required>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...formik.getFieldProps('password')}
                  label="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              {/* For gender */}
              <FormControl size="small">
                <InputLabel>Gender</InputLabel>
                <Select label="Gender" {...formik.getFieldProps('gender')}>
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  <MenuItem value={'others'}>Others</MenuItem>
                </Select>
                {formik.touched.gender && formik.errors.gender ? (
                  <FormHelperText error>{formik.errors.gender}</FormHelperText>
                ) : null}
              </FormControl>

              <Button type="submit" variant="contained">
                Register
              </Button>
              <Typography color="primary">
                <Link to="/login" sx={{ textDecoration: 'none' }}>
                  Already register? Login
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Register;
