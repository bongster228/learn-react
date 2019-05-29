import React, { Component } from "react";

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTempChange(e.target.value);
  }

  render() {
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Enter Temperature {scaleNames[scale]}:</legend>
        <input value={this.props.temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

const scaleNames = {
  c: "Celsius",
  f: "Farenheit"
};

function toCelsius(farenheit) {
  return ((farenheit - 32) * 5) / 9;
}

function toFarenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function scaleConversion(degree, convert) {
  const input = parseFloat(degree);
  if (Number.isNaN(input)) return "";

  let output = convert(input);
  output = Math.round(output * 1000) / 1000;
  return output.toString();
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { scale: "c", temperature: "" };
    this.handleCelsius = this.handleCelsius.bind(this);
    this.handleFarenheit = this.handleFarenheit.bind(this);
  }

  handleCelsius(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFarenheit(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.state.scale;

    const celsius =
      scale === "f" ? scaleConversion(temperature, toCelsius) : temperature;
    const farenheit =
      scale === "c" ? scaleConversion(temperature, toFarenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          temperature={celsius}
          scale="c"
          onTempChange={this.handleCelsius}
        />
        <TemperatureInput
          temperature={farenheit}
          scale="f"
          onTempChange={this.handleFarenheit}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

export default Calculator;
