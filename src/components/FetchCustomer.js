import React, { useState, useEffect } from "react";


function FetchCustomer(props){

    const [customer, setCustomer] = React.useState({
        firstname: "",
        lastname: "",
    });
    useEffect(() => {
        fetch(props.row.data.links[2].href)
        .then((response) => response.json())
            .then((data) => setCustomer(data))
                .catch((err) => console.log(err));
    }, []);

    return(
    <div>
        {customer.firstname} {customer.lastname}
    </div>
    );
};


export default FetchCustomer;