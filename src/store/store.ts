import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userAPISlice } from './api/userAPISlice';
import { authAPISlice } from './api/authAPISlice';
import { messagesAPISlice } from './api/messagesAPISlice';
import appReducer from './slices/appSlice';
import messagesReducer from './slices/messagesSlice';
import userReducer from './slices/userSlice';
import searchReducer from './slices/serachSlice';

const rootReducer = combineReducers({
    app: appReducer,
    messages: messagesReducer,
    user: userReducer,
    search: searchReducer,
    [userAPISlice.reducerPath]: userAPISlice.reducer,
    [authAPISlice.reducerPath]: authAPISlice.reducer,
    [messagesAPISlice.reducerPath]: messagesAPISlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userAPISlice.middleware)
            .concat(authAPISlice.middleware)
            .concat(messagesAPISlice.middleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
