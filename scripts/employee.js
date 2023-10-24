class Employee {
    #emp_id;
    #name;
    #role;

    constructor(emp_id, name, role) {
        this.#emp_id = emp_id;
        this.#name = name;
        this.#role = role;
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

    toString() {
        return JSON.stringify({ type: "employee", emp_id: this.#emp_id, name: this.#name, role: JSON.stringify(this.#role) });
    }
}

export { Employee };