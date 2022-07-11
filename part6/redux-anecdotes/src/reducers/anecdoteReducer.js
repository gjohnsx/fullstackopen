import { createSlice } from '@reduxjs/toolkit';

const getId = () => (1000000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      // const content = action.payload;
      // state.push({
      //   content,
      //   id: getId(),
      //   votes: 0
      // })
      state.push(action.payload);
    },
    upvote(state, action) {
      const id = action.payload;
      const anecdoteToUpvote = state.find(a => a.id === id);
      console.log('upvoting this anecdote...', anecdoteToUpvote)
      anecdoteToUpvote.votes ++;
    },
    downvote(state, action) {
      const id = action.payload;
      const anecdoteToDownvote = state.find(a => a.id === id);
      anecdoteToDownvote.votes --;
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const { createAnecdote, upvote, downvote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;