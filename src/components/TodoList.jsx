import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoTitle: '',
      todos: [],
    };
    this.onFinishedClick = this.onFinishedClick.bind(this)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.state.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <hr />
        <ul>
          {this.state.todos.map((todo, idx) => (
            <Todo todo={todo} key={idx} onFinishedClick={this.onFinishedClick} />
          ))}
        </ul>
        Tasks left: {this.state.todos.length}
      </div>
    );
  }

  handleInputChange = e => {
    this.setState({
      newTodoTitle: e.target.value,
    });
  };

  handleFormSubmit = e => {
    this.setState(state => ({
      todos: state.todos.concat({
        id: Math.random(),
        title: state.newTodoTitle,
        finished: false,
      }),
      newTodoTitle: '',
    }));
    console.log(this.state.newTodoTitle);
    this.setState({
      newTodoTitle: 'check',
    });
    console.log(this.state.newTodoTitle);
    e.preventDefault();
  };

  onFinishedClick = id => {
    const newTodo = [...this.state.todos];
    const updatedTodo = newTodo.find(item => item.id === id);
    updatedTodo.finished = !updatedTodo.finished;
    this.setState({ todo: newTodo });
  }
}

export default TodoList;
