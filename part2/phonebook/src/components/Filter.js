const Filter = ({ handleFilter }) => {
    return (
        <div>
            <p>filter shown with 
            <input 
                onChange={handleFilter}
            />
            </p>
        </div>
    )
}

export default Filter;