import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Deso from 'deso-protocol';
import axios from 'axios';


export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [imageURL, setImageURL] = useState();
  const [body, setBody] = useState('');
  const publicKey = props.publicKey;

  async function uploadImage() {
    const deso = new Deso();
    const jwt = await deso.identity.getJwt();
    const request = {
      "UserPublicKeyBase58Check": publicKey,
      "JWT": jwt,
    }
    const response = await deso.media.uploadImage(request);
    setImageURL(response["ImageURL"])
  };

  async function createPost() {
    const deso = new Deso();
    const request = {
    "UpdaterPublicKeyBase58Check": publicKey,
    "BodyObj": {
        "Body": body,
        "VideoURLs": [],
        "ImageURLs": [imageURL]
    },
};
    const response = await deso.posts.submitPost(request);
    const data = JSON.stringify(response["constructedTransactionResponse"]["PostHashHex"]);
    return data
};

async function getPost (postHashhex) {
    const deso = new Deso();
    const request = {
    "PostHashHex": postHashhex
    };
    console.log(request['PostHashHex'])
    const response = await deso.posts.getSinglePost(request);
    console.log(JSON.stringify(response));
    return response
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    
  async function handleSubmit() {
    const hashhex = await createPost();
    const data = await getPost(hashhex);
    console.log(JSON.stringify(data))
    axios
        .post('/input', data)
        .then(() => console.log('Post Created'))
        .catch(err => err.response())
    handleClose()
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Post
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
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
            value={body}
            onChange={(e) => {setBody(e.target.value)}}
          />
        </DialogContent>
        {imageURL ? 
        imageURL : 
        <DialogActions>
        <Button onClick={uploadImage}>UploadImage</Button> 
        </DialogActions>
        }     
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}