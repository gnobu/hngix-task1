export enum OPERATION {
    addition = 'addition',
    subtraction = 'subtraction',
    multiplication = 'multiplication',
    division = 'division'
}

export interface IOperationBody {
    operation_type: OPERATION;
    x: number;
    y: number;
}