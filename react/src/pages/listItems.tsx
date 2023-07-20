import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link as RouterLink } from 'react-router-dom';


export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/main">
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Main Page" />
        </ListItemButton>
        <React.Fragment>
            <ListItemButton component={RouterLink} to="/friends">
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Friends" />
            </ListItemButton>
        </React.Fragment>

    </React.Fragment>
);