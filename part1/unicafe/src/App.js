import React, { useState } from 'react'

const Statistic = ({text='', value=0, altPct=''}) => {
  return (
    <div>
      <p>{text} {value} {altPct}</p>
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

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [allClicks, setAll] = useState([])

  const title = 'give feedback'
  const subtitle = 'statistics'

  const increaseGoodByOne = () => {
    setAll(allClicks + 1)
    setGood(good + 1)
  }
  const increaseNeutralByOne = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }
  const increaseBadByOne = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
  }

  const all = good+neutral+bad
  const average = (good+0-bad) / all
  const positive = (good / all) * 100

  if (allClicks.length === 0) {
    return (
      <div>
      <Header title = {title}/>
      <Button
        handleClick={increaseGoodByOne}
        text='good'
      />
      <Button
        handleClick={increaseNeutralByOne}
        text='neutral'
      />
      <Button
        handleClick={increaseBadByOne}
        text='bad'
      />
      <Header title = {subtitle}/>
      <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Header title = {title}/>
      <Button
        handleClick={increaseGoodByOne}
        text='good'
      />
      <Button
        handleClick={increaseNeutralByOne}
        text='neutral'
      />
      <Button
        handleClick={increaseBadByOne}
        text='bad'
      />
      <Header title = {subtitle}/>
      <table>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Statistic text="good" value={null}/></td>
            <td><Statistic text={null} value={good}/></td>
          </tr>
          <tr>
            <td><Statistic text="neutral" value={null}/></td>
            <td><Statistic text={null} value={neutral}/></td>
          </tr>
          <tr>
            <td><Statistic text="bad" value={null}/></td>
            <td><Statistic text={null} value={bad}/></td>
          </tr>
          <tr>
            <td><Statistic text="all" value={null}/></td>
            <td><Statistic text={null} value={all}/></td>
          </tr>
          <tr>
            <td><Statistic text="average" value={null}/></td>
            <td><Statistic text={null} value={average}/></td>
          </tr>
          <tr>
            <td><Statistic text="positive" value={null}/></td>
            <td><Statistic text={null} value={positive} altPct='%'/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App