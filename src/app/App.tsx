import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '../routes/routes';
import { useMeQuery } from '../store/api/authAPISlice';
import Loader from '../common/components/Loader/Loader';
import { useAppDispatch } from '../hooks/useRedux';
import { setIsLoggedIn, setUserData } from '../store/slices/userSlice';
import { setMessages, setUsers } from '../store/slices/messagesSlice';

function App() {
    const dispatch = useAppDispatch();
    const router = createBrowserRouter(routes);
    const { data, isLoading, error } = useMeQuery({});

    if (data && !error) {
        const { userData, users } = data.data;
        dispatch(setUserData(userData));
        dispatch(setUsers(users));
        dispatch(setIsLoggedIn(true));
    }

    if (isLoading) {
        return <Loader />;
    }

    return <RouterProvider router={router} />;
}

export default App;
