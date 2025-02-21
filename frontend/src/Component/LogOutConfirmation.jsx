import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const LogOutConfirmation = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Typography textAlign="center" onClick={handleClickOpen}>
        {props.logout}
      </Typography>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to logout?
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            <Typography>No</Typography>
          </Button>
          <Button
            autoFocus
            variant="contained"
            color="error"
            onClick={() => {
              handleClose();
              localStorage.clear();
              navigate('/login');
            }}
          >
            <Typography>Yes</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default LogOutConfirmation;
