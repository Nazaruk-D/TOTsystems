import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { useAppDispatch } from '../../hooks/useRedux';
import { Path } from '../../enums/path';
import SearchMail from '../../common/components/SearchMail/SearchMail';
import AuthButtonsBlock from '../../common/components/AuthButtonsBlock/AuthButtonsBlock';

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSearchQuery = (value: string) => {};

    return (
        <AppBar position="static" component="header">
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SearchMail searchReview={onSearchQuery} />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <AuthButtonsBlock />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
