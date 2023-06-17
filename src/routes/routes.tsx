import React from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import { Path } from '../enums/path';
import Root from '../app/Root/Root';
import Login from '../features/auth/login/Login';
import Registration from '../features/auth/registration/Registration';
import MainPage from '../features/MainPage/MainPage';
import Profile from '../features/Profile/Profile';

const routes = createRoutesFromElements(
    <Route path={Path.Root} element={<Root />}>
        <Route index element={<MainPage />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.Register} element={<Registration />} />
        <Route path={Path.Profile} element={<Profile />} />
        <Route path="*" element={<div>Page 404</div>} />,
    </Route>,
);

export default routes;
