import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';


const AnecdoteForm = () => {
    const dispatch = useDispatch();
    
    const addNew = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        dispatch(createAnecdote(content));
    };

    return (
        <div className="anecdote-form mt-4 py-4 px-2 border border-slate-200 rounded">
          <h2 className="text-xl font-semibold">Create new</h2>
          <form onSubmit={addNew}>
            <div className="my-2">
              <input
                type="textarea"
                name="anecdote"
                placeholder="New anecdote..."
                className="block p-2.5 w-full text-sm rounded border border-gray-300"
              />
            </div>
            <button className="px-2 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white">
              Create
            </button>
          </form>
        </div>    );
};

export default AnecdoteForm;