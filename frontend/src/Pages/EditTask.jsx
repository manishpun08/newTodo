import React from 'react'
import { useMutation, useQuery } from 'react-query';
import $axios from '../lib/axios.instance';
import { Box, Button, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import *as Yup from "yup"
import { useNavigate, useParams } from 'react-router-dom';

export const EditTask = (props) => {
    const navigate = useNavigate()

    // For Get Edit Details
    const params = useParams();
    const taskId = params?.id;
    const {  data } = useQuery({
        queryKey: ["edit-details"],
        queryFn: async () => {
          return await $axios.get(`/details/edit/${taskId}`);
        },
      });

    const taskDetails = data?.data?.TaskDetails;
    console.log(taskDetails)



    //  For Edit
     const { mutate:mutateEdit, data:editData} = useMutation({
        mutationKey: ["add-task"],
        mutationFn: async (values) => {
          return await $axios.put(`http://localhost:8080/edit/${taskId}`,values);
        },
        onSuccess:()=>{
            navigate("/details")
            
        }
       
      });
  
  return (
    <>
    <Box
        sx={{
          background: "",
          height: "450px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Typography gutterBottom variant="h5" sx={{ color: "white", fontWeight: "bold",width:"325px", padding: "1rem 2rem",
                background: "black", }}>
          EDIT YOUR TODO LIST
        </Typography>
        <Formik
          enableReinitialize
          initialValues={{
            task: taskDetails?.task || "",
            description:taskDetails?.description || "",
          }}
          validationSchema={Yup.object({
            task: Yup.string().required("Task is required"),
            description: Yup.string().required("Description is required"),
          })}
          onSubmit={(values) => {
            mutateEdit(values);
          }}
        >
          {(formik) => (
            <form
              style={{
                width: "325px",
                background: "black",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                padding: "2rem",
              }}
              onSubmit={formik.handleSubmit}
            >
              <FormControl>
                <TextField
                  sx={{ [`& fieldset`]: { borderColor: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "grey" } }}
                  required
                  size="small"
                  label="Task"
                  {...formik.getFieldProps("task")}
                />
                {formik.touched.task && formik.errors.task ? (
                  <FormHelperText error>{formik.errors.task}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField
                  sx={{ [`& fieldset`]: { borderColor: "white" } }}
                  id="outlined-multiline-static"
                  multiline
                  rows={6}
                  defaultValue="Type your description"
                  InputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "grey" } }}
                  required
                  size="small"
                  label="Description"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    
    
    </>
  )
}
