import { useSelector, useDispatch } from 'react-redux';
import { addLike, createAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('adding vote for id:', id);
    dispatch(addLike(id));
  };

  const addNew = event => {
    event.preventDefault();
    console.log('adding new...');
    // get the data from the input field
    const content = event.target.anecdote.value;
    console.log('content =', content)
    // dispatch an event with createAnecdote and the data
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content));
  };

  return (
    <div className='container py-4'>
      <h2 className='text-3xl font-bold underline'>Anecdotes</h2>

      <div className='py-2'>

        {anecdotes.map(anecdote =>
          <div key={anecdote.id} className='flex mb-2 p-2 border rounded drop-shadow-sm bg-white text-slate-800'>
            <div className='mr-auto'>{anecdote.content}</div>
            <div className='flex flex-col justify-center items-center'>
              <p>{anecdote.votes}</p>
              <button 
                onClick={() => vote(anecdote.id)}
                className='px-2 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white'
              >
                  vote
              </button>
            </div>
          </div>
        )}

        <div className=''>
          <h2 className='text-xl font-semibold'>Create new</h2>
          <form onSubmit={addNew}>
            <div className='my-2'>
              <input
                type='textarea'
                name='anecdote'
                placeholder="New anecdote..."
                className='block p-2.5 w-full text-sm rounded border border-gray-300'
              />
            </div>
            <button 
              className='px-2 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white'
            >
                Create
              </button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default App