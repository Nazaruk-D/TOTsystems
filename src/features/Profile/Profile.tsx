import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import { theme } from '../../styles/theme/theme';
import ava from '../../common/png/avatar.png';
import { useAppSelector } from '../../hooks/useRedux';
import { isLoggedInSelector, userDataSelector } from '../../store/selectors/userSelector';
import { Path } from '../../enums/path';

const Profile = () => {
    const navigate = useNavigate();
    const userData = useAppSelector(userDataSelector);
    const isLoggedIn = useAppSelector(isLoggedInSelector);

    if (!isLoggedIn) {
        navigate(Path.Login);
    }
    return (
        <Container sx={{ mt: '2rem' }}>
            <Grid container justifyContent="center">
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 5,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '7px',
                        boxShadow: `0 0 5px rgba(100,100,100,0.3)`,
                    }}
                >
                    <Box sx={{ mb: 3 }}>
                        <Avatar src={ava} alt="Аватарка" sx={{ width: 120, height: 120, border: '1px solid grey' }} />
                    </Box>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        {userData.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        {userData.email}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
