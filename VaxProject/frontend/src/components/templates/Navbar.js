import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FaceIcon from '@mui/icons-material/Face';
import CampaignIcon from '@mui/icons-material/Campaign';

import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  
  
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const location = useLocation();
  const id = location.pathname.split('/')[1];
  var title =""
  if (id === "") title = "Home"
  else if (id === "search") title = "Member details"
  else if (id === "add") title = "Add member"
  else if (id === "list") title = "Members' list"
  else if (id === "notify") title = "Send message"

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
       
        <List>
          {['Home'].map((text, index) => (
            <ListItem button key={text}  variant='contained' color="success" onClick={() => navigate("/")}>
              <ListItemIcon>
                {index % 2 === 0 ? <HomeIcon color="primary" /> : <HomeIcon color="primary" />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['Add member'].map((text, index) => (
            <ListItem button key={text}  variant='contained' color="success" onClick={() => navigate("/add")}>
              <ListItemIcon>
                {index % 2 === 0 ? <PersonAddAltIcon color="primary"/> :  <PersonAddAltIcon color="primary"/> }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['Member details'].map((text, index) => (
            <ListItem button key={text}  variant='contained' color="success" onClick={() => navigate("/search")}>
              <ListItemIcon>
                {index % 2 === 0 ? <FaceIcon color="primary"/> :  <FaceIcon color="primary"/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['Members\' List'].map((text, index) => (
            <ListItem button key={text}  variant='contained' color="success" onClick={() => navigate("/list")}>
              <ListItemIcon>
                {index % 2 === 0 ? <PlaylistAddCheckCircleIcon color="primary"/> :  <PlaylistAddCheckCircleIcon color="primary"/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['Send message'].map((text, index) => (
            <ListItem button key={text}  variant='contained' color="success" onClick={() => navigate("/notify")}>
              <ListItemIcon>
                {index % 2 === 0 ? <CampaignIcon color="primary"/> :  <CampaignIcon color="primary"/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          
        </List>
      
      </Drawer>
      
    </Box>
  );
}
