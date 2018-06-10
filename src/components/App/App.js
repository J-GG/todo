import React, {Component} from 'react';
import Background from "../Background/Background";
import Content from "../Content/Content";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        }
    }

    handleOpenMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    };

    render() {
        return (
            <div className="App">
                <Background/>
                <Header
                    handleClickMenu={this.handleOpenMenu}
                    currentLabel={this.props.currentLabel}
                />
                <Menu
                    open={this.state.isMenuOpen}
                    labels={this.props.labels}
                    saveLabel={this.props.saveLabel}
                    onClose={this.handleOpenMenu}
                    currentLabel={this.props.currentLabel}
                    changeCurrentLabel={this.props.changeCurrentLabel}
                />
                <Content
                    labels={this.props.labels}
                    notes={this.props.notes}
                    currentLabel={this.props.currentLabel}
                    saveNote={this.props.saveNote}
                    deleteNote={this.props.deleteNote}
                    isMenuOpen={this.state.isMenuOpen}
                />
            </div>
        );
    }
}

export default App;