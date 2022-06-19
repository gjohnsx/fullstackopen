import React, { useState } from 'react';

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} {props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.fb.good;
  const neutral = props.fb.neutral;
  const bad = props.fb.bad;
  const total = good + neutral + bad;
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value ={good} />
            <StatisticLine text="neutral" value ={neutral} />
            <StatisticLine text="bad" value ={bad} />
            <StatisticLine text="all" value ={total} />
            <StatisticLine text="average" value ={(good - bad) / total} />
            <StatisticLine text="positive" value ={(good / total) * 100} />
          </tbody>
        </table>    
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

function App() {
  const [goodFb, giveGoodFb] = useState(0);
  const [badFb, giveBadFb] = useState(0);
  const [neutralFb, giveNeutralFb] = useState(0);
  let feedback = {
    good: goodFb,
    neutral: neutralFb,
    bad: badFb
  }

  return (
    <div className="App">
      <h1>give feedback</h1>
      <Button handleClick={() => giveGoodFb(goodFb + 1)} text='good' />
      <Button handleClick={() => giveNeutralFb(neutralFb + 1)} text='neutral' />
      <Button handleClick={() => giveBadFb(badFb + 1)} text='bad' />
      <Statistics fb={feedback} /> 
    </div>
  );
}

export default App;
