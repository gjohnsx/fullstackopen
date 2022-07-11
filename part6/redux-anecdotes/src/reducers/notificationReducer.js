import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'Added new whatever',
  content: 'Hello, this is the initial notificiation message!',
  show: false,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      changeNotification(state, action) {
        const content = action.payload;
        state.content = content;
        state.show = true;
      },
      showNotification(state) {
        state.show = true;
      },
      hideNotification(state) {
        state.show = false;
      }
    }
  });
  
  export const { 
    changeNotification,
    showNotification,
    hideNotification } = notificationSlice.actions;
  export default notificationSlice.reducer;