import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Hello, this is the initial notificiation message!';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      changeNotification(state, action) {
        const content = action.payload;
        state = content;
        }
    }
  });
  
  export const { changeNotification } = notificationSlice.actions;
  export default notificationSlice.reducer;