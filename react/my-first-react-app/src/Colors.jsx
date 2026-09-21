import { useState } from 'react';
import './App.css';

const COLORS = ['pink', 'green', 'blue', 'yellow', 'purple'];

function Colors() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
  const [timesChanged, setTimesChanged] = useState(0)

  const onButtonClick = (color) => () => {
    setBackgroundColor(color);
    setTimesChanged(timesChanged + 1)
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor,
      }}
    >
      {COLORS.map((color) => (
        <button
          type="button"
          key={color}
          onClick={onButtonClick(color)}
          className={backgroundColor === color ? 'selected' : ''}
        >
          {color}
        </button>
      ))}
      <p>Times changed: {timesChanged}</p>
    </div>
  );
}

export default Colors;