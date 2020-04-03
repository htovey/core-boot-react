import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from '@material-ui/styles';
import FetchUtil from '../utils/FetchUtil';
import NoteComponent from './NoteComponent';


const defaultToolbarSelectStyles = {
    iconButton: {
      marginRight: "24px",
      top: "40%",
    //   display: "inline-block",
    //   position: "relative",
      transform: "translateY(-50%)"
    },
    deleteIcon: {
      color: "#000"
    },
    editIcon: {
        color: "#000"
    },
    divHeight: {
        height: "40px"
    }
  };
  

class NoteListToolbarSelect extends Component {
    
    handleDelete = () => {
        var url = "http://localhost:8080/deleteNote";
        var body = this.getNoteIdList(this.props.selectedRows)
        var result = FetchUtil.handlePost(url, this.props.userToken, body)
        .then(response => {
            if (response.status === 200) {
                console.log("Delete: Success***");
                this.props.handleSuccess();
            }
        })
         
        .catch((error) => {
            console.log(error);
           // this.handleError('Delete failed. Please try again later.');
        });
    }

    handleUpdate = () => {
        var url = "http://localhost:8080/createUpdateNote";
        var body = this.getNotePayload(this.props.selectedRows)
        var result = FetchUtil.handlePost(url, this.props.userToken, body)
        .then(response => {
            if (response.status === 200) {
                console.log("Delete: Success***");
                this.props.handleSuccess();
            }
        })
         
        .catch((error) => {
            console.log(error);
           // this.handleError('Delete failed. Please try again later.');
        });
    }

    editNote = () => {
        var updateNote = this.props.noteList[this.props.selectedRows.data[0].index];
        this.props.createUpdateNote(updateNote);
    }

    getNoteIdList = (selectedRows) => {
        var deleteArray = [];
        selectedRows.data.map((selectedNote, index) => {
             var note =  this.props.noteList[selectedNote.index];
             deleteArray[index] = note.noteId;
        });
        return deleteArray;
    }

    getNotePayload = (note) => {
        var updateNote = [];
        updateNote.noteId = note.noteId;
        updateNote.category = note.category;
        updateNote.noteText = note.noteText;
        return updateNote;
    }

    render() {
        const { classes } = this.props;
        var multiSelect = this.props.selectedRows.data.length > 1;
        return (
            <div className={classes.divHeight}>
               <Tooltip title={"Edit"}>
                    <IconButton className={classes.iconButton} disabled={multiSelect} onClick={this.editNote}>
                        {!multiSelect && <EditIcon className={classes.editIcon} />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Delete"}>
                    <IconButton className={classes.iconButton} onClick={this.handleDelete}>
                        <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
                {this.props.openNote && <NoteComponent 
                openNote={true} 
                handleSubmit={this.props.handleSubmit}
                noteModel={this.updateNote}
                />  }
            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {
    name: "NoteListToolbarSelect"
})(NoteListToolbarSelect);

// export default NoteListToolbarSelect;