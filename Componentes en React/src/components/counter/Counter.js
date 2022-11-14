
import React from "react";
import "./Counter.css";

class Contador extends React.Component {

  constructor(props) {
    super(props);
    this.listenInput = this.listenInput.bind(this);
    this.getCountInfo = this.getCountInfo.bind(this);
    this.showData = this.showData.bind(this);
  }

  listenInput(e) {
    let content = e.target.value;
    let info = this.getCountInfo(content);
    this.showData(info);
  }

  getCountInfo(content) {
    let info = {
      size: content.length,
      words: content
        .replace(/[ ]+/g, " ")
        .replace(/^ /, "")
        .replace(/ $/, "")
        .split(" ").length,
      chars: content
        .split("")
        .filter((char) => char !== " ").length,
      numbers: content
        .split("")
        .filter((char) => !isNaN(char) && char !== " ").length,
      whiteSpaces: content
        .split("")
        .filter(char => char == " ").length
    }
    return info;
  }

  showData(info) {
    let infoDOM = document.querySelector(".Counter__Info");
    const {size, words, chars, numbers, whiteSpaces} = info;
    if (size != 0) {
      infoDOM.classList.remove("hidden");
      infoDOM.innerHTML = `El tamaño es de ${size}, tiene ${words} palabras, posee ${whiteSpaces} espacios en blanco y tiene ${chars} caracteres de los cuales ${numbers} son numeros`;
    }
    else
      infoDOM.classList.add("hidden");
  }

  render() {
    return (
      <div className="Counter">
        <h1 className="Counter__Title">{this.props.title}</h1>
        <textarea className="Counter__Text" placeholder="Ingrese su texto aqui" id="text" cols="30" rows="8" onInput={this.listenInput}></textarea>
        <div className="Counter__Details">
          <p className="Counter__Info hidden">
          </p>
        </div>
      </div>
    )
  }

}

export default Contador;