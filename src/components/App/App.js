import React, { Component } from 'react';
import './App.css';
import Background from "../Background/Background";
import Content from "../Content/Content";
import Menu from "../Menu/Menu";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Background/>
                <Menu/>
                <Content/>
            </div>
        );
    }
}

export default App;
