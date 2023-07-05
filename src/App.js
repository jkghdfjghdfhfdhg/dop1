import { useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState([]);
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");

  const onAddTask = () => {
    const task = {
      text: value,
      description: desc,
      completed: false
    };
    setState([...state, task]);
    console.log(state);
  };

  const onDelete = (item) => {
    setState(state.filter((el) => el.text !== item.text));
    console.log(state);
  };

  const onToggleComplete = (item) => {
    setState(state.map((el) => {
      if (el.text === item.text) {
        return {
          ...el,
          completed: !el.completed
        };
      }
      return el;
    }));
  };

  const onEdit = (item, newText) => {
    setState(state.map((el) => {
      if (el.text === item.text) {
        return {
          ...el,
          text: newText
        };
      }
      return el;
    }));
  };

  return (
    <div className="App">
      <div>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type="title"
        />
        <input
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          type="text"
        />
      </div>
      <input onClick={onAddTask} type="submit" />
      <div>
        {state.map((item, i) => {
          return (
            <div key={i}>
              <div>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleComplete(item)}
                />
                <span style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                  {item.text}
                </span>
              </div>
              {item.completed ? null : (
                <div>
                  <input
                    type="submit"
                    value="Edit"
                    onClick={() => {
                      const newText = prompt("Enter new task");
                      onEdit(item, newText);
                    }}
                  />
                </div>
              )}
              <input onClick={() => onDelete(item)} type="submit" value={"delete"} />
              <input type="submit" value="important" />
              <input type="submit" value="done" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

