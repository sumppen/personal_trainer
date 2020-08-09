import React, {useState, useEffect} from "react";
import {BarChart, Bar, XAxis, YAxis} from 'recharts';
import HashMap from 'hashmap';

export default function Statistics () {

    const [data, setData] = useState([]);
    const [ready, setReady] = useState(false);
    const map = new HashMap();

    function parseTraining(training) {
        if(map.has(training.activity)) {
            let duration = (map.get(training.activity) + training.duration)/2;
            map.set(training.activity,duration);
        } else {
            map.set(training.activity,training.duration);
        }
    }

    useEffect( () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(responseData => {
                responseData.content.forEach(parseTraining);
                let entries = []
                map.forEach(function(value, key) {
                    console.log(key + " : " + value);
                    const entry = {activity: key, duration: value};
                    entries.push(entry);
                })
                setData(entries);
                console.log(data);
            })
            .catch(err => console.error(err))
        }, [ready]
    )

    return (
        <BarChart width={800} height={600} data={data} margin={{ top: 20, right: 20, bottom: 0, left: 20 }}>
            <XAxis dataKey="activity" />
            <YAxis />
            <Bar dataKey="duration" fill="#ff7300" />
        </BarChart>
    );
}