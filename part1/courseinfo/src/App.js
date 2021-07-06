import React from 'react'

const App = () => {
  const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Part = ({text='', number=0}) => {
  return (
    <div>
      <p>{text}, {number}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part text={props.parts[0].name} number={props.parts[0].exercises}/>
      <Part text={props.parts[1].name} number={props.parts[1].exercises}/>
      <Part text={props.parts[2].name} number={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises = {props.sum[0].exercises+props.sum[1].exercises+props.sum[2].exercises}</p>
    </div>
  )
}

export default App