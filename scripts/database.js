import { Employee } from "./employee.js";
import { Role } from "./role.js";

class Database {

    static instance;

    constructor() {

    }

    static getInstance() {
        if (!Database.instance)
            Database.instance = new Database();

        return Database.instance;
    }

    removeEmployee(employee) {
        console.log("HAVENT IMPLEMENTED REMOVE EMPLOYEE YET");
    }

    getEmployee(emp_id) {
        return new Promise((resolve) => {
            $.post({
                url: "../database/ajax.php",
                data: { FUNCTION: "GET_EMPLOYEE", emp_id: emp_id },
                success: function (response) {
                    let empData = JSON.parse(response);
                    let employee = new Employee(empData["emp_id"], empData["name"], Role.tryFrom(empData["role"]));
                    resolve(employee);
                }
            });
        });
    }
}

export { Database };