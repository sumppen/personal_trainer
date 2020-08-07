import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '',
        city: '', email: '', phone: ''
    })

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode, city: props.customer.city,
            email: props.customer.email, phone: props.customer.phone
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleInputChange(e) {
        setCustomer({ ...customer, [e.target.id]: e.target.value})
    }

    function saveCustomer() {
        props.editCustomer(customer, props.url);
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        label="First name"
                        value={customer.firstname}
                        onChange={e => handleInputChange(e)}
                        type="text"
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        label="Last name"
                        value={customer.lastname}
                        onChange={e => handleInputChange(e)}
                        type="text"
                    />
                    <TextField
                        margin="dense"
                        id="streetaddress"
                        label="Street address"
                        value={customer.streetaddress}
                        onChange={e => handleInputChange(e)}
                        type="text"
                    />
                    <TextField
                        margin="dense"
                        id="postcode"
                        label="Post code"
                        value={customer.postcode}
                        onChange={e => handleInputChange(e)}
                        type="text"
                    />
                    <TextField
                        margin="dense"
                        id="city"
                        label="City"
                        value={customer.city}
                        onChange={e => handleInputChange(e)}
                        type="text"
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        value={customer.email}
                        onChange={e => handleInputChange(e)}
                        type="email"
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone"
                        value={customer.phone}
                        onChange={e => handleInputChange(e)}
                        type="text"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}