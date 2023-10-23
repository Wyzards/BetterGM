class Employee {
    constructor(id, name, role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }

    toString() {
        return JSON.stringify({ type: "employee", emp_id: this.id, name: this.name, role: this.role });
    }
}

export { Employee };