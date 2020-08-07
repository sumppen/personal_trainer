import React, {useEffect, useState} from "react";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';

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
    }
    ];

    return (
        <div>
            <ReactTable data={trainings}
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