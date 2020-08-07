import React, {useEffect, useState} from "react";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from "@material-ui/core/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

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

    function handleDelete(res) {
        if(res.ok) {
            setMessage('The customer was successfully deleted');
            setSeverity('success');
        } else {
            setMessage('Failed to delete the customer: '+res.message);
            setSeverity('error');
        }
        setOpen(true);
        return res;
    }

    function handleAdd(res) {
        if(res.ok) {
            setMessage('The customer was successfully added');
            setSeverity('success');
        } else {
            setMessage('Failed to add the customer: '+res.message);
            setSeverity('error');
        }
        setOpen(true);
        return res;
    }

    function handleEdit(res) {
        if(res.ok) {
            setMessage('The customer was successfully modified');
            setSeverity('success');
        } else {
            setMessage('Failed to modify the customer: '+res.message);
            setSeverity('error');
        }
        setOpen(true);
        return res;
    }

    function deleteCustomer(url) {
        if(window.confirm('Are you sure?')) {
            fetch(url, {method: 'DELETE'})
                .then(handleDelete)
                .then(fetchData)
                .catch(err => console.error(err));
        }
    }

    function saveCustomer(customer) {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(handleAdd)
            .then(fetchData)
            .catch(err => console.log(err))
    }

    function editCustomer(customer, url) {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(handleEdit)
            .then(fetchData)
            .catch(err => console.error(err))
    }

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
    }, {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links[0].href',
        Cell: row => (
            <EditCustomer customer={row.original} editCustomer={editCustomer} url={row.value}/>
        )
    }, {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links[0].href',
        Cell: row => (
            <Button color={"secondary"} size={"small"} onClick={() => deleteCustomer(row.value)}>Delete</Button>
        )
    }
    ];

    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer}/>
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