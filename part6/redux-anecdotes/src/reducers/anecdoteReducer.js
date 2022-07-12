import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // upvote(state, action) {
    //   const id = action.payload;
    //   const anecdoteToUpvote = state.find(a => a.id === id);
    //   console.log('upvoting this anecdote...', anecdoteToUpvote)
    //   anecdoteToUpvote.votes ++;
    // },
    // downvote(state, action) {
    //   const id = action.payload;
    //   const anecdoteToDownvote = state.find(a => a.id === id);
    //   anecdoteToDownvote.votes --;
    // },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    }
  }
});

export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const upvote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.upvote(anecdote);
    const anecdotes = await anecdoteService.getAll();

    const newAnecdotes = anecdotes.map(a => {
      return a.id !== newAnecdote.id ? a : newAnecdote
    });

    dispatch(setAnecdotes(newAnecdotes));
  };
};

export const downvote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.downvote(anecdote);
    const anecdotes = await anecdoteService.getAll();

    const newAnecdotes = anecdotes.map(a => {
      return a.id !== newAnecdote.id ? a : newAnecdote
    });

    dispatch(setAnecdotes(newAnecdotes));
  };
};

export default anecdoteSlice.reducer;