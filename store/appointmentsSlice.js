import { createSlice } from '@reduxjs/toolkit';

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    items: [],
  },
  reducers: {
    addAppointment: (state, action) => {
      state.items.push(action.payload);
    },
    removeAppointment: (state, action) => {
      // action.payload should be an identifier to remove the appointment
      const id = action.payload;
      state.items = state.items.filter((a) => a.id !== id && a.bookedAt !== id);
    },
  },
});

export const { addAppointment, removeAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
