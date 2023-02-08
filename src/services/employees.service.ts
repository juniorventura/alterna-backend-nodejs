import { getEmployeesQuery } from "../queries/employees.queries"

export const getEmployees = async () => {
    /**
     * Bussiness logic
     */
    return await getEmployeesQuery();
}