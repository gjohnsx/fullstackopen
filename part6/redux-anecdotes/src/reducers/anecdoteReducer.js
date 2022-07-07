const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// Debug with shorter list
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
// ]

const getId = () => (1000000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  };
};

export const addLike = (id) => {
  return {
    type: 'UPVOTE',
    data: { id }
  };
};

export const subtractLike = (id) => {
  return {
    type: 'DOWNVOTE',
    data: { id }
  };
};

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'UPVOTE':
      const upvoteId = action.data.id;
      const anecdoteToUpvote = state.find(a => a.id === upvoteId);
      const changedAnecdote = {
        ...anecdoteToUpvote,
        votes: anecdoteToUpvote.votes + 1
      }
      return state.map(a => 
        a.id !== upvoteId ? a : changedAnecdote
      )
    case 'DOWNVOTE':
      const downvoteId = action.data.id;
      const anecdoteToDownvote = state.find(a => a.id === downvoteId);
      const changedAnecdoteDownvote = {
        ...anecdoteToDownvote,
        votes: anecdoteToDownvote.votes -1
      }
      return state.map(a => 
        a.id !== downvoteId ? a : changedAnecdoteDownvote
      )
    case 'NEW_ANECDOTE':
      return [
        ...state,
        action.data
      ]
    default:
      return state;
  };
};

export default reducer