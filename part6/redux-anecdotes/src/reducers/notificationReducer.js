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
        console.log('inside changeNotification reducer...');
        console.log('action =', action);
        const content = action.payload;
        console.log('content =', content);
        console.log('state =', state);
        state.content = content;
        state.show = true;
      },
      showNotification(state) {
        console.log('inside showNotification reducer...');
        console.log(state)
        state.show = true;
      },
      hideNotification(state) {
        console.log('inside hideNotification ...');
        console.log(state)
        state.show = false;
      }
    }
  });
  
  export const { 
    changeNotification,
    showNotification,
    hideNotification } = notificationSlice.actions;
  export default notificationSlice.reducer;