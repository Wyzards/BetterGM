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

    constructor(roleId, name) {
        this.roleId = roleId;
        this.name = name;

        if (!Role.roles)
            Role.roles = [];

        Role.roles.push(this);
    }

    toString() {
        return JSON.stringify({ type: "role", id: this.roleId, name: this.name });
    }

    static tryFrom(roleNameOrID) {
        for (var role of Role.roles)
            if (role.name === roleNameOrID || role.roleId == roleNameOrID)
                return role;

        return null;
    }
}

export { Role }