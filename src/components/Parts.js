import React, { useState, useRef } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Tabs from '@mui/material/Tabs';
import { AppBar } from '@material-ui/core';
import Tab from '@mui/material/Tab';

import Customers from './Customers';
import Trainings from './Trainings';
import Calendar from './Calendar';
import Statistics from './Statistics';



const Parts = () => {



    const[value, setValue] = useState('Customers');
    const handleChange = ( event, value) => {
    setValue(value);
    };


    return (
        <div style={{marginBottom: 20 }}>
            <AppBar position="static">
                <Tabs value ={value} onChange={handleChange} >
                    <Tab value="Customers" label= "Customers" />
                    <Tab value="Trainings" label= "Trainings"/>
                    <Tab value="Calendar" label= "Calendar"/>
                    <Tab value="Statistics" label= "Statistics"/>
                </Tabs>
            </AppBar>

            {value === 'Customers' && <div><Customers /></div>}     
            {value === 'Trainings' && <div><Trainings /></div>}
            {value === 'Calendar' && <div><Calendar /></div>}
            {value === 'Statistics' && <div><Statistics /></div>}
            

        </div>
    );
};

export default Parts;