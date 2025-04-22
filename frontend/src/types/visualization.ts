export interface DataPoint {
    id: string;
    value: string;
    label: string;
}

export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        background_color: string | string[];
        border_color: string | string[];
    }
}

