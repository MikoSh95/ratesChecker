
import { timeParse } from "d3-time-format";
import { Data } from "./model";

const parseDate = timeParse("%Y-%m-%d");

export function getData(): Promise<Data[]> {
    const promiseCompare = fetch('data.json')
        .then(response => response.json())
        .then(data => {

            // @ts-ignore
           const result =  data.data.map(value => ({
                date: parseDate(value.date),
                open: +value.open,
                close: +value.close,
                low: +value.low,
                height: +value.height,
                volume: +value.volume,
            }));
            console.log(result);
           return result;
        });
    return promiseCompare;
}
