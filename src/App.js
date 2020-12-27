import React, { Component } from 'react';
import './styles/App.css';
import AppBar from 'material-ui/AppBar';
import LoginComponent from './components/login/LoginComponent';
import NoteComponent from './components/note/NoteComponent';
import NoteListComponent from './components/note/NoteListComponent';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'; 
import FetchUtil from './utils/FetchUtil';
import Tooltip from '@material-ui/core/Tooltip';
import NoteListToolbar from './components/note/NoteListToolbarSelect';
import CustomSnackBar from './components/custom/CustomSnackBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      noteList: [],
      openLogin: true,
      openNote: false,
      showNoteList: false,
      selectedRows: [],
      userToken: '',
      snackBarOpen: false,
      vertical: 'top',
      horizontal: 'center',
      actionType: 'create',
      noteModel: {
        noteId: '',
        category: '',
        noteText: ''
      }
    }
  }

  handleNoteSubmit = (note, event) => {
    event.preventDefault();
    //build note payload
    const noteUrl = process.env.REACT_APP_API_URL+"/note"
    const noteBody =  {
        "noteId": note.noteId,
        "category": note.category,
        "noteText": note.noteText
    }
    var response = FetchUtil.handlePost(noteUrl, this.state.userToken, noteBody)
        .then(response => {
            if (response.status === 200) {
                console.log("Success***");
                this.handleCRUDSuccess();
            }
        })    
        .catch((error) => {
            console.log(error);
            this.handleError('Save failed. Please try again.');
        }); 
}

  handleLoginSuccess = (notes, user, openLogin) => {
    console.log('handleLoginSuccess()');
    this.setState({userToken: user});
    this.setState({openLogin: openLogin});
    this.setState({noteList: this.buildNoteList(notes, this.getFormattedDate)});
    this.toggleNoteList();
  }

  handleCRUDSuccess = (action) => {
    console.log("handleCRUDSuccess");
    this.setState({
      openNote : false, 
      actionType: action,
      snackBarOpen: true
    });
    this.refreshNoteList();
  }

  handleError = (message) => {
    console.log('NoteComponent handleError()');
    if(this.props.openNote === true) {
        this.setState({ error: message});
    }
}

  refreshNoteList = () => {
    console.log("refreshNoteList()");
    var url = process.env.REACT_APP_API_URL+"/notes";
    var result = FetchUtil.handleGet(url, this.state.userToken);
    result
    .then(response => response.json())
    .then(json => {
      this.setState({noteList: this.buildNoteList(json, this.getFormattedDate)});
    })
    .catch((error) => {
      return error;
    });
  }

  toggleNoteList = () => {
    if (this.state.showNoteList == true) {
      this.setState({showNoteList: false});
    } else {
      this.setState({showNoteList: true});
    }
  }

  createUpdateNote = (updateNoteModel) => {
    if (updateNoteModel) {
      this.setState({noteModel: {
        noteId: updateNoteModel.noteId,
        category: updateNoteModel.category,
        noteText: updateNoteModel.noteText
      }});
    } else {
      this.setState({snackBarType: "create"});
    }
    this.setState({openNote: true});
  }

  buildNoteList = (notes, dateFormatter) => {
    var noteList = [];
    notes.map(function(note) { 
      note.saveDate = dateFormatter(note.saveDate);
      noteList.push(note);
    })
     // noteList.push([note.noteId,note.category,note.noteText, dateFormatter(note.saveDate)]);
  
    return noteList;
  }

  getFormattedDate = (rawDate) => {
    var newDate = new Date(rawDate);
    const options = {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
      timeZone: 'America/New_York',
    };
    var date = newDate.toLocaleString('en-US', options);
    return date;
  }

  getSnackbarMsg = () => {
    var noteAction = 'created';
    if (this.state.actionType === 'update') {
      noteAction = 'updated';
    } else if (this.state.actionType === 'delete') {
      noteAction = 'deleted'
    }
    var msg = 'Success! Note '+noteAction+'.'
    return msg;
  }

  closeSnackBar = () => {
    this.setState({snackBarOpen: false});
  }

  closeNote = () => {
    console.log('close note');
    this.setState({openNote: false});
  }

  setSelectedRows = (rowData) => {
    var index = this.state.selectedRows.length;
    rowData.map(row => {
      this.state.selectedRows[index] = row;
      index++;
    });
  }
  render() {
   
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="Nerd Notes" showMenuIconButton={false}  className="AppBar">
          {/* <Tooltip title="Add Note" aria-label="add">
            <AddCircleIcon onClick={this.createUpdateNote} style={{color: "white", width: "2em", height: "2em"}} className="createNoteButton"/>
          </Tooltip> */}
        
          </AppBar> 
          <CustomSnackBar 
            open={this.state.snackBarOpen} 
            vertical={this.state.vertical} 
            horizontal={this.state.horizontal}
            getAlertMsg={this.getSnackbarMsg}
            handleClose={this.closeSnackBar}
          />
          {this.state.openLogin &&
          <LoginComponent 
            openLogin={this.state.openLogin}
            handleSuccess={this.handleLoginSuccess}
          />}
        
          {this.state.showNoteList && 
            <NoteListComponent 
              handleSuccess={this.handleCRUDSuccess} 
              userToken={this.state.userToken} 
              notes={this.state.noteList}
              selectedRows={this.state.selectedRows}
              setSelectedRows={this.setSelectedRows}
              createUpdateNote={this.createUpdateNote}/>}
          {this.state.openNote &&
            <NoteComponent 
              user={this.state.userToken} 
              openNote={this.state.openNote}
              handleSuccess={this.handleCRUDSuccess}
              noteModel={this.state.noteModel}
              handleNoteSubmit={this.handleNoteSubmit}
              handleClose={this.closeNote}
            />}
        </div>
      </MuiThemeProvider>
    );
  }
};

export default App;
