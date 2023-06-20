import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import './index.css';
import { SnackbarProvider } from 'notistack';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import { theme } from './styles/theme/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>,
);

reportWebVitals();
