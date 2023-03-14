
import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import styles from './styles.module.css';
import Select from 'react-select';
import { timeRange } from './Data.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const LineChart = () => {
    var baseUrl = "http://localhost:3000/api/getAll";
    var apiKey = "5e42z68";

    let data;

    let [chart, setChart] = useState()

    const [selectedValue, setSelectedValue] = useState(1);
    const fetchData = async (timeRange) => {
        await fetch(`${baseUrl}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${apiKey}`,
                    'Access-Control-Allow-Origin': "http://localhost:3000/api/getAll",
                    'timeperiod': `${timeRange}`,
                    'apikey': `${apiKey}`
                }
            })
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((json) => {
                            let extractedData = {
                                timestamp: json.map(x => {
                                    let date = new Date(x.timestamp);
                                    return (date.getHours() >= 12 ? date.getHours() - 12 : date.getHours())
                                        + ":" + date.getMinutes()
                                        + (date.getHours() >= 12 ? "pm" : "am") +
                                        ", " + date.toDateString();
                                }),
                                voltage: json.map(x => x.voltage)
                            };
                            setChart(extractedData);
                        });
                }
            }).catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        fetchData('24h'); //By default, loads 24hrs of data
    }, [baseUrl, apiKey])

    const handleChange = e => {
        setSelectedValue(e.value); //The value selected from Select time
        fetchData(e.value);
    }

    data = {
        labels: chart?.timestamp,
        datasets: [{
            label: "Voltage (V)",
            data: chart?.voltage,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2.5
        }]
    };

    var options = {
        maintainAspectRatio: false,
        scales: {
        },
        legend: {
            labels: {
                fontSize: 25,
            },
        },
    }

    return (
        <div className={styles.ct_series_g}>

            <div className={styles.dropDownButton}>
                <Select
                    placeholder="Select Time"
                    value={timeRange.filter(obj => obj.value === selectedValue)} // set selected value
                    options={timeRange} // set list of the data
                    onChange={handleChange} // assign onChange function
                    styles={{ width: "100px" }}
                />
            </div>
            <Line
                data={data}
                height={400}
                options={options}
            />
        </div>
    )
}

export default LineChart;