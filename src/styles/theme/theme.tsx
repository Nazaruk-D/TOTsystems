import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#fdfdfe',
        },
        secondary: {
            main: '#676767',
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color: 'grey',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root.Mui-focused': {
                        borderBottom: '1px solid #676767',
                    },
                },
            },
        },
    },
});
