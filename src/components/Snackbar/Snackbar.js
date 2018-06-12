import React, {Component} from "react";
import MaterialSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

class Snackbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showColorPanel: false
        }
    }

    render() {
        return (
            <MaterialSnackbar
                anchorOrigin={{vertical: 'bottom', horizontal: "left"}}
                open={this.props.open}
                onClose={this.props.onClose}
                autoHideDuration={6000}
                message={this.props.message}
                action={[
                    <Button key="message" color="secondary" size="small" onClick={this.props.buttonMessageOnClick}>
                        {this.props.buttonMessage}
                    </Button>,
                    <IconButton key="close" onClick={this.props.onClose}>
                        <CloseIcon/>
                    </IconButton>
                ]}
            />
        );
    }
}

export default Snackbar;