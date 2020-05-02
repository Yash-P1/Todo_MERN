import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    title: '',
    task: '',
    assignedTask: []
  }

  componentDidMount = () => {
    this.getTodo();
  }

  getTodo = () => {
    axios.get('http://localhost:8080/api')
      .then((response) => {
        const data = response.data;
        this.setState({ assignedTask: data });
        console.log('Data has been received!');
      })
      .catch(() => {
        alert('Error retrieving data!');
      })
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      task: this.state.task
    }
    axios({
      url: 'http://localhost:8080/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log("Data has been sent to server!!");
        this.resetUserInputs();
        this.getTodo();
      })
      .catch(() => {
        console.log("Internal server error!!");

      })

  }

  resetUserInputs = () => {
    this.setState({
      title: '',
      task: ''
    });
  };

  displayToDo = (todo) => {
    if (!todo.length) return null;

    return todo.map((todos, index) =>
      <div key={index}>
        <h3>{todos.title}</h3>
        <p>{todos.task}</p>
      </div>
    )
  }

  render() {
    console.log("state: ", this.state);

    return (<div>
      <h1>Welcome to Mern!</h1>
      <form onSubmit={this.handleSubmit}>
        <div className="form-input">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-input">
          <textarea
            placeholder="task"
            name="task"
            cols="30"
            rows="10"
            value={this.state.task}
            onChange={this.handleChange}
          >
          </textarea>
        </div>

        <button>Submit</button>
      </form>

      <div className='todo'>
        {this.displayToDo(this.state.assignedTask)}
      </div>
    </div>);
  }
}

export default App;
