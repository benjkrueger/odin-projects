import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'


function FancyInput({elementId, label, isFinished, defaultValue}) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = () => {if (!isFinished) setValue(document.getElementById(elementId).value)}

  return (
    <div class="row">
      <label for={elementId}>{label}: </label>
      {!isFinished ? <input class="flexItem" id={elementId} onChange={handleChange} defaultValue={value}></input> : <p class="flexItem">{value}</p>}
    </div>
  )
}

function InfoSection() {
  const [isFinished, setIsFinished] = useState(false)

  const handleClick = () => {setIsFinished(!isFinished)}
  
  return (<div>
    <div class="row">
      <div>
        <FancyInput elementId="Name" label="Name" isFinished={isFinished} defaultValue="John Smith"></FancyInput>
        <FancyInput elementId="Email" label="Email" isFinished={isFinished} defaultValue="a@b.com"></FancyInput>
        <FancyInput elementId="PhoneNumber" label="Phone Number" isFinished={isFinished} defaultValue="555-555-5555"></FancyInput>
      </div>
      <button  onClick={handleClick}>{isFinished ? "Edit" : "Submit"}</button>
    </div>
  </div>)
}

function EducationSection() {
  const [isFinished, setIsFinished] = useState(false)

  const handleClick = () => {setIsFinished(!isFinished)}
  
  return (<div>
    <div class="row">
      <div>
        <FancyInput elementId="SchoolName" label="School Name" isFinished={isFinished} defaultValue="University of Helsinki"></FancyInput>
        <FancyInput elementId="StudyTitle" label="Title of Study" isFinished={isFinished} defaultValue="Computer Science"></FancyInput>
        <FancyInput elementId="StudyDate" label="Date of Study" isFinished={isFinished} defaultValue="8/22 - 8/26"></FancyInput>
      </div>
      <button  onClick={handleClick}>{isFinished ? "Edit" : "Submit"}</button>
    </div>
  </div>)
}
function ExperienceSection() {
  const [isFinished, setIsFinished] = useState(false)

  const handleClick = () => {setIsFinished(!isFinished)}
  
  return (<div>
    <div class="row">
      <div>
        <FancyInput elementId="CompanyName" label="Company Name" isFinished={isFinished} defaultValue="Deloitte"></FancyInput>
        <FancyInput elementId="PositionTitle" label="Title of Position" isFinished={isFinished} defaultValue="Consultant"></FancyInput>
        <FancyInput elementId="Responsibilities" label="Responsibilities" isFinished={isFinished} defaultValue="Consulting"></FancyInput>
        <FancyInput elementId="WorkDate" label="Date of Work" isFinished={isFinished} defaultValue="8/22 - 8/26"></FancyInput>
      </div>
      <button  onClick={handleClick}>{isFinished ? "Edit" : "Submit"}</button>
    </div>
  </div>)
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="container">
      <InfoSection />
      <EducationSection />
      <ExperienceSection />
    </div>
  )
}

export default App
