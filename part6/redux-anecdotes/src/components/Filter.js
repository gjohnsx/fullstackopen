import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = () => {

    const dispatch = useDispatch();

    const filter = (event) => {
        dispatch(filterChange(event.target.value));
    };

    return (
        <div>
            <input 
                type='text'
                className='w-full text-sm bg-white border-2 border-slate-900 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'
                placeholder='Filter...'
                onChange={filter}
            />
        </div>
    );
};

export default Filter;