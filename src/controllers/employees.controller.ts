
import { Request, Response } from 'express';
import { getEmployees } from '../services/employees.service';

export const getEmployeesController = async (_: Request, res: Response) => {
    try {
        const employees = await getEmployees();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
}