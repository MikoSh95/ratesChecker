import { timeParse } from "d3-time-format";
import { Data } from "./model";

export function getData(): Promise<Data[]> {
    const parseDate = timeParse("%Y-%m-%d");
    const promiseCompare = fetch('data2.json')
        .then(response => response.json())
        .then(data => {

            // @ts-ignore
            const result =  data.data.map(value => ({
                ...value,
                date: parseDate(value.date),
            }));
            console.log(result);
            return result;
        });
    return promiseCompare;
}
