import React, {useEffect, useState} from "react";
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import moment from 'moment'

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
    });

export default function TrainingCalendar() {
    const [events, setEvents] = useState([]);
    const localizer = momentLocalizer(moment)
    const [done, setDone] = useState(false);

    let allViews = Object.keys(Views).map(k => Views[k])

    async function getCustomer(url) {
        const response = await fetch(url);
        if(response.ok) {
            const json = await response.json();
            return json.firstname.concat(' ').concat(json.lastname);
        }
        return '';
    }

    async function createEvent(training) {
        const customer = await getCustomer(training.links[2].href)
        const newEvent = {
            title: training.activity + ' / ' + customer,
            start: new Date(training.date),
            end: moment(training.date).add(training.duration, 'm').toDate(),
        }
        console.log(newEvent);
        return newEvent;
    }

    function createEvents(content) {
        return Promise.all(content.map((training) => createEvent(training)));
    }

    function fetchData() {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(responseData => {
                createEvents(responseData.content)
                    .then(eventlist => {
                        console.log("Got eventlist: "+eventlist)
                        setEvents(eventlist);
                        setDone(true);
                    })
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchData()
    });

    if(!done) {
        return (
            <p>Loading...</p>
        );
    } else {
        return (
            <Calendar
                events={events}
                views={allViews}
                defaultView={'week'}
                step={60}
                showMultiDayTimes
                components={{
                    timeSlotWrapper: ColoredDateCellWrapper,
                }}
                localizer={localizer}
            />
        );
    }
}