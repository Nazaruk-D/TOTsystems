import React from 'react';
import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import AuthButtonsBlock from '../../common/components/AuthButtonsBlock/AuthButtonsBlock';
import SearchMessage from '../../common/components/SearchMessage/SearchMessage';
import { setSearchValue } from '../../store/slices/serachSlice';

const Header = () => {
    const dispatch = useAppDispatch();

    const onSearchQuery = (value: string) => {
        dispatch(setSearchValue(value));
    };

    return (
        <AppBar position="static" component="header">
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SearchMessage searchReview={onSearchQuery} />
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
