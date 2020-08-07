import React, {useEffect, useState} from "react";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function fetchData() {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchData();
    }, [])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const columns= [{
        Header:'Firstname',
        accessor: 'firstname'
    }, {
        Header:'Lastname',
        accessor: 'lastname',
    }, {
        Header: 'Street address',
        accessor: 'streetaddress'
    }, {
        Header: 'Postcode',
        accessor: 'postcode',
    }, {
        Header: 'City',
        accessor: 'city',
    }, {
        Header: 'Email',
        accessor: 'email'
    }, {
        Header: 'Phone',
        accessor: 'phone'
    }
    ];

    return (
        <div>
            <ReactTable data={customers}
                        columns={columns}
                        sortable='true'
                        filterable={true}
                        defaultPageSize='10'/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
