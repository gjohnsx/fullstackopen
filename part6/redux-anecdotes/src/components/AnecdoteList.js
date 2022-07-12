import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { upvote, downvote } from '../reducers/anecdoteReducer';
import { setNotification } from "../reducers/notificationReducer";
import { initializeAnecdotes } from '../reducers/anecdoteReducer';
import Anecdote from "./Anecdote";

export const NOTIFICATION_TIMEOUT = 2500;

const AnecdoteList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, [dispatch]);
    
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        const regex = new RegExp(filter);

        return anecdotes
            .slice()
            .filter(anecdote => anecdote.content.match(regex))
            .sort((a, b) => b.votes - a.votes);
    });

    const upvoteAnecdote = async (anecdote) => {
        dispatch(upvote(anecdote));
        const notification = {
            title: 'Upvoted anecdote',
            content: anecdote.content
        };
        dispatch(setNotification(notification, NOTIFICATION_TIMEOUT));
    };

    const downvoteAnecdote = async (anecdote) => {
        dispatch(downvote(anecdote));
        const notification = {
            title: 'Downvoted anecdote',
            content: anecdote.content
        };
        dispatch(setNotification(notification, NOTIFICATION_TIMEOUT));
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