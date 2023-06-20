import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '../routes/routes';
import { useMeQuery } from '../store/api/authAPISlice';
import Loader from '../common/components/Loader/Loader';
import { useAppDispatch } from '../hooks/useRedux';
import { setIsLoggedIn, setUserData } from '../store/slices/userSlice';
import { setUsers } from '../store/slices/messagesSlice';

function App() {
    const dispatch = useAppDispatch();
    const router = createBrowserRouter(routes);
    const { data, isLoading, error, isSuccess } = useMeQuery({});

    useEffect(() => {
        if (data && !error && isSuccess) {
            const { userData, users } = data.data;
            dispatch(setUserData(userData));
            dispatch(setUsers(users));
            dispatch(setIsLoggedIn(true));
        }
    }, [data, error, isSuccess]);

    if (isLoading) {
        return <Loader />;
    }

    return <RouterProvider router={router} />;
}

export default App;
