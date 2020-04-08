import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts;
  return (
    <div>
      {parts.map(p => ( // map returns an array
        <Part key={p.id} part={p} />
      ))}
    </div>
  )
}

const Part = (props) => {
  return (<p>{props.part.name} {props.part.exercises}</p>)
}

const Total = (props) => {
  const total = props.parts.reduce(
    (total, currentValue) => (
      total + currentValue.exercises
    ), props.parts[0].exercises
  );
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application Development'
  const parts = [
    {
      id: 'part1',
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      id: 'part2',
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      id: 'part3',
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
