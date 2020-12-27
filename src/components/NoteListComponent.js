import React from 'react';
import MUIDataTable from 'mui-datatables';
import NoteListToolbarSelect from './NoteListToolbarSelect'

export default function NoteListComponent(props) {
    const columns = [
        {
            name: "noteId",
            label: "Note Id",
            options: {
                display: 'excluded'
            }
        },
        {
            name: "category",
            label: "Category",
            options: {
                filter: true
            }
        },
        {
            name: "noteText",
            label: "Note",
            options: {
                filter: true
            }
        },
        {
            name: "lastUpdated",
            label: "Last Updated",
            options: {
                filter: true
            }
        }
    ];

    const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "scroll",
        selectableRows: true,
        customToolbarSelect: selectedRows => (
            <NoteListToolbarSelect 
                handleSubmit={props.handleSubmit} 
                handleSuccess={props.handleSuccess} 
                noteList={props.notes} 
                userToken={props.userToken} 
                selectedRows={selectedRows}
                createUpdateNote={props.createUpdateNote}/>
        )
      };

    return (
        
        <MUIDataTable 
            data={props.notes}
            columns={columns}
            options={options}
        />
    )
}