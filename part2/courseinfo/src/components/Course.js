const Header = ({ name }) => (
    <h2>{name}</h2>
)

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
    <div>
        {parts.map(part => {
        return <Part key={part.id} part={part} />
        })}
    </div>
)

const Total = ({ total }) => (
  <p><strong>total of {total} exercises</strong></p>
)

const Course = ({course}) => {
    const total = course.parts.reduce((sum, cur) => {
      return sum += cur.exercises;
    }, 0)
    
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total total={total} />
      </div>
    )
  }

export default Course;