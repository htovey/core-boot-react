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
import NoteModel from '../models/NoteModel';
import { Select, MenuItem } from '@material-ui/core';
import { CATEGORIES } from '../constants/Categories'

export default class NoteFormDialog extends Component {

  constructor(props) {
    super(props);
    this.state={
      categoryInput: '',
      noteTextInput: ''
    }
   }
 
  getCategories = () => {
    var catList = CATEGORIES;
    return catList;
  }

  handleSubmit = (e) => {
      e.preventDefault();
      var note = this.populateNoteModel();
      this.props.handleSubmit(note, e);  
      //this.setState({noteModel: {}});
  }

  populateNoteModel = () => {
    var noteModel = this.props.noteModel;
    
    if (this.state.categoryInput) {
      noteModel.category = this.state.categoryInput;
    }

    if (this.state.noteTextInput) {
      noteModel.noteText = this.state.noteTextInput;
    }  

    return noteModel;
  }
  
  render () {
    const StyledContent = withStyles({root: {color : 'red'}})(DialogContentText);
    return (
     
        <Dialog open={this.props.openNote} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          {/* <DialogTitle id="form-dialog-title">Login to Notes</DialogTitle> */}
          <DialogContent>
            <StyledContent>
              {this.props.error}
            </StyledContent>
           
            <Select 
                name="category" 
                defaultValue={this.props.noteModel.category || ''} 
                label="Category"
                onChange={(e) => this.setState({categoryInput: e.target.value})}>
               { 
                   CATEGORIES.map(function(category, i) {
                    return <MenuItem key={i} value={category}>{category}</MenuItem>
                    })
                } 
            </Select>
             <TextField
              margin="dense"
              name="noteText"
              required
              defaultValue={this.props.noteModel.noteText || ''}
              onChange={(e) => this.setState({noteTextInput: e.target.value})}
              label="Note"
              fullWidth
              variant="outlined"
            />
         
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
                Save
            </Button>
            <Button onClick={this.props.handleClose}>
                Cancel
            </Button>
          </DialogActions>
        </Dialog>
       
    );
    }
  }