import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Feedback = (props) => {
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={props.handleClicks.handleGoodClick} text='good'/>
      <Button handleClick={props.handleClicks.handleNeutralClick} text='neutral'/>
      <Button handleClick={props.handleClicks.handleBadClick} text='bad'/>
    </div>
  )
}

const Statistics = ({ votes }) => {
  // average and positive calculations may not be right
  const total = Object.values(votes).reduce((t, i) => i + t,);
  const average = (total > 0)
    ? (votes.good - votes.bad) / total
    : 0;
  const positive = (total > 0)
    ? `${votes.good * 100 / total}%`
    : `${0}%`;

  return (
    <div>
      <h2>statistics</h2>
      {(total > 0) ?
        <table>
          <tbody>
            <Statistic text="good" value={votes.good} />
            <Statistic text="neutral" value={votes.neutral} />
            <Statistic text="bad" value={votes.bad} />
            <Statistic text="all" value={total} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive} />
          </tbody>
        </table>
      :
        <div>No feedback is given</div>
      }
    </div>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    const vote = good + 1;
    setGood(vote);
  }

  const handleNeutralClick = () => {
    const vote = neutral + 1;
    setNeutral(vote);
  }

  const handleBadClick = () => {
    const vote = bad + 1;
    setBad(vote);
  }

  // state and event handlers are passed as objects.
  // property names are assigned automatically
  return (
    <div>
      <Feedback handleClicks={{handleGoodClick, handleNeutralClick, handleBadClick}} />
      <Statistics votes={{good, neutral, bad}} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
