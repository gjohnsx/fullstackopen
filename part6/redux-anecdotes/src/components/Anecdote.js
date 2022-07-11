import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";

const Anecdote = ({ anecdote, upvote, downvote }) => {
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
                    onClick={() => upvote(anecdote)}
                    className="px-2 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white mb-2"
                >
                    <ChevronUpIcon className="h-5 w-5 text-white" />
                </button>
                <button
                    onClick={() => downvote(anecdote)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-900 rounded text-white"
                >
                    <ChevronDownIcon className="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
    );
};

export default Anecdote;