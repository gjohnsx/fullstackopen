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
        <div className="anecdote-form mx-auto mt-4 py-4 px-2 border border-slate-500 rounded">
          <h2 className="text-xl font-semibold text-slate-50">Create new</h2>
          <form onSubmit={addNew}>
            <div className="my-2">
              <textarea
                rows={4}
                name="anecdote"
                id="anecdote"
                placeholder="New anecdote..."
                className="block p-2.5 w-full text-sm rounded border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button className="px-2 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white">
              Create
            </button>
          </form>
        </div>    );
};

export default AnecdoteForm;