import React, { ChangeEvent, FC, useState } from 'react';
import { InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.secondary.main, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    height: '40px',
    [theme.breakpoints.up('sm')]: {
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
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '15ch',
            '&:focus': {
                width: '22ch',
            },
        },
    },
}));

type SearchReviewPropsType = {
    searchReview: (value: string) => void;
};

const SearchMail: FC<SearchReviewPropsType> = ({ searchReview }) => {
    const [value, setValue] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && value) {
            searchReview(value);
            setValue('');
        }
    };

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
        </Search>
    );
};

export default SearchMail;
