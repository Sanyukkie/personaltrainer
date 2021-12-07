import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';


import moment from "moment";


import FetchCustomer from "./FetchCustomer";


const Trainings = () => {

    const [trainings, setTrainings] = useState([]);
    useEffect(() => {
        fetchTrainings();
    }, []);

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");


    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

    setOpen(false);
    };

    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
            .then((response) => response.json())
                .then((data) => setTrainings(data.content))
                    .catch((err) => console.log(err));
    };



    const deleteTraining = (url) => {
        console.log(url);
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: "DELETE" })
                .then((response) => {
                    if (response.ok) {
                        setMsg("Training deleted!")
                        setOpen(true);
                        fetchTrainings();
                    } else {
                        alert("Something went wrong");
                    }
                })
                .catch((err) => console.log(err));
        }
    };
        
    
    const columns = [
        { field: 'date', sortable: true, filter: true, floatingFilter: true, cellRenderer: (data) => {
            return moment(data.createdAt).format('MM/DD/YYYY HH:mm')
        }
        },
        { field: 'duration', sortable: true, filter: true, floatingFilter: true },
        { field: 'activity', sortable: true, filter: true, floatingFilter: true },
        {
            headerName: "Customer",
            sortable: false,
            filter: false,
            field: "links[2].href",
            width: 150,
            cellRendererFramework: (params) => <FetchCustomer row={params} />,
        },
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 130,
            field: "links[0].href",
            cellRendererFramework: (params) => (
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteTraining(params.data.links[1].href)}
                    startIcon={<DeleteIcon />}
                >
                </Button>
            ),
        },
    
    ];



    return (
        <div style={{ marginTop: 20 }}>
            <div
                className="ag-theme-material"
                style={{ marginTop: 20, height: 600, width: "48%", margin: "auto" }}
            >
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
                animateRows={true}
            />
            </div>

            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={handleClose}
            />
        </div>

    );
};

export default Trainings;