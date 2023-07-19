import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import homeImg from '../assets/HomeImage.png';


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;
export default function Home(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{backgroundColor: 'blue', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ backgroundColor: 'blue', color: '#EFD469', fontFamily: 'Holtwood One SC', my: 2 }}>
                Quickpay
            </Typography>
            <Divider />
            <List>
                <ListItem key={'Login'} disablePadding>
                    <ListItemButton href="/login" sx={{ backgroundColor: 'blue', color: '#EFD469', fontFamily: 'Holtwood One SC', textAlign: 'center' }}>
                        <ListItemText primary={'Login'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Register'} disablePadding>
                    <ListItemButton href="/register" sx={{ color: '#EFD469', fontFamily: 'Holtwood One SC', textAlign: 'center' }}>
                        <ListItemText primary={'Register'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'About'} disablePadding>
                    <ListItemButton href="/about" sx={{ color: '#EFD469', fontFamily: 'Holtwood One SC', textAlign: 'center' }}>
                        <ListItemText primary={'About'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', backgroundColor: '#EFD469' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        component="div"
                        align="left"
                        sx={{ flexGrow: 1, fontFamily: 'Holtwood One SC', color: '#EFD469', display: { xs: 'none', sm: 'block' } }}
                    >
                        Quickpay
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button key="Login" sx={{ color: '#EFD469', fontFamily: 'Holtwood One SC'}} href="http://localhost:5173/login">
                            Login
                        </Button>
                        <Button key="Register" sx={{ color: '#EFD469', fontFamily: 'Holtwood One SC' }} href="http://localhost:5173/register">
                            Register
                        </Button>
                        <Button key="About" sx={{ color: '#EFD469', fontFamily: 'Holtwood One SC' }} href="http://localhost:5173/about">
                            About
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3, width: '100%', height: '100%', backgroundColor: '#EFD469'}}>
                <Toolbar />
                <img src={homeImg} alt="home" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </Box>
        </Box>
    );
}
