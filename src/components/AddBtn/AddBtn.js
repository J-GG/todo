import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class AddBtn extends Component {
    render() {
        return (
            <div className={this.props.className} onClick={this.props.onClick}>
                <Button variant="fab" color="secondary">
                    <AddIcon />
                </Button>
            </div>
        );
    }
}

export default AddBtn;
