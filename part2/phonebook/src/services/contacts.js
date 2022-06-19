import axios from 'axios';
const baseUrl = '/api/people';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const deletePerson = (id, person, setNotiMessage, setPersons, persons) => {
    console.log('params for deletePerson...');
    console.log('person =', person)
    console.log('setNotiMessage =', setNotiMessage)
    const url = `${baseUrl}/${id}`
    if (window.confirm(`Delete ${person.name}?`)) {
        axios
            .delete(url)
            .catch(error => {
                console.log(error);
                setNotiMessage({
                    isErrorMsg: true,
                    message: `Information of ${person.name} has already been removed from the server`
                });
                setTimeout(() => {
                    setNotiMessage({
                      isErrorMsg: false,
                      message: null
                    });
                  }, 5000);
            });

        setPersons(persons.filter(person => person.id !== id));

    } else {
        console.log('cancelled delete request');
    }
}

const update = (person, newPersonObj, setNotiMessage) => {
    if (window.confirm(`${person.name} is already added to the phonebook. Replace the old number with a new one?`)) {
        console.log(`updating id ${person.id}`);
        const request = axios.put(`${baseUrl}/${person.id}`, newPersonObj);
        return request
            .then(response => response.data)
            .catch(error => {
                console.log('This is the error:');
                console.log(error);
                setNotiMessage({
                    isErrorMsg: true,
                    message: `Information of ${person.name} has already been removed from the server`
                })
            })
    }
}

export default { getAll, create, deletePerson, update };