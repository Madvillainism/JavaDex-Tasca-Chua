
import React from 'react';
import './Reloj.css';

class Reloj extends React.Component {

  constructor(props) {
    super(props);
    this.time = "AM";
    this.changeFormat = this.changeFormat.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.state = { date: new Date(), hours24 : false };
  }

  componentDidMount(){
    this.interval = setInterval(
      ()=> this.engine(), 1000
    )
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  engine(){
    this.setState({
      date: new Date()
    })
  }

  getCurrentTime(){
    const date = this.state.date;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if(!this.state.hours24){
        this.time = hours > 12 ? "PM" : "AM";
        hours = hours > 12 ? hours - 12 : hours;
    }

    hours = hours == 0 ? 12 : hours;

    return (`${this.formatNumber(hours)}:${this.formatNumber(minutes)}:${this.formatNumber(seconds)} ${this.time}`);
  }

  formatNumber(number){
    return number < 10 ? `0${number}` : number;
  }

  changeFormat(){
    this.setState({hours24 : !this.state.hours24})
  }

  render() {
    return (
      <div className="Clock">
        <h1 className="Clock__Title"></h1>
        <div className="Clock__Time">{this.getCurrentTime()}</div>
        <button className="Clock__Button" onClick={this.changeFormat}>switch</button>
      </div>
    )
  }

}

export default Reloj;