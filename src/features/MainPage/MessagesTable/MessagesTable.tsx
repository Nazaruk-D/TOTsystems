import React from 'react';
import { Grid } from '@mui/material';
import { theme } from '../../../styles/theme/theme';

const MessagesTable = () => {
    return (
        <Grid
            item
            xs={9}
            sx={{
                width: '80%',
                height: '100%',
                padding: theme.spacing(2),
                backgroundColor: theme.palette.primary.main,
                borderRadius: '7px',
                boxShadow: `0 0 5px rgba(100,100,100,0.3)`,
            }}
        >
            <table>
                <thead>
                    <tr>
                        <th>Отправитель</th>
                        <th>Тема</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Отправитель 1</td>
                        <td>Тема письма 1</td>
                        <td>Дата письма 1</td>
                    </tr>
                    <tr>
                        <td>Отправитель 2</td>
                        <td>Тема письма 2</td>
                        <td>Дата письма 2</td>
                    </tr>
                </tbody>
            </table>
        </Grid>
    );
};

export default MessagesTable;
