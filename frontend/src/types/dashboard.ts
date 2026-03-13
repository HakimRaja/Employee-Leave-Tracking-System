
export type StatLabel = 'Employees' | 'Pending' | 'Approved' | 'Total Requests';

export interface StatConfig {
    label: StatLabel;
    value: string;
}