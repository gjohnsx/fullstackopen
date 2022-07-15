import { SearchIcon } from '@heroicons/react/solid'

export default function SearchInput({ nameInput }) {
    return (
        <div className='w-full sm:w-2/3'>
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

            <button className='inline bg-white text-black border border-indigo-500 py-2 px-5 rounded m-2 w-full sm:w-1/3'>find</button>

        </div>
    );
};
