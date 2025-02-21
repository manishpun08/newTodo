import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import $axios from '../lib/axios.instance';
import { useMutation, useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch } from 'react-redux';
import { openSuccessSnackbar } from '../store/slices/snackBarSlice';

const DeleteTodo = (props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // For Delete
  const params = useParams();
  const taskId = params?.id;
  const { mutate: mutateDelete } = useMutation({
    mutationKey: ['add-task'],
    mutationFn: async (_id) => {
      return await $axios.delete(`http://localhost:8080/delete/${_id}`);
    },
    onSuccess: (response) => {
      dispatch(openSuccessSnackbar(response?.data?.message));
      queryClient.invalidateQueries('todo-list');
    },
  });

  // console.log(props.createdAt)

  // dayjs.extend(relativeTime)
  // const newTime = dayjs((props.createdAt)-new Date()).from()

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'start',
              color: '#2196f3',
              textTransform: 'capitalize',
            }}
          >
            {props.task}
          </Typography>
        </Box>

        <Box>
          <IconButton>
            <ModeEditIcon
              sx={{ color: 'white', fontSize: '14px' }}
              onClick={() => {
                navigate(`/edit/${props._id}`);
              }}
            />
          </IconButton>
          <IconButton>
            <DeleteIcon
              sx={{ color: 'white', fontSize: '14px' }}
              onClick={() => mutateDelete(props._id)}
            />
          </IconButton>
        </Box>
      </Box>

      <Typography
        sx={{
          width: '100%',
          textAlign: 'justify',
          textTransform: 'capitalize',
          fontSize: '12px',
        }}
      >
        {props.description}
      </Typography>
    </>
  );
};

export default DeleteTodo;
