import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Deso from 'deso-protocol';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const publicKey = props.publicKey

  async function uploadImage(publicKey) {
    const deso = new Deso();
    const jwt = await deso.identity.getJwt();
    console.log(jwt);
    const request = {
      "UserPublicKeyBase58Check": publicKey,
      "JWT": jwt,
    }
    const response = await deso.media.uploadImage(request);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new post here!
          </DialogContentText>
          <TextField
            autoFocus
            id="filled-textarea"
            label="Item description"
            placeholder="Enter Item Description Here..."
            multiline
            fullWidth
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={uploadImage}>UploadImage</Button> 
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}