import React, { Component } from "react";

function FancyBorder(props) {
  return (
    <div className={"FancyBorder FancyBorder-" + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1>{props.title}</h1>
      <p>{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}

class LoginDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { login: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ login: e.target.value });
  }

  handleClick() {
    alert(`Welcome to the party ${this.state.login}!`);
  }

  render() {
    return (
      <Dialog title="Mission To Mars" message="Are you ready for this?">
        <input value={this.state.login} onChange={this.handleChange} />
        <button type="Submit" onClick={this.handleClick}>
          Start Here!
        </button>
      </Dialog>
    );
  }
}

export default LoginDialog;
