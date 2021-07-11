import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const title1 = "Anecdote of the day"
  const title2 = "Anecdote with most votes"

  const [points] = useState([0,0,0,0,0,0,0])
  const [count, setCount] = useState(0)
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)

  const randomIndex = () => {
    const number = Math.floor(Math.random() * anecdotes.length)
    setSelected(number)
  }

  const increment = (copy = Array.from(points), index) => {
    setCount(prevCount => prevCount + 1)
    copy[index]++
    setMostVoted(copy.indexOf((Math.max(...copy))))
    console.log(points)
    console.log(count)
  }

  return (
    <div>
      <Header title = {title1}/>
      {anecdotes[selected]}
      <p>Has {points[selected]} votes</p>
      <Button
        handleClick={() => increment(points, selected)}
        text="vote"
      />
      <Button
        handleClick={randomIndex}
        text="next anecdote"
      />
      <Header title = {title2}/>
      {anecdotes[mostVoted]}
    </div>
  )
}

export default App