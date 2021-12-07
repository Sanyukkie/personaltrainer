import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import DeleteIcon from '@mui/icons-material/Delete';



import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';


import EditCustomer from './EditCustomers';
import AddCustomer from './AddCustomers';
import AddTraining from './AddTraining';

import { CSVLink } from "react-csv";


const Customers = () => {

    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        fetchCustomers();
    }, []);

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    
    
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

    setOpen(false);
    };

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then((response) => response.json())
                .then((data) => setCustomers(data.content))
                    .catch((err) => console.log(err));
    };

    const addCustomer = (customer) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(customer),
        })
        .then((response) => {
        setMsg("Customer added!");
        setOpen(true);
        fetchCustomers();
        })
        .catch((err) => console.log(err));
    };

    const deleteCustomer = (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: "DELETE" })
                .then((response) => {
                    if (response.ok) {
                        setMsg("Customer deleted!")
                        setOpen(true);
                        fetchCustomers();
                    } else {
                        alert("Something went wrong");
                    }
                })
                .catch((err) => console.log(err));
        }
    };
        
    const editCustomer = (link, updatedCustomer) => {
        console.log(link);
        fetch(link, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedCustomer),
        })
            .then(response => fetchCustomers())
                .catch(err => console.error(err))
    }
    
    const addTraining = (newTrainings) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTrainings)
        })
            .then((response) => {
                if (response.ok) {
                    setMsg("Training session added");
                    setOpen(true);
                    fetchCustomers();
                }
                else {
                    alert('Error, training session not added')
                }
            })

    };


    const columns = [
        { field: 'firstname', sortable: true, filter: true, floatingFilter: true },
        { field: 'lastname', sortable: true, filter: true, floatingFilter: true },
        { field: 'streetaddress', sortable: true, filter: true, floatingFilter: true },
        { field: 'postcode', sortable: true, filter: true, floatingFilter: true },
        { field: 'city', sortable: true, filter: true, floatingFilter: true },
        { field: 'email', sortable: true, filter: true, floatingFilter: true },
        { field: 'phone', sortable: true, filter: true, floatingFilter: true },
        {
            headerName: "",
            sortable: false,
            filter: false,
            field: "links[2].href",
            width: 100,
            cellRendererFramework: (params) => <AddTraining addTraining={addTraining} row={params} />
        },
        {
            headerName: "",
            sortable: false,
            filter: false,
            field: "links[1].href",
            width: 100,
            cellRendererFramework: (params) => <EditCustomer editCustomer={editCustomer} row={params} />
        },
        {
            headerName: "",
            sortable: false,
            filter: false,
            field: "links[1].href",
            width: 100,
            cellRendererFramework: (params) => (
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCustomer(params.data.links[0].href)}
                    startIcon={<DeleteIcon />}
                >
                </Button>
            ),
        }
    ];




    return (
        <div style={{ marginTop: 20 }}>
            <AddCustomer addCustomer={addCustomer} />
            

            <div
                className="ag-theme-material"
                style={{ marginTop: 20, height: 600, width: "90%", margin: "auto" }}
            >
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
                animateRows={true}
            />
            </div>
            <CSVLink data={customers} >Download CSV</CSVLink>
            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={handleClose}
            />
        </div>
    );
};

export default Customers;