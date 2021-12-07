import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";



import AddIcon from '@mui/icons-material/Add';

import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider, 
} from '@material-ui/pickers';


function AddTraining(props) {
    const [open, setOpen] = React.useState(false);

    const [training, setTraining] = React.useState({
        date: "",
        duration: "",
        activity: "",
        customer: "",
    });

    const handleClickOpen = () => {
        setTraining({ ...training, customer: props.row.data.links[1].href });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setTraining({ ...training, date: selectedDate });
        console.log(training);
        console.log(props);
        props.addTraining(training);
        handleClose();
    };

    

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };


    const [selectedDate, handleDateChange] = useState(new Date());



    const setData = (date) => {
        handleDateChange(date);
        setTraining({...training, date: selectedDate});
    };


    return (
    <div>
        <Button size="small" onClick={handleClickOpen}>
            <AddIcon />
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>

        <DialogContent>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={selectedDate} onChange={ date => setData(date)} />
            </MuiPickersUtilsProvider>

            <TextField
            margin="dense"
            name="duration"
            type="number"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
            />
            <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
            />

        </DialogContent>

        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
        </DialogActions>
        </Dialog>
    </div>
    );
}

export default AddTraining;