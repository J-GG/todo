import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteIcon from '@material-ui/icons/Delete';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import './Note.css';

class Note extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: null
        }
    }

    handleBottomNavigationChange = (event, value) => {
        this.setState({value});
    };

    render() {
        return (
            <div className={this.props.className}>
                <Card>
                    <CardContent>
                        <Typography variant="title" gutterBottom>
                            <span className="Note-title">
                                {this.props.title.length > 40 ? this.props.title.substr(0, 40) + "..." : this.props.title}
                            </span>
                        </Typography>
                        <Typography component="p">
                            {this.props.content.length > 150 ? this.props.content.substr(0, 150) + "..." : this.props.content}
                        </Typography>
                    </CardContent>
                    <BottomNavigation value={this.state.value} onChange={this.handleBottomNavigationChange} showLabels>
                        <BottomNavigationAction label="Color" value="color" icon={<ColorLensIcon/>} />
                        <BottomNavigationAction label="Delete" value="delete" icon={<DeleteIcon />} onClick={() => this.props.handleDelete(this.props.id)}/>
                    </BottomNavigation>
                </Card>
            </div>
        );
    }
}

export default Note;