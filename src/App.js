import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div> 
                        <h1 className="App-title">Venture Garden Group</h1>
                        <p></p> 
                        <p></p> 
                        <h3>Transforming Africa through technology</h3>
                        <p>Venture Garden Group (VGG) is a leading provider of innovative, data-driven, end-to-end technology
                                platforms addressing reconciliation and payment processing inefficiencies across multiple
                                sectors of the African economy. Our
                                <strong> mission</strong> is to transform Africa by using innovative technologies to solve real socio-economic
                                challenges in impact sectors critical to sustainable economic development.</p>
                        <p><strong>AYODEJI TORIOLA</strong></p>
                    </div>
                </header>
                <p className="App-intro">{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default App;
