class Job {

    static GRILL = new Job(1, "GRILL");
    static CHIPS = new Job(2, "CHIPS");
    static PREP = new Job(3, "PREP");
    static LINE = new Job(4, "LINE");
    static DIGITAL = new Job(5, "DIGITAL");

    #id;
    #name;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;

        if (!Job.jobs)
            Job.jobs = [];

        Job.jobs.push(this);
    }

    static tryFromName(name) {
        for (var job of Job.jobs)
            if (job.name === name)
                return role;

        return null;
    }

    static tryFromID(id) {
        for (var job of Job.jobs)
            if (job.id === id)
                return job;
        return null;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    toString() {
        return JSON.stringify({ type: "job", id: this.#id, name: this.#name });
    }
}

export { Job };