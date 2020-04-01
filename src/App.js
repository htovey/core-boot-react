import React, { Component } from 'react';
import './styles/App.css';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem'
import LoginComponent from './components/LoginComponent';
import NoteComponent from './components/NoteComponent';
import NoteListComponent from './components/NoteListComponent';
import { MuiThemeProvider } from 'material-ui/styles';
import FetchUtil from './utils/FetchUtil';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import NoteModel from './models/NoteModel';

class App extends Component {
  constructor() {
    super();
    this.state = {
      noteList: [],
      openLogin: true,
      openNote: false,
      isNoteListHidden: true,
      userToken: '',
      snackBarOpen: false,
      vertical: 'top',
      horizontal: 'center',
      noteModel: {
        noteId: '',
        category: '',
        noteText: ''
      }
    }
  }

  handleLoginSuccess = (notes, user, openLogin) => {
    console.log('handleLoginSuccess()');
    this.setState({userToken: user});
    this.setState({openLogin: openLogin});
    this.setState({noteList: this.buildNoteList(notes, this.getFormattedDate)});
    this.toggleNoteList();
  }

  handleSaveSuccess = () => {
    console.log('handleSaveSuccess');
    this.setState({openNote : false});
    this.setState({snackBarOpen: true});
    this.refreshNoteList();
  }

  refreshNoteList = () => {
    //var url = "http://ec2-3-21-103-74.us-east-2.compute.amazonaws.com:8080/getNotesForUser"
    var url = "http://localhost:8080/getNotesForUser"
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
    if (this.state.isNoteListHidden == true) {
      this.setState({isNoteListHidden: false});
    } else {
      this.setState({isNoteListHidden: true});
    }
  }

  createUpdateNote = (updateNoteModel) => {
    if (updateNoteModel) {
      this.setState({noteModel: {
        noteId: updateNoteModel.noteId,
        category: updateNoteModel.category,
        noteText: updateNoteModel.noteText
      }});
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

  closeSnackBar = () => {
    this.setState({snackBarOpen: false});
  }

  closeNote = () => {
      this.setState({openNote: false});
  }

  render() {
   
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="Notes">
            <MenuItem onClick={this.createUpdateNote} value={''} primaryText="Create Note"/>
          </AppBar> 
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            key={`${this.state.vertical}, ${this.state.horizontal}`}
            open={this.state.snackBarOpen}
            autoHideDuration={2000}
            onClose={this.closeSnackBar}
          >
           <MuiAlert elevation={6} variant="filled" {...this.state.props}>
            "Success! Note saved."
           </MuiAlert>
          </Snackbar>
          <LoginComponent 
            openLogin={this.state.openLogin}
            handleSuccess={this.handleLoginSuccess}
          />
        
         { !this.state.isNoteListHidden && 
         <NoteListComponent 
          handleSuccess={this.refreshNoteList} 
          userToken={this.state.userToken} 
          notes={this.state.noteList}
          createUpdateNote={this.createUpdateNote}/>}
        <NoteComponent 
          user={this.state.userToken} 
          openNote={this.state.openNote}
          handleSuccess={this.handleSaveSuccess}
          noteModel={this.state.noteModel}
          handleClose={this.closeNote}
        />
        </div>
      </MuiThemeProvider>
    );
  }
};

export default App;
