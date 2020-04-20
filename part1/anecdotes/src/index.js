import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>next anecdote</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [previous, setPrevious] = useState(0);

  const getNumber = (max) => {
    let num =  Math.floor(Math.random() * max);
    console.log(num);
    return num;
  }

  const handleClick = () => {
    let i = getNumber(anecdotes.length)
    console.log('previous', previous);
    console.log('selected', i);
    console.log('is selected (i) === previous? ', i === previous)
    while (i === previous) {
      console.log('while selected (i) is not equal to previous', i, previous, i === previous)
      i = getNumber(anecdotes.length);
      if (i !== previous) {
        console.log('selected is not equal to previous');
        break;
      }
    }
    setSelected(i);
    setPrevious(i);
  }


  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <Button handleClick={handleClick} />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);
