import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import appointmentsReducer from './appointmentsSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
});

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default store;
