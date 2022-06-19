const PersonForm = (props) => {
    return (
        <div>
            <form>

                <div>
                    name: 
                    <input 
                        onChange={props.nameOnChange}
                        value={props.nameValue}
                    />
                </div>

                <div>
                    number: 
                    <input 
                        onChange={props.numberOnChange}
                        value={props.numberValue}
                        placeholder='/^\d{2,3}-\d+$/'
                    />
                </div>

                <div>
                    <button type="submit" onClick={props.submitFunc}>add</button>
                </div>

            </form>
        </div>
    )
}

export default PersonForm;