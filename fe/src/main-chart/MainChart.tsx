import { CandlestickSeries, Chart, ChartCanvas, timeFormat, XAxis, YAxis } from "react-financial-charts";
import { useEffect, useState } from "react";
import { getData } from "./data/service";
import { scaleTime, ScaleTime, ScaleContinuousNumeric, scaleLog, scaleLinear } from "d3-scale";
import { Data } from './data/model';

import { format } from 'd3-format';

export const MainChart = () => {
    const margin = { left: 0, right: 48, top: 0, bottom: 24 };
    const [data, setData] = useState<Data[]>([]);
    // @ts-ignore
    const [{isReady, yExtents, max, min, xExtents}, setTableConfig] = useState<any>({
        isReady: false,
    })

    const xScale = scaleTime();
    const yScale = scaleLinear();

    const xAccessor = (d: Data) => d.date;

    useEffect(() => {
        getData().then(newData => {
            setData(newData);
        })

    }, []);

    useEffect(()=> {
        if(data.length > 0) {
            const _max = xAccessor(data[data.length - 1]);
            const _min = xAccessor(data[Math.max(0, data.length - 100)]);
            const _xExtents = [min, max];
            const _yExtents = (data: Data) => [data.high, data.low];
            // @ts-ignore
            setTableConfig({
                isReady: true,
                max: _max,
                min: _min,
                xExtents: _xExtents,
                yExtents: _yExtents,
            })
        }

    }, [data])

    return isReady ? (
        <ChartCanvas seriesName="Data"
                     margin={margin}
                     xScale={xScale}
                     data={data}
                     height={600}
                     width={1200} ratio={1}
                     xAccessor={xAccessor}
                     xExtents={xExtents}>
            <Chart id={1} yScale={yScale} yExtents={yExtents}>
                <CandlestickSeries/>
                <XAxis tickFormat={timeFormat}/>
                <YAxis tickFormat={format(".2f")}/>
            </Chart>
        </ChartCanvas>) : null;
}
