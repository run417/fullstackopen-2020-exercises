import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Course from './components/Course'

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application Development',
      parts: [
        {
          id: 1,
          name: 'Fundamentals of React',
          exercises: 10,
        },
        {
          id: 2,
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          id: 3,
          name: 'State of a component',
          exercises: 14,
        },
        {
          id: 4,
          name: 'Redux',
          exercises: 11,
        },
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          id: 1,
          name: 'Routing',
          exercises: 3,
        },
        {
          id: 2,
          name: 'Middleware',
          exercises: 2,
        },
      ],
    },
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
