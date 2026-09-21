function Button({ text="Click Me!", color="blue", fontSize=20 ,handleClick}) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + 'px'
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>{text}</button>
  );
}

function ListItem(props) {
  return <li>{props.animal}</li>
}

function List(props) {
  return (
    <>
      {!props.animals ? (
        <div>Loading...</div>
      ) : props.animals.length > 0 ? (
        <ul>
          {props.animals.map((animal) => {
            return <li key={animal}>{animal}</li>;
          })}
        </ul>
      ) : (
        <div>There are no animals in the list!</div>
      )}
    </>
  );
}


function Greeting() {
    const handleButtonClick = () => {
        window.location.href="https://google.com"
    }
    const animals = ["Lion", "Cow", "Snake", "Lizard"];

  return (
    <>
        <div>
            <List animals={animals} />
        </div>
        <div>
        <Button text="Click Me!" color="blue" fontSize={12} />
        <Button text="Don't Click Me!" color="red" fontSize={12} />
        <Button text="Click Me!" color="blue" fontSize={20} />
        <Button text="GOOGLE" handleClick={handleButtonClick}/>
        </div>
    </>
  );
}

export default Greeting;