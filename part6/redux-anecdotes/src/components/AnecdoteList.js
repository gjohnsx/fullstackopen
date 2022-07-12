import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { upvote, downvote } from '../reducers/anecdoteReducer';
import { changeNotification, hideNotification } from "../reducers/notificationReducer";
import { initializeAnecdotes } from '../reducers/anecdoteReducer';
import Anecdote from "./Anecdote";

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
        dispatch(changeNotification({
            title: 'Upvoted anecdote',
            content: anecdote.content
        }));
        setTimeout(() => {
            dispatch(hideNotification());
        }, 5000);
    };
    
    const downvoteAnecdote = async (anecdote) => {
        dispatch(downvote(anecdote));
        dispatch(changeNotification({
            title: 'Downvoted anecdote',
            content: anecdote.content
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