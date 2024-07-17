import { combineReducers } from '@reduxjs/toolkit';
import eventReducer from './eventSlice';

const rootReducer = combineReducers({
  events: eventReducer,
});

export default rootReducer;