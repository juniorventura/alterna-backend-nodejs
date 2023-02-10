import { employees } from "@prisma/client";
import { AlternaErrorEnum } from "../enums/error.enum";
import { createEmployeeQuery, getEmployeeByIdQuery, getEmployeesQuery } from "../queries/employees.queries"
import { CustomError } from "../utils/errorHandler.util";

export const getEmployees = async () => {
    /**
     * Bussiness logic
     */
    return await getEmployeesQuery();
}

export const getEmployeeById = async (id: number) => {
    /**
     * Bussiness logic
     */
    if (id <= 0) {
        // TODO: Create custom error
        throw new Error("The id must be greater than 0.");
    }
    const employee = await getEmployeeByIdQuery(id);
    if (!employee) {
        throw new Error(`Employee was not found for the id: ${id}`);
    }
    return employee;
}

export const createEmployee = async (employee: employees) => {
    /**
     * Bussiness logic
     */
    // TODO: Add validation to the new entity fields
    // In general
    if (!employee) {
        throw new CustomError({
            name: AlternaErrorEnum.BAD_REQUEST,
            message: "Invalid employee data format."
        })
    }
    // Specific to some fields
    if (!employee?.first_name || !employee?.last_name) {
        throw new CustomError({
            name: AlternaErrorEnum.INVALID_VALUE,
            message: "The first name and lastname are required fields."
        })
    }

    return await createEmployeeQuery(employee);

}