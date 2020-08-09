import React, {useEffect, useState} from "react";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';
import ShowCustomer from "./ShowCustomer";
import Button from "@material-ui/core/Button";
import AddTraining from "./AddTraining";

export default function Customers() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    moment.locale('fi');

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function fetchData() {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData.content)
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
            setMessage('The training was successfully deleted');
            setSeverity('success');
        } else {
            setMessage('Failed to delete the training: '+res.message);
            setSeverity('error');
        }
        setOpen(true);
        return res;
    }

    function handleAdd(res) {
        if(res.ok) {
            setMessage('The training was successfully added');
            setSeverity('success');
        } else {
            setMessage('Failed to add the training: '+res.message);
            setSeverity('error');
        }
        setOpen(true);
        return res;
    }

    function deleteTraining(url) {
        if(window.confirm('Are you sure?')) {
            fetch(url, {method: 'DELETE'})
                .then(handleDelete)
                .then(fetchData)
                .catch(err => console.error(err));
        }
    }

    function saveTraining(training) {
        const newTraining = {
            date: new Date(training.date).toISOString(),
            activity: training.activity,
            duration: training.duration,
            customer: training.customer.links[0].href
        }
        console.log(newTraining)
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
            .then(handleAdd)
            .then(fetchData)
            .catch(err => console.log(err))
    }

    const columns= [{
        Header:'Date',
        accessor: 'date',
        Cell: row => (
            moment(row.value, moment.ISO_8601).format('DD.MM.YYYY HH:mm')
        )
    }, {
        Header:'Duration',
        accessor: 'duration',
    }, {
        Header: 'Activity',
        accessor: 'activity'
    }, {
        sortable: false,
        filterable: false,
        width: 200,
        accessor: 'links[2].href',
        Cell: row => (
            <ShowCustomer url={row.value}/>
        )
    }, {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links[0].href',
        Cell: row => (
            <Button variant="outlined" color={"secondary"} size={"small"} onClick={() => deleteTraining(row.value)}>Delete</Button>
        )
    }
    ];

    return (
        <div>
            <AddTraining saveTraining={saveTraining}/>
            <ReactTable data={trainings}
                        columns={columns}
                        sortable={true}
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