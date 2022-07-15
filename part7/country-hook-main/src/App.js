import { useState, useEffect } from 'react'
import axios from 'axios'
import { SearchIcon } from '@heroicons/react/solid';
import SearchInput from './components/SearchInput';

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

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('useEffect...', 'name=', name);
    axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(response => {
          console.log(response.data);
          setCountry(response.data[0]);
        });
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  console.log('inside country component\ncountry=', country);
  if (!country) {
    return <div className='text-indigo-500 text-lg font-light'>not found...</div>
  }

  return (
    <div className="my-8 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:px-6">
        <h3 className='text-4xl'>{country.name.common}</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div><span className='font-semibold'>Population:</span> {country.population}</div> 
        <div><span className='font-semibold'>Capital:</span> {country.capital}</div>
        <img 
          src={country.flags.png}
          height='100'
          alt={`flag of ${country.name.common}`}
          className='shadow-sm border border-gray-100 rounded-sm'
        />         
      </div>
    </div>
  )  
}
const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault()
    console.log('setting name...', nameInput.value);
    setName(nameInput.value)
  }

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <main className='main py-8 px-4'>
        <form onSubmit={fetch}>

        <div className='mx-auto'>
            <label htmlFor="account-number" className="block text-sm font-medium text-indigo-800">
                Search countries
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    {...nameInput}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search countries..."
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />

                </div>
            </div>

            <button className='bg-white text-black border border-indigo-500 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-5 rounded mt-2'>find</button>

          </div>
        </form>

        <Country country={country} />

      </main>
    </div>
  );
};

export default App
