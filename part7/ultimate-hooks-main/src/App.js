import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './components/Nav';

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        console.log(response.data);
        setResources(response.data);
      })
  }, []);

  const create = (resource) => {
    // ...
  };

  const service = {
    create
  };

  return [
    resources, service
  ];
};


const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  }, []);

  const toggleDarkMode = () => {
    darkMode ? 
      document.documentElement.classList.remove('dark') :
      document.documentElement.classList.add('dark');

    setDarkMode(prevDarkMode => !prevDarkMode);
  };
  
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  console.log('darkmode ===', darkMode)

  return (
    <div className="bg-red-200 dark:bg-slate-800">

      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className='max-w-7xl mx-auto px-2 sm:px-8 pb-20'>

        <div className="flex-1 min-w-0 my-2">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">Notes</h2>
        </div>
        
        <form onSubmit={handleNoteSubmit}>

          <div className="mb-2 w-full sm:w-2/3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Add a note
            </label>
            <div className="mt-1">
              <input
                {...content}
                className="shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md mb-2"
              />
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>

        </form>


        <ul className="divide-y divide-gray-200">
          {notes.map(n => <li key={n.id} className='py-4 text-gray-800 dark:text-white'>{n.content}</li>)}
        </ul>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>

        <div className="flex-1 min-w-0 mt-2 mb-2">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">Contacts</h2>
        </div>

        <form onSubmit={handlePersonSubmit}>
          <div className="isolate -space-y-px rounded-md shadow-sm mb-2 w-full sm:w-1/3">
            <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label htmlFor="name" className="block text-xs font-medium text-gray-900 dark:text-gray-200">
                Name
              </label>

              <input
                {...name}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm rounded pl-1 py-1"
                placeholder="Jane Smith"
              />

            </div>
            
            <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label htmlFor="job-title" className="block text-xs font-medium text-gray-900 dark:text-gray-200">
                Phone Number
              </label>
              <input
                {...number}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm rounded pl-1 py-1"
                placeholder="407-555-5555"
              />
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>

        </form>

        {/* <div className="bg-white shadow overflow-hidden rounded-md my-2">
          <ul className="divide-y divide-gray-200">
            {persons.map(p => <li key={p.id} className='px-6 py-4'>{p.name} {p.number}</li>)}
          </ul>
        </div> */}

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                        Phone Number
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-gray-700">
                    {persons.map((person) => (
                      <tr key={person.number}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-200 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200">{person.number}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200">{person.email}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-indigo-600 dark:text-amber-300 hover:text-indigo-900">
                            Edit<span className="sr-only">, {person.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App