import React, {Component} from 'react';
import NoteFormDialog  from './NoteFormDialog';
import '../../styles/App.css';
import fetch from 'node-fetch';
import { MuiThemeProvider } from 'material-ui/styles';
import  base64  from 'base-64';
import { booleanLiteral } from '@babel/types';
import FetchUtil from '../../utils/FetchUtil';


class NoteComponent extends Component {
    //1) setup our state using constructor
    
    constructor(props) {
        super(props);
        this.state={
            styleClass: 'showMe note',
            error: ''
        }
    }
 
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('NoteComponent componentDidUpdate()');
        if (prevProps.openNote !== this.props.openNote) {
           this.setState({openNote: this.props.openNote});
        }
        
        if (!this.props.openNote && this.state.error !== '') {
            this.setState({error: ''});
        }

        if (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
    }

    handleError(message) {
        console.log('NoteComponent handleError()');
        if(this.props.openNote === true) {
            this.setState({ error: message});
        }
    }

    handleValidationAndSubmit = (note, e) => {
        console.log('stop here');
        if (this.validNote(note)) {
            this.props.handleNoteSubmit(note, e);
        }
    };

    validNote = (note) => {
        if (!note.category && !note.noteText) {
            this.handleError('Please provide Category and text input');
            return false;
        } else if (!note.category) {
            this.handleError('Please select a category.');    
        } else if (!note.noteText) {
            this.handleError('Please enter note text');
        }else {
            //make sure any previous error is cleared
            this.setState({error: ''});
            return true;
        }
    }

    render() {
       
        return (
            <div>       
                <div>     
                <NoteFormDialog 
                    openNote={this.props.openNote} 
                    error={this.state.error} 
                    styleClass={this.state.styleClass} 
                    handleNoteValSubmit={this.handleValidationAndSubmit}
                    noteModel={this.props.noteModel}
                    handleClose={this.props.handleClose}
                    />
                </div>        
            </div>
        );
    }
}
export default NoteComponent;