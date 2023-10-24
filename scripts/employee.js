class Employee {
    #emp_id;
    #name;
    #role;
    #jobs;

    constructor(emp_id, name, role, jobs) {
        this.#emp_id = emp_id;
        this.#name = name;
        this.#role = role;
        this.#jobs = jobs;
    }

    get emp_id() {
        return this.#emp_id;
    }

    get name() {
        return this.#name;
    }

    get role() {
        return this.#role;
    }

    get jobs() {
        return this.#jobs;
    }

    toString() {
        return JSON.stringify({ type: "employee", emp_id: this.#emp_id, name: this.#name, role: JSON.stringify(this.#role) });
    }
}

export { Employee };