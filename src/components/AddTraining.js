import React, {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration: 0, activity: '', customer: ''
    })
    const [customers, setCustomers] = useState([]);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    function fetchCustomers() {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchCustomers();
    }, [])


    const handleClose = () => {
        setOpen(false);

        setTraining({
            date: '', duration: 0, activity: '', customer: ''
        });
    };

    function handleInputChange(e) {
        setTraining({ ...training, [e.target.id]: e.target.value});
    }

    function handleAutocomplete(e,t) {
        setTraining({ ...training, customer: t});
    }

    function saveTraining() {
        props.saveTraining(training);
        setOpen(false);
        setTraining({
            date: '', duration: 0, activity: '', customer: ''
        });
    }

    return (
        <div>
            <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add training</DialogTitle>
                <DialogContent>
                    <TextField
                        id="date"
                        label="Time"
                        type="datetime-local"
                        className={classes.textField}
                        onChange={(e) => handleInputChange(e)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="duration"
                        label="Duration"
                        value={training.duration}
                        onChange={(e) => handleInputChange(e)}
                        type="number"
                    />
                    <TextField
                        margin="dense"
                        id="activity"
                        label="Activity"
                        value={training.activity}
                        style={{ width: 300 }}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                    />
                    <Autocomplete
                        id="combo-box-demo"
                        options={customers}
                        onChange={handleAutocomplete}
                        getOptionLabel={(option) => option.firstname+' '+option.lastname+' ('+option.phone+')'}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Customer" variant="outlined" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveTraining} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}