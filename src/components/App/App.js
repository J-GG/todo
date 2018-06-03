import React, { Component } from 'react';
import './App.css';
import Background from "../Background/Background";
import Content from "../Content/Content";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Background/>
                <Content/>
            </div>
        );
    }
}

export default App;
