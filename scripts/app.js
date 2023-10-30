import { Database } from "./database.js";
import { Role } from "./role.js";
import { Job } from "./job.js";
import { Modal } from "./modal.js";

class App {

    static #instance;
    #showEmployeeModal;
    #addEmployeeModal;
    #empAvailModal;

    #database;

    constructor() {
        this.#database = Database.getInstance();
        this.#showEmployeeModal = new Modal("show-employee-modal");
        this.#addEmployeeModal = new Modal("add-employee-modal", ["employee-jobs-list", "edit-jobs-button"], ["save-jobs-button", "employee-jobs-select"]);
        this.#empAvailModal = new Modal("emp-avail-modal");

        this.setup();
    }

    static getInstance() {
        if (!App.#instance)
            App.#instance = new App();
        return App.#instance;
    }

    get database() {
        return this.#database;
    }

    get empAvailModal() {
        return this.#empAvailModal;
    }

    setup() {
        var app = this;
        this.updateTable().then(function () {
            $("#submit-add-employee-button").click(() => { App.getInstance().submitAddEmployee() });
            $("#add-employee-button").click(() => { app.#addEmployeeModal.show() });
            $("#remove-employee-button").click(function () { App.getInstance().removeEmployee(this); });
            $("#edit-jobs-button").click(function () { App.getInstance().editJobs() });
            $("#save-jobs-button").click(function () { App.getInstance().saveJobsSelection($(this).data("emp_id")) });
            $("#view-emp-avail-button").click(function () { app.empAvailModal.show() });


            Role.roles.forEach(role => {
                $("#add-employee-role-select").append("<option>" + role.name + "</option>");
            });

            Job.jobs.forEach(job => {
                $("#employee-jobs-select").append("<option>" + job.name + "</option>");
            });
        });
    }

    removeEmployee(Emp) {
        this.#database.getEmployee($(Emp).data("emp_id")).then((employee) => {
            App.getInstance().database.removeEmployee(employee);
            App.getInstance().updateTable();
            $("#show-employee-modal").css("display", "none");
        });
    }

    showEmpInfo(emp_id) {
        var app = this;
        this.#database.getEmployee(emp_id).then(
            employee => {
                // Data
                $("#remove-employee-button").data("emp_id", employee.emp_id);
                $("#save-jobs-button").data("emp_id", employee.emp_id);
                $("#edit-jobs-button").data("emp_id", employee.emp_id);

                $("#show-emp-modal-name").text("Name: " + employee.name);
                $("#show-emp-modal-role").text("Role: " + employee.role.name);
                app.#showEmployeeModal.show();

                $("#employee-jobs-list").empty();
                employee.jobs.forEach(job => {
                    $("#employee-jobs-list").append("<li>" + job.name + "</li>");
                });
            });
    }

    // Attempts to add an employee based on user input
    submitAddEmployee() {
        this.#database.addNewEmployee($("#add-employee-name-input").val(), Role.tryFromName($("#add-employee-role-select").find(":selected").val()))
            .then(response => {
                if (JSON.parse(response)["response"] == "invalid role")
                    alert("Something went wrong: The role you tried to set does not exist. Refresh the page and try again.");
                else {
                    $("#add-employee-modal").css("display", "none");
                    App.getInstance().updateTable();
                }
            });
    }

    // Likely should be migrated to modal...
    editJobs() {
        this.#database.getEmployee($("#edit-jobs-button").data("emp_id")).then(employee => {
            $("#employee-jobs-select").val(employee.jobs.map(job => job.name));
        });
        $("#employee-jobs-list").css("display", "none");
        $("#employee-jobs-select").css("display", "block");
        $("#edit-jobs-button").css("display", "none");
        $("#save-jobs-button").css("display", "block");
    }

    saveJobsSelection(emp_id) {
        this.#database.getEmployee(emp_id).then(employee => {
            var stringVals = $("#employee-jobs-select").val();
            var jobs = stringVals.map(jobName => Job.tryFromName(jobName));

            App.getInstance().database.setJobs(employee, jobs).then(() => {
                $("#save-jobs-button").css("display", "none");
                $("#edit-jobs-button").css("display", "flex");
                $("#employee-jobs-select").css("display", "none");
                $("#employee-jobs-list").css("display", "block");

                App.getInstance().showEmpInfo(emp_id);
            });
        });
    }

    updateTable() {
        var app = this;
        return $.post({
            url: '../database/ajax.php',
            dataType: 'json',
            data: { FUNCTION: "GET_TABLE" },
            success: function (response) {
                $("#schedule").html(response);
                $(".employee-name").off();
                $(".employee-name").click(function () {
                    App.getInstance().showEmpInfo($(this).data("emp_id"));
                });
            }
        });
    }

}

$(document).ready(function () {
    App.getInstance();
});

export { App };