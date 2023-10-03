import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import styles from './search.module.css';

export default function SearchBox() {
  return (
    <Paper
      component="form"
      elevation={0}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,backgroundColor:"#EAF1FB" ,
      borderRadius:"30px"}}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <input type="text" placeholder='メールを検索' className={styles.serchBox}/>
      
    </Paper>
  );
}