import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import AuthButtonsBlock from './AuthButtonsBlock/AuthButtonsBlock';
import LogoSearch from './LogoSearch/LogoSearch';

const Header = () => {
    return (
        <AppBar position="static" component="header">
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                    <LogoSearch />
                    <AuthButtonsBlock />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
