import { useSelector, useDispatch } from "react-redux";
import {
  addLike,
  subtractLike,
  createAnecdote,
} from "./reducers/anecdoteReducer";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) => state.sort((a, b) => b.votes - a.votes));
  const dispatch = useDispatch();

  const upvote = (id) => {
    console.log("upvoting id:", id);
    dispatch(addLike(id));
  };

  const downvote = (id) => {
    console.log("downvoting id:", id);
    dispatch(subtractLike(id));
  };



  const AnecdotesRender = () => {
    // const anecdotesSorted = anecdotes.sort((a, b) => b.votes - a.votes);
    const anecdotesSorted = anecdotes.slice();
    return (
      anecdotesSorted.map((anecdote) => (
        <div
          key={anecdote.id}
          className="flex my-2 p-2 border rounded drop-shadow-sm bg-white text-slate-800 items-center"
        >
          <p className="mr-auto">{anecdote.content}</p>
          <p>{anecdote.votes}</p>
          <div className="vote-buttons flex flex-col ml-2">
            <button
              onClick={() => upvote(anecdote.id)}
              className="px-2 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white mb-2"
            >
              <ChevronUpIcon className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={() => downvote(anecdote.id)}
              className="px-2 py-1 bg-slate-500 hover:bg-slate-600 rounded text-white"
            >
              <ChevronDownIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      ))
    );
  };

  return (
    <div className="container py-4">
      <h2 className="text-3xl font-bold underline">Anecdotes</h2>

      <AnecdotesRender />

      <AnecdoteForm />

    </div>
  );
};

export default App;
