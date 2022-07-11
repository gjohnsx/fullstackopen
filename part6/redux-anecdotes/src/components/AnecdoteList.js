import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { upvote, downvote } from '../reducers/anecdoteReducer';
import { changeNotification, hideNotification } from "../reducers/notificationReducer";
import { setAnecdotes } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        anecdoteService
            .getAll()
            .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, [dispatch]);
    
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        const regex = new RegExp(filter);

        return anecdotes
            .slice()
            .filter(anecdote => anecdote.content.match(regex))
            .sort((a, b) => b.votes - a.votes);
    });

    const upvoteAnecdote = ({ content, id }) => {
        dispatch(upvote(id));
        dispatch(changeNotification({
            title: 'Upvoted anecdote',
            content
        }));
        setTimeout(() => {
            dispatch(hideNotification());
        }, 5000);
    };
    
    const downvoteAnecdote = ({ content, id }) => {
        dispatch(downvote(id));
        dispatch(changeNotification({
            title: 'Downvoted anecdote',
            content
        }));
        setTimeout(() => {
            dispatch(hideNotification());
        }, 5000);
    };

    return (
        <div className='anecdote-list my-4'>
            {anecdotes.map((anecdote) => (
                <Anecdote 
                    anecdote={anecdote}
                    key={anecdote.id}
                    upvote={upvoteAnecdote}
                    downvote={downvoteAnecdote} 
                />
            ))}
        </div>
    );
};

export default AnecdoteList;