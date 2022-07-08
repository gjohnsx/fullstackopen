import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {

  return (
    <div className="bg-slate-800 h-full">
      <div className='container py-4'>
        <div className='w-5/6 mx-auto'>
          <h2 className="text-3xl font-bold text-slate-50">Anecdotes</h2>
          <AnecdoteList />
          <AnecdoteForm />
        </div>
      </div>
    </div>
  );
};

export default App;