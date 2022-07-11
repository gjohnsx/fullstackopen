import { useSelector, useDispatch } from "react-redux";
import { upvote, downvote } from '../reducers/anecdoteReducer';
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { changeNotification, hideNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const Anecdote = ({ anecdote }) => {
        return (
            <div
                className="flex my-2 py-1 px-4 border-2 border-slate-900 rounded drop-shadow-sm bg-gray-600 text-white items-center"
            >
                <p className="mr-auto">
                    {anecdote.content}
                </p>
                <p 
                    className={`${anecdote.votes > 0 ? 'text-green-500' : anecdote.votes < 0 ? 'text-red-500' : 'text-slate-400'} ml-2`}
                >
                    {anecdote.votes}
                </p>
                <div className="vote-buttons flex flex-col ml-2">
                    <button
                        onClick={() => upvoteAnecdote(anecdote)}
                        className="px-2 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white mb-2"
                    >
                        <ChevronUpIcon className="h-5 w-5 text-white" />
                    </button>
                    <button
                        onClick={() => downvoteAnecdote(anecdote)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-900 rounded text-white"
                    >
                        <ChevronDownIcon className="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>
        );
    };
    const anecdotes = useSelector(({ anecdotes }) => anecdotes);
    const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

    const dispatch = useDispatch();

    const upvoteAnecdote = ({ content, id }) => {
        dispatch(upvote(id));
        dispatch(changeNotification({
            title: 'Upvoted anecdote',
            content
        }));
    };
    
    const downvoteAnecdote = ({ content, id }) => {
        dispatch(downvote(id));
        dispatch(changeNotification({
            title: 'Downvoted anecdote',
            content
        }))
    };

    return (
        <div className='anecdote-list my-4'>
            {sortedAnecdotes.map((anecdote) => (
                <Anecdote anecdote={anecdote} key={anecdote.id} />
            ))}
        </div>
    );
};

export default AnecdoteList;