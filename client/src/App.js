import Deso from 'deso-protocol';
import React, {useEffect, useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@mui/icons-material/Search';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Post from './components/Post'
import Chat from './components/Chat'
import './App.css';
import { Logout } from '@mui/icons-material';
import FormDialog from './components/popup';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));





function App() {
  const [publicKey, setPublicKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setposts] = useState(new Array(50).fill('e'))
  const [isChatOpen, setisChatOpen] = useState(false)
  const [searchterm, setsearchterm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );


  async function login() {
    const deso = new Deso();
    const request = 3;
    const response = await deso.identity.login(request);
    setPublicKey(response['key']);
    setIsLoggedIn(true);
  }
  
  async function logout() {
    const deso = new Deso();
    const response = await deso.identity.logout(publicKey);
    if (response === true) {
      setIsLoggedIn(false);
    }
  }

  const search = () => {
    //take input from searchterm
    // put list of posts with setposts

  }

  /*<Button variant="contained" onClick={logout}>Logout</Button>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              ></IconButton> */

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <Drawer style={{width:'50vw'}} anchor='left' open={isChatOpen} onClose={()=>{setisChatOpen(false)}} >
        <Chat />    
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setisChatOpen(true)}
          >
            <Badge badgeContent={4} color="error">
                <MailIcon />
            </Badge>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            carouhell
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {setsearchterm(e.target.value)}} value={searchterm}
              onKeyPress={(event) => {
                if (event.key === 'Enter'){
                      search()
                }}}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          
          {isLoggedIn ? 
            <div>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            :
            <Button variant="contained" onClick={login}>Login</Button>
          }

          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
    {isLoggedIn ? <FormDialog publicKey={publicKey}></FormDialog>:""}
    
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="flex-start"
    style = {{paddingLeft:"12em", paddingRight:'12em'}}>
      {posts.map( ()=> { return(
      <Grid item xs={2} sm={3} md={4} >
        <Post>e</Post>
      </Grid> )} ) }
    </Grid>
    </div>
  );
}

export default App;
