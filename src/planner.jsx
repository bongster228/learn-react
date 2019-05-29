import React, { Component } from "react";

function TodoItems(props) {
  return (
    <tr>
      <td>
        <button
          // Pass this function up to the main component with the task bounded
          // so that it can be filtered out of the array in the state
          onClick={props.onButtonClick.bind(this, props.todo)}
          className="btn btn-danger btn-sm m-2"
        >
          Done
        </button>
        {props.todo}
      </td>
    </tr>
  );
}

function TodoTable(props) {
  const row = [];
  // Iterate through the passed in array of tasks to create a table of tasks
  props.todo.map(item => {
    row.push(
      <TodoItems
        key={props.item}
        todo={item}
        onButtonClick={props.onButtonClick}
      />
    );
  });

  return (
    <table>
      <tbody>{row}</tbody>
    </table>
  );
}

// Format the date and time
function FormatTime(props) {
  return <div>{props.time.toLocaleString()}</div>;
}

// Handles the input from the user and calls on passed in function from the parent
// component to update the state.
class EnterTasks extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.onSubmit();
    e.preventDefault();
  }

  handleChange(e) {
    this.props.onChangeInput(e.target.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="form-control"
          value={this.props.userInput}
          placeholder="Enter Tasks Here"
          onChange={this.handleChange}
        />
        <button className="btn btn-primary btn-block" type="Submit">
          Create Task
        </button>
      </form>
    );
  }
}

// The main component
class TodoPlanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      currDate: new Date(),
      userInput: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDoneButton = this.handleDoneButton.bind(this);
  }

  componentDidMount() {
    // Update the clock every second.
    this.timeID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({ currDate: new Date() });
  }

  handleInputChange(input) {
    this.setState({ userInput: input });
  }

  handleSubmit() {
    const item = this.state.userInput;

    this.setState({
      todoList: this.state.todoList.concat(item),
      userInput: ""
    });
  }

  handleDoneButton(task) {
    const newList = this.state.todoList.filter(todo => todo != task);

    console.log(task);

    this.setState({ todoList: newList });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Planner</h2>
        <FormatTime time={this.state.currDate} />
        <EnterTasks
          onChangeInput={this.handleInputChange}
          onSubmit={this.handleSubmit}
          userInput={this.state.userInput}
        />
        <TodoTable
          todo={this.state.todoList}
          onButtonClick={this.handleDoneButton}
        />
      </div>
    );
  }
}

export default TodoPlanner;
