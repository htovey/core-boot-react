import React, { Component, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CustomTextField from '../custom/CustomTextField';
import Button from '@material-ui/core/Button';
import '../../styles/App.css';
import { withStyles } from '@material-ui/styles';
import { MenuItem, FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { CATEGORIES } from '../../constants/Categories'

export default class NoteFormDialog extends Component {

  constructor(props) {
    super(props);
    this.state={
      categoryInput: '',
      noteTextInput: '',
      placeHolder: '',
      categoryList: this.buildCategoryList(),
    }
   }

  buildCategoryList = () => {
    let catList = CATEGORIES.map(function(category, i) {
      if (category.value === '') {
      return <MenuItem classes={{"root": "disabledItem"}} disabled key={category.value} value={category.value}>{category.label}</MenuItem>
      }
       return <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
    });
    return catList;
  } 

  getCategoryValue = () => { 
    let val = '';
    let stateCat = this.state.categoryInput;
    let modelCat = this.props.noteModel.category;
    if(stateCat !== '') {
      //always use state value if it has been set
      val = stateCat;
    } else if (modelCat) {
      //use model value when editing existing note, where state has not been set
      val = modelCat;
    }
    //return default empty value if neither state nor model has been set 
    console.log('set cat val to: '+val);
    return val;
  }

  getCategoryStyleClass = () => {
    if (this.state.categoryInput === '' && !this.props.noteModel.category) {
      return "disabledItem";
    } else {
      return "selectedItem";
    }
  }
 
  handleSubmit = (e) => {
      e.preventDefault();
      var note = this.populateNoteModel();
      this.props.handleNoteValSubmit(note, e); 
      this.resetFormState(); 
  }

  handleSelect = (e) => {
    this.setState({ categoryInput: e.target.value });   
  }

  handleCancel = () => {
    this.resetFormState();
    console.log('handleCancel');
    return this.props.handleClose();
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
  
  resetFormState = () => {
    this.setState({
      categoryInput: '',
      noteTextInput: ''
   });
  }
  render () {
    const StyledContent = withStyles({root: {color : 'red'}})(DialogContentText);
    return (
     
        <Dialog 
          open={this.props.openNote}
          maxWidth="md"
          aria-labelledby="form-dialog-title">
          <DialogContent className={"noteDialog"}>
            <StyledContent>
              {this.props.error}
            </StyledContent>
           
            <Select
              value={this.getCategoryValue()}
              displayEmpty
              onChange={ (e) => this.handleSelect(e) }
              name="category"
              className={this.getCategoryStyleClass()}
              variant="outlined"
              margin="dense"
              required
              fullWidth
            >
              {this.state.categoryList}
            </Select>
            {/* CUSTOM TEXT FIELD WITH SELECT ************* */}

            {/* <CustomTextField
              margin="dense"
              name="category"
              required
              variant="outlined"
              select
              SelectProps={
                  { 
                    renderValue: () => this.getCategoryValue(),
                    //onChange: (e) => this.setState({categoryInput: e.target.value}),
                    onChange: (e) => this.handleSelect(e),
                    displayEmpty: true,
                 }
              } 
              //value={this.props.noteModel.category || ""}
              children={this.state.categoryList}
              label="Category"
              fullWidth
              className={"noteClass"}
            >  
            </CustomTextField> */}


            {/* react select ******************************************************/}

            {/* <Select 
              margin="dense"
              name="category"
              fullWidth           
              onChange={(inputSelection) => {this.setState({ categoryInput: inputSelection })}} 
              selectValue={this.props.noteModel.category || this.state.categoryInput}
              options={ 
                  CATEGORIES.map(function(category, i) {
                    return {key: i, value: category, label: category}
                  })
                  // CATEGORIES.map(function(category, i) {
                  //  return <option key={i} value={category}>{category}</option>
                  //  })
               } 
               placeholder={this.props.noteModel.category || "Please select"}
                >
            </Select> */}
        
             <CustomTextField
              margin="dense"
              name="noteText"
              required
              defaultValue={this.props.noteModel.noteText || ''}
              onChange={(e) => this.setState({noteTextInput: e.target.value})}
              label="Note"
              fullWidth
              multiline
              rows="15"
              className={"noteClass"}
              variant="outlined"
            />
         
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
                Save
            </Button>
            <Button onClick={this.handleCancel}>
                Cancel
            </Button>
          </DialogActions>
        </Dialog>
       
    );
    }
  }