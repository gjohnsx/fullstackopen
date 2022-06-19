const Person = ({ person, deletePerson }) => {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              {person.name}
            </td>
            <td>
              {person.number}
            </td>
            <td>
              <button onClick={deletePerson}>delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

export default Person;