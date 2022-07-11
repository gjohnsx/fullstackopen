import CreateNewForm from './CreateNewForm';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { changeNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    
    const addNew = event => {
        event.preventDefault();

        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        
        dispatch(createAnecdote(content));
        dispatch(changeNotification({
          title: 'Added new anecdote',
          content
        }));

        setTimeout(() => {
          dispatch(hideNotification())
        }, 5000);
      };

    return (
        <div className="anecdote-form mx-auto mt-4 py-4 px-2">
          <CreateNewForm onSubmit={addNew}/>
        </div>    );
};

export default AnecdoteForm;