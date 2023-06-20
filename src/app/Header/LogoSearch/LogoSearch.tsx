import React from 'react';
import { Box } from '@mui/material';
import Logo from '../../../common/components/Logo/Logo';
import SearchMessage from '../../../common/components/SearchMessage/SearchMessage';
import { setSearchValue } from '../../../store/slices/searchSlice';
import { useAppDispatch } from '../../../hooks/useRedux';

const LogoSearch = () => {
    const dispatch = useAppDispatch();

    const onSearchQuery = (value: string) => {
        dispatch(setSearchValue(value));
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Logo />
            <SearchMessage searchReview={onSearchQuery} />
        </Box>
    );
};

export default LogoSearch;
