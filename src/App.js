import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box";
import TrainingCalendar from "./components/TrainingCalendar";
import Statistics from "./components/Statistics";

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography component={'span'}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };
  return (
    <div className="App">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Personal Trainer
                </Typography>
            </Toolbar>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Customers" {...a11yProps(0)} />
                <Tab label="Trainings" {...a11yProps(1)} />
                <Tab label="Calendar" {...a11yProps(2)} />
                <Tab label="Statistics" {...a11yProps(3)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <Customers/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Trainings/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <TrainingCalendar/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <Statistics/>
        </TabPanel>
    </div>
  );
}

export default App;
