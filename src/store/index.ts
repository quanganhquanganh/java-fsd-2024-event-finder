import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { thunk } from 'redux-thunk';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;