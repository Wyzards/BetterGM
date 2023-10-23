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
    //static roles = [Role.CREW, Role.CASHIER, Role.FOH_TRAINER, Role.BOH_TRAINER, Role.KL, Role.SL, Role.AP, Role.GM, Role.R, Role.CTM];

    #id;
    #name;

    constructor(id, name) {
        this.#id = id;
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

    static tryFromID(id) {
        for (var role of Role.roles)
            if (role.id === id)
                return role;
        return null;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    toString() {
        return JSON.stringify({ type: "role", id: this.#id, name: this.#name });
    }
}

// 106145

export { Role };