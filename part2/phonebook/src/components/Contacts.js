import Person from "./Person";

const Contacts = ({ persons, deletePerson }) => {
    return (
        <div>
            {persons.map(person => {
                return <Person 
                    key={person.id} 
                    person={person} 
                    deletePerson={() => deletePerson(person.id)}
                />;
            })}
        </div>
    )
}

export default Contacts;