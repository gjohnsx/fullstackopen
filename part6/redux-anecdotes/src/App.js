import Filter from "./components/Filter";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => {

  return (
      <div className='container py-4'>
        <div className='w-5/6 mx-auto'>
          <h2 className="text-3xl font-bold text-slate-50 my-2">Anecdotes</h2>
          <Filter />
          <AnecdoteList />
          <Notification />
          <AnecdoteForm />
        </div>
      </div>
  );
};

export default App;