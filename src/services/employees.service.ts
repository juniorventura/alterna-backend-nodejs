import { employees, employee_territories } from "@prisma/client";
import { AlternaErrorEnum } from "../enums/error.enum";
import { createEmployeeQuery, deleteEmployeeQuery, existEmployeeWithFirstNameAndLastName, getEmployeeByIdQuery, getEmployeesQuery, updateEmployeeQuery } from "../queries/employees.queries"
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




export const updateEmployees = async (employee: employees) => {
    /**
     * Bussiness logic
     * Validation before update
     */

    const foundEmployee = await existEmployeeWithFirstNameAndLastName(employee.last_name, employee.first_name);

    if (!!foundEmployee && foundEmployee.employee_id != employee.employee_id) {
        throw new CustomError({
            name: AlternaErrorEnum.BAD_REQUEST,
            message: "The first name and lastname already exist."
        })
    }   

    return await updateEmployeeQuery(employee);
}

export const deleteEmployeeById = async (id: number) => {
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

    return await deleteEmployeeQuery(id);
}