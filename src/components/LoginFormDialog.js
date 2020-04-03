import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiThemeProvider from 'material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/App.css';
import { withStyles } from '@material-ui/styles';
import LoginModel from '../models/LoginModel';

export default class LoginFormDialog extends Component {

  constructor(props) {
    super(props);
    this.state={
       loginModel: {
         username: 'ht3',
         password: 'hockey'
       }
    }
   }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.error !== this.props.error) {
       this.setState({
         loginModel: {
           username: '',
           password: ''
         }
       });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();   
    // this.setState({
    //   model: {
    //     username: this.userRef,
    //     password: this.passwordRef
    //   }
    // }); 
    this.props.handleClick(this.state.loginModel, e);
  //  this.setState({loginModel: {}});
  }
  
  render () {
    const StyledContent = withStyles({root: {color : 'red'}})(DialogContentText);
    return (
     
        <Dialog open={this.props.openLogin} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          {/* <DialogTitle id="form-dialog-title">Login to Notes</DialogTitle> */}
          <DialogContent>
            <StyledContent>
              {this.props.error}
            </StyledContent>
            
            <TextField
              autoFocus
              margin="dense"
              name="username"
              required
              value={this.state.loginModel.username}
              onChange={(e) => this.setState({
                loginModel: {
                  username: e.target.value, 
                  password: this.state.loginModel.password ||''
                }})}
              label="User Id"
              fullWidth
              variant="outlined"
            />
             <TextField
              margin="dense"
              name="password"
              required
              value={this.state.loginModel.password}
              onChange={(e) => this.setState({
                loginModel: {
                  username: this.state.loginModel.username, 
                  password :e.target.value
                }})}
              label="Password"
              fullWidth
              variant="outlined"
            />
         
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
       
    );
    }
  }