import CreateNewForm from './CreateNewForm';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { changeNotification, hideNotification, setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';
import { NOTIFICATION_TIMEOUT } from './AnecdoteList';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    
    const addNew = async (event) => {
        event.preventDefault();

        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        
        dispatch(createAnecdote(content))
        const notification = {
          title: 'Added new anecdote',
          content
        };
        dispatch(setNotification(notification, NOTIFICATION_TIMEOUT))
      };

    return (
        <div className="anecdote-form mx-auto mt-4 py-4 px-2">
          <CreateNewForm onSubmit={addNew}/>
        </div>    );
};

export default AnecdoteForm;