import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
};

const createNew = async (content) => {
    const object = { 
        content,
        votes: 0
     };
    const response = await axios.post(baseUrl, object);
    return response.data;
};

const upvote = async (anecdote) => {
    console.log('upvoting!');
    console.log('anecdoteService: upvoting id=', anecdote.id);
    console.log(`${baseUrl}/${anecdote.id}`);
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, {
        ...anecdote,
        votes: anecdote.votes + 1
    });
    return response.data;
};

const downvote = async (anecdote) => {
    console.log('downvoting!');
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, {
        ...anecdote,
        votes: anecdote.votes - 1
    });
    return response.data;
};

export default { getAll, createNew, upvote, downvote };
