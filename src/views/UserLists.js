import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ArrowForward, ArrowRightTwoTone, Favorite, WatchLater } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';


const UserLists = ()=>{
  
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'left' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    {/* FAVORITES LIST DRAWER */}
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {<Favorite/>}
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider/>
      {/* WATCH LATER DRAWER LIST*/}
      <List> 
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {<WatchLater/>}
              </ListItemIcon>
              <ListItemText primary="Watch Later" />
            </ListItemButton>
          </ListItem>
          <Divider variant="middle"/>
        <List sx={{p:2}}>
          {
            1?(
            <>
              <ListItem>
               <IconButton>
                  <ArrowRightAltIcon sx={{mr:1}}/>
                  <Typography>Avatar</Typography>
               </IconButton>
              </ListItem>
              <ListItem>
               <IconButton>
                  <ArrowRightAltIcon sx={{mr:1}}/>
                  <Typography>Avatar</Typography>
               </IconButton>
              </ListItem>
            </>
              )
            :(
              <IconButton>
                <Link  to="/movies" style={{color:"white",textDecoration:"none"}}>
                </Link>
                <AddToQueueIcon/>
              </IconButton>
            )
          }
        </List>
      </List>
    </Box>
  );

  return (
    <div>
      {['My Lists'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default UserLists;