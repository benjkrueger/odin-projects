import { Component } from "react";

class Todo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: props.text,
            isEdited: props.isEdited
        }
    }
}


class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["test", "test2"],
      inputVal: "",
      count: 2,
      editIndex: undefined,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
      count: state.count,
      editIndex: state.editIndex,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: "",
      count: state.count+1,
      editIndex: editIndex,
    }));
  }

  handleDelete(deletingTodo) {
    console.log(this.state.todos, typeof(deletingTodo), deletingTodo)
    this.setState((state) => ({
        todos: state.todos.filter(item => item !== deletingTodo),
        inputVal: state.inputVal,
        count: state.count - 1,
        editIndex: editIndex,
    }))
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            id="task-entry"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo}>
                {todo}
                <button onClick={() => this.handleDelete(todo)}>Edit</button>
                <button onClick={() => this.handleDelete(todo)}>Delete</button>
            </li>
          ))}
        </ul>
        <p>Count: {this.state.count}</p>
      </section>
    );
  }
}

export default ClassInput;
