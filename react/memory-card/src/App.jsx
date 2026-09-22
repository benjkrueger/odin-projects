import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { cards } from './components/data'
import Card from "./components/Card.jsx"

const images = import.meta.glob('./assets/*.jpg', { eager: true });
function getRandomNumber(low, high) {
  return Math.floor(Math.random() * high) + low
}

function getNRandomNumbers(n=10) {
  const ret = new Set()
  while (ret.size < n) {
    ret.add(getRandomNumber(1,149))
  }
  return [...ret]
}

function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [randoms, setRandoms] = useState(getNRandomNumbers())
  const [cardsSeen, setCardsSeen] = useState(new Set())

  function getImageUrl(spritePath) {return images[spritePath]?.default || '';}

  function handleClick(cardId) {
    setRandoms(getNRandomNumbers())
    if (cardsSeen.has(cardId)) {
      console.log("YOU'VE SEEN THAT ONE")
      setScore(0)
      setCardsSeen(new Set())
    } else {
      setScore(score + 1)
      if (score >= bestScore) {setBestScore(score+1)}
      const newSet = new Set(cardsSeen)
      newSet.add(cardId)
      setCardsSeen(newSet)
    }
  }
  function getTenCards() {
    return randoms.map((idNumber) => (
      <Card key={idNumber} id={idNumber} name={cards[idNumber].name} image_url={getImageUrl(cards[idNumber].sprite)} onClick={() => handleClick(idNumber)}/>
    ))
  }
  //{id, name, image_url, onClick}
  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <p>Get points by clicking on an image but don't click on any more than once!</p>
      <section id="score">
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </section>
      <section id="cardHolder">
        {getTenCards()}
      </section>
      
      <section id="spacer"></section>
    </>
  )
}

export default App
