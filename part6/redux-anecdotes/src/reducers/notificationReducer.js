import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  content: '',
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

  export const setNotification = (notification, time) => {
    return async dispatch => {
      dispatch(changeNotification(notification));
      setTimeout(() => {
        dispatch(hideNotification());
      }, time);
    }
  }
  
  export default notificationSlice.reducer;