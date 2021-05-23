import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default class Snackbar extends Component {
    Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
}
    render() {
        return(
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.show}
            autoHideDuration={6000}
            onClose={this.handleClose}
            message={this.state.snackmsg}
        >  <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
        </Snackbar>)
    }

}