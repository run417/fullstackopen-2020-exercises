import React from 'react'

const Course = (props) => {
    const course = props.course;
    // console.log(course);
    return (
        <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

const Content = (props) => {
    const parts = props.course.parts;
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
    const parts = props.course.parts
    const total = parts.reduce(
      (total, currentValue) => (
        total + currentValue.exercises
      ), 0 // used 0 instead of parts[0].exercises
    );
    return (
      <p><strong>total of {total} exercises</strong></p>
    )
}

export default Course;
