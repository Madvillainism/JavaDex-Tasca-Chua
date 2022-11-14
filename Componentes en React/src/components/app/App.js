import './App.css';
import Contador from '../counter/Counter';
import Reloj from '../reloj/Reloj';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.switchState = this.switchState.bind(this);
    this.state = { switch: true };
  }

  switchState() {
    this.setState({
      switch: !this.state.switch
    });
  }

  render() {
    let component;
    let text;

    if(this.state.switch){
      component = (<Contador title="Contador con ReactJS" />);
      text = "Ir al Reloj";
    }else{
      component = (<Reloj title="Reloj Con ReactJS" />);
      text = "Ir al Contador";
    }

    return(
      <div className="App">
        {component}
        <button className="App__Button" onClick={this.switchState}>{text}</button>
      </div>
    )
  }

}

export default App;
