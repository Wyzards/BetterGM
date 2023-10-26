import { Employee } from "./employee.js";
import { Role } from "./role.js";
import { App } from "./app.js";

class Database {

    static #instance;

    static getInstance() {
        if (!Database.#instance)
            Database.#instance = new Database();

        return Database.#instance;
    }

    setJobs(employee, jobs_array) {
        return $.post({
            url: "../database/ajax.php",
            data: { FUNCTION: "SET_JOBS", emp_id: employee.emp_id, jobs: jobs_array.map(job => job.job_id) }
        });
    }

    addNewEmployee(name, role) {
        return $.post({
            url: "../database/ajax.php",
            data: { FUNCTION: "ADD_EMPLOYEE", name: name, role_id: role.role_id }
        });
    }

    removeEmployee(employee) {
        $.post({
            url: "../database/ajax.php",
            data: { FUNCTION: "DELETE_EMPLOYEE", emp_id: employee.emp_id },
        });
    }

    getEmployee(emp_id) {
        return new Promise((resolve) => {
            $.post({
                url: "../database/ajax.php",
                data: { FUNCTION: "GET_EMPLOYEE", emp_id: emp_id },
                success: function (response) {
                    let empData = JSON.parse(response);
                    let employee = new Employee(empData["emp_id"], empData["name"], Role.tryFromID(empData["role"]["value"]));
                    resolve(employee);
                }
            });
        });
    }
}

export { Database };