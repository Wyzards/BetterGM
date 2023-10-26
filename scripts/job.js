class Job {

    static GRILL = new Job(1, "GRILL");
    static CHIPS = new Job(2, "CHIPS");
    static PREP = new Job(3, "PREP");
    static LINE = new Job(4, "LINE");
    static DIGITAL = new Job(5, "DIGITAL");

    #job_id;
    #name;

    constructor(job_id, name) {
        this.#job_id = job_id;
        this.#name = name;

        if (!Job.jobs)
            Job.jobs = [];

        Job.jobs.push(this);
    }

    static tryFromName(name) {
        for (var job of Job.jobs)
            if (job.name === name)
                return job;

        return null;
    }

    static tryFromID(job_id) {
        for (var job of Job.jobs)
            if (job.job_id === job_id)
                return job;
        return null;
    }

    get job_id() {
        return this.#job_id;
    }

    get name() {
        return this.#name;
    }

    toString() {
        return JSON.stringify({ type: "job", id: this.#job_id, name: this.#name });
    }
}

export { Job };