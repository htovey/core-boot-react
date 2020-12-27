import React from 'react';
import MUIDataTable from 'mui-datatables';
import NoteListToolbarSelect from './NoteListToolbarSelect';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { StayPrimaryLandscape } from '@material-ui/icons';
import NoteListToolbar from './NoteListToolbar';

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
                filter: true,
                setCellProps: value => ({ style: { width: '75%' } }),
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
        responsive: "scrollFullHeight",
        selectableRows: true,
        selectToolbarPlacement: "above",
        customToolbar: () => {   
         return <NoteListToolbar
                    handleSuccess={props.handleSuccess} 
                    noteList={props.notes} 
                    userToken={props.userToken}
                    selectedRows={props.selectedRows}
                    createUpdateNote={props.createUpdateNote}/>
        },
        customToolbarSelect: (selectedRows) => (
            <NoteListToolbarSelect 
                className={"selectToolbar"}
                selectedRows={selectedRows}
                updateSelectedRows={props.setSelectedRows}/>
        )
      };

    const getMuiTheme  = createMuiTheme({
        overrides: {
            MUIDataTable: {
            root: {
                backgroundColor: 'purple',
            },
            paper: {
                boxShadow: 'none',
            },
            },
            MUIDataTableToolbarSelect: {
               root: {
                    backgroundColor: 'orange',
               },
            },
            MuiTableCell: {
            head: {
                backgroundColor: 'purple',
            },
            },
            MUIDataTableSelectCell: {
            headerCell: {
                backgroundColor: 'inherit',
            },
            },
            MuiTableFooter: {
            root: {
                '& .MuiToolbar-root': {
                backgroundColor: 'white',
                },
            },
            },
            MuiPaper: {
                backgroundColor: 'red'
            }
        },
        });  
    

    return (
        <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable 
                data={props.notes}
                columns={columns}
                options={options}     
            />
        </MuiThemeProvider> 
    )
}