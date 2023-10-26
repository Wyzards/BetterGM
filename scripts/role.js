class Role {
    static CREW = new Role(0, "CREW");
    static CASHIER = new Role(1, "CASHIER");
    static FOH_TRAINER = new Role(2, "FOH_TRAINER");
    static BOH_TRAINER = new Role(3, "BOH_TRAINER");
    static KL = new Role(4, "KL");
    static SL = new Role(5, "SL");
    static AP = new Role(6, "AP");
    static GM = new Role(7, "GM");
    static R = new Role(8, "R");
    static CTM = new Role(9, "CTM");

    #role_id;
    #name;

    constructor(role_id, name) {
        this.#role_id = role_id;
        this.#name = name;

        if (!Role.roles)
            Role.roles = [];

        Role.roles.push(this);
    }

    static tryFromName(name) {
        for (var role of Role.roles)
            if (role.name === name)
                return role;

        return null;
    }

    static tryFromID(role_id) {
        for (var role of Role.roles)
            if (role.role_id === role_id)
                return role;
        return null;
    }

    get role_id() {
        return this.#role_id;
    }

    get name() {
        return this.#name;
    }

    toString() {
        return JSON.stringify({ type: "role", id: this.#role_id, name: this.#name });
    }
}

export { Role };