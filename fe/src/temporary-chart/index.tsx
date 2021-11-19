import { CartesianGrid, Line, Tooltip, XAxis, LineChart, YAxis, Legend } from "recharts";
import { useEffect, useState } from "react";
import { Data } from "./model";
import { getData } from "./service";
import moment from "moment";

export const TemporaryChart = () => {
    const [data, setData] = useState<Data[]>([]);

    // @ts-ignore
    const formatXAxis = (item) => {
// If using moment.js
        return moment(item).format('MMM Do YY')
    }

    useEffect(() => {
        getData().then(newData => {
            setData(newData);
        })

    }, []);
    return <LineChart
        width={1200}
        height={400}
        data={data}
        margin={{top: 5, right: 20, left: 10, bottom: 5}}
    >
        <XAxis dataKey="date" tickFormatter={formatXAxis}/>
        <YAxis/>

        <Tooltip/>
        <CartesianGrid stroke="#f5f5f5"/>
        <Legend/>
        <Line type="monotone" dataKey="value" stroke="#ff7300"/>
        <Line type="monotone" dataKey="min" stroke="#387908"/>
        <Line type="monotone" dataKey="max" stroke="#3c35bd"/>
    </LineChart>
}
