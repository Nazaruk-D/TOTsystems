import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import messagesReducer from './slices/messagesSlice';
import { userAPISlice } from './api/userAPISlice';

const rootReducer = combineReducers({
    app: appReducer,
    messages: messagesReducer,
    [userAPISlice.reducerPath]: userAPISlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPISlice.middleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;