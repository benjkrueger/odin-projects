import { useState } from 'react';

function Person() {
  const [person, setPerson] = useState({ firstName: "John", lastName: "Smith", age: 100 });

  const handleIncreaseAge = () => {
    console.log("in handleIncreaseAge (before setPerson call): ", person);
    setPerson({ ...person, age: person.age + 1 });
    // we've called setPerson, surely person has updated?
    console.log("in handleIncreaseAge (after setPerson call): ", person);
  };

  const handleFirstNameChange = () => {
    const firstNameText = document.getElementById("firstName").value
    setPerson({...person, firstName: firstNameText})
  }
    const handleLastNameChange = () => {
    const lastNameText = document.getElementById("lastName").value
    setPerson({...person, lastName: lastNameText})
  }

  // this console.log runs every time the component renders
  // what do you think this will print?
  console.log("during render: ", person);

  return (
    <>
      <h1>{person.firstName} {person.lastName}</h1>
      <h2>{person.age}</h2>
      <button onClick={handleIncreaseAge}>Increase age</button>
      <input id="firstName" onChange={handleFirstNameChange} type="text" defaultValue="John"/>
      <input id="lastName" onChange={handleLastNameChange} type="text" defaultValue="Smith"/>
    </>
  );
}

export default Person